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
const canonical =
  pick(html, /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
  pick(html, /<link[^>]+href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);

const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
const bodyInner = bodyMatch ? bodyMatch[1] : '';
const bodyText = bodyInner
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

if (bodyText.length <= 500) {
  throw new Error(`${route} appears unrendered: only ${bodyText.length} chars of text inside <body> (expected > 500)`);
}

if (canonical.replace(/\/$/, '') !== expectedCanonical.replace(/\/$/, '')) {
  throw new Error(`${route} canonical mismatch: expected "${expectedCanonical}", got "${canonical}"`);
}

console.log(`✓ Deploy source verified: ${path.relative(process.cwd(), htmlPath)} — ${bodyText.length} chars rendered — ${canonical}`);