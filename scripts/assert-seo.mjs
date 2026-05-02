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
import { PRIORITY_ROUTES, CANONICAL_ORIGIN } from './seo-routes.mjs';

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
