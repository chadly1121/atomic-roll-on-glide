import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GallerySection from '@/components/GallerySection';
import { businessInfo } from '@/data/businessInfo';
import { Link } from 'react-router-dom';

const PortfolioPage: React.FC = () => {
  const siteUrl = "https://www.roll-onpainting.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": `${siteUrl}/portfolio`,
    "name": "Portfolio | Roll On Painting | Muskoka",
    "description": "Browse our gallery of completed painting projects across Muskoka. Interior, exterior, commercial, and specialty finishes.",
    "isPartOf": { "@id": `${siteUrl}/#website` },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
        { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": `${siteUrl}/portfolio` }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Portfolio | Painting Projects Gallery | Roll On Painting Muskoka</title>
        <meta name="description" content="Browse Roll On Painting's portfolio of completed projects in Muskoka. Interior, exterior, commercial, epoxy, and GoNano coating projects. See our quality firsthand." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}/portfolio`} />
        <meta property="og:title" content="Portfolio | Roll On Painting Muskoka" />
        <meta property="og:description" content="See our completed painting projects across Muskoka — interior, exterior, commercial, and specialty coatings." />
        <meta property="og:url" content={`${siteUrl}/portfolio`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar activeSection="portfolio" />
        
        <main className="pt-16">
          <section className="bg-gradient-to-b from-atomic-navy to-atomic-navy/90 text-white py-16 md:py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Browse our completed projects across Muskoka. From cozy cottage interiors to large commercial buildings, see the quality Roll On Painting delivers.
              </p>
            </div>
          </section>

          <GallerySection />

          <section className="py-16 bg-atomic-navy text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Like What You See?</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Let us transform your property next. Get a free, no-obligation quote today.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-8 py-3 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors">
                Request a Free Quote
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PortfolioPage;
