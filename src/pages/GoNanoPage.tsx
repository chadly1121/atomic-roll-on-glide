import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, DollarSign, Shield, Droplets, Sun, Wind, Snowflake, Home, Timer, Leaf } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { businessInfo } from '@/data/businessInfo';
import GoNanoVideo from '@/components/services/GoNanoVideo';

const roofProducts = [
  {
    name: 'NuRoof Fortify™',
    tagline: 'Extreme Weather Protection',
    roofAge: '0–7 years old',
    lifeAdded: '10–15 years',
    tier: 'Best',
    description: 'Nano-enhanced treatment for newer asphalt roofs. Acts as a preventive fortifying shield — improving impact resistance, boosting wind durability, retaining granules, and slowing aging before damage starts.',
    color: 'border-purple-500/30 bg-purple-50/50',
    badge: 'bg-purple-100 text-purple-700',
  },
  {
    name: 'NuRoof Revive™',
    tagline: 'Refurbish. Fortify. Protect.',
    roofAge: '7–15 years old',
    lifeAdded: '5–10 years',
    tier: 'Better',
    description: 'Professional-grade treatment that restores aging asphalt shingles. Penetrates deep to rebuild flexibility, reinforce structure, and create a hydrophobic barrier against water, algae, and surface erosion.',
    color: 'border-orange-500/30 bg-orange-50/50',
    badge: 'bg-orange-100 text-orange-700',
  },
  {
    name: 'Bio-Boost™',
    tagline: 'Cost-Effective Roof Protection',
    roofAge: '10+ years old',
    lifeAdded: '3–5 years',
    tier: 'Good',
    description: 'Formulated with nanotechnology and renewable bio-oils. Penetrates the shingle surface to improve flexibility, reduce dryness, and enhance resistance to moisture — a sustainable option for aging roofs.',
    color: 'border-green-500/30 bg-green-50/50',
    badge: 'bg-green-100 text-green-700',
  },
];

const weatherProtection = [
  { icon: Sun, title: 'Extreme Heat', description: 'Reflects UV rays, limits heat absorption, slows aging, and prevents discoloration.' },
  { icon: Shield, title: 'Hail Impact', description: 'Transforms Class 1 shingles into Class 3 or 4, meeting North American impact resistance standards.' },
  { icon: Wind, title: 'High Winds', description: 'Strengthens shingle structure and enhances flexibility, reducing risk of tear-offs.' },
  { icon: Snowflake, title: 'Water & Ice', description: 'Improves drainage with enhanced hydrophobic properties, protecting from water and ice damage.' },
];

const surfaceProducts = [
  {
    title: 'Concrete Sealer',
    description: 'Penetrating nanotechnology sealer that works from the inside out. Prevents cracking, creates a waterproof barrier, and protects against freeze-thaw cycles. One application provides permanent protection.',
    features: ['Prevents water seepage and cracking', 'Protects against freeze-thaw damage', 'Single application — permanent results', 'No dust or odor during application'],
  },
  {
    title: 'Wood Sealer',
    description: 'Advanced nano-based wood sealer that penetrates deep into the wood for long-lasting durability. Creates a completely waterproof barrier ideal for decks, fences, and exterior wood surfaces.',
    features: ['Deep-penetrating waterproof barrier', 'Protects against rot and moisture damage', 'Clean, mess-free single-day application', 'Extends lifespan of decks and fences'],
  },
];

const goNanoFAQs = [
  { question: "What is GoNano nanotechnology coating?", answer: "GoNano uses millions of nanoparticles to permanently transform the molecular structure of surfaces like asphalt roofs, concrete, and wood. It creates a hydrophobic, weather-resistant barrier that extends surface lifespan by up to 15 years." },
  { question: "How long does GoNano last?", answer: "GoNano provides permanent protection with a single application. Depending on the product tier, roof sealers add 3 to 15 years of life. Concrete and wood sealers provide permanent waterproof protection." },
  { question: "How much does GoNano cost?", answer: "GoNano applications start at $0.99 per square foot, including professional application. Volume discounts are available. Contact Roll On Painting at 705-787-1401 for a free quote." },
  { question: "Is GoNano safe and environmentally friendly?", answer: "Yes. GoNano products are non-toxic, produce no dust or odor during application, and Bio-Boost™ is formulated with renewable bio-oils for a sustainable option." },
  { question: "Was GoNano featured on Dragon's Den?", answer: "Yes. GoNano was featured on CBC's Dragon's Den, showcasing its innovative nanotechnology for surface protection." },
];

const GoNanoPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const siteUrl = "https://www.roll-onpainting.com";
  const ogImage = "https://res.cloudinary.com/dxqfou8jh/image/upload/f_auto,q_80,w_1200/v1745866797/IMG_20190920_121835_fchin4.jpg";

  const goNanoSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${siteUrl}/gonano/#service`,
        "name": "GoNano Nanotechnology Coatings",
        "serviceType": "Nanotechnology protective coating",
        "provider": {
          "@type": "LocalBusiness",
          "@id": `${siteUrl}/#localbusiness`,
          "name": businessInfo.name,
          "telephone": businessInfo.phone.international,
        },
        "description": "Authorized GoNano dealer and installer in Muskoka. Nanotechnology roof sealers, concrete sealers, and wood sealers that permanently extend surface lifespan by up to 15 years. As seen on Dragon's Den.",
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" },
        "offers": [
          { "@type": "Offer", "name": "NuRoof Fortify™", "description": "Best tier — extends roof life 10-15 years for roofs 0-7 years old", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "0.99", "priceCurrency": "CAD", "unitText": "per square foot" } },
          { "@type": "Offer", "name": "NuRoof Revive™", "description": "Better tier — extends roof life 5-10 years for roofs 7-15 years old", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "0.99", "priceCurrency": "CAD", "unitText": "per square foot" } },
          { "@type": "Offer", "name": "Bio-Boost™", "description": "Good tier — extends roof life 3-5 years for roofs 10+ years old", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "0.99", "priceCurrency": "CAD", "unitText": "per square foot" } },
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "GoNano Products",
          "itemListElement": [
            { "@type": "OfferCatalog", "name": "Roofing Nanosealers", "description": "NuRoof Fortify™, NuRoof Revive™, and Bio-Boost™ for asphalt shingle roofs" },
            { "@type": "OfferCatalog", "name": "Concrete Sealers", "description": "Penetrating nanotechnology sealer with permanent waterproof protection" },
            { "@type": "OfferCatalog", "name": "Wood Sealers", "description": "Deep-penetrating nano-based wood sealer for decks, fences, and exteriors" },
          ]
        }
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/gonano/#webpage`,
        "url": `${siteUrl}/gonano`,
        "name": "GoNano Nanotechnology Coatings | Roll On Painting",
        "isPartOf": { "@id": `${siteUrl}/#website` },
        "about": { "@id": `${siteUrl}/gonano/#service` },
        "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".gonano-hero-text", ".gonano-faq"] },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
            { "@type": "ListItem", "position": 2, "name": "GoNano", "item": `${siteUrl}/gonano` }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": goNanoFAQs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>GoNano Nanotechnology Coatings | Roof, Concrete & Wood Sealers | Roll On Painting</title>
        <meta name="description" content="Authorized GoNano dealer in Muskoka. Nanotechnology roof sealers extend shingle life up to 15 years. Concrete and wood sealers with permanent waterproof protection. Starting at $0.99/sq ft." />
        <link rel="canonical" href={`${siteUrl}/gonano`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="GoNano Nanotechnology Coatings | Roll On Painting Muskoka" />
        <meta property="og:description" content="Authorized GoNano dealer in Muskoka. Nanotechnology sealers for roofs, concrete, and wood. Extends surface lifespan up to 15 years. As seen on Dragon's Den." />
        <meta property="og:url" content={`${siteUrl}/gonano`} />
        <meta property="og:site_name" content={businessInfo.name} />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GoNano Nanotechnology Coatings | Roll On Painting" />
        <meta name="twitter:description" content="Nanotechnology roof, concrete & wood sealers. Extends surface lifespan up to 15 years. Starting at $0.99/sq ft." />
        <meta name="twitter:image" content={ogImage} />
        
        <script type="application/ld+json">{JSON.stringify(goNanoSchema)}</script>
      </Helmet>

      <Navbar activeSection="gonano" />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-atomic-navy via-atomic-navy to-atomic-turquoise/20 text-white py-12 sm:py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            {/* Dragon's Den Feature Image — flows on mobile/tablet, absolute on lg+ */}
            <div className="flex justify-center mb-6 lg:mb-0 lg:absolute lg:top-6 lg:right-8 lg:z-10 lg:max-w-[260px]">
              <div className="max-w-[180px] sm:max-w-[220px] lg:max-w-[260px]">
                <img src="/lovable-uploads/dragons-den-cbc.png" alt="GoNano featured on CBC Dragon's Den — Heard about us on Dragon's Den? Find out if your roof qualifies for a free inspection." className="w-full h-auto rounded-lg shadow-xl" loading="eager" />
                <p className="text-[10px] sm:text-xs text-center text-gray-300 mt-2 font-semibold tracking-wide leading-tight">As Seen on Dragon's Den on CBC</p>
              </div>
            </div>

            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="max-w-3xl gonano-hero-text">
              <div className="inline-flex items-center gap-2 bg-atomic-turquoise/20 text-atomic-turquoise px-4 py-2 rounded-full mb-4">
                <Shield className="w-4 h-4" />
                <span className="font-semibold text-sm uppercase tracking-wide">Authorized Dealer & Installer</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                GoNano <span className="text-atomic-turquoise">Nanotechnology</span> Coatings
              </h1>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mb-6">
                Millions of nanoparticles permanently transform the molecular structure of surfaces — enhancing resistance and extending lifespan by up to 15 years. As seen on Dragon's Den.
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-atomic-turquoise">50K+</span>
                  <span className="text-gray-400">Satisfied Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-atomic-turquoise">14</span>
                  <span className="text-gray-400">Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-atomic-turquoise">15yr</span>
                  <span className="text-gray-400">Warranty Available</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits Bar */}
        <section className="bg-atomic-turquoise/10 py-6 border-b border-atomic-turquoise/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm font-medium text-atomic-navy">
              <div className="flex items-center gap-2"><Timer className="w-4 h-4 text-atomic-turquoise" /><span>Application completed in one day</span></div>
              <div className="flex items-center gap-2"><Leaf className="w-4 h-4 text-atomic-turquoise" /><span>No dust or odor</span></div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-atomic-turquoise" /><span>Only one treatment needed</span></div>
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-atomic-turquoise" /><span>Permanent protection</span></div>
            </div>
          </div>
        </section>

        {/* Roofing Products */}
        <section className="py-16 sm:py-20" aria-labelledby="roofing-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 id="roofing-heading" className="text-2xl sm:text-3xl font-bold text-atomic-navy mb-3">
                <Home className="inline w-7 h-7 mr-2 text-atomic-turquoise" aria-hidden="true" />
                Roofing Nanosealers
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                GoNano's primary innovation — nanotechnology treatments that extend asphalt shingle roof life by up to 15 years. A solution for every roof age, backed by extensive testing and warranty.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {roofProducts.map((product, i) => (
                <Card key={i} className={`overflow-hidden border-2 ${product.color} hover:shadow-lg transition-shadow`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${product.badge}`}>{product.tier}</span>
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="font-medium">{product.tagline}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 space-y-1">
                      <p className="text-sm"><span className="font-semibold text-atomic-navy">Roof age:</span> {product.roofAge}</p>
                      <p className="text-sm"><span className="font-semibold text-atomic-turquoise">Life added:</span> <span className="font-bold">{product.lifeAdded}</span></p>
                    </div>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Weather Protection */}
        <section className="py-16 sm:py-20 bg-accent/30" aria-labelledby="weather-heading">
          <div className="container mx-auto px-4">
            <h2 id="weather-heading" className="text-2xl sm:text-3xl font-bold text-atomic-navy text-center mb-4">Extreme Weather? Bring It On.</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              GoNano-treated surfaces withstand the harshest conditions Muskoka weather can deliver.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {weatherProtection.map((item, i) => (
                <div key={i} className="text-center p-6 rounded-xl bg-card shadow-sm">
                  <div className="w-12 h-12 mx-auto mb-4 bg-atomic-turquoise/15 rounded-full flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-atomic-turquoise" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-atomic-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Concrete & Wood */}
        <section className="py-16 sm:py-20" aria-labelledby="surface-heading">
          <div className="container mx-auto px-4">
            <h2 id="surface-heading" className="text-2xl sm:text-3xl font-bold text-atomic-navy text-center mb-4">Concrete & Wood Nanosealers</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Less maintenance, more value. Protect your exterior surfaces from the elements and extend their lifespan with a single permanent treatment.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {surfaceProducts.map((product, i) => (
                <Card key={i} className="overflow-hidden border border-border hover:shadow-lg transition-shadow">
                  <CardHeader><CardTitle>{product.title}</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                    <ul className="space-y-2">
                      {product.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-atomic-turquoise mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing + Video */}
        <section className="py-16 sm:py-20 bg-accent/30" aria-labelledby="pricing-heading">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
              <Card className="overflow-hidden border-2 border-atomic-turquoise/30">
                <CardHeader className="bg-gradient-to-r from-atomic-turquoise/20 to-atomic-turquoise/10">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-atomic-turquoise" aria-hidden="true" />
                    <CardTitle id="pricing-heading">GoNano Pricing</CardTitle>
                  </div>
                  <CardDescription>Professional application included</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-atomic-navy">$0.99</span>
                    <span className="text-xl font-medium text-atomic-navy/70 ml-1">/ sq ft</span>
                    <span className="text-sm text-muted-foreground ml-2">starting from</span>
                  </div>
                  <div className="space-y-3">
                    {['Roofing, concrete, and wood surfaces', 'Custom quotes for complex projects', 'Volume discounts available', 'Includes professional application', 'Up to 15-year warranty available'].map((item, i) => (
                      <div key={i} className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-atomic-turquoise flex-shrink-0" aria-hidden="true" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 pb-6">
                  <Link to="/contact" className="atomic-button-secondary w-full text-center justify-center block">
                    <span className="relative z-10">Get a Free Quote</span>
                  </Link>
                    <div className="w-full border-t border-atomic-turquoise/20 pt-4">
                    <div className="text-center mb-3">
                      <p className="text-sm font-semibold text-atomic-turquoise uppercase tracking-wide">Get Your Price Now</p>
                      <p className="text-xs text-muted-foreground mt-1">Instant online booking — no waiting required</p>
                    </div>
                    <Link to="/catalog#gonano"
                      className="atomic-button w-full text-center justify-center bg-gradient-to-r from-atomic-turquoise to-atomic-turquoise/80 hover:from-atomic-turquoise/90 hover:to-atomic-turquoise border-2 border-atomic-turquoise/30 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 block">
                      <span className="relative z-10 font-bold">🚀 Instant Estimate Tool</span>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
              <GoNanoVideo />
            </div>
          </div>
        </section>

        {/* FAQ Section — AI-optimized */}
        <section className="py-16 sm:py-20 gonano-faq" aria-labelledby="gonano-faq-heading">
          <div className="container mx-auto px-4">
            <h2 id="gonano-faq-heading" className="text-2xl sm:text-3xl font-bold text-atomic-navy text-center mb-10">Frequently Asked Questions About GoNano</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {goNanoFAQs.map((faq, i) => (
                <details key={i} className="group bg-card rounded-lg border border-border shadow-sm">
                  <summary className="cursor-pointer px-6 py-4 font-semibold text-atomic-navy hover:text-atomic-turquoise transition-colors list-none flex items-center justify-between">
                    {faq.question}
                    <span className="ml-2 text-atomic-turquoise group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-6 pb-4 text-muted-foreground text-sm">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-atomic-navy text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Protect Your Roof and Surfaces?</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              As an authorized GoNano dealer and installer in Muskoka, we provide professional application with full warranty coverage. Contact us for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="atomic-button-secondary inline-flex items-center justify-center px-8 py-3 rounded-full">
                <span className="relative z-10">Get a Free Quote</span>
              </Link>
              <a href={`tel:${businessInfo.phone.tel}`} className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors">
                Call {businessInfo.phone.formatted}
              </a>
            </div>
            <a href="https://www.gonano.com/" target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-sm text-gray-400 hover:text-white underline transition-colors">
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
