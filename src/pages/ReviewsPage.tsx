import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialsSection from '@/components/TestimonialsSection';
import { businessInfo } from '@/data/businessInfo';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const ReviewsPage: React.FC = () => {
  const siteUrl = "https://www.roll-onpainting.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": `${siteUrl}/reviews`,
    "name": "Reviews | Roll On Painting | Muskoka",
    "description": `Read verified Google reviews from Roll On Painting customers. ${businessInfo.ratings.average}/5 average rating.`,
    "isPartOf": { "@id": `${siteUrl}/#website` },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
        { "@type": "ListItem", "position": 2, "name": "Reviews", "item": `${siteUrl}/reviews` }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>{`Customer Reviews | Roll On Painting | ${businessInfo.ratings.average}/5 on Google`}</title>
        <meta name="description" content={`Read verified customer reviews of Roll On Painting. Rated ${businessInfo.ratings.average}/5 on Google. Muskoka homeowners trust us for interior, exterior, and specialty painting.`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}/reviews`} />
        <meta property="og:title" content="Customer Reviews | Roll On Painting Muskoka" />
        <meta property="og:description" content={`${businessInfo.ratings.average}/5 rated by Muskoka families. Read what our customers say.`} />
        <meta property="og:url" content={`${siteUrl}/reviews`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar activeSection="reviews" />
        
        <main className="pt-16">
          <section className="bg-gradient-to-b from-atomic-navy to-atomic-navy/90 text-white py-16 md:py-20">
            <div className="container mx-auto px-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-4">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Customer Reviews</h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Rated {businessInfo.ratings.average}/5 on Google. Read what Muskoka homeowners and businesses say about working with Roll On Painting.
              </p>
            </div>
          </section>

          <TestimonialsSection />

          <section className="py-12 bg-muted/50">
            <div className="container mx-auto px-4 text-center max-w-2xl">
              <h2 className="text-2xl font-bold text-atomic-navy mb-4">Leave Us a Review</h2>
              <p className="text-muted-foreground mb-6">
                Had a great experience with Roll On Painting? We'd love to hear about it. Your feedback helps us improve and helps other Muskoka homeowners find quality painters.
              </p>
              <a 
                href="https://g.page/r/CTad7LzFXozZEAE/review" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-6 py-3 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors"
              >
                Write a Google Review
              </a>
            </div>
          </section>

          <section className="py-16 bg-atomic-navy text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">Join our list of happy customers. Get a free quote today.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-8 py-3 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors">
                Get a Free Quote
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ReviewsPage;
