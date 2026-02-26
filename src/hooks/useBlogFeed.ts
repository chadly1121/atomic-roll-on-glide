import { useState, useEffect, useCallback, useRef } from 'react';

const FEED_URL = 'https://getautoseo.com/feeds/11478/2BAyrFT4mJ27iBtqKG5KC5XTe9wE9K8FMjrMA4C10ok.json';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

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

interface FeedCache {
  items: BlogFeedItem[];
  fetchedAt: number;
}

let globalCache: FeedCache | null = null;

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

function processItems(rawItems: any[]): BlogFeedItem[] {
  return rawItems
    .map((item: any) => ({
      ...item,
      tags: item.tags || [],
      authors: item.authors || [],
      _seo: item._seo || {},
      slug: extractSlug(item.url || '', item.id),
      readingTime: calcReadingTime(item.content_html || ''),
    }))
    .sort((a: BlogFeedItem, b: BlogFeedItem) =>
      new Date(b.date_published).getTime() - new Date(a.date_published).getTime()
    );
}

export function useBlogFeed() {
  const [items, setItems] = useState<BlogFeedItem[]>(globalCache?.items || []);
  const [loading, setLoading] = useState(!globalCache);
  const [error, setError] = useState<string | null>(null);
  const fetchingRef = useRef(false);

  const fetchFeed = useCallback(async (force = false) => {
    if (fetchingRef.current) return;
    if (!force && globalCache && Date.now() - globalCache.fetchedAt < CACHE_TTL) {
      setItems(globalCache.items);
      setLoading(false);
      return;
    }

    fetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(FEED_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const processed = processItems(data.items || []);
      globalCache = { items: processed, fetchedAt: Date.now() };
      setItems(processed);
    } catch (err: any) {
      console.error('Blog feed fetch error:', err);
      setError(err.message || 'Failed to load articles');
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const retry = useCallback(() => fetchFeed(true), [fetchFeed]);

  const getBySlug = useCallback(
    (slug: string) => items.find((item) => item.slug === slug) || null,
    [items]
  );

  return { items, loading, error, retry, getBySlug };
}
