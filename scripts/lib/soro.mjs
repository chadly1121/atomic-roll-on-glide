/**
 * Shared helpers for ingesting Soro-hosted articles into the local blog CMS.
 *
 * Used by:
 *   - scripts/sync-soro.mjs  (weekly incremental ingestion)
 *
 * Everything here is pure + idempotent: the same input always produces the
 * same post file, and nothing ever overwrites a file that already exists
 * (hand edits to imported posts survive future syncs).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  APPROVED_CREDENTIALS, PENDING_CREDENTIALS, CREDENTIAL_PATTERNS, WARRANTY_PATTERNS,
  ABSOLUTE_PATTERNS, HAZARD_PATTERNS, SAFETY_PATTERNS, CONTACT_PATTERNS,
  WARRANTY_LONG, WARRANTY_SHORT,
} from './approved-credentials.mjs';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, '..', '..');

export const EMBED_TOKEN = 'f969f1b1-59f3-4676-8ab4-1b0322f585cc';
export const EMBED_URL = `https://app.trysoro.com/api/embed/${EMBED_TOKEN}`;

export const POSTS_DIR = path.join(ROOT, 'src', 'data', 'blog', 'posts');
export const INDEX_FILE = path.join(ROOT, 'src', 'data', 'blog', 'index.ts');
export const IMAGE_DIR = path.join(ROOT, 'public', 'lovable-uploads', 'blog');
export const IMAGE_URL_PREFIX = '/lovable-uploads/blog';
export const SITEMAP_FILE = path.join(ROOT, 'public', 'sitemap.xml');
export const EDGE_SITEMAP_FILE = path.join(ROOT, 'supabase', 'functions', 'blog-sitemap', 'index.ts');

export const SITE_URL = 'https://www.roll-onpainting.com';
export const AUTHOR = { name: 'Chad Gilchrist', url: `${SITE_URL}/about` };

/** Towns the owner does not serve — an article mentioning one is a hard stop. */
const FORBIDDEN_TOWNS = ['bowmanville', 'collingwood', 'midland'];
const FORBIDDEN_BARRIE = /\bbarrie\b/i; // "barrier" must not match

// ---------------------------------------------------------------- fetching

export async function fetchManifest() {
  const res = await fetch(EMBED_URL);
  if (!res.ok) throw new Error(`Embed manifest fetch failed: HTTP ${res.status}`);
  const js = await res.text();
  const i = js.indexOf('SORO_ARTICLES');
  const start = js.indexOf('[', i);
  if (i < 0 || start < 0) throw new Error('Could not locate SORO_ARTICLES in the embed script');
  let depth = 0, end = -1;
  for (let k = start; k < js.length; k++) {
    const c = js[k];
    if (c === '[') depth++;
    else if (c === ']') { depth--; if (depth === 0) { end = k; break; } }
  }
  if (end < 0) throw new Error('Malformed SORO_ARTICLES array');
  return JSON.parse(js.slice(start, end + 1));
}

export async function fetchArticleBody(id) {
  const res = await fetch(`${EMBED_URL}/article/${id}`);
  if (!res.ok) throw new Error(`Article ${id} fetch failed: HTTP ${res.status}`);
  const text = await res.text();
  let body;
  try {
    const json = JSON.parse(text);
    body = json.content || json.content_html || json.article?.content || '';
  } catch {
    body = text;
  }
  if (!body || body.length < 500) throw new Error(`Article ${id} returned no usable body`);
  return body;
}

// ---------------------------------------------------------------- content scan

/**
 * Corrects imported copy against the real record and strips anything that
 * shouldn't ship. Returns { html, edits: string[], blockers: string[] }.
 */
