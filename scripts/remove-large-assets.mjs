import { rm, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { readdir } from 'node:fs/promises';

const distDir = join(process.cwd(), 'dist');
const maxCloudflareAssetSize = 25 * 1024 * 1024;
const blockedExtensions = new Set(['.mp4', '.mov', '.m4v', '.avi']);

async function walk(dir) {
  let entries = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return fullPath;
  }));

  return files.flat();
}

const files = await walk(distDir);
const removed = [];

for (const file of files) {
  const fileStat = await stat(file);
  const extension = extname(file).toLowerCase();
  if (blockedExtensions.has(extension) || fileStat.size >= maxCloudflareAssetSize) {
    await rm(file, { force: true });
    removed.push(`${file.replace(`${process.cwd()}/`, '')} (${(fileStat.size / 1024 / 1024).toFixed(1)} MiB)`);
  }
}

if (removed.length) {
  console.log('Removed Cloudflare Pages-incompatible assets:');
  for (const file of removed) console.log(`- ${file}`);
}