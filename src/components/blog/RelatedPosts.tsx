import React from 'react';
import { Link } from 'react-router-dom';
import { BlogFeedItem } from '@/hooks/useBlogFeed';

interface RelatedPostsProps {
  currentSlug: string;
  currentTags: string[];
  allPosts: BlogFeedItem[];
}

/**
 * Shows up to 3 related blog posts based on shared tags.
 * Reduces bounce rate and increases pages-per-session (key SEO signal).
 */
const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentSlug, currentTags, allPosts }) => {
  const scored = allPosts
    .filter(p => p.slug !== currentSlug)
    .map(post => {
      const shared = post.tags?.filter(t => currentTags.includes(t)).length || 0;
      return { post, score: shared };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (scored.length === 0) return null;

  return (
    <aside className="mt-12 pt-8 border-t border-border" aria-label="Related articles">
      <h3 className="text-lg font-bold text-foreground mb-6">You Might Also Like</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {scored.map(({ post }) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-colors"
          >
            {post.image && (
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}
            <div className="p-3">
              <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">{post.readingTime} min read</p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default RelatedPosts;
