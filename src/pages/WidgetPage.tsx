import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WidgetPage = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const el = iframeRef.current;
    if (el && !el.getAttribute('data-loaded')) {
      el.setAttribute('data-loaded', 'true');
      const doc = el.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`<!DOCTYPE html>
<html><head><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}</style>
</head><body>
<script src="https://contractorapp-tfvsmcyb.manus.space/api/widget.js?id=1" data-mode="catalog"><\/script>
</body></html>`);
        doc.close();
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Book Services | Roll On Painting Muskoka</title>
        <meta name="description" content="Browse and book Roll On Painting services online. Transparent pricing with instant booking." />
      </Helmet>

      <Navbar activeSection="" />

      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Book Our Services
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our services and book online — simple, transparent pricing.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <iframe
          ref={iframeRef}
          src="about:blank"
          style={{ width: '100%', minHeight: '700px', border: 'none' }}
          title="Service Catalog Widget"
        />
      </section>

      <Footer />
    </div>
  );
};

export default WidgetPage;
