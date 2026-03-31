import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, CheckCircle, MapPin, Star, Shield } from 'lucide-react';
import { businessInfo } from '@/data/businessInfo';
import { LocationPageData, locationPages } from '@/data/locationPages';

// Build a name → slug lookup for nearby area linking
const nameToSlugMap = new Map(locationPages.map(p => [p.name, p.slug]));

interface LocationPageTemplateProps {
  location: LocationPageData;
}

const LocationPageTemplate: React.FC<LocationPageTemplateProps> = ({ location }) => {
  const siteUrl = "https://www.roll-onpainting.com";
  const pageUrl = `${siteUrl}/${location.slug}`;
  const ogImage = "https://res.cloudinary.com/dxqfou8jh/image/upload/f_auto,q_80,w_1200/v1745866797/IMG_20190920_121835_fchin4.jpg";

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
        "mainEntity": location.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      }
    ]
  };

  const services = [
    "Interior Painting",
    "Exterior Painting",
    "Kitchen Cabinet Refinishing",
    "Deck & Fence Staining",
    "Commercial Painting",
    "GoNano Permanent Coating",
    "Power & Soft Washing",
    "Wallpaper Installation",
    "Epoxy Coatings"
  ];

  return (
    <>
      <Helmet>
        <title>{location.metaTitle}</title>
        <meta name="description" content={location.metaDescription} />
        <meta name="keywords" content={`painters ${location.name}, painting ${location.name}, interior painting ${location.name}, exterior painting ${location.name}, house painters ${location.region}, painting contractor ${location.name}, Roll On Painting`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={pageUrl} />
        
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
        
        <meta name="geo.placename" content={location.name} />
        <meta name="geo.region" content="CA-ON" />
        
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
          {/* Hero */}
          <section className="bg-gradient-to-b from-atomic-navy to-atomic-navy/90 text-white py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-atomic-turquoise/20 text-atomic-turquoise text-sm font-medium rounded-full mb-4">
                <MapPin className="w-3.5 h-3.5" />
                {location.name}, {location.region}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{location.headline}</h1>
              <p className="location-intro text-lg text-white/80 max-w-3xl mx-auto mb-8">{location.intro}</p>
              
              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm text-white/70">
                <span className="inline-flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400" /> {businessInfo.ratings.average}/5 Google Rating</span>
                <span className="inline-flex items-center gap-1"><Shield className="w-4 h-4 text-atomic-turquoise" /> $5M Insured & WSIB</span>
                <span>As Seen on HGTV</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-6 py-3 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors">
                  Get a Free Quote in {location.name}
                </Link>
                <a href={`tel:${businessInfo.phone.tel}`} className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
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
                  {services.map((service, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-atomic-turquoise flex-shrink-0" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
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
                {location.faqs.map((faq, idx) => (
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

          {/* CTA */}
          <section className="py-16 bg-atomic-navy text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for a Quote in {location.name}?</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Contact Roll On Painting today for a free, no-obligation estimate on your {location.name} painting project.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-8 py-3 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors">
                  Request a Free Estimate
                </Link>
                <a href={`mailto:${businessInfo.email}`} className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />{businessInfo.email}
                </a>
              </div>
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
