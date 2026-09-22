#!/usr/bin/env node
/**
 * Write a plain SPA-shell HTML file for every route in SHELL_ROUTES.
 *
 * WHY THIS EXISTS: on Cloudflare Pages a custom public/404.html takes
 * precedence over the SPA fallback for any path with no matching file in the
 * build output. A path with a real file returns 200; a path without one gets
 * 404.html. That is why /services (prerendered, real file) works and /login
 * (no file) returned 404 in production even with a forcing
 * `/login /index.html 200!` rule deployed.
 *
 * This gives those routes a real file, using the same mechanism that already
 * keeps 50 blog posts and every service page alive.
 *
 * These are NOT prerendered pages: no browser is launched, no authenticated UI
 * is rendered, nothing is added to the sitemap. The file is a byte-for-byte
 * copy of dist/index.html with a noindex robots meta injected, so React boots
 * and routes client-side exactly as it does today.
 *
 * Output layout matches the prerenderer (dist/<route>/index.html) so the
 * existing _redirects override generation and _routes.json patterns need no
 * special-casing.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SHELL_ROUTES } from './seo-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(process.env.DIST_DIR || path.join(__dirname, '..', 'dist'));

const ROBOTS_TAG = '<meta name="robots" content="noindex, nofollow">';

// Build marker. A single `curl https://www.roll-onpainting.com/login | grep
// spa-shell` tells us whether a deploy carrying these shells actually landed.
// Without it, a failed deploy and a failed fix look identical from outside,
// because these shells contain no other build-specific content.
export const MARKER_PREFIX = '<!-- spa-shell';
function buildMarker() {
  const sha =
    process.env.GITHUB_SHA ||
    process.env.CF_PAGES_COMMIT_SHA ||
    process.env.COMMIT_SHA ||
    'local';
  return `${MARKER_PREFIX} build=${new Date().toISOString()} sha=${String(sha).slice(0, 12)} -->`;
}

export function shellRouteToFile(route, dist = DIST) {
  return path.join(dist, route.replace(/^\//, ''), 'index.html');
}

function addNoindex(html) {
  // Drop any existing robots meta so we cannot end up with two conflicting ones.
  const stripped = html.replace(
    /<meta\b[^>]*\bname=["']robots["'][^>]*\/?>(?:\s*<\/meta>)?/gi,
    ''
  );
  const marker = buildMarker();
  if (/<head[^>]*>/i.test(stripped)) {
    return stripped.replace(/<head([^>]*)>/i, `<head$1>\n    ${ROBOTS_TAG}\n    ${marker}`);
  }
  return `${ROBOTS_TAG}\n${marker}\n` + stripped;
}

export async function writeSpaShells(dist = DIST) {
  const shellSource = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
  const html = addNoindex(shellSource);
  const written = [];
  for (const route of SHELL_ROUTES) {
    const out = shellRouteToFile(route, dist);
    await fs.mkdir(path.dirname(out), { recursive: true });
    await fs.writeFile(out, html, 'utf8');
    written.push(path.relative(dist, out));
  }
  return written;
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  try {
    const written = await writeSpaShells();
    console.log(`✓ Wrote ${written.length} SPA shell files (noindex, not prerendered):`);
    for (const f of written) console.log(`  - dist/${f}`);
  } catch (e) {
    console.error(`✗ Could not write SPA shells: ${e.message}`);
    process.exit(1);
  }
}
