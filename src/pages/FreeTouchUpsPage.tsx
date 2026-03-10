import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Heart, Shield, Phone, Star, Paintbrush, RefreshCw, Clock, Calendar, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { businessInfo } from '@/data/businessInfo';
import CallToAction from '@/components/conversion/CallToAction';

const FreeTouchUpsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const siteUrl = 'https://www.roll-onpainting.com';
  const pageUrl = `${siteUrl}/free-touch-ups`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free Touch Ups for Life | Roll On Painting",
    "description": "Roll On Painting offers free touch-ups for life on all painting projects. Learn about our commitment to long-term quality and what's included.",
    "url": pageUrl,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
        { "@type": "ListItem", "position": 2, "name": "Free Touch Ups for Life", "item": pageUrl }
      ]
    }
  };

  const conditions = [
    {
      title: "Painting Services Only",
      description: "Applies to all interior and exterior painting services. Excludes new construction projects."
    },
    {
      title: "Original Work Only",
      description: "Touch-ups apply to surfaces originally painted by Roll On Painting."
    },
    {
      title: "Original Property Owner",
      description: "Valid for the property owner who originally purchased our painting services."
    },
    {
      title: "Same Colour",
      description: "Touch-ups are performed using the same colour as originally applied. We keep your colour records on file."
    },
    {
      title: "No Questions Asked",
      description: "Whether it's a scuff, scratch, or wear — we'll handle it without hassle or complicated explanations."
    }
  ];

  const reasons = [
    {
      icon: <Heart className="h-6 w-6 text-secondary" />,
      title: "We Stand Behind Our Work",
      description: "Quality isn't just about the first coat. We believe our work should look great for years, and we're willing to prove it."
    },
    {
      icon: <Shield className="h-6 w-6 text-secondary" />,
      title: "Peace of Mind",
      description: "Life happens — kids, pets, furniture moves. Knowing your walls can be refreshed at no cost gives you real peace of mind."
    },
    {
      icon: <Star className="h-6 w-6 text-secondary" />,
      title: "Long-Term Relationships",
      description: "We're not a one-and-done company. We build lasting relationships with our clients across Muskoka and beyond."
    },
    {
      icon: <RefreshCw className="h-6 w-6 text-secondary" />,
      title: "It Keeps Your Home Looking Fresh",
      description: "A quick touch-up can make a room look like it was just painted. It's the easiest way to maintain your home's appearance."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Free Touch Ups for Life | Roll On Painting Muskoka</title>
        <meta name="description" content="Roll On Painting offers free touch-ups for life on all painting projects in Muskoka. No questions asked. Learn what's included and why we do it." />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Free Touch Ups for Life | Roll On Painting" />
        <meta property="og:description" content="We offer free touch-ups for life on all painting projects. No questions asked." />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Touch Ups for Life | Roll On Painting" />
        <meta name="twitter:description" content="Free touch-ups for life on all painting projects in Muskoka. No questions asked." />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-secondary/10 via-background to-accent py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="inline-flex items-center gap-2 bg-secondary/15 rounded-full px-4 py-1.5 mb-6">
              <Paintbrush className="h-4 w-4 text-secondary" />
              <span className="text-sm font-semibold text-secondary">Included with Every Painting Project</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Free Touch Ups <span className="text-secondary">for Life</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Every painting project we complete comes with complimentary touch-ups — for as long as you own your property. No fine print. No expiry date.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-20 bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">How It Works</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              It's simple. After we complete your painting project, you're covered for life.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-secondary">1</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">We Paint Your Space</h3>
                <p className="text-sm text-muted-foreground">We complete your painting project using premium paints from Benjamin Moore, Dulux, or PPG.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-secondary">2</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Life Happens</h3>
                <p className="text-sm text-muted-foreground">Scuffs, scratches, dings from moving furniture — normal wear and tear over time.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-secondary">3</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
                <p className="text-sm text-muted-foreground">Give us a call and we'll schedule a free touch-up. No questions asked.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why We Do It */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Why We Offer This</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {reasons.map((reason, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    {reason.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conditions */}
        <section className="py-16 md:py-20 bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">What's Covered</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Our free touch-up program is straightforward. Here are the details:
            </p>
            <div className="space-y-4">
              {conditions.map((condition, index) => (
                <div key={index} className="flex gap-4 p-5 rounded-xl bg-background border border-border">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{condition.title}</h3>
                    <p className="text-sm text-muted-foreground">{condition.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-secondary/10 to-accent">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Get a free quote on your painting project — and enjoy free touch-ups for life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallToAction text="Request a Free Quote" href="/contact" variant="primary" size="lg" />
              <CallToAction text={`Call ${businessInfo.phone.formatted}`} href={`tel:${businessInfo.phone.primary}`} variant="outline" size="lg" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FreeTouchUpsPage;
