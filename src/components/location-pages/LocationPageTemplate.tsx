import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, CheckCircle, MapPin, Star, Shield, Heart } from 'lucide-react';
import { businessInfo } from '@/data/businessInfo';
import { LocationPageData, locationPages } from '@/data/locationPages';
import { getLocationHero } from '@/data/locationHeroData';
import { getLocationCoordinates } from '@/data/locationCoordinates';
import PrivateClientBanner from '@/components/conversion/PrivateClientBanner';

// Build a name → slug lookup for nearby area linking
const nameToSlugMap = new Map(locationPages.map(p => [p.name, p.slug]));

// Service list with links to service pages
const serviceLinks = [
  { name: "Interior Painting", slug: "/interior-painting-muskoka" },
  { name: "Exterior Painting", slug: "/exterior-painting-muskoka" },
  { name: "Kitchen Cabinet Refinishing", slug: "/cabinet-painting-muskoka" },
  { name: "Deck & Fence Staining", slug: "/staining-muskoka" },
  { name: "Commercial Painting", slug: "/commercial-painting-muskoka" },
  { name: "GoNano Permanent Coating", slug: "/gonano" },
  { name: "Power & Soft Washing", slug: "/power-washing-muskoka" },
  { name: "Wallpaper Installation", slug: "/wallpaper-installation" },
  { name: "Epoxy Coatings", slug: "/epoxy-floors-muskoka" },
];

// Universal FAQs dynamically localized per town
const getUniversalFaqs = (name: string) => [
  {
    question: `Do I need to be home for a painting estimate in ${name}?`,
    answer: `No. We can provide estimates based on photos, video calls, or on-site visits when you're not home. Many of our ${name} clients — especially cottage owners — arrange estimates remotely. We'll work around your schedule.`
  },
  {
    question: `How long does it take to paint a house in ${name}?`,
    answer: `Most interior projects in ${name} take 3–5 days, while full exterior painting typically takes 5–10 days depending on size and weather. We provide a detailed timeline with every estimate so you know exactly what to expect.`
  },
  {
    question: `What paint brands do you use in ${name}?`,
    answer: `We use Benjamin Moore, Sherwin-Williams, and specialty coatings selected for Muskoka's climate. Our team will recommend the best products for your ${name} property based on surface type, exposure, and desired finish.`
  },
  {
    question: `Do you offer winter painting services in ${name}?`,
    answer: `Yes — we perform interior painting year-round in ${name}. For exterior projects, we plan around Muskoka's freeze-thaw cycles to ensure optimal adhesion and durability. We'll advise you on the best timing for your project.`
  },
  {
    question: `What is the Free Touch Ups for Life guarantee?`,
    answer: `Every completed project with Roll On Painting includes our exclusive Free Touch Ups for Life program. If your walls get scuffed or nicked after we've finished, we'll come back and touch them up at no charge. No other ${name} painter offers this.`
  },
];

interface LocationPageTemplateProps {
  location: LocationPageData;
}

