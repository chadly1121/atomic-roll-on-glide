import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useBlogFeed, BlogFeedItem } from '@/hooks/useBlogFeed';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { FileText, RefreshCw } from 'lucide-react';
import { businessInfo } from '@/data/businessInfo';

const SoroBlogEmbed = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.trysoro.com/api/embed/f969f1b1-59f3-4676-8ab4-1b0322f585cc';
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="text-2xl font-bold mb-6">More from our team</h2>
      <div id="soro-blog"></div>
    </section>
  );
};

const ITEMS_PER_PAGE = 12;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

function truncate(text: string, len = 160) {
  if (!text) return '';
  return text.length > len ? text.slice(0, len).trimEnd() + '…' : text;
}

const BlogCardSkeleton = () => (
  <div className="rounded-xl overflow-hidden bg-card shadow-sm">
    <Skeleton className="h-48 w-full" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
);

const BlogCard = ({ item }: { item: BlogFeedItem }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      to={`/blog/${item.slug}`}
      className="group rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
    >
      {item.image && !imgError && (
        <div className="h-48 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center text-xs text-muted-foreground mb-2 gap-3">
          <span>{formatDate(item.date_published)}</span>
          <span>·</span>
          <span>{item.readingTime} min read</span>
        </div>
        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-snug">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {truncate(item.summary)}
        </p>
      </div>
    </Link>
  );
};

const BlogPage = () => {
  const { items, loading, error, retry } = useBlogFeed();
  const [visible, setVisible] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const siteUrl = "https://www.roll-onpainting.com";
  const ogImage = "https://res.cloudinary.com/dxqfou8jh/image/upload/f_auto,q_80,w_1200/v1745866797/IMG_20190920_121835_fchin4.jpg";

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteUrl}/blog/#blog`,
    "name": "Roll On Painting Blog",
    "description": "Painting tips, trends, color advice, and project showcases from Roll On Painting in Muskoka.",
    "url": `${siteUrl}/blog`,
    "publisher": { "@id": `${siteUrl}/#organization` },
    "inLanguage": "en-CA"
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Painting Tips & Blog | Roll On Painting Muskoka</title>
        <meta name="description" content="Painting tips, color trends, and project showcases from Roll On Painting in Muskoka. Expert advice for homeowners and cottage owners." />
        <link rel="canonical" href={`${siteUrl}/blog`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Painting Tips & Blog | Roll On Painting" />
        <meta property="og:description" content="Expert painting tips, color trends, and project showcases from Muskoka's premier painting service." />
        <meta property="og:url" content={`${siteUrl}/blog`} />
        <meta property="og:site_name" content={businessInfo.name} />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:image" content={ogImage} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Painting Tips & Blog | Roll On Painting" />
        <meta name="twitter:description" content="Expert painting advice from Muskoka's premier painting service." />
        <meta name="twitter:image" content={ogImage} />
        
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>

      <Navbar activeSection="blog" />

      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <h1 className="section-heading mb-2">Our Blog</h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Read our latest articles about painting tips, trends, and project showcases.
              </p>
            </div>

            {loading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (<BlogCardSkeleton key={i} />))}
              </div>
            )}

            {error && !loading && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <RefreshCw size={48} className="text-muted-foreground mb-4" />
                <h2 className="text-xl font-bold mb-2">Couldn't load articles</h2>
                <p className="text-muted-foreground mb-6">Please try again.</p>
                <Button onClick={retry} className="flex items-center gap-2"><RefreshCw size={16} />Retry</Button>
              </div>
            )}

            {!loading && !error && items.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <FileText size={64} className="text-muted-foreground mb-6" />
                <h2 className="text-2xl font-bold mb-2">Articles are on the way!</h2>
                <p className="text-muted-foreground">Check back soon.</p>
              </div>
            )}

            {!loading && !error && items.length > 0 && (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.slice(0, visible).map((item) => (<BlogCard key={item.id} item={item} />))}
                </div>
                {visible < items.length && (
                  <div className="flex justify-center mt-10">
                    <Button variant="outline" size="lg" onClick={() => setVisible((v) => v + ITEMS_PER_PAGE)}>Load More</Button>
                  </div>
                )}
              </>
            )}

            <SoroBlogEmbed />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
