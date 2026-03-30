import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useBlogFeed } from '@/hooks/useBlogFeed';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileQuestion } from 'lucide-react';
import { businessInfo } from '@/data/businessInfo';
import BlogServiceLinks from '@/components/blog/BlogServiceLinks';
import RelatedPosts from '@/components/blog/RelatedPosts';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { items, loading, getBySlug } = useBlogFeed();
  const post = getBySlug(slug || '');
  const [imgError, setImgError] = useState(false);
  const siteUrl = businessInfo.urls.website;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Reset img error when slug changes
  useEffect(() => {
    setImgError(false);
  }, [slug]);

  // Make all content links open in new tabs & hide broken images
  useEffect(() => {
    if (!post) return;
    const container = document.querySelector('.blog-prose');
    if (!container) return;
    container.querySelectorAll('a').forEach((a) => {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });
    container.querySelectorAll('img').forEach((img) => {
      img.onerror = () => { img.style.display = 'none'; };
    });
  }, [post, slug]);

  const metaDesc = post?._seo?.meta_description || post?.summary || '';
  const metaKeywords = post?._seo?.meta_keywords?.join(', ') || '';
  const canonicalUrl = `${siteUrl}/blog/${slug}`;

  const jsonLd = post ? {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        image: post.image,
        datePublished: post.date_published,
        dateModified: post.date_modified,
        author: post.authors?.map(a => ({ '@type': 'Person', name: a.name })) || [],
        description: metaDesc,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
        publisher: {
          '@type': 'Organization',
          name: businessInfo.name,
          logo: { '@type': 'ImageObject', url: `${siteUrl}/lovable-uploads/9058a595-b38f-4cdc-893a-19baaccf57d5.webp` }
        },
        inLanguage: 'en-CA',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
        ]
      }
    ]
  } : null;

  return (
    <div className="min-h-screen bg-background">
      {post && (
        <Helmet>
          <title>{post.title} | Roll On Painting</title>
          <meta name="description" content={metaDesc} />
          {metaKeywords && <meta name="keywords" content={metaKeywords} />}
          <link rel="canonical" href={canonicalUrl} />
          <link rel="alternate" hrefLang="en-CA" href={canonicalUrl} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={metaDesc} />
          <meta property="og:image" content={post.image} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:site_name" content={businessInfo.name} />
          <meta property="og:locale" content="en_CA" />
          <meta property="article:published_time" content={post.date_published} />
          <meta property="article:modified_time" content={post.date_modified} />
          {post.authors?.map((a, i) => (
            <meta key={i} property="article:author" content={a.name} />
          ))}
          {post.tags?.map((tag, i) => (
            <meta key={i} property="article:tag" content={tag} />
          ))}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={metaDesc} />
          <meta name="twitter:image" content={post.image} />
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>
      )}

      <Navbar activeSection="blog" />

      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Loading */}
          {loading && (
            <div className="max-w-3xl mx-auto space-y-6">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          )}

          {/* Not found */}
          {!loading && !post && (
            <div className="max-w-3xl mx-auto text-center py-20">
              <FileQuestion size={64} className="mx-auto text-muted-foreground mb-6" />
              <h1 className="text-3xl font-bold mb-3">Article not found</h1>
              <p className="text-muted-foreground mb-8">
                The article you're looking for doesn't exist or may have been removed.
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                <ArrowLeft size={16} />
                Back to all articles
              </Link>
            </div>
          )}

          {/* Article */}
          {!loading && post && (
            <article className="max-w-3xl mx-auto">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium mb-8"
              >
                <ArrowLeft size={16} />
                Back to all articles
              </Link>

              {/* Hero image */}
              {post.image && !imgError && (
                <div className="rounded-xl overflow-hidden mb-8 max-h-[400px]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    style={{ maxHeight: '400px' }}
                    onError={() => setImgError(true)}
                  />
                </div>
              )}

              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-8">
                {post.authors?.length > 0 && (
                  <span>{post.authors.map(a => a.name).join(', ')}</span>
                )}
                <span>{formatDate(post.date_published)}</span>
                <span>{post.readingTime} min read</span>
                {post.tags?.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>

              {/* Content */}
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: post.content_html }}
              />

              {/* Contextual internal links to service pages */}
              <BlogServiceLinks contentHtml={post.content_html} tags={post.tags} />

              {/* Related posts to reduce bounce rate */}
              <RelatedPosts currentSlug={post.slug} currentTags={post.tags || []} allPosts={items} />
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
