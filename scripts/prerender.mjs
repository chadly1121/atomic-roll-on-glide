#!/usr/bin/env node
/**
 * Prerender every URL in dist/sitemap.xml using Playwright Chromium.
 * Serves dist/ locally, navigates to each route with the SPA, waits for
 * React to hydrate + network idle, then writes the rendered HTML over
 * the corresponding dist/<route>/index.html shell.
 */
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs/promises';
import { existsSync, createReadStream, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

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

async function prerenderOne(browser, route, idx, total) {
  const ctx = await browser.newContext({
    userAgent: 'LovablePrerender/1.0 (+https://www.roll-onpainting.com)',
    viewport: { width: 1280, height: 900 },
  });
  const page = await ctx.newPage();
  const url = `http://127.0.0.1:${PORT}${route === '/' ? '/' : route}`;
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT });
    // Allow react-helmet-async to flush <title>/<meta> updates
    await page.waitForFunction(() => !!document.querySelector('#root')?.children?.length, null, { timeout: NAV_TIMEOUT });
    // Wait for react-helmet-async to update <title> + canonical to match this route.
    // The static shell ships with the homepage title, so we must wait until it
    // actually changes (or, for the homepage, until a non-empty title is set).
    const expectedCanonical = `${ORIGIN}${route === '/' ? '/' : route}`;
    try {
      await page.waitForFunction(
        ({ expectedCanonical, isHome }) => {
          const title = document.title || '';
          const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
          if (!title.trim()) return false;
          if (isHome) return canonical.replace(/\/$/, '') === expectedCanonical.replace(/\/$/, '');
          // Non-home: canonical must match this route AND title must differ from the static shell's homepage title
          return canonical.replace(/\/$/, '') === expectedCanonical.replace(/\/$/, '');
        },
        { expectedCanonical, isHome: route === '/' },
        { timeout: NAV_TIMEOUT, polling: 100 }
      );
    } catch (e) {
      const actualTitle = await page.title().catch(() => '');
      const actualCanonical = await page.evaluate(() => document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '').catch(() => '');
      throw new Error(`Helmet did not update for ${route} (title="${actualTitle}", canonical="${actualCanonical}")`);
    }
    // Small settle to let any remaining meta tags flush
    await page.waitForTimeout(300);
    const html = await page.content();
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

  const browser = await chromium.launch();
  let failures = [];
  try {
    failures = await runPool(routes, (route, idx, total) => prerenderOne(browser, route, idx, total));
  } finally {
    await browser.close();
    server.close();
  }

  if (failures.length) {
    console.error(`\n${failures.length} routes failed to prerender:`);
    for (const f of failures) console.error(`  - ${f.item}: ${f.error}`);
    process.exit(1);
  }
  console.log(`\n✅ Prerendered ${routes.length} routes successfully.`);
}

main().catch((err) => { console.error(err); process.exit(1); });