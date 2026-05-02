#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const ORIGIN = 'https://www.roll-onpainting.com';
const [distArg = 'dist-prerendered', routeArg = '/interior-painting'] = process.argv.slice(2);
const distDir = path.resolve(distArg);
const route = routeArg.startsWith('/') ? routeArg : `/${routeArg}`;
const htmlPath = path.join(distDir, route.replace(/^\//, ''), 'index.html');
const expectedCanonical = `${ORIGIN}${route}`;

function pick(html, regex) {
  const match = html.match(regex);
  return match ? match[1].trim() : '';
}

const html = await fs.readFile(htmlPath, 'utf8');
const title = pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
const canonical =
  pick(html, /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
  pick(html, /<link[^>]+href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);

if (!title || /Muskoka House Painting|Roll On Painting/i.test(title)) {
  throw new Error(`${route} still has the homepage/raw shell title: "${title}"`);
}

if (canonical.replace(/\/$/, '') !== expectedCanonical.replace(/\/$/, '')) {
  throw new Error(`${route} canonical mismatch: expected "${expectedCanonical}", got "${canonical}"`);
}

console.log(`✓ Deploy source verified: ${path.relative(process.cwd(), htmlPath)} — "${title}" — ${canonical}`);