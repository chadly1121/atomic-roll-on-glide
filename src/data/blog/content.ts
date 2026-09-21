/**
 * Article bodies, code-split.
 *
 * Every file in ./posts exports one article's HTML as a default string. Vite
 * emits each one as its own chunk, so a visitor downloads exactly the article
 * they opened — the blog index and the homepage never load any article text.
 */
const modules = import.meta.glob<{ default: string }>('./posts/*.ts');

const cache = new Map<string, string>();

export async function loadPostContent(slug: string): Promise<string> {
  const cached = cache.get(slug);
  if (cached !== undefined) return cached;

  const loader = modules[`./posts/${slug}.ts`];
  if (!loader) return '';

  const mod = await loader();
  const html = mod.default || '';
  cache.set(slug, html);
  return html;
}

export function hasPostContent(slug: string): boolean {
  return Boolean(modules[`./posts/${slug}.ts`]);
}
