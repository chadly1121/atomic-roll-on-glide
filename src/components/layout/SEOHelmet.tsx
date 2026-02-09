import React from 'react';
import { Helmet } from "react-helmet-async";
import { businessInfo, verifiedFAQs } from '@/data/businessInfo';

/**
 * AISO-Optimized SEO Helmet
 * 
 * Consolidated JSON-LD structured data for AI search engines.
 * All data sourced from verified businessInfo.ts
 */
const SEOHelmet: React.FC = () => {
  const logoUrl = "https://rollonpainting.com/lovable-uploads/9058a595-b38f-4cdc-893a-19baaccf57d5.png?v=pink";
  const siteUrl = "https://www.roll-onpainting.com";

  // Single consolidated @graph with Organization, LocalBusiness (including aggregateRating), and all Services
  const consolidatedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": businessInfo.name,
        "legalName": businessInfo.legalName,
        "url": `${siteUrl}/`,
        "logo": logoUrl,
        "image": logoUrl,
        "email": businessInfo.email,
        "telephone": businessInfo.phone.international,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": businessInfo.address.street,
          "addressLocality": businessInfo.address.city,
          "addressRegion": businessInfo.address.regionCode,
          "postalCode": businessInfo.address.postalCode,
          "addressCountry": businessInfo.address.countryCode
        },
        "sameAs": [
          businessInfo.urls.instagram,
          businessInfo.urls.facebook,
          businessInfo.urls.linkedin,
          businessInfo.urls.googleBusiness
        ]
      },
      // LocalBusiness with aggregateRating embedded
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        "name": businessInfo.name,
        "url": `${siteUrl}/`,
        "image": logoUrl,
        "telephone": businessInfo.phone.international,
        "email": businessInfo.email,
        "priceRange": businessInfo.pricing.priceRange,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": businessInfo.address.street,
          "addressLocality": businessInfo.address.city,
          "addressRegion": businessInfo.address.regionCode,
          "postalCode": businessInfo.address.postalCode,
          "addressCountry": businessInfo.address.countryCode
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": businessInfo.geo.latitude,
          "longitude": businessInfo.geo.longitude
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "reviewCount": "15",
          "bestRating": "5",
          "worstRating": "1"
        },
        "areaServed": [
          // Algonquin & North Muskoka
          { "@type": "Place", "name": "Ahmic Harbour, Ontario, Canada (P0A 1A0)" },
          { "@type": "Place", "name": "Algonquin Park, Ontario, Canada (P0A 1B0)" },
          { "@type": "Place", "name": "Burk's Falls, Ontario, Canada (P0A 1C0)" },
          { "@type": "Place", "name": "Dorset, Ontario, Canada (P0A 1E0)" },
          { "@type": "Place", "name": "Dunchurch, Ontario, Canada (P0A 1G0)" },
          { "@type": "Place", "name": "Dwight, Ontario, Canada (P0A 1H0)" },
          { "@type": "Place", "name": "Emsdale, Ontario, Canada (P0A 1J0)" },
          { "@type": "Place", "name": "Katrine, Ontario, Canada (P0A 1L0)" },
          { "@type": "Place", "name": "Kearney, Ontario, Canada (P0A 1M0)" },
          { "@type": "Place", "name": "Magnetawan, Ontario, Canada (P0A 1P0)" },
          { "@type": "Place", "name": "Novar, Ontario, Canada (P0A 1R0)" },
          { "@type": "Place", "name": "South River, Ontario, Canada (P0A 1X0)" },
          { "@type": "Place", "name": "Sprucedale, Ontario, Canada (P0A 1Y0)" },
          { "@type": "Place", "name": "Sundridge, Ontario, Canada (P0A 1Z0)" },
          // Muskoka Core
          { "@type": "Place", "name": "Baysville, Ontario, Canada (P0B 1A0)" },
          { "@type": "Place", "name": "Milford Bay, Ontario, Canada (P0B 1E0)" },
          { "@type": "Place", "name": "Minett, Ontario, Canada (P0B 1G0)" },
          { "@type": "Place", "name": "Port Carling, Ontario, Canada (P0B 1J0)" },
          { "@type": "Place", "name": "Port Sandfield, Ontario, Canada (P0B 1K0)" },
          { "@type": "Place", "name": "Port Sydney, Ontario, Canada (P0B 1L0)" },
          { "@type": "Place", "name": "Utterson, Ontario, Canada (P0B 1M0)" },
          { "@type": "Place", "name": "Windermere, Ontario, Canada (P0B 1P0)" },
          // Lake Muskoka & Georgian Bay
          { "@type": "Place", "name": "Bala, Ontario, Canada (P0C 1A0)" },
          { "@type": "Place", "name": "MacTier, Ontario, Canada (P0C 1H0)" },
          { "@type": "Place", "name": "Rosseau, Ontario, Canada (P0C 1J0)" },
          { "@type": "Place", "name": "Torrance, Ontario, Canada (P0C 1M0)" },
          // Parry Sound & Georgian Bay Islands
          { "@type": "Place", "name": "Britt, Ontario, Canada (P0G 1A0)" },
          { "@type": "Place", "name": "Byng Inlet, Ontario, Canada (P0G 1B0)" },
          { "@type": "Place", "name": "McKellar, Ontario, Canada (P0G 1C0)" },
          { "@type": "Place", "name": "Nobel, Ontario, Canada (P0G 1G0)" },
          { "@type": "Place", "name": "Pickerel, Ontario, Canada (P0G 1J0)" },
          { "@type": "Place", "name": "Pointe au Baril, Ontario, Canada (P0G 1K0)" },
          // Major Muskoka Towns
          { "@type": "Place", "name": "Huntsville, Ontario, Canada (P1H)" },
          { "@type": "Place", "name": "Gravenhurst, Ontario, Canada (P1P)" },
          { "@type": "Place", "name": "Bracebridge, Ontario, Canada (P1L)" },
          // Parry Sound District
          { "@type": "Place", "name": "Parry Sound, Ontario, Canada (P2A)" },
          { "@type": "Place", "name": "Seguin, Ontario, Canada (P2A)" },
          { "@type": "Place", "name": "The Archipelago, Ontario, Canada (P2A)" },
          // Simcoe County
          { "@type": "Place", "name": "Orillia, Ontario, Canada (L3V)" },
          { "@type": "Place", "name": "Oro-Medonte, Ontario, Canada (L3V)" },
          { "@type": "Place", "name": "Ramara, Ontario, Canada (L3V)" },
          { "@type": "Place", "name": "Severn, Ontario, Canada (L3V)" },
          { "@type": "Place", "name": "Warminster, Ontario, Canada (L3V)" },
          // Barrie
          { "@type": "Place", "name": "Barrie, Ontario, Canada (L4M)" },
          // Georgian Bay South
          { "@type": "Place", "name": "Midland, Ontario, Canada (L4R)" },
          { "@type": "Place", "name": "Penetanguishene, Ontario, Canada (L9M)" }
        ],
        "openingHours": [
          "Mo-Fr 07:00-17:00",
          "Sa 10:00-14:00"
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "07:00",
            "closes": "17:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "10:00",
            "closes": "14:00"
          }
        ],
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Sunday hours",
            "value": "By appointment only"
          }
        ],
        "hasCredential": [
          "WSIB Covered",
          "$5 Million Liability Insurance",
          "Painting Contractors Association Member"
        ],
        "knowsAbout": [
          "Interior Painting",
          "Exterior Painting",
          "Commercial Painting",
          "Institutional Painting",
          "Cabinet Refinishing",
          "Deck & Fence Staining",
          "Epoxy Coatings",
          "GoNano Nanotechnology Coatings",
          "Wallpaper Installation",
          "Wallpaper Removal",
          "Spray Painting and Spray Finishing",
          "Power Washing"
        ],
        "sameAs": [
          businessInfo.urls.instagram,
          businessInfo.urls.facebook,
          businessInfo.urls.linkedin,
          businessInfo.urls.googleBusiness
        ]
      },
      // === SERVICE ENTITIES ===
      // Residential Painting — no URL (no dedicated page exists)
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-residential-painting`,
        "name": "Residential Painting",
        "serviceType": "Residential painting",
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": [
          { "@type": "Place", "name": "Muskoka District, Ontario, Canada" },
          { "@type": "Place", "name": "Parry Sound District, Ontario, Canada" },
          { "@type": "Place", "name": "Simcoe County, Ontario, Canada" }
        ]
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-interior-painting`,
        "name": "Interior Painting",
        "serviceType": "Interior painting",
        "url": `${siteUrl}/interior-painting`,
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-exterior-painting`,
        "name": "Exterior Painting",
        "serviceType": "Exterior painting",
        "url": `${siteUrl}/exterior-painting`,
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-commercial-painting`,
        "name": "Commercial Painting",
        "serviceType": "Commercial painting",
        "url": `${siteUrl}/commercial-painting`,
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": [
          { "@type": "Place", "name": "Muskoka District, Ontario, Canada" },
          { "@type": "Place", "name": "Parry Sound District, Ontario, Canada" },
          { "@type": "Place", "name": "Simcoe County, Ontario, Canada" }
        ]
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-cabinet-refinishing`,
        "name": "Cabinet Painting and Refinishing",
        "serviceType": "Cabinet painting and refinishing",
        "url": `${siteUrl}/cabinet-refinishing`,
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-deck-staining`,
        "name": "Deck and Fence Staining",
        "serviceType": "Deck and fence staining",
        "url": `${siteUrl}/deck-staining`,
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-spray-finishing`,
        "name": "Spray Painting and Spray Finishing",
        "serviceType": "Spray painting / spray finishing",
        "url": `${siteUrl}/spray-finishing`,
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-wallpaper-removal`,
        "name": "Wallpaper Removal",
        "serviceType": "Wallpaper removal",
        "url": `${siteUrl}/wallpaper-removal`,
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-epoxy`,
        "name": "Epoxy Coatings",
        "serviceType": "Epoxy coatings (e.g., floors)",
        "url": `${siteUrl}/epoxy-coatings`,
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-gonano`,
        "name": "GoNano Permanent Coating",
        "serviceType": "Nanotechnology protective coating",
        "url": `${siteUrl}/gonano-coating`,
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      }
    ]
  };

  // WebApplication Schema (AI Estimator)
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Roll On Painting AI Cost Estimator",
    "description": "Get an instant, AI-powered painting cost estimate for your home or commercial project in Muskoka. No obligation, accurate quotes in seconds.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CAD",
      "description": "Free instant painting estimate"
    },
    "provider": {
      "@type": "ProfessionalService",
      "name": businessInfo.name,
      "url": `${siteUrl}/`
    },
    "featureList": [
      "Instant AI-powered estimates",
      "Interior and exterior painting costs",
      "Commercial painting quotes",
      "No obligation required"
    ]
  };

  // TV Appearance Schema
  const tvAppearanceSchema = {
    "@context": "https://schema.org",
    "@type": "TVEpisode",
    "name": `${businessInfo.tvAppearance.show} - Season ${businessInfo.tvAppearance.season}, Episode ${businessInfo.tvAppearance.episode}`,
    "partOfSeries": {
      "@type": "TVSeries",
      "name": businessInfo.tvAppearance.show
    },
    "episodeNumber": businessInfo.tvAppearance.episode,
    "partOfSeason": {
      "@type": "TVSeason",
      "seasonNumber": businessInfo.tvAppearance.season
    },
    "datePublished": "2023-10",
    "description": businessInfo.tvAppearance.description,
    "productionCompany": {
      "@type": "Organization",
      "name": businessInfo.tvAppearance.network,
      "url": businessInfo.tvAppearance.networkUrl
    },
    "mentions": {
      "@type": "ProfessionalService",
      "name": businessInfo.name
    }
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
      { "@type": "ListItem", "position": 2, "name": "AI Painting Estimate", "item": `${siteUrl}/#ai-estimator` },
      { "@type": "ListItem", "position": 3, "name": "Services", "item": `${siteUrl}/#services` },
      { "@type": "ListItem", "position": 4, "name": "Pricing", "item": `${siteUrl}/#pricing` },
      { "@type": "ListItem", "position": 5, "name": "FAQ", "item": `${siteUrl}/#faq` },
      { "@type": "ListItem", "position": 6, "name": "Contact", "item": `${siteUrl}/#contact` }
    ]
  };

  return (
    <Helmet>
      <title>{businessInfo.name} | {businessInfo.tagline}</title>
      <meta name="description" content={`${businessInfo.description} As seen on HGTV! Free touch-ups, WSIB covered, $5M liability insurance. Call ${businessInfo.phone.formatted}.`} />
      
      {/* Security headers */}
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={`${siteUrl}/`} />
      
      {/* Referrer Policy */}
      <meta name="referrer" content="no-referrer-when-downgrade" />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${businessInfo.name} | ${businessInfo.tagline}`} />
      <meta property="og:description" content={businessInfo.description} />
      <meta property="og:url" content={`${siteUrl}/`} />
      <meta property="og:site_name" content={businessInfo.name} />
      <meta property="og:locale" content="en_CA" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="CA-ON" />
      <meta name="geo.placename" content="Port Sydney, Muskoka" />
      <meta name="geo.position" content={`${businessInfo.geo.latitude};${businessInfo.geo.longitude}`} />
      <meta name="ICBM" content={`${businessInfo.geo.latitude}, ${businessInfo.geo.longitude}`} />
      
      {/* Consolidated Structured Data — single @graph */}
      <script type="application/ld+json">
        {JSON.stringify(consolidatedSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(webAppSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(tvAppearanceSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default SEOHelmet;
