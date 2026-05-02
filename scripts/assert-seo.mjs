#!/usr/bin/env node
/**
 * SEO + AI assertions on the prerendered dist/ directory.
 * Fails the build if:
 *  - Any sample page is missing <title>, <meta name="description">, or <link rel="canonical">
 *  - Titles, descriptions, or canonicals are duplicated across sample pages
 *  - dist/llms.txt has fewer than 1,800 words
 *  - dist/llms-full.txt has fewer than 3,800 words
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(process.env.DIST_DIR || path.join(__dirname, '..', 'dist'));

const MIN_LLMS = 1800;
const MIN_LLMS_FULL = 3800;

// Representative sample of route → file path
const SAMPLE_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/gonano',
  '/blog',
  '/interior-painting',
  '/exterior-painting',
  '/cabinet-refinishing',
  '/painters-bracebridge',
  '/painters-port-carling',
  '/cottage-painting-muskoka',
  '/exterior-painting-gravenhurst',
  '/forest-hill-muskoka-cottage-painting',
  '/blog/sansin-exterior-stains-decks-docks-muskoka',
];

function routeToFile(route) {
  if (route === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, route.replace(/^\//, ''), 'index.html');
}

function pick(html, regex) {
  const m = html.match(regex);
  return m ? m[1].trim() : '';
}

function extractMeta(html) {
  const title = pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const desc =
    pick(html, /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
    pick(html, /<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const canonical =
    pick(html, /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
    pick(html, /<link[^>]+href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  return { title, desc, canonical };
}

export { extractMeta, routeToFile };

function wordCount(s) {
  return (s.trim().match(/\S+/g) || []).length;
}

const errors = [];
const warnings = [];
const seen = { title: new Map(), desc: new Map(), canonical: new Map() };

for (const route of SAMPLE_ROUTES) {
  const file = routeToFile(route);
  let html;
  try {
    html = await fs.readFile(file, 'utf8');
  } catch {
    errors.push(`Missing prerendered HTML for ${route} (expected ${path.relative(DIST, file)})`);
    continue;
  }
  const { title, desc, canonical } = extractMeta(html);

  if (!title) errors.push(`${route}: missing <title>`);
  if (!desc) errors.push(`${route}: missing meta description`);
  if (!canonical) errors.push(`${route}: missing canonical link`);

  for (const [field, value] of [['title', title], ['desc', desc], ['canonical', canonical]]) {
    if (!value) continue;
    const map = seen[field];
    if (map.has(value)) {
      errors.push(
        `Duplicate ${field} between ${map.get(value)} and ${route}: "${value.slice(0, 80)}${value.length > 80 ? '…' : ''}"`
      );
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
    if (wc < min) {
      errors.push(`dist/${file} has ${wc} words (minimum ${min})`);
    } else {
      console.log(`✓ dist/${file}: ${wc} words (≥ ${min})`);
    }
  } catch {
    errors.push(`dist/${file} is missing`);
  }
}

if (errors.length) {
  console.error('\n❌ SEO/AI assertions failed:');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}

console.log(`\n✅ All SEO + AI assertions passed across ${SAMPLE_ROUTES.length} sample routes.`);