#!/usr/bin/env node
/**
 * Strict SEO + AI assertions on the prerendered dist/ directory.
 * Fails the build if any check fails.
 *
 * Per priority route:
 *  - index.html exists
 *  - <title> exists, unique across the sample
 *  - <meta name="description"> exists, unique across the sample
 *  - <link rel="canonical"> exists, unique, self-references the route on
 *    https://www.roll-onpainting.com (no trailing /)
 *  - <h1> exists with non-empty text
 *  - body has real rendered content (>500 chars after stripping script/style/tags)
 *
 * llms.txt   ≥ 1,800 words
 * llms-full.txt ≥ 3,800 words
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRIORITY_ROUTES, CANONICAL_ORIGIN, UNLISTED_ROUTES } from './seo-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(process.env.DIST_DIR || path.join(__dirname, '..', 'dist'));

const MIN_LLMS = 1800;
const MIN_LLMS_FULL = 3800;
const MIN_BODY_CHARS = 500;

function routeToFile(route) {
  if (route === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, route.replace(/^\//, ''), 'index.html');
}

function pick(html, regex) {
  const m = html.match(regex);
  return m ? m[1].trim() : '';
}
function pickAll(html, regex) {
  return [...html.matchAll(regex)].map(m => m[1]?.trim()).filter(Boolean);
}

function extractMeta(html) {
  const title = pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const desc =
    pick(html, /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
    pick(html, /<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const canonical =
    pick(html, /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
    pick(html, /<link[^>]+href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  // Count tags to detect Helmet-duplication bugs
  const titleCount = (html.match(/<title[\s>]/gi) || []).length;
  const descCount = pickAll(html, /<meta[^>]+name=["']description["'][^>]*>/gi).length || (html.match(/name=["']description["']/gi) || []).length;
  const canonicalCount = (html.match(/rel=["']canonical["']/gi) || []).length;
  const h1 = pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, '').trim();
  // Strip script/style/tags for body content count
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyInner = bodyMatch ? bodyMatch[1] : '';
  const bodyText = bodyInner
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return { title, desc, canonical, titleCount, descCount, canonicalCount, h1, bodyLen: bodyText.length };
}

function expectedCanonicalFor(route) {
  return route === '/' ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${route}`;
}

function normalizeCanonical(c) {
  return c.replace(/\/$/, '');
}

function wordCount(s) {
  return (s.trim().match(/\S+/g) || []).length;
}

const errors = [];
const seen = { title: new Map(), desc: new Map(), canonical: new Map() };

for (const route of PRIORITY_ROUTES) {
  const file = routeToFile(route);
  let html;
  try { html = await fs.readFile(file, 'utf8'); }
  catch { errors.push(`Missing prerendered HTML for ${route} (expected ${path.relative(DIST, file)})`); continue; }

  const m = extractMeta(html);

  if (!m.title) errors.push(`${route}: missing <title>`);
  if (!m.desc) errors.push(`${route}: missing meta description`);
  if (!m.canonical) errors.push(`${route}: missing canonical link`);
  if (!m.h1) errors.push(`${route}: missing or empty <h1>`);
  if (m.bodyLen < MIN_BODY_CHARS) errors.push(`${route}: body content too short (${m.bodyLen} chars, min ${MIN_BODY_CHARS}) — likely empty CSR shell`);

  if (m.titleCount > 1) errors.push(`${route}: ${m.titleCount} <title> tags (expected 1)`);
  if (m.canonicalCount > 1) errors.push(`${route}: ${m.canonicalCount} canonical tags (expected 1)`);

  // Canonical self-reference + correct origin
  if (m.canonical) {
    if (!m.canonical.startsWith(CANONICAL_ORIGIN)) {
      errors.push(`${route}: canonical "${m.canonical}" does not use ${CANONICAL_ORIGIN}`);
    } else if (normalizeCanonical(m.canonical) !== normalizeCanonical(expectedCanonicalFor(route))) {
      errors.push(`${route}: canonical "${m.canonical}" should be "${expectedCanonicalFor(route)}"`);
    }
  }

  // Cross-route uniqueness
  for (const [field, value] of [['title', m.title], ['desc', m.desc], ['canonical', m.canonical]]) {
    if (!value) continue;
    const map = seen[field];
    if (map.has(value)) {
      errors.push(`Duplicate ${field} between ${map.get(value)} and ${route}: "${value.slice(0, 80)}${value.length > 80 ? '…' : ''}"`);
    } else {
      map.set(value, route);
    }
  }
}

// ---------------------------------------------------------------------------
// Router <-> sitemap parity.
//
// WHY THIS EXISTS: scripts/prerender.mjs takes its route list from
// sitemap.xml and nothing else. A route registered in src/App.tsx but missing
// from public/sitemap.xml is therefore never prerendered, no
// /<route>/index.html is emitted, no `200!` override is written into
// public/_redirects — and public/404.html then takes precedence over the SPA
// fallback on Cloudflare Pages. The result is a page that works perfectly in
// dev and returns 404 in production. That has happened twice.
//
// TO FIX A FAILURE: add the URL to public/sitemap.xml (the normal case), or,
// only if the page genuinely must never be crawled, add the route to
// UNLISTED_ROUTES in scripts/seo-routes.mjs with a comment saying why.
// ---------------------------------------------------------------------------
const ROOT = path.join(__dirname, '..');
let routerRoutes = [];
try {
  const appSrc = await fs.readFile(path.join(ROOT, 'src', 'App.tsx'), 'utf8');
  let parent = '';
  for (const m of appSrc.matchAll(/path=["']([^"']+)["']/g)) {
    const p = m[1];
    if (p === '*') continue;
    if (p.startsWith('/')) {
      parent = p;
      routerRoutes.push(p);
    } else {
      // Relative path — a child of the most recent absolute route.
      routerRoutes.push(`${parent.replace(/\/$/, '')}/${p}`);
    }
  }
  routerRoutes = [...new Set(routerRoutes)];
  if (routerRoutes.length < 10) errors.push(`Router parse found only ${routerRoutes.length} routes in src/App.tsx — the parser is probably broken`);
} catch (e) {
  errors.push(`Could not parse routes from src/App.tsx: ${e.message}`);
}

let sitemapRoutes = [];
try {
  const sitemapXml = await fs.readFile(path.join(ROOT, 'public', 'sitemap.xml'), 'utf8');
  sitemapRoutes = [...sitemapXml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
    .map(m => m[1].replace(CANONICAL_ORIGIN, ''))
    .map(u => (u === '' ? '/' : u.replace(/\/$/, '') || '/'));
} catch (e) {
  errors.push(`Could not read public/sitemap.xml: ${e.message}`);
}
const sitemapSet = new Set(sitemapRoutes);

for (const route of routerRoutes) {
  if (UNLISTED_ROUTES.has(route)) continue;
  if (sitemapSet.has(route)) continue;
  errors.push(
    `Route "${route}" is registered in src/App.tsx but is NOT in public/sitemap.xml. ` +
    `It will not be prerendered, so public/404.html wins over the SPA fallback on Cloudflare Pages ` +
    `and the page returns 404 in production (while working fine in dev). ` +
    `Fix: add it to public/sitemap.xml, or add it to UNLISTED_ROUTES in scripts/seo-routes.mjs if it must never be crawled.`
  );
}

// Reverse: every sitemap URL must be served by some route.
const staticRouteSet = new Set(routerRoutes);
const hasSlugRoute = routerRoutes.includes('/:slug');
const hasBlogSlugRoute = routerRoutes.includes('/blog/:slug');
for (const url of sitemapSet) {
  if (staticRouteSet.has(url)) continue;
  const segments = url.split('/').filter(Boolean);
  if (segments.length === 1 && hasSlugRoute) continue;              // /<service-or-town>
  if (segments.length === 2 && segments[0] === 'blog' && hasBlogSlugRoute) continue;
  errors.push(
    `public/sitemap.xml lists "${url}" but no route in src/App.tsx matches it. ` +
    `Crawlers and the prerenderer will both hit the catch-all and the URL will 404. ` +
    `Fix: remove it from public/sitemap.xml, or add the route in src/App.tsx.`
  );
}
if (routerRoutes.length) console.log(`✓ router/sitemap parity: ${routerRoutes.length} routes in src/App.tsx, ${sitemapSet.size} sitemap URLs`);

// ---------------------------------------------------------------------------
// Internal links inside blog article bodies must resolve to a real route.
// A dead link in a published article should break the build, not sit there.
// ---------------------------------------------------------------------------
try {
  const postsDir2 = path.join(ROOT, 'src', 'data', 'blog', 'posts');
  const files = (await fs.readdir(postsDir2)).filter(f => f.endsWith('.ts'));
  let checked = 0;
  for (const f of files) {
    const src = await fs.readFile(path.join(postsDir2, f), 'utf8');
    for (const m of src.matchAll(/href=["']([^"']+)["']/g)) {
      let href = m[1].trim();
      if (/^(mailto:|tel:|#)/i.test(href)) continue;
      if (/^https?:\/\//i.test(href)) {
        if (!href.startsWith(CANONICAL_ORIGIN)) continue;           // external link
        href = href.slice(CANONICAL_ORIGIN.length) || '/';
      }
      if (!href.startsWith('/')) continue;
      const clean = href.split(/[?#]/)[0].replace(/\/$/, '') || '/';
      checked++;
      if (staticRouteSet.has(clean)) continue;
      const segs = clean.split('/').filter(Boolean);
      if (segs.length === 1 && hasSlugRoute && sitemapSet.has(clean)) continue;
      if (segs.length === 2 && segs[0] === 'blog' && hasBlogSlugRoute && sitemapSet.has(clean)) continue;
      errors.push(
        `Dead internal link in src/data/blog/posts/${f}: "${href}" matches no route in src/App.tsx ` +
        `and is not a prerendered URL in public/sitemap.xml — readers get a 404. ` +
        `Fix: repoint it at a real page, or remove the link.`
      );
    }
  }
  console.log(`✓ blog internal links: ${checked} hrefs checked across ${files.length} posts`);
} catch (e) {
  errors.push(`Blog internal link check failed: ${e.message}`);
}


// Blog sitemap sync: every post body file in src/data/blog/posts/ must be
// listed in public/sitemap.xml and in the metadata index, and the sitemap must
// not list a blog URL with no post.
// Prevents silent 404s on real posts (they only get prerendered if in sitemap).
try {
  const postsDir = path.join(__dirname, '..', 'src', 'data', 'blog', 'posts');
  const postSlugs = new Set(
    (await fs.readdir(postsDir)).filter(f => f.endsWith('.ts')).map(f => f.replace(/\.ts$/, ''))
  );
  const indexSrc = await fs.readFile(path.join(__dirname, '..', 'src', 'data', 'blog', 'index.ts'), 'utf8');
  const indexSlugs = new Set(
    [...indexSrc.matchAll(/^\s*slug:\s*'([^']+)'/gm)].map(m => m[1])
  );
  const sitemapXml = await fs.readFile(path.join(__dirname, '..', 'public', 'sitemap.xml'), 'utf8');
  const sitemapSlugs = new Set(
    [...sitemapXml.matchAll(/<loc>[^<]*\/blog\/([^<\/]+)<\/loc>/g)].map(m => m[1])
  );
  for (const s of postSlugs) {
    if (!sitemapSlugs.has(s)) errors.push(`public/sitemap.xml is missing blog post /blog/${s} (a body file exists in src/data/blog/posts/) — it would not be prerendered and would 404`);
    if (!indexSlugs.has(s)) errors.push(`src/data/blog/index.ts has no metadata entry for /blog/${s} (body file exists) — the post would never render`);
  }
  for (const s of sitemapSlugs) {
    if (!postSlugs.has(s)) errors.push(`public/sitemap.xml lists /blog/${s} but src/data/blog/posts/${s}.ts does not exist`);
  }
  for (const s of indexSlugs) {
    if (!postSlugs.has(s)) errors.push(`src/data/blog/index.ts lists /blog/${s} but src/data/blog/posts/${s}.ts does not exist`);
  }
  if (postSlugs.size === 0) errors.push('No blog post files found in src/data/blog/posts/');
  else console.log(`✓ sitemap.xml + blog index in sync with src/data/blog/posts/ (${postSlugs.size} posts)`);
} catch (e) {
  errors.push(`Blog sitemap sync check failed: ${e.message}`);
}


// llms.txt word counts

for (const [file, min] of [['llms.txt', MIN_LLMS], ['llms-full.txt', MIN_LLMS_FULL]]) {
  const p = path.join(DIST, file);
  try {
    const txt = await fs.readFile(p, 'utf8');
    const wc = wordCount(txt);
    if (wc < min) errors.push(`dist/${file} has ${wc} words (minimum ${min})`);
    else console.log(`✓ dist/${file}: ${wc} words (≥ ${min})`);
  } catch { errors.push(`dist/${file} is missing`); }
}

if (errors.length) {
  console.error('\n❌ SEO/AI assertions failed:');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`\n✅ All SEO + AI assertions passed across ${PRIORITY_ROUTES.length} priority routes.`);
