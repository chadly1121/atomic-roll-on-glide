import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, DollarSign, Shield, Droplets, Sun, Leaf, SprayCan } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { businessInfo } from '@/data/businessInfo';

const applications = [
  { title: 'Glass & Windows', description: 'Repel water, reduce spots, and make cleaning effortless.' },
  { title: 'Wood & Decking', description: 'Protect against moisture, UV damage, and weathering.' },
  { title: 'Stone & Concrete', description: 'Prevent staining, algae growth, and water penetration.' },
  { title: 'Metal Surfaces', description: 'Guard against corrosion, oxidation, and environmental damage.' },
  { title: 'Fabric & Upholstery', description: 'Waterproof outdoor furniture and textiles.' },
  { title: 'Tile & Grout', description: 'Keep bathrooms and kitchens cleaner with stain-resistant coating.' },
];

const benefits = [
  { icon: Droplets, title: 'Hydrophobic Protection', description: 'Water beads and rolls off, preventing moisture damage and staining.' },
  { icon: Shield, title: 'Anti-Microbial', description: 'Prevents mold, mildew, and algae growth on treated surfaces.' },
  { icon: Sun, title: 'UV Resistance', description: 'Protects surfaces from sun damage and color fading.' },
  { icon: Leaf, title: 'Eco-Friendly', description: 'Non-toxic, environmentally friendly formulations safe for your family.' },
];

const GoNanoPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goNanoSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "GoNano Permanent Coating",
    "provider": {
      "@type": "LocalBusiness",
      "name": businessInfo.name,
      "telephone": businessInfo.phone.primary,
    },
    "description": "Advanced nanotechnology surface coating providing hydrophobic protection, anti-microbial properties, and UV resistance for residential and commercial surfaces in Muskoka.",
    "areaServed": { "@type": "Place", "name": "Muskoka, Ontario" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "CAD",
      "price": "0.99",
      "unitText": "per square foot",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "0.99",
        "priceCurrency": "CAD",
        "unitText": "SQF"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>GoNano Nanotechnology Coatings | Roll On Painting Muskoka</title>
        <meta name="description" content="Authorized GoNano dealer and installer in Muskoka. Advanced nanotechnology surface protection starting at $0.99/sq ft. Hydrophobic, anti-microbial, UV-resistant coatings." />
        <link rel="canonical" href="https://rollonpainting.com/gonano" />
        <script type="application/ld+json">{JSON.stringify(goNanoSchema)}</script>
      </Helmet>

      <Navbar activeSection="gonano" />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-atomic-turquoise/10 via-background to-atomic-turquoise/5 py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-atomic-turquoise/20 text-atomic-turquoise px-4 py-2 rounded-full mb-4">
                <SprayCan className="w-4 h-4" />
                <span className="font-semibold text-sm uppercase tracking-wide">Authorized Dealer & Installer</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-atomic-navy mb-4">
                GoNano <span className="text-atomic-turquoise">Nanotechnology Coatings</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Revolutionary surface protection using cutting-edge nanotechnology. Environmentally friendly solutions that provide powerful, long-lasting defense against water, stains, UV damage, and more.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-atomic-navy text-center mb-12">Why Choose GoNano?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="text-center p-6 rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 mx-auto mb-4 bg-atomic-turquoise/15 rounded-full flex items-center justify-center">
                    <benefit.icon className="w-7 h-7 text-atomic-turquoise" />
                  </div>
                  <h3 className="font-bold text-atomic-navy mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-16 sm:py-20 bg-accent/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-atomic-navy text-center mb-4">Surface Applications</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              GoNano coatings can be applied to virtually any surface, providing invisible protection that lasts.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {applications.map((app, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-card rounded-lg shadow-sm">
                  <Check className="w-5 h-5 text-atomic-turquoise mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-atomic-navy">{app.title}</h3>
                    <p className="text-sm text-muted-foreground">{app.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing + Video */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
              {/* Pricing Card */}
              <Card className="overflow-hidden border-2 border-atomic-turquoise/30">
                <CardHeader className="bg-gradient-to-r from-atomic-turquoise/20 to-atomic-turquoise/10">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-atomic-turquoise" />
                    <CardTitle>GoNano Pricing</CardTitle>
                  </div>
                  <CardDescription>Simple, affordable protection for your surfaces</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-atomic-navy">$0.99</span>
                    <span className="text-xl font-medium text-atomic-navy/70 ml-1">/ sq ft</span>
                    <span className="text-sm text-muted-foreground ml-2">starting from</span>
                  </div>
                  <div className="space-y-3">
                    {['Square footage pricing for all surfaces', 'Custom quotes for complex projects', 'Volume discounts available', 'Includes professional application'].map((item, i) => (
                      <div key={i} className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-atomic-turquoise flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 pb-6">
                  <Link
                    to="/contact"
                    className="atomic-button-secondary w-full text-center justify-center block"
                  >
                    <span className="relative z-10">Get a Free Quote</span>
                  </Link>
                  <div className="w-full border-t border-atomic-turquoise/20 pt-4">
                    <div className="text-center mb-3">
                      <p className="text-sm font-semibold text-atomic-turquoise uppercase tracking-wide">Get Your Price Now</p>
                      <p className="text-xs text-muted-foreground mt-1">Instant online estimate — no waiting required</p>
                    </div>
                    <a
                      href="http://missedaspot.sky-quote.com/Instant-Estimate"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="atomic-button w-full text-center justify-center bg-gradient-to-r from-atomic-turquoise to-atomic-turquoise/80 hover:from-atomic-turquoise/90 hover:to-atomic-turquoise border-2 border-atomic-turquoise/30 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 block"
                    >
                      <span className="relative z-10 font-bold">🚀 Instant Estimate Tool</span>
                    </a>
                  </div>
                </CardFooter>
              </Card>

              {/* Video */}
              <div className="rounded-xl overflow-hidden shadow-xl">
                <div className="relative pb-[177.78%] h-0 bg-gray-900">
                  <a
                    href="https://youtube.com/shorts/MEwdfRxANKM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex flex-col items-center justify-center text-white hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-20 h-20 mb-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span className="text-lg font-semibold">Watch GoNano Demo</span>
                    <span className="text-sm text-gray-300 mt-1">Click to play on YouTube</span>
                  </a>
                </div>
                <div className="p-6 bg-card">
                  <h4 className="font-bold text-lg mb-2">See GoNano in Action</h4>
                  <p className="text-muted-foreground">Watch our demonstration of GoNano's incredible protective properties.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-atomic-navy text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Protect Your Surfaces?</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Contact us for a free consultation and quote on GoNano nanotechnology coatings for your property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="atomic-button-secondary inline-flex items-center justify-center px-8 py-3 rounded-full"
              >
                <span className="relative z-10">Get a Free Quote</span>
              </Link>
              <a
                href={`tel:${businessInfo.phone.tel}`}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Call {businessInfo.phone.formatted}
              </a>
            </div>
            <a
              href="https://www.gonano.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 text-sm text-gray-400 hover:text-white underline transition-colors"
            >
              Learn more at gonano.com →
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GoNanoPage;
