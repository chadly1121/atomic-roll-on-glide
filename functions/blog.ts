/**
 * Cloudflare Pages Function for exactly one path: /blog
 * (public/_routes.json `include` is ["/blog"] — nothing else reaches Functions).
 *
 * Legacy article URLs were /blog?post=<slug>. _redirects cannot match query
 * strings, so this function 301s a known slug to /blog/<slug>. Every other
 * request (no `post` param, unknown slug) is passed through untouched via
 * next(), so /blog keeps serving the prerendered index exactly as before.
 *
 * Slugs come from the blog source of truth (src/data/blog/index.ts), so this
 * list cannot drift from the real posts.
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
    const post = new URL(request.url).searchParams.get('post');
    if (post) {
      const slug = post.trim().replace(/^\/+|\/+$/g, '');
      if (KNOWN_SLUGS.has(slug)) {
        return new Response(null, {
          status: 301,
          headers: { Location: `${ORIGIN}/blog/${slug}` },
        });
      }
    }
  } catch {
    /* never break /blog — fall through to the static page */
  }
  return next();
};
