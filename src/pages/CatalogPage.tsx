import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { catalogCategories, CatalogItem } from '../data/catalogData';

const CatalogCard = ({ item }: { item: CatalogItem }) => (
  <div
    className={`relative rounded-2xl border p-6 sm:p-8 shadow-md transition-all hover:shadow-xl hover:-translate-y-1 bg-card ${
      item.popular
        ? 'border-primary ring-2 ring-primary/30'
        : 'border-border'
    }`}
  >
    {item.popular && (
      <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-full tracking-wide uppercase">
        Most Popular
      </div>
    )}

    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
      {item.title}
    </h3>

    <div className="flex flex-wrap items-baseline gap-3 mb-4">
      <span className="text-3xl sm:text-4xl font-extrabold text-primary">
        {item.price}
      </span>
      {item.duration && (
        <span className="text-sm text-muted-foreground font-medium">
          / {item.duration}
        </span>
      )}
      {item.coverage && (
        <span className="text-sm text-muted-foreground font-medium">
          · {item.coverage}
        </span>
      )}
    </div>

    <div className="mb-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        What's included
      </p>
      <ul className="space-y-2">
        {item.includes.map((inc, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
            <svg
              className="w-4 h-4 mt-0.5 text-primary flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {inc}
          </li>
        ))}
      </ul>
    </div>

    {item.excludes && item.excludes.length > 0 && (
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Not included
        </p>
        <ul className="space-y-2">
          {item.excludes.map((exc, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-muted-foreground/60 flex-shrink-0">✕</span>
              {exc}
            </li>
          ))}
        </ul>
      </div>
    )}

    {item.note && (
      <p className="text-xs text-muted-foreground italic border-t border-border pt-3 mt-3">
        {item.note}
      </p>
    )}

    <a
      href="/#contact"
      className="mt-5 w-full py-3 text-center rounded-full font-semibold block transition-colors min-h-[48px] flex items-center justify-center active:scale-95 text-sm sm:text-base bg-primary text-primary-foreground hover:bg-primary/90"
    >
      Book Now
    </a>
  </div>
);

const CatalogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Service Catalog & Pricing | Roll On Painting</title>
        <meta
          name="description"
          content="Browse our fixed-price service catalog — painter for a day, power washing, roof washing, and GoNano roof protection. Transparent pricing, no surprises."
        />
      </Helmet>

      <Navbar activeSection="" />

      {/* Hero banner */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Service Catalog
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent pricing for our most popular services. No hidden
            fees — what you see is what you pay.
          </p>
        </div>
      </section>

      {/* Category sections */}
      <div className="container mx-auto px-4 pb-20 space-y-16 sm:space-y-24">
        {catalogCategories.map((cat) => (
          <section key={cat.id} id={cat.id}>
            <div className="mb-8 sm:mb-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl" aria-hidden="true">
                  {cat.icon}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {cat.title}
                </h2>
              </div>
              <p className="text-muted-foreground max-w-xl">
                {cat.description}
              </p>
            </div>

            <div
              className={`grid gap-6 sm:gap-8 ${
                cat.items.length === 1
                  ? 'max-w-lg'
                  : cat.items.length === 2
                  ? 'sm:grid-cols-2 max-w-3xl'
                  : 'sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {cat.items.map((item) => (
                <CatalogCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Need something custom?
          </h2>
          <p className="text-muted-foreground mb-6">
            These are our most popular packages, but every project is unique.
            Reach out for a free, no-obligation custom quote.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors min-h-[48px] active:scale-95"
          >
            Get a Free Quote
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CatalogPage;