const LocationPageTemplate: React.FC<LocationPageTemplateProps> = ({ location }) => {
  const siteUrl = "https://www.roll-onpainting.com";
  const pageUrl = `${siteUrl}/${location.slug}`;
  const ogImage = "https://res.cloudinary.com/dxqfou8jh/image/upload/f_auto,q_80,w_1200/v1745866797/IMG_20190920_121835_fchin4.jpg";
  const heroInfo = getLocationHero(location.slug);
  const coords = getLocationCoordinates(location.slug);

  // Combine location-specific FAQs with universal ones
  const allFaqs = [...location.faqs, ...getUniversalFaqs(location.name)];

  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        "url": pageUrl,
        "name": location.metaTitle,
        "isPartOf": { "@id": `${siteUrl}/#website` },
        "about": { "@id": `${siteUrl}/#localbusiness` },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".location-intro", ".location-local-content"]
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
            { "@type": "ListItem", "position": 2, "name": "Service Areas", "item": `${siteUrl}/service-areas` },
            { "@type": "ListItem", "position": 3, "name": `Painters in ${location.name}`, "item": pageUrl }
          ]
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": `${pageUrl}/#localservice`,
        "name": `${businessInfo.name} - ${location.name}`,
        "description": `Professional painting services in ${location.name}, ${location.region}. Interior, exterior, commercial, and specialty painting.`,
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": {
          "@type": "Place",
          "name": `${location.name}, Ontario`,
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": coords.latitude,
            "longitude": coords.longitude
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": location.name,
            "addressRegion": "Ontario",
            "addressCountry": "CA",
            "postalCode": location.postalCode
          }
        },
        "telephone": businessInfo.phone.international,
        "priceRange": "$$"
      },
      {
        "@type": "FAQPage",
        "mainEntity": allFaqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{location.metaTitle}</title>
        <meta name="description" content={location.metaDescription} />
        <meta name="keywords" content={`painters ${location.name}, painting ${location.name}, interior painting ${location.name}, exterior painting ${location.name}, house painters ${location.region}, painting contractor ${location.name}, Roll On Painting`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={pageUrl} />
        <link rel="alternate" hrefLang="en-CA" href={pageUrl} />
        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content={location.metaTitle} />
        <meta property="og:description" content={location.metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content={businessInfo.name} />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:image" content={ogImage} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={location.metaTitle} />
        <meta name="twitter:description" content={location.metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content={`${location.name}, Ontario`} />
        <meta name="geo.position" content={`${coords.latitude};${coords.longitude}`} />
        <meta name="ICBM" content={`${coords.latitude}, ${coords.longitude}`} />
        <meta httpEquiv="Content-Language" content="en-CA" />
        
        <script type="application/ld+json">{JSON.stringify(graphSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-atomic-navy text-white py-4">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Roll On Painting
            </Link>
            <a href={`tel:${businessInfo.phone.tel}`} className="inline-flex items-center gap-2 text-white hover:text-atomic-turquoise transition-colors">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">{businessInfo.phone.formatted}</span>
            </a>
          </div>
        </header>

        <main>
          {/* Hero with landmark background */}
          <section 
            className="relative text-white py-20 md:py-28 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroInfo.heroImage})` }}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-atomic-navy/70" />
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-4">
                <MapPin className="w-3.5 h-3.5" />
                {location.name}, {location.region}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">{location.headline}</h1>
              <p className="location-intro text-lg text-white/90 max-w-3xl mx-auto mb-4 drop-shadow">{location.intro}</p>
              <p className="text-sm text-white/60 mb-8 italic">📍 {heroInfo.landmark}</p>
              
              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm text-white/80">
                <span className="inline-flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400" /> {businessInfo.ratings.average}/5 Google Rating</span>
                <span className="inline-flex items-center gap-1"><Shield className="w-4 h-4 text-atomic-turquoise" /> $5M Insured & WSIB</span>
                <span>As Seen on HGTV</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-6 py-3 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors shadow-lg">
                  See What Your {location.name} Project Would Cost
                </Link>
                <a href={`tel:${businessInfo.phone.tel}`} className="inline-flex items-center gap-2 border border-white/40 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors backdrop-blur-sm">
                  <Phone className="w-4 h-4" />Call {businessInfo.phone.formatted}
                </a>
              </div>
            </div>
          </section>

          {/* Local Content */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-atomic-navy mb-4">Painting Services in {location.name}</h2>
                <p className="location-local-content text-muted-foreground leading-relaxed mb-8">{location.localContent}</p>
                
                <h3 className="text-xl font-semibold text-atomic-navy mb-4">Our Services in {location.name}</h3>
                <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                  {serviceLinks.map((service, idx) => (
                    <li key={idx}>
                      <Link to={service.slug} className="flex items-center gap-2 text-muted-foreground hover:text-atomic-turquoise transition-colors">
                        <CheckCircle className="w-4 h-4 text-atomic-turquoise flex-shrink-0" />
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Why We Love Working Here */}
          <section className="py-12 bg-gradient-to-br from-atomic-navy/5 to-atomic-turquoise/5 border-y border-atomic-turquoise/10">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-atomic-orange flex-shrink-0" />
                  <h2 className="text-2xl font-bold text-atomic-navy">Why We Love Working in {location.name}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-[15px]">{heroInfo.localLove}</p>
              </div>
            </div>
          </section>


          <section className="py-12 bg-muted/50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-atomic-navy text-center mb-8">Why {location.name} Homeowners Choose Roll On Painting</h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-background p-6 rounded-lg shadow-sm text-center">
                  <Star className="w-8 h-8 text-atomic-turquoise mx-auto mb-3" />
                  <h3 className="font-semibold text-atomic-navy mb-2">25+ Years Experience</h3>
                  <p className="text-sm text-muted-foreground">Owner Chad Gilchrist brings over 25 years of painting industry expertise to every {location.name} project.</p>
                </div>
                <div className="bg-background p-6 rounded-lg shadow-sm text-center">
                  <Shield className="w-8 h-8 text-atomic-turquoise mx-auto mb-3" />
                  <h3 className="font-semibold text-atomic-navy mb-2">Free Touch Ups for Life</h3>
                  <p className="text-sm text-muted-foreground">Every completed project includes our exclusive Free Touch Ups for Life guarantee — no other {location.name} painter offers this.</p>
                </div>
                <div className="bg-background p-6 rounded-lg shadow-sm text-center">
                  <MapPin className="w-8 h-8 text-atomic-turquoise mx-auto mb-3" />
                  <h3 className="font-semibold text-atomic-navy mb-2">Local to Muskoka</h3>
                  <p className="text-sm text-muted-foreground">Based in Port Sydney, we know {location.name} and the surrounding area. We're not a franchise — we're your neighbours.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-12" aria-labelledby="location-faq-heading">
            <div className="container mx-auto px-4">
              <h2 id="location-faq-heading" className="text-2xl font-bold text-atomic-navy text-center mb-8">Frequently Asked Questions — {location.name}</h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {allFaqs.map((faq, idx) => (
                  <div key={idx} className="bg-background p-6 rounded-lg shadow-sm border border-border">
                    <h3 className="font-semibold text-atomic-navy mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Nearby Areas */}
          <section className="py-12 bg-muted/50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-xl font-bold text-atomic-navy mb-4">Also Serving Areas Near {location.name}</h2>
              <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                {location.nearbyAreas.map((area, idx) => {
                  const areaSlug = nameToSlugMap.get(area);
                  return areaSlug ? (
                    <Link key={idx} to={`/${areaSlug}`} className="inline-block px-3 py-1 bg-background border border-border rounded-full text-sm text-muted-foreground hover:text-atomic-orange hover:border-atomic-orange/30 transition-colors">
                      {area}
                    </Link>
                  ) : (
                    <span key={idx} className="inline-block px-3 py-1 bg-background border border-border rounded-full text-sm text-muted-foreground">
                      {area}
                    </span>
                  );
                })}
              </div>
              <Link to="/service-areas" className="inline-block mt-4 text-sm text-atomic-turquoise hover:underline">
                View all 48+ service areas →
              </Link>
            </div>
          </section>

          <PrivateClientBanner />

          {/* CTA */}
          <section className="py-16 bg-atomic-navy text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started in {location.name}?</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Get a free, no-obligation estimate for your {location.name} painting project. Most quotes delivered within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-8 py-3 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors">
                  Request Your Private Quote
                </Link>
                <a href={`tel:${businessInfo.phone.tel}`} className="inline-flex items-center gap-2 border border-white/40 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                  <Phone className="w-4 h-4" />Call {businessInfo.phone.formatted}
                </a>
              </div>
              <a href={`mailto:${businessInfo.email}`} className="inline-flex items-center gap-2 text-white/60 hover:text-white/80 transition-colors mt-4 text-sm">
                <Mail className="w-4 h-4" />{businessInfo.email}
              </a>
            </div>
          </section>
        </main>

        <footer className="bg-atomic-navy/95 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/70 text-sm">© {new Date().getFullYear()} {businessInfo.legalName}. All rights reserved.</p>
            <p className="text-white/50 text-xs mt-2">{businessInfo.address.full} | WSIB Covered | $5M Liability Insurance</p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <Link to="/service-areas" className="text-white/50 text-xs hover:text-white/70">All Service Areas</Link>
              <Link to="/#services" className="text-white/50 text-xs hover:text-white/70">Services</Link>
              <Link to="/contact" className="text-white/50 text-xs hover:text-white/70">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LocationPageTemplate;
