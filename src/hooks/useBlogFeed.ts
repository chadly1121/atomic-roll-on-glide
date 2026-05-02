import { useCallback, useMemo } from 'react';
import { localBlogPosts } from '@/data/localBlogPosts';

export interface BlogFeedAuthor {
  name: string;
  url?: string;
}

export interface BlogFeedItem {
  id: string;
  title: string;
  summary: string;
  content_html: string;
  image: string;
  url: string;
  tags: string[];
  date_published: string;
  date_modified: string;
  authors: BlogFeedAuthor[];
  language: string;
  _seo?: {
    meta_description?: string;
    meta_keywords?: string[];
  };
  // computed
  slug: string;
  readingTime: number;
}

function extractSlug(url: string, id: string): string {
  try {
    const parts = url.split('/').filter(Boolean);
    if (parts.length > 0) {
      return parts[parts.length - 1];
    }
  } catch {}
  return id;
}

function calcReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Blog data source: code-as-content via `src/data/localBlogPosts.ts`.
 * To publish a new post, add an entry to that file and deploy.
 */
export function useBlogFeed() {
  const items = useMemo<BlogFeedItem[]>(() => {
    return localBlogPosts
      .map((p) => ({ ...p, readingTime: calcReadingTime(p.content_html || '') }))
      .sort(
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
