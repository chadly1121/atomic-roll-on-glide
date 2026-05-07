import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Home, Paintbrush, UtensilsCrossed, Fence, Sparkles, Building2,
  Image as ImageIcon, Eraser, Construction, Droplets, SprayCan, Hammer, School,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ServiceCard {
  title: string;
  description: string;
  href: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
}

const cards: ServiceCard[] = [
  { title: 'Interior Painting', description: 'Walls, ceilings, trim, and doors finished to a cottage-quality standard.', href: '/interior-painting', image: '/lovable-uploads/interior-modern-cottage-living.webp', icon: Home },
  { title: 'Exterior Painting', description: 'Durable coatings engineered for Muskoka winters, with a 5-year warranty.', href: '/exterior-painting', image: '/lovable-uploads/dad95b14-ad28-4aab-ab8b-05f9a56458ec.webp', icon: Paintbrush },
  { title: 'Cabinet Refinishing', description: 'Factory-quality spray finish, refinished in our Port Sydney prefinishing shop.', href: '/cabinet-refinishing', image: '/lovable-uploads/cabinet-refinish-stock-1.webp', icon: UtensilsCrossed },
  { title: 'Deck & Dock Staining', description: 'Premium stain and full prep for the surfaces that take the worst of the lake.', href: '/deck-staining', image: '/lovable-uploads/8ef8ff98-b72d-4bb2-981c-a2a94dae744a.webp', icon: Fence },
  { title: 'GoNano Coatings', description: 'Permanent hydrophobic nano-coating from $0.99/sq ft. Pairs with most projects.', href: '/gonano', image: '/lovable-uploads/dragons-den-cbc.webp', icon: Sparkles },
  { title: 'Commercial Painting', description: 'Off-hours, on-schedule painting that keeps your business running.', href: '/commercial-painting', image: '/lovable-uploads/033a3727-9412-4815-8892-28a94d347c4b.webp', icon: Building2 },
  { title: 'Wallpaper Installation', description: 'Precision cuts, seamless patterns, walls that look like a designer hung them.', href: '/wallpaper-installation', image: '/lovable-uploads/a71ffb89-e69e-48e3-bf5c-9632a6b728ae.webp', icon: ImageIcon },
  { title: 'Wallpaper Removal', description: 'Old paper, glue, and surface defects taken back to a paint-ready substrate.', href: '/wallpaper-removal', image: '/lovable-uploads/a71ffb89-e69e-48e3-bf5c-9632a6b728ae.webp', icon: Eraser },
  { title: 'Stucco & Popcorn Removal', description: 'Dated textured ceilings removed cleanly and finished smooth.', href: '/stucco-removal', image: '/lovable-uploads/stucco-popcorn-texture.webp', icon: Construction },
  { title: 'Power & Soft Washing', description: 'Dirt, mildew, algae, and pollen washed off siding, decks, and stone.', href: '/power-washing', image: '/lovable-uploads/5d50956e-9da8-4286-b5e3-daa38c6413a5.webp', icon: Droplets },
  { title: 'Spray Finishing', description: 'HVLP and airless spray work for cabinets, trim packages, and millwork.', href: '/spray-finishing', image: '/lovable-uploads/cabinet-refinish-stock-1.webp', icon: SprayCan },
  { title: 'Pre-Finishing', description: 'New construction trim, doors, and panels finished in-shop before install.', href: '/prefinishing', image: '/lovable-uploads/963fb41b-91e9-4c30-9898-38f5beeeb300.webp', icon: Hammer },
  { title: 'Institutional Painting', description: 'Schools, healthcare, municipal — full WSIB and regulatory compliance.', href: '/institutional-painting', image: '/lovable-uploads/d59b04c1-a87c-430a-a6a5-8c28a9fa05d7.webp', icon: School },
];

const ServicesPage: React.FC = () => {
  const siteUrl = 'https://www.roll-onpainting.com';
  const heroImg = '/lovable-uploads/interior-modern-cottage-living.webp';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/services/#webpage`,
        url: `${siteUrl}/services`,
        name: 'Painting Services in Muskoka — Roll On Painting',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#localbusiness` },
      },
      ...cards.map((c) => ({
        '@type': 'Service',
        name: c.title,
        description: c.description,
        url: `${siteUrl}${c.href}`,
        provider: { '@id': `${siteUrl}/#localbusiness` },
        areaServed: { '@type': 'AdministrativeArea', name: 'Muskoka, Ontario, Canada' },
      })),
    ],
  };

  return (
    <>
      <Helmet>
        <title>Painting Services in Muskoka — Roll On Painting</title>
        <meta
          name="description"
          content="Interior, exterior, cottage, cabinet, deck, GoNano coatings, and more. Every painting service Roll On Painting offers across Muskoka. 25+ years, 5x HGTV featured, $5M insured."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}/services`} />
        <meta property="og:title" content="Painting Services in Muskoka — Roll On Painting" />
        <meta property="og:url" content={`${siteUrl}/services`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar activeSection="services" />

        <main className="pt-16">
          {/* Hero */}
          <section
            className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImg})` }}
          >
            <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
            <div className="relative container mx-auto px-4 text-center py-20">
              <h1 className="font-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight max-w-4xl mx-auto">
                Painting Services Across Muskoka
              </h1>
              <p className="mt-6 italic text-atomic-orange text-xl md:text-2xl">
                Interior, exterior, cottage, commercial — and everything in between.
              </p>
            </div>
          </section>

          {/* Intro */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-atomic-navy text-lg leading-relaxed text-center">
                <p>
                  I started Roll On Painting in its current form in 2014 with a simple commitment: do every kind of painting and coating work that a Muskoka cottage or home actually needs, and do every one of them well. The list below is everything we do — and everything we'll quote you on.
                </p>
              </div>
            </div>
          </section>

          {/* Services grid */}
          <section className="pb-16 md:pb-20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((c) => {
                  const Icon = c.icon;
                  return (
                    <Link
                      key={c.title}
                      to={c.href}
                      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg border border-border transition-all"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-muted">
                        <img
                          src={c.image}
                          alt={c.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-5 h-5 text-atomic-orange" />
                          <h2 className="font-display text-xl text-atomic-navy">{c.title}</h2>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Quote link section */}
          <section className="py-12 md:py-16 bg-muted/40 border-y border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center text-atomic-navy">
                <h2 className="font-display text-3xl md:text-4xl mb-4">
                  Wondering what your project would cost?
                </h2>
                <p className="text-lg leading-relaxed mb-8">
                  Every Roll On quote is engineered from the actual surfaces of your specific property — not guessed by the square foot. See How We Quote for the full explanation of how we estimate.
                </p>
                <Link
                  to="/how-we-quote"
                  className="inline-flex items-center justify-center bg-atomic-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-atomic-orange/90 transition-colors shadow-lg"
                >
                  See How We Quote →
                </Link>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center text-atomic-navy">
                <h2 className="font-display text-3xl md:text-4xl mb-4">Ready to talk?</h2>
                <p className="text-lg leading-relaxed mb-8">
                  Tell us about your project. We'll come measure, walk through the scope, and send you an engineered quote within 5 business days.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-atomic-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-atomic-orange/90 transition-colors shadow-lg"
                >
                  Book Your Cottage Consultation
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ServicesPage;