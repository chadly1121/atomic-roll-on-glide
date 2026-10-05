/**
 * Cloudflare Pages middleware. public/_routes.json `include` limits it to
 * /blog, /blog/ and /blog/* (FUNCTION_ROUTES in scripts/generate-redirects.mjs);
 * nothing else on the site reaches Functions.
 *
 * Legacy article URLs were /blog?post=<slug>. Pages 308s /blog to /blog/
 * (keeping the query string), so both forms are handled here. A known slug
 * gets a 301 to the canonical trailing-slash URL; everything else — no
 * `post` param, unknown slug, any /blog/<slug>/ page — passes through
 * untouched via next().
 *
 * Slugs come from src/data/blog/index.ts, the blog source of truth.
 */
import { blogPostsMeta } from '../src/data/blog/index';

const ORIGIN = 'https://www.roll-onpainting.com';
const KNOWN_SLUGS = new Set(blogPostsMeta.map((p) => p.slug));

interface Ctx {
  request: Request;
  next: () => Promise<Response>;
}

export const onRequest = async ({ request, next }: Ctx): Promise<Response> => {
  try {
    const url = new URL(request.url);
    if (url.pathname === '/blog' || url.pathname === '/blog/') {
      const post = url.searchParams.get('post');
      const slug = post?.trim().replace(/^\/+|\/+$/g, '');
      if (slug && KNOWN_SLUGS.has(slug)) {
        return new Response(null, {
          status: 301,
          headers: { Location: `${ORIGIN}/blog/${slug}/` },
        });
      }
    }
  } catch {
    /* never break the blog — fall through to the static page */
  }
  return next();
};
