import { useCallback, useMemo } from 'react';
import { blogPostsMeta } from '@/data/blog';
import type { BlogPostMeta, BlogAuthor } from '@/data/blog/types';

export type BlogFeedAuthor = BlogAuthor;

/**
 * Metadata for one post. Article bodies are NOT part of this object — they are
 * code-split per post and loaded with `loadPostContent(slug)` from
 * `@/data/blog/content`, so the blog index never ships any article text.
 */
export type BlogFeedItem = BlogPostMeta;

/**
 * Blog data source: code-as-content via `src/data/blog/`.
 * To publish a new post, add an entry to `src/data/blog/index.ts` and a body
 * file under `src/data/blog/posts/`. `scripts/sync-soro.mjs` does this
 * automatically for newly published Soro articles.
 */
export function useBlogFeed() {
  const items = useMemo<BlogFeedItem[]>(() => {
    return [...blogPostsMeta].sort(
      (a, b) =>
        new Date(b.date_published).getTime() - new Date(a.date_published).getTime()
    );
  }, []);

  const getBySlug = useCallback(
    (slug: string) => items.find((item) => item.slug === slug) || null,
    [items]
  );

  const retry = useCallback(() => {}, []);

  return { items, loading: false, error: null as string | null, retry, getBySlug };
}
