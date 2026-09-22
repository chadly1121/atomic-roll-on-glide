#!/usr/bin/env node
/**
 * Incremental ingestion of Soro-published articles into the local blog CMS.
 *
 *   bun scripts/sync-soro.mjs          # ingest anything new
 *   bun scripts/sync-soro.mjs --dry    # report only, write nothing
 *
 * For each article in the embed manifest that has no file in
 * src/data/blog/posts/ it will:
 *   1. download the body and run the content scan (corrections + hard stops)
 *   1b. run the editorial review and record findings for the pull request body
 *   2. download the featured image into public/lovable-uploads/blog/
 *   3. write src/data/blog/posts/<slug>.ts
 *   4. add the metadata entry to src/data/blog/index.ts
 *   5. add the URL to public/sitemap.xml and POSTS in
 *      supabase/functions/blog-sitemap/index.ts
 *
 * Idempotent: running it twice changes nothing, and an existing post file is
 * never overwritten, so hand edits survive. Exits non-zero on any fetch
 * failure or on an article that trips a content hard stop.
 */
import {
  fetchManifest, fetchArticleBody, sanitizeContent, generateTags, generateKeywords,
  readingTimeOf, downloadImage, postFileExists, writePostFile, appendToIndex,
  addToSitemap, addToEdgeSitemap, AUTHOR, SITE_URL, reviewArticle, renderReviewReport,
} from './lib/soro.mjs';
import fs from 'node:fs/promises';

// Where the pull-request body is written. The workflow points this at a temp
// file and feeds it to create-pull-request via body-path.
const REVIEW_FILE = process.env.SORO_REVIEW_FILE || '.soro-review.md';

const DRY = process.argv.includes('--dry');

const manifest = await fetchManifest();
console.log(`Embed manifest: ${manifest.length} articles`);

const pending = [];
for (const a of manifest) {
  if (await postFileExists(a.slug)) continue;
  pending.push(a);
}

if (!pending.length) {
  console.log('Nothing new — every article already has a post file.');
  process.exit(0);
}
console.log(`New articles: ${pending.length}`);

const entries = [];
const allEdits = [];
const blockers = [];
const reviews = [];

for (const a of pending) {
  const raw = await fetchArticleBody(a.id);
  const { html, edits, blockers: b } = sanitizeContent(raw, a.slug);
  allEdits.push(...edits);
  blockers.push(...b);
  if (b.length) continue;

  // Read the article before anything is written, and record what a human
  // still needs to check. Findings never block the import; they go into the
  // pull request body as a checklist.
  reviews.push(reviewArticle({ slug: a.slug, title: a.title, html, excerpt: a.excerpt }));

  const tags = generateTags(a.title, html);
  const image = DRY ? a.image : await downloadImage(a.image, a.slug);
  const published = new Date(a.isoDate).toISOString();

  entries.push({
    id: `soro-${a.id}`,
    slug: a.slug,
    title: a.title,
    summary: a.excerpt,
    image,
    url: `${SITE_URL}/blog/${a.slug}`,
    tags,
    date_published: published,
    date_modified: published,
    authors: [AUTHOR],
    language: 'en-CA',
    readingTime: readingTimeOf(html),
    _seo: {
      meta_description: a.excerpt,
      meta_keywords: generateKeywords(tags, a.title),
    },
    _html: html,
  });
}

if (blockers.length) {
  console.error('\nContent hard stops — these articles were NOT imported:');
  for (const b of blockers) console.error('  - ' + b);
}

if (DRY) {
  console.log(`\n[dry run] would import ${entries.length} articles`);
  for (const e of entries) console.log(`  ${e.slug} [${e.tags.join(', ')}]`);
  if (allEdits.length) { console.log('\n[dry run] content edits:'); allEdits.forEach((e) => console.log('  - ' + e)); }
  process.exit(blockers.length ? 1 : 0);
}

await fs.writeFile(REVIEW_FILE, renderReviewReport(reviews, allEdits) + '\n', 'utf8');
console.log(`Review report written to ${REVIEW_FILE}`);

for (const e of entries) await writePostFile(e.slug, e._html);
const indexed = await appendToIndex(entries.map(({ _html, ...m }) => m));
const mapped = await addToSitemap(entries);
const edged = await addToEdgeSitemap(entries);

console.log(`\nImported ${entries.length} article(s):`);
for (const e of entries) console.log(`  + ${e.slug} (${e.readingTime} min, tags: ${e.tags.join(', ') || 'none'})`);
console.log(`Index entries added: ${indexed}; sitemap URLs added: ${mapped}; edge sitemap entries added: ${edged}`);
if (allEdits.length) {
  console.log('\nContent edits applied:');
  for (const e of [...new Set(allEdits)]) console.log('  - ' + e);
}
process.exit(blockers.length ? 1 : 0);
