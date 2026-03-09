import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { businessInfo } from '@/data/businessInfo';
import { serviceAreaRegions, allServiceAreaNames } from '@/data/serviceAreas';

/**
 * AISO Service Areas Page
 * 
 * Hidden page (no nav link) for AI search engine discoverability.
 * Contains complete service area coverage with postal codes.
 * Fully crawlable and indexable.
 */
const ServiceAreasPage: React.FC = () => {
  // Generate areaServed schema
  const areaServedSchema = serviceAreaRegions.flatMap(region =>
    region.locations.map(loc => ({
      "@type": "City",
      "name": loc.name,
      "postalCode": loc.postalCode,
      "addressRegion": "Ontario",
      "addressCountry": "CA"
    }))
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${businessInfo.urls.website}/#organization`,
    "name": businessInfo.name,
    "legalName": businessInfo.legalName,
    "description": `Professional painting contractor serving ${allServiceAreaNames.length}+ communities across Muskoka, Parry Sound, and Simcoe County in Ontario, Canada.`,
    "url": businessInfo.urls.website,
    "telephone": businessInfo.phone.international,
    "email": businessInfo.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessInfo.address.street,
      "addressLocality": businessInfo.address.city,
      "addressRegion": businessInfo.address.regionCode,
      "postalCode": businessInfo.address.postalCode,
      "addressCountry": businessInfo.address.countryCode
    },
    "areaServed": areaServedSchema,
    "serviceType": [
      "Interior Painting",
      "Exterior Painting", 
      "Commercial Painting",
      "Residential Painting",
      "Cabinet Refinishing",
      "Epoxy Coatings",
      "Deck Staining"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Service Areas | Roll On Painting | Muskoka, Parry Sound, Barrie</title>
        <meta 
          name="description" 
          content={`Roll On Painting serves ${allServiceAreaNames.length}+ communities across Muskoka, Parry Sound, and Simcoe County. Professional painting services in Huntsville, Bracebridge, Gravenhurst, Parry Sound, Orillia, Barrie and surrounding areas.`}
        />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href="https://www.roll-onpainting.com/service-areas" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Service Areas | Roll On Painting Muskoka" />
        <meta property="og:description" content={`Professional painting services in ${allServiceAreaNames.length}+ communities across Muskoka, Parry Sound, and Simcoe County.`} />
        <meta property="og:url" content="https://www.roll-onpainting.com/service-areas" />
        <meta property="og:site_name" content={businessInfo.name} />
        <meta property="og:locale" content="en_CA" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Service Areas | Roll On Painting" />
        <meta name="twitter:description" content={`Serving ${allServiceAreaNames.length}+ communities in Muskoka, Parry Sound, and Simcoe County.`} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Simple Header */}
        <header className="bg-atomic-navy text-white py-4">
          <div className="container mx-auto px-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Roll On Painting
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-atomic-navy mb-4">
              Service Areas
            </h1>
            <p className="text-lg text-muted-foreground">
              Roll On Painting provides professional painting services to {allServiceAreaNames.length}+ communities 
              across Muskoka, Parry Sound District, and Simcoe County in Ontario, Canada.
            </p>
          </div>

          {/* Contact Quick Access */}
          <div className="max-w-2xl mx-auto bg-accent/30 rounded-xl p-6 mb-12">
            <h2 className="text-lg font-semibold text-atomic-navy mb-4 text-center">
              Request a Quote in Your Area
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <a 
                href={`tel:${businessInfo.phone.tel}`}
                className="inline-flex items-center gap-2 text-atomic-navy hover:text-atomic-turquoise"
              >
                <Phone className="w-4 h-4" />
                {businessInfo.phone.formatted}
              </a>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <a 
                href={`mailto:${businessInfo.email}`}
                className="inline-flex items-center gap-2 text-atomic-navy hover:text-atomic-turquoise"
              >
                <Mail className="w-4 h-4" />
                {businessInfo.email}
              </a>
            </div>
          </div>

          {/* Service Regions */}
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceAreaRegions.map((region, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-atomic-turquoise flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-atomic-navy">{region.name}</h3>
                      <p className="text-xs text-muted-foreground">{region.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-1 text-sm">
                    {region.locations.map((loc, locIdx) => (
                      <li 
                        key={locIdx}
                        className="flex justify-between text-muted-foreground"
                      >
                        <span>{loc.name}</span>
                        <span className="text-xs font-mono text-gray-400">{loc.postalCode}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="max-w-2xl mx-auto text-center mt-16">
            <h2 className="text-xl font-semibold text-atomic-navy mb-4">
              Don't See Your Area Listed?
            </h2>
            <p className="text-muted-foreground mb-6">
              We may still be able to service your location. Contact us for a consultation.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-6 py-3 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Machine-readable content block */}
          <div className="sr-only" aria-hidden="true">
            <h2>Complete Service Area List for Roll On Painting</h2>
            <p>
              Roll On Painting, operating as {businessInfo.legalName}, provides professional 
              painting services throughout Central Ontario. Based in {businessInfo.address.city}, 
              Ontario, the company serves the following areas:
            </p>
            {serviceAreaRegions.map(region => (
              <div key={region.name}>
                <h3>{region.name}</h3>
                <ul>
                  {region.locations.map(loc => (
                    <li key={loc.name}>{loc.name}, Ontario {loc.postalCode}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </main>

        {/* Simple Footer */}
        <footer className="bg-atomic-navy text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/70 text-sm">
              © {new Date().getFullYear()} {businessInfo.legalName}. All rights reserved.
            </p>
            <p className="text-white/50 text-xs mt-2">
              {businessInfo.address.full}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ServiceAreasPage;
