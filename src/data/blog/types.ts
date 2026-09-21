export interface BlogAuthor {
  name: string;
  url?: string;
}

/**
 * Everything the blog index, cards, related posts and head tags need.
 * Deliberately excludes the article body — that lives in ./posts/<slug>.ts
 * and is loaded on demand by ./content.ts.
 */
export interface BlogPostMeta {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image: string;
  url: string;
  tags: string[];
  date_published: string;
  date_modified: string;
  authors: BlogAuthor[];
  language: string;
  readingTime: number;
  _seo?: {
    meta_description?: string;
    meta_keywords?: string[];
  };
}