export function sanitizeContent(rawHtml, slug) {
  let html = rawHtml;
  const edits = [];
  const blockers = [];
  const sub = (re, replacement, label) => {
    const before = html;
    html = html.replace(re, replacement);
    if (html !== before) edits.push(`${slug}: ${label}`);
  };

  // Perfect Finish Promise / warranty — normalised at SENTENCE level below,
  // never by splicing into a clause. Retired stand-alone sentence first.
  sub(
    /It is not a workmanship or material warranty\.?/gi,
    '',
    'removed the retired "not a workmanship or material warranty" sentence'
  );
  {
    const r = normalisePromiseSentences(html, slug);
    html = r.html;
    edits.push(...r.edits);
    blockers.push(...r.blockers);
  }


  // Canadian spelling.
  sub(/\bmold\b/g, 'mould', 'standardised "mold" to "mould"');
  sub(/\bMold\b/g, 'Mould', 'standardised "Mold" to "Mould"');
  sub(/\bmoldy\b/gi, 'mouldy', 'standardised "moldy" to "mouldy"');


  // Contact details must match the real record.
  sub(/\b(?!705[-. ]787[-. ]1401)\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b/g, '705-787-1401', 'corrected a phone number to 705-787-1401');
  sub(/\b\d+\s+[A-Z][A-Za-z]+\s+(Road|Rd|Street|St|Avenue|Ave)\b(?!.{0,40}Greer)/g, '836 Greer Road', 'corrected a street address to 836 Greer Road');
  sub(/missedaspot\.sky-quote\.com/gi, 'www.roll-onpainting.com', 'replaced a missedaspot.sky-quote.com link');
  sub(/(?<![-.\w])rollonpainting\.com/gi, 'roll-onpainting.com', 'corrected rollonpainting.com to roll-onpainting.com');

  // The "40%" statistic must never appear.
  if (/\b40\s?(%|percent)/i.test(html)) blockers.push(`${slug}: contains a "40%" statistic — needs manual rewrite`);

  // Structure / typography hygiene.
  sub(/<\/?h1[^>]*>/gi, '', 'removed a stray <h1> (the page template renders the heading)');
  sub(/â€™|â€˜/g, '\u2019', 'repaired smart-quote mojibake');
  sub(/â€œ|â€\u009d/g, '"', 'repaired smart-quote mojibake');
  sub(/Â/g, '', 'removed stray mojibake characters');
  sub(/ {2,}/g, ' ', 'collapsed double spaces');
  html = html.trim();

  // Hard stops — retired service areas must never come back.
  const lower = html.toLowerCase();
  for (const town of FORBIDDEN_TOWNS) {
    if (lower.includes(town)) blockers.push(`${slug}: mentions retired service area "${town}"`);
  }
  if (FORBIDDEN_BARRIE.test(html)) blockers.push(`${slug}: mentions retired service area "Barrie"`);

  // Rough tag-balance check on block elements.
  for (const tag of ['p', 'h2', 'h3', 'ul', 'ol', 'li', 'table']) {
    const open = (html.match(new RegExp(`<${tag}\\b`, 'gi')) || []).length;
    const close = (html.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
    if (open !== close) blockers.push(`${slug}: unbalanced <${tag}> tags (${open} open / ${close} close)`);
  }

  return { html, edits, blockers };
}

// ---------------------------------------------------------------- tags

/**
 * Tag vocabulary matching the six hand-authored posts: service type, surface,
 * and location only where the article genuinely discusses it.
 */
const TAG_RULES = [
  [/cabinet/i, 'Cabinet Refinishing'],
  [/\bdeck\b|dock\b/i, 'Deck Staining'],
  [/\bstain(ing|s)?\b/i, 'Staining'],
  [/exterior|siding|cedar/i, 'Exterior Painting'],
  [/interior|bedroom|living room/i, 'Interior Painting'],
  [/\btrim\b|millwork|baseboard/i, 'Trim & Millwork'],
  [/epoxy|polyaspartic|garage floor|concrete coating/i, 'Epoxy Coatings'],
  [/spray|sprayer|airless/i, 'Spray Finishing'],
  [/prefinish|pre-finish|shop finishing|controlled shop/i, 'Prefinishing'],
  [/wallpaper|wallcovering/i, 'Wallpaper'],
  [/stucco|popcorn ceiling|textured ceiling/i, 'Stucco Removal'],
  [/pressure wash|power wash|soft wash|washing/i, 'Power Washing'],
  [/mould|mold|mildew/i, 'Mould & Mildew'],
  [/moisture|humidity|condensation/i, 'Moisture Control'],
  [/bathroom/i, 'Bathrooms'],
  [/drywall|patch|crack repair/i, 'Drywall Repair'],
  [/colour|color trend|palette/i, 'Colour Selection'],
  [/sheen|matte|satin|eggshell|gloss/i, 'Paint Sheen'],
  [/cottage/i, 'Cottage Maintenance'],
  [/rental|tenant|short-term/i, 'Rental Properties'],
  [/commercial|office|retail/i, 'Commercial Painting'],
  [/new construction|builder|sequenc/i, 'New Construction'],
  [/estimate|quote|proposal|pricing/i, 'Estimates'],
  [/warrant/i, 'Warranties'],
  [/insur|wsib|liabilit/i, 'Hiring a Painter'],
  [/gonano|nano coating/i, 'GoNano'],
  [/fence/i, 'Fence Staining'],
  [/driveway/i, 'Driveways'],
  [/maintenance checklist|seasonal/i, 'Seasonal Maintenance'],
  [/surface prep|preparation|priming|sanding/i, 'Surface Preparation'],
];

const PLACE_RULES = [
  [/\bMuskoka\b/, 'Muskoka'],
  [/\bHuntsville\b/, 'Huntsville'],
  [/\bBracebridge\b/, 'Bracebridge'],
  [/\bGravenhurst\b/, 'Gravenhurst'],
  [/\bPort Carling\b/, 'Port Carling'],
  [/\bParry Sound\b/, 'Parry Sound'],
  [/\bLake of Bays\b/, 'Lake of Bays'],
  [/\bGeorgian Bay\b/, 'Georgian Bay'],
  [/\bOrillia\b/, 'Orillia'],
  [/\bAlmaguin\b/, 'Almaguin'],
];

export function generateTags(title, html) {
  const titleText = title || '';
  const bodyText = (html || '').replace(/<[^>]+>/g, ' ');
  const scored = [];

  for (const [re, tag] of TAG_RULES) {
    // A title match means the article is about the subject. A body match only
    // counts when the subject is discussed repeatedly, so passing mentions
    // ("preparation", "moisture") don't become tags on every article.
    const inTitle = re.test(titleText);
    const bodyHits = (bodyText.match(new RegExp(re.source, 'gi')) || []).length;
    if (!inTitle && bodyHits < 10) continue;
    if (scored.some((s) => s.tag === tag)) continue;
    scored.push({ tag, score: (inTitle ? 1000 : 0) + bodyHits });
  }
  // Places only when the article genuinely discusses them.
  for (const [re, place] of PLACE_RULES) {
    const hits = (bodyText.match(new RegExp(re.source, 'g')) || []).length;
    if (!re.test(titleText) && hits < 3) continue;
    if (scored.some((s) => s.tag === place)) continue;
    scored.push({ tag: place, score: (re.test(titleText) ? 900 : 0) + hits });
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, 6).map((s) => s.tag);
}


export function generateKeywords(tags, title) {
  const fromTitle = (title || '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .split(/\s+/)
    .filter(Boolean);
  const stop = new Set(['the', 'a', 'an', 'and', 'or', 'for', 'to', 'of', 'in', 'on', 'is', 'are', 'what', 'how', 'why', 'when', 'your', 'you', 'that', 'with', 'versus', 'vs', 'can', 'do', 'does', 'guide', 'best']);
  const phrase = fromTitle.filter((w) => !stop.has(w)).join(' ');
  const keywords = [phrase, ...tags.map((t) => t.toLowerCase())];
  if (!keywords.some((k) => k.includes('muskoka'))) keywords.push('muskoka painters');
  return [...new Set(keywords.filter(Boolean))].slice(0, 10);
}

// ---------------------------------------------------------------- utilities

export function readingTimeOf(html) {
  const words = html.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function escapeTemplate(html) {
  return html.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

export function tsString(value) {
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

export async function downloadImage(url, slug) {
  await fs.mkdir(IMAGE_DIR, { recursive: true });
  const ext = (url.split('?')[0].match(/\.(webp|jpg|jpeg|png|avif)$/i) || [, 'webp'])[1].toLowerCase();
  const filename = `${slug}.${ext}`;
  const dest = path.join(IMAGE_DIR, filename);
  try {
    await fs.access(dest);
    return `${IMAGE_URL_PREFIX}/${filename}`; // already downloaded
  } catch {}
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image fetch failed for ${slug}: HTTP ${res.status}`);
  await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
  return `${IMAGE_URL_PREFIX}/${filename}`;
}

export function postFilePath(slug) {
  return path.join(POSTS_DIR, `${slug}.ts`);
}

export async function postFileExists(slug) {
  try { await fs.access(postFilePath(slug)); return true; } catch { return false; }
}

export async function writePostFile(slug, html) {
  await fs.mkdir(POSTS_DIR, { recursive: true });
  const file = postFilePath(slug);
  const body = `// Article body for /blog/${slug}
// Loaded on demand by src/data/blog/content.ts so it never ships with the blog index.
const content = \`${escapeTemplate(html)}\`;

export default content;
`;
  await fs.writeFile(file, body);
}

export function renderIndexEntry(meta) {
  const tags = meta.tags.map(tsString).join(', ');
  const keywords = meta._seo.meta_keywords.map((k) => `      ${tsString(k)},`).join('\n');
  return `  {
    id: ${tsString(meta.id)},
    slug: ${tsString(meta.slug)},
    title: ${tsString(meta.title)},
    summary: ${tsString(meta.summary)},
    image: ${tsString(meta.image)},
    url: ${tsString(meta.url)},
    tags: [${tags}],
    date_published: ${tsString(meta.date_published)},
    date_modified: ${tsString(meta.date_modified)},
    authors: [{ name: ${tsString(meta.authors[0].name)}, url: ${tsString(meta.authors[0].url)} }],
    language: 'en-CA',
    readingTime: ${meta.readingTime},
    _seo: {
      meta_description: ${tsString(meta._seo.meta_description)},
      meta_keywords: [
${keywords}
      ],
    },
  },
`;
}

const INDEX_MARKER = '  // <<< sync-soro inserts new entries above this line';

export async function appendToIndex(entries) {
  let src = await fs.readFile(INDEX_FILE, 'utf8');
  const marker = src.indexOf(INDEX_MARKER);
  if (marker < 0) throw new Error(`Index marker missing in ${INDEX_FILE}`);
  const added = entries.filter((e) => !src.includes(`slug: ${tsString(e.slug)},`));
  if (!added.length) return 0;
  const block = added.map(renderIndexEntry).join('');
  src = src.slice(0, marker) + block + src.slice(marker);
  await fs.writeFile(INDEX_FILE, src);
  return added.length;
}

export async function addToSitemap(entries) {
  let xml = await fs.readFile(SITEMAP_FILE, 'utf8');
  let added = 0;
  let block = '';
  for (const e of entries) {
    const loc = `${SITE_URL}/blog/${e.slug}`;
    if (xml.includes(`<loc>${loc}</loc>`)) continue;
    block += `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${e.date_modified.slice(0, 10)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    added++;
  }
  if (!added) return 0;
  xml = xml.replace('</urlset>', `${block}</urlset>`);
  await fs.writeFile(SITEMAP_FILE, xml);
  return added;
}

export async function addToEdgeSitemap(entries) {
  let src = await fs.readFile(EDGE_SITEMAP_FILE, 'utf8');
  let block = '';
  let added = 0;
  for (const e of entries) {
    if (src.includes(`slug: '${e.slug}'`)) continue;
    block += `  { slug: '${e.slug}', lastmod: '${e.date_modified.slice(0, 10)}' },\n`;
    added++;
  }
  if (!added) return 0;
  const anchor = '];\n';
  const listEnd = src.indexOf(anchor, src.indexOf('const POSTS'));
  src = src.slice(0, listEnd) + block + src.slice(listEnd);
  await fs.writeFile(EDGE_SITEMAP_FILE, src);
  return added;
}

// ---------------------------------------------------------------- review

const TOWNS = [
  'Muskoka', 'Huntsville', 'Bracebridge', 'Gravenhurst', 'Port Sydney', 'Port Carling',
  'Parry Sound', 'Orillia', 'Baysville', 'Dorset', 'Dwight', 'Rosseau', 'Utterson',
  'Barrie', 'Bowmanville', 'Collingwood', 'Midland',
];

function stripTags(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function sentencesMatching(text, patterns) {
  const hits = [];
  for (const s of text.split(/(?<=[.!?])\s+/)) {
    for (const re of patterns) {
      if (re.test(s)) { hits.push(s.trim()); break; }
    }
  }
  return [...new Set(hits)].slice(0, 12);
}

/**
 * Read an article the way an editor would and report everything that needs a
 * human decision. Returns { slug, title, findings: [{label, items[]}], count }.
 * Nothing here rewrites content — sanitizeContent already applied the
 * unambiguous corrections; this is the "needs Chad's eyes" list.
 */
export function reviewArticle({ slug, title = '', html = '', excerpt = '' }) {
  const text = stripTags(html);
  const findings = [];
  const add = (label, items) => { if (items.length) findings.push({ label, items }); };

  add('Credential / affiliation claim not on the approved list',
    sentencesMatching(text, CREDENTIAL_PATTERNS));
  add('Warranty, guarantee or lifespan claim',
    sentencesMatching(text, WARRANTY_PATTERNS));
  add('Absolute promise word',
    sentencesMatching(text, ABSOLUTE_PATTERNS));
  add('Hazard mention — check the caution wording (2\u20133 sentences, no regulation citations)',
    sentencesMatching(text, HAZARD_PATTERNS));
  add('Scraping / sanding / washing / biocide instruction — check the safety wording',
    sentencesMatching(text, SAFETY_PATTERNS));
  add('Phone number or street address — must match 705-787-1401 / 836 Greer Road, Port Sydney',
    sentencesMatching(text, CONTACT_PATTERNS));

  const towns = TOWNS.filter((t) => new RegExp(`\\b${t}\\b`, 'i').test(text));
  add('Town names mentioned (retired areas must not appear)', towns);

  // Meta description vs body: every content word of the summary should have
  // some support in the article.
  if (excerpt) {
    const stop = new Set(['the','and','for','with','that','this','from','your','you','our','are','can','how','why','what','when','will','into','more','than','their','them','they','has','have','its','not','but','all','any','about','over','under','most','been','also']);
    const words = stripTags(excerpt).toLowerCase().match(/[a-z]{4,}/g) || [];
    const lower = text.toLowerCase();
    const orphans = [...new Set(words.filter((w) => !stop.has(w) && !lower.includes(w)))];
    if (orphans.length) {
      add('Meta description claims not found in the body', [
        `summary: "${stripTags(excerpt)}"`,
        `unsupported terms: ${orphans.join(', ')}`,
      ]);
    }
  }

  const count = findings.reduce((n, f) => n + f.items.length, 0);
  return { slug, title, findings, count };
}

/** Render the per-article checklist that goes into the pull request body. */
export function renderReviewReport(reviews, edits = []) {
  const lines = [];
  lines.push('Automated import from the Soro embed feed. **Do not auto-merge.**');
  lines.push('');
  lines.push('## Verdict');
  for (const r of reviews) {
    lines.push(`- **${r.slug}** — ${r.count === 0 ? 'CLEAN' : `${r.count} item${r.count === 1 ? '' : 's'} need a human read`}`);
  }
  lines.push('');
  lines.push('Approved credential list (`scripts/lib/approved-credentials.mjs`): ' + APPROVED_CREDENTIALS.join('; ') + '.');
  if (PENDING_CREDENTIALS.length) {
    lines.push('Pending / NOT approved: ' + PENDING_CREDENTIALS.join('; ') + '.');
  }
  lines.push('');
  for (const r of reviews) {
    lines.push(`## ${r.title || r.slug}`);
    lines.push(`\`src/data/blog/posts/${r.slug}.ts\``);
    lines.push('');
    if (!r.findings.length) {
      lines.push('- [x] CLEAN — nothing flagged.');
      lines.push('');
      continue;
    }
    for (const f of r.findings) {
      lines.push(`- [ ] **${f.label}**`);
      for (const item of f.items) lines.push(`  - ${item}`);
    }
    lines.push('');
  }
  if (edits.length) {
    lines.push('## Automated corrections already applied');
    for (const e of [...new Set(edits)]) lines.push(`- ${e}`);
    lines.push('');
  }
  lines.push('## Canonical warranty wording');
  lines.push('');
  lines.push('Long form: ' + WARRANTY_LONG);
  lines.push('');
  lines.push('Short form: ' + WARRANTY_SHORT);
  return lines.join('\n');
}
