#!/usr/bin/env node
// Pings IndexNow (Bing/Yandex/etc.) with all URLs from public/sitemap.xml
// after a successful deploy.
import { readFileSync } from 'node:fs';

const KEY = '12159a5b1ca245f796d0ee9910394b5a';
const HOST = 'www.roll-onpainting.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = 'public/sitemap.xml';
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const BATCH_SIZE = 10000; // IndexNow allows up to 10k per request

function extractUrls(xml) {
  const matches = xml.match(/<loc>\s*([^<\s]+)\s*<\/loc>/g) || [];
  return matches
    .map((m) => m.replace(/<\/?loc>/g, '').trim())
    .filter((u) => u.includes(HOST));
}

async function ping(urls) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const text = await res.text().catch(() => '');
  console.log(`IndexNow → ${res.status} ${res.statusText} (${urls.length} URLs)`);
  if (text) console.log(text.slice(0, 500));
  // 200 = accepted, 202 = accepted/pending. Anything else: warn but don't fail deploy.
  if (res.status !== 200 && res.status !== 202) {
    console.warn(`⚠️  Non-success status from IndexNow: ${res.status}`);
  }
}

async function main() {
  const xml = readFileSync(SITEMAP_PATH, 'utf8');
  const urls = extractUrls(xml);
  if (urls.length === 0) {
    console.error('No URLs found in sitemap.xml');
    process.exit(0); // don't fail deploy
  }
  console.log(`Submitting ${urls.length} URLs to IndexNow for ${HOST}`);
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    await ping(urls.slice(i, i + BATCH_SIZE));
  }
  console.log('✓ IndexNow ping complete');
}

main().catch((err) => {
  console.error('IndexNow ping failed:', err);
  // Don't fail the deploy on IndexNow errors
  process.exit(0);
});
