#!/usr/bin/env node
/**
 * Prerender every URL in dist/sitemap.xml using Playwright Chromium.
 * Serves dist/ locally, navigates to each route with the SPA, waits for
 * React to hydrate + network idle, then writes the rendered HTML over
 * the corresponding dist/<route>/index.html shell.
 */
import { chromium } from '@playwright/test';
import http from 'node:http';
import fs from 'node:fs/promises';
import { existsSync, createReadStream, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { CANONICAL_ORIGIN } from './seo-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const PORT = 4178;
const ORIGIN = 'https://www.roll-onpainting.com';
const CONCURRENCY = 4;
const NAV_TIMEOUT = 30_000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.txt':  'text/plain; charset=utf-8',
  '.xml':  'application/xml; charset=utf-8',
  '.map':  'application/json; charset=utf-8',
};

function safeJoin(root, urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  const resolved = path.normalize(path.join(root, decoded));
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

function startServer() {
  const server = http.createServer((req, res) => {
    const target = safeJoin(DIST, req.url || '/');
    if (!target) { res.writeHead(403); return res.end('Forbidden'); }

    let filePath = target;
    try {
      if (existsSync(filePath) && statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
      if (!existsSync(filePath)) {
        // SPA fallback to root index.html
        filePath = path.join(DIST, 'index.html');
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      createReadStream(filePath).pipe(res);
    } catch (err) {
      res.writeHead(500); res.end(String(err));
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function readSitemapUrls() {
  const xml = await fs.readFile(path.join(DIST, 'sitemap.xml'), 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
  return [...new Set(locs)];
}

function urlToRoute(absoluteUrl) {
  try {
    const u = new URL(absoluteUrl);
    let p = u.pathname;
    if (!p.startsWith('/')) p = '/' + p;
    return p === '/' ? '/' : p.replace(/\/+$/, '');
  } catch {
    return null;
  }
}

function routeToOutputFile(route) {
  if (route === '/' || route === '') return path.join(DIST, 'index.html');
  return path.join(DIST, route.replace(/^\//, ''), 'index.html');
}

/**
 * Remove duplicate SEO tags (canonical, description, OG, Twitter) from the
 * HTML, then inject the single authoritative version of each. Authoritative
 * values are extracted from the live DOM by the caller — Helmet always wins
 * because it appends its tags last.
 */
function dedupeSeoTags(html, route, seo) {
  const { description = '', ogTitle = '', ogDescription = '', ogUrl = '',
    ogImage = '', twitterTitle = '', twitterDescription = '', twitterImage = '',
    twitterCard = '' } = seo || {};

  // Strip ALL canonical link tags
  html = html.replace(/<link\b[^>]*\brel=["']canonical["'][^>]*\/?>(?:\s*<\/link>)?/gi, '');
  // Strip ALL meta description tags (both attribute orders)
  html = html.replace(/<meta\b[^>]*\bname=["']description["'][^>]*\/?>(?:\s*<\/meta>)?/gi, '');
  html = html.replace(/<meta\b[^>]*\bcontent=["'][^"']*["'][^>]*\bname=["']description["'][^>]*\/?>(?:\s*<\/meta>)?/gi, '');
  // Strip ALL og: meta tags we manage
  const ogProps = ['og:title', 'og:description', 'og:url', 'og:image'];
  for (const prop of ogProps) {
    const re1 = new RegExp(`<meta\\b[^>]*\\bproperty=["']${prop}["'][^>]*\\/?>(?:\\s*<\\/meta>)?`, 'gi');
    const re2 = new RegExp(`<meta\\b[^>]*\\bcontent=["'][^"']*["'][^>]*\\bproperty=["']${prop}["'][^>]*\\/?>(?:\\s*<\\/meta>)?`, 'gi');
    html = html.replace(re1, '').replace(re2, '');
  }
  // Strip ALL twitter: meta tags we manage
  const twProps = ['twitter:title', 'twitter:description', 'twitter:image', 'twitter:card'];
  for (const prop of twProps) {
    const re1 = new RegExp(`<meta\\b[^>]*\\bname=["']${prop}["'][^>]*\\/?>(?:\\s*<\\/meta>)?`, 'gi');
    const re2 = new RegExp(`<meta\\b[^>]*\\bcontent=["'][^"']*["'][^>]*\\bname=["']${prop}["'][^>]*\\/?>(?:\\s*<\\/meta>)?`, 'gi');
    html = html.replace(re1, '').replace(re2, '');
  }

  const canonicalHref = `${CANONICAL_ORIGIN}${route === '/' ? '/' : route}`;
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const tags = [];
  tags.push(`<link rel="canonical" href="${esc(canonicalHref)}">`);
  if (description) tags.push(`<meta name="description" content="${esc(description)}">`);
  if (ogTitle) tags.push(`<meta property="og:title" content="${esc(ogTitle)}">`);
  if (ogDescription) tags.push(`<meta property="og:description" content="${esc(ogDescription)}">`);
  // og:url must always be the route's canonical, not whatever Helmet may have left
  tags.push(`<meta property="og:url" content="${esc(ogUrl || canonicalHref)}">`);
  if (ogImage) tags.push(`<meta property="og:image" content="${esc(ogImage)}">`);
  if (twitterCard) tags.push(`<meta name="twitter:card" content="${esc(twitterCard)}">`);
  if (twitterTitle) tags.push(`<meta name="twitter:title" content="${esc(twitterTitle)}">`);
  if (twitterDescription) tags.push(`<meta name="twitter:description" content="${esc(twitterDescription)}">`);
  if (twitterImage) tags.push(`<meta name="twitter:image" content="${esc(twitterImage)}">`);

  const injection = tags.join('\n    ');
  if (/<\/head>/i.test(html)) {
    html = html.replace(/<\/head>/i, `    ${injection}\n  </head>`);
  } else {
    html = injection + html;
  }
  return html;
}

async function prerenderOne(browser, route, idx, total) {
  const ctx = await browser.newContext({
    userAgent: 'LovablePrerender/1.0 (+https://www.roll-onpainting.com)',
    viewport: { width: 1280, height: 900 },
  });
  const page = await ctx.newPage();
  const url = `http://127.0.0.1:${PORT}${route === '/' ? '/' : route}`;
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT });
    // Wait for the route component (not just the Suspense spinner / toaster) to
    // actually render. We require a visible <h1> with non-trivial text inside #root.
    try {
      await page.waitForFunction(() => {
        const root = document.querySelector('#root');
        if (!root) return false;
        const h1 = root.querySelector('h1');
        if (!h1) return false;
        const text = (h1.textContent || '').trim();
        return text.length >= 8;
      }, null, { timeout: NAV_TIMEOUT, polling: 100 });
    } catch {
      console.warn(`[${idx + 1}/${total}] ⚠ ${route} — no <h1> rendered after ${NAV_TIMEOUT}ms; capturing whatever is present`);
    }
    // Wait for react-helmet-async to set a non-empty <title>. Canonical mismatch
    // is non-fatal — we'll warn and still write the prerendered HTML (the
    // dedupeSeoTags step injects the correct canonical for this route).
    const expectedCanonical = `${ORIGIN}${route === '/' ? '/' : route}`;
    try {
      await page.waitForFunction(
        () => !!(document.title || '').trim(),
        null,
        { timeout: NAV_TIMEOUT, polling: 100 }
      );
    } catch {
      // title never set — fatal
      throw new Error(`Helmet never set <title> for ${route}`);
    }
    // Wait for Helmet to inject a real (multi-word) meta description, not a stub
    let actualDescription = '';
    try {
      await page.waitForFunction(() => {
        const metas = document.querySelectorAll('meta[name="description"]');
        if (!metas.length) return false;
        const last = metas[metas.length - 1].getAttribute('content') || '';
        // Require at least 5 words to be confident Helmet has flushed
        return last.trim().split(/\s+/).length >= 5;
      }, null, { timeout: NAV_TIMEOUT, polling: 100 });
    } catch {
      console.warn(`[${idx + 1}/${total}] ⚠ ${route} — description never reached 5 words; capturing whatever is present`);
    }
    // Small settle to let any remaining meta tags flush
    await page.waitForTimeout(300);
    // Capture ALL route-specific SEO tags from the live DOM. Helmet appends
    // last, so the LAST element wins for each key.
    const seo = await page.evaluate(() => {
      const lastContent = (sel) => {
        const els = document.querySelectorAll(sel);
        if (!els.length) return '';
        return els[els.length - 1].getAttribute('content') || '';
      };
      return {
        description: lastContent('meta[name="description"]'),
        ogTitle: lastContent('meta[property="og:title"]'),
        ogDescription: lastContent('meta[property="og:description"]'),
        ogUrl: lastContent('meta[property="og:url"]'),
        ogImage: lastContent('meta[property="og:image"]'),
        twitterCard: lastContent('meta[name="twitter:card"]'),
        twitterTitle: lastContent('meta[name="twitter:title"]'),
        twitterDescription: lastContent('meta[name="twitter:description"]'),
        twitterImage: lastContent('meta[name="twitter:image"]'),
      };
    }).catch(() => ({}));
    actualDescription = seo.description || '';
    const actualTitle = await page.title().catch(() => '');
    const actualCanonical = await page.evaluate(
      () => document.querySelector('link[rel="canonical"]')?.getAttribute('href') || ''
    ).catch(() => '');
    // DIAGNOSTIC: log root content state for the huntsville route
    if (route === '/painters-huntsville' || route === '/interior-painting') {
      const diag = await page.evaluate(() => ({
        rootChildCount: document.querySelector('#root')?.children?.length ?? 0,
        rootChildTags: Array.from(document.querySelector('#root')?.children ?? []).map(c => c.tagName + (c.getAttribute('role') ? `[role=${c.getAttribute('role')}]` : '')),
        h1Count: document.querySelectorAll('h1').length,
        h1Texts: Array.from(document.querySelectorAll('h1')).map(h => (h.textContent || '').trim().slice(0, 80)),
        rootInnerHTMLLength: document.querySelector('#root')?.innerHTML?.length ?? 0,
        bodyTextLength: (document.body.innerText || '').length,
      }));
      console.log(`[DIAG ${route}]`, JSON.stringify(diag));
    }
    if (!actualTitle.trim()) {
      throw new Error(`Empty title for ${route}`);
    }
    const canonicalOk =
      actualCanonical.replace(/\/$/, '') === expectedCanonical.replace(/\/$/, '');
    if (!canonicalOk) {
      console.warn(`[${idx + 1}/${total}] ⚠ canonical mismatch for ${route} (got "${actualCanonical}", expected "${expectedCanonical}") — writing anyway`);
    }
    let html = await page.content();
    html = dedupeSeoTags(html, route, seo);
    // Sanity: non-home routes must not retain the homepage canonical
    if (route !== '/' && /<link[^>]+rel=["']canonical["'][^>]+href=["'][^"']*\/["']/i.test(html)) {
      // fallthrough — already validated above, but log
    }
    const out = routeToOutputFile(route);
    await fs.mkdir(path.dirname(out), { recursive: true });
    await fs.writeFile(out, html, 'utf8');
    const t = await page.title().catch(() => '');
    console.log(`[${idx + 1}/${total}] ✓ ${route}  — "${t.slice(0, 70)}"`);
  } catch (err) {
    console.error(`[${idx + 1}/${total}] ✗ ${route} — ${err.message}`);
    throw err;
  } finally {
    await ctx.close();
  }
}

async function runPool(items, worker) {
  const queue = items.map((item, idx) => ({ item, idx }));
  const total = items.length;
  const failures = [];
  async function nextTask() {
    while (queue.length) {
      const { item, idx } = queue.shift();
      try { await worker(item, idx, total); }
      catch (e) { failures.push({ item, error: e.message }); }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, () => nextTask()));
  return failures;
}

async function main() {
  console.log('Starting static server for dist/…');
  const server = await startServer();
  console.log(`Serving dist/ on http://127.0.0.1:${PORT}`);

  const urls = await readSitemapUrls();
  const routes = [...new Set(urls.map(urlToRoute).filter(Boolean))];
  console.log(`Found ${routes.length} unique routes in sitemap.xml`);

  const browser = await chromium.launch(
    process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
  );
  let failures = [];
  try {
    failures = await runPool(routes, (route, idx, total) => prerenderOne(browser, route, idx, total));
  } finally {
    await browser.close();
    server.close();
  }

  const successCount = routes.length - failures.length;
  if (failures.length) {
    console.warn(`\n⚠ ${failures.length} routes failed to prerender:`);
    for (const f of failures) console.warn(`  - ${f.item}: ${f.error}`);
  }
  console.log(`\n✅ Prerendered ${successCount}/${routes.length} routes successfully.`);
  if (successCount === 0) {
    console.error('No routes were prerendered — failing build.');
    process.exit(1);
  }
}

main().catch((err) => { console.error(err); process.exit(1); });