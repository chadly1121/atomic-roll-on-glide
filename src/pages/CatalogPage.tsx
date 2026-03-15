import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { catalogCategories, CatalogItem } from '../data/catalogData';
import { businessInfo } from '@/data/businessInfo';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CatalogCard = ({
  item,
  onBook,
}: {
  item: CatalogItem;
  onBook: (item: CatalogItem) => void;
}) => (
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
      <span className="text-sm text-muted-foreground font-medium">+ HST</span>
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

    <button
      onClick={() => onBook(item)}
      className="mt-5 w-full py-3 text-center rounded-full font-semibold block transition-colors min-h-[48px] flex items-center justify-center active:scale-95 text-sm sm:text-base bg-primary text-primary-foreground hover:bg-primary/90"
    >
      {item.isPerSqFt ? 'Book Now' : 'Book Now'}
    </button>
  </div>
);

const CatalogPage = () => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    sqft: '',
  });

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location.hash]);

  const handleBook = (item: CatalogItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
    setForm({ name: '', email: '', phone: '', address: '', sqft: '' });
  };

  const handleCheckout = async () => {
    if (!selectedItem) return;
    if (!form.name || !form.email || !form.phone) {
      toast.error('Please fill in all fields');
      return;
    }
    if (selectedItem.isPerSqFt && (!form.sqft || parseInt(form.sqft) < 100)) {
      toast.error('Please enter a valid roof size (minimum 100 sq ft)');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId: selectedItem.stripePriceId,
          serviceName: selectedItem.title,
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          quantity: selectedItem.isPerSqFt ? parseInt(form.sqft) : 1,
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

    const siteUrl = 'https://www.roll-onpainting.com';
    const catalogSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Service Catalog & Pricing | Roll On Painting",
      "description": "Browse fixed-price painting, power washing, roof washing, and GoNano nanotechnology packages. Transparent pricing with instant online booking.",
      "url": `${siteUrl}/catalog`,
      "isPartOf": { "@type": "WebSite", "url": siteUrl },
      "provider": {
        "@type": "LocalBusiness",
        "name": businessInfo.name,
        "telephone": businessInfo.phone.primary,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": businessInfo.address.street,
          "addressLocality": businessInfo.address.city,
          "addressRegion": businessInfo.address.region,
          "postalCode": businessInfo.address.postalCode,
          "addressCountry": businessInfo.address.countryCode
        }
      }
    };

    return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Service Catalog & Pricing | Roll On Painting Muskoka</title>
        <meta
          name="description"
          content="Browse our fixed-price service catalog — painter for a day, power washing, roof washing, and GoNano roof protection. Transparent pricing with instant online booking."
        />
        <link rel="canonical" href={`${siteUrl}/catalog`} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Service Catalog & Pricing | Roll On Painting" />
        <meta property="og:description" content="Fixed-price painting, washing, and GoNano nanotechnology packages. Transparent pricing, instant online booking." />
        <meta property="og:url" content={`${siteUrl}/catalog`} />
        <meta property="og:site_name" content={businessInfo.name} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Service Catalog & Pricing | Roll On Painting" />
        <meta name="twitter:description" content="Fixed-price painting, washing, and GoNano nanotechnology packages. Transparent pricing, instant online booking." />
        
        <script type="application/ld+json">{JSON.stringify(catalogSchema)}</script>
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
                <CatalogCard key={item.id} item={item} onBook={handleBook} />
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
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors min-h-[48px] active:scale-95"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>

      <Footer />

      {/* Checkout Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book {selectedItem?.title}</DialogTitle>
            <DialogDescription>
              Enter your details and you'll be redirected to secure checkout.
              We'll contact you within 24 hours to schedule.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label htmlFor="checkout-name">Full Name</Label>
              <Input
                id="checkout-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Smith"
              />
            </div>
            <div>
              <Label htmlFor="checkout-email">Email</Label>
              <Input
                id="checkout-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="checkout-phone">Phone</Label>
              <Input
                id="checkout-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="(416) 555-1234"
              />
            </div>
            {selectedItem?.isPerSqFt && (
              <>
                <div>
                  <Label htmlFor="checkout-sqft">Estimated Roof Size (sq ft)</Label>
                  <Input
                    id="checkout-sqft"
                    type="number"
                    min="100"
                    value={form.sqft}
                    onChange={(e) => setForm({ ...form, sqft: e.target.value })}
                    placeholder="e.g. 1500"
                  />
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-xs text-amber-800">
                    <strong>📏 Transparency guarantee:</strong> We will verify your roof size with a precise measurement before any work begins. If the actual size differs from your estimate, we'll adjust the price accordingly — you only pay for what's accurate.
                  </p>
                </div>
              </>
            )}
            <div className="flex items-baseline gap-2 bg-muted/50 p-3 rounded-lg">
              <span className="text-2xl font-bold text-primary">
                {selectedItem?.isPerSqFt && form.sqft
                  ? `$${(parseFloat(selectedItem.price.replace(/[^0-9.]/g, '')) * parseInt(form.sqft)).toLocaleString('en-CA', { minimumFractionDigits: 2 })}`
                  : selectedItem?.price}
              </span>
              {selectedItem?.isPerSqFt && form.sqft ? (
                <span className="text-sm text-muted-foreground">
                  estimated · {form.sqft} sq ft × {selectedItem.price.replace('From ', '')}
                </span>
              ) : selectedItem?.duration ? (
                <span className="text-sm text-muted-foreground">
                  / {selectedItem.duration}
                </span>
              ) : null}
            </div>
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full py-3 rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors min-h-[48px] active:scale-95 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Proceed to Payment'}
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Secure checkout powered by Stripe
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CatalogPage;
