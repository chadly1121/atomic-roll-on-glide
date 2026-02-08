import React from 'react';
import { Helmet } from "react-helmet-async";
import { businessInfo, servicesGrouped, verifiedFAQs } from '@/data/businessInfo';

/**
 * AISO-Optimized SEO Helmet
 * 
 * Contains all structured data (JSON-LD) for AI search engines.
 * All data sourced from verified businessInfo.ts
 */
const SEOHelmet: React.FC = () => {
  const logoUrl = "https://rollonpainting.com/lovable-uploads/9058a595-b38f-4cdc-893a-19baaccf57d5.png?v=pink";
  const siteUrl = "https://www.roll-onpainting.com";

  // Combined @graph schema for cleaner structure
  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": businessInfo.name,
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
        "areaServed": [
          {
            "@type": "AdministrativeArea",
            "name": "Muskoka District, Ontario, Canada"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Ontario, Canada"
          }
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
          "Power Washing"
        ],
        "sameAs": [
          businessInfo.urls.instagram,
          businessInfo.urls.facebook,
          businessInfo.urls.linkedin,
          businessInfo.urls.googleBusiness
        ]
      }
    ]
  };

  // Service Schemas
  const serviceSchemas = [
    ...servicesGrouped.residential,
    ...servicesGrouped.commercial,
    ...servicesGrouped.specialty
  ].map(service => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "ProfessionalService",
      "name": businessInfo.name,
      "url": businessInfo.urls.website
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": businessInfo.geo.latitude,
        "longitude": businessInfo.geo.longitude
      },
      "geoRadius": "50 km"
    },
    "serviceType": "Painting Service"
  }));

  // AggregateRating Schema
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "ProfessionalService",
      "name": businessInfo.name,
      "url": businessInfo.urls.website
    },
    "ratingValue": businessInfo.ratings.average.toString(),
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": businessInfo.ratings.reviewCount.toString(),
    "reviewCount": businessInfo.ratings.reviewCount.toString()
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
      "url": businessInfo.urls.website
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
      { "@type": "ListItem", "position": 1, "name": "Home", "item": businessInfo.urls.website },
      { "@type": "ListItem", "position": 2, "name": "AI Painting Estimate", "item": `${businessInfo.urls.website}/#ai-estimator` },
      { "@type": "ListItem", "position": 3, "name": "Services", "item": `${businessInfo.urls.website}/#services` },
      { "@type": "ListItem", "position": 4, "name": "Pricing", "item": `${businessInfo.urls.website}/#pricing` },
      { "@type": "ListItem", "position": 5, "name": "FAQ", "item": `${businessInfo.urls.website}/#faq` },
      { "@type": "ListItem", "position": 6, "name": "Contact", "item": `${businessInfo.urls.website}/#contact` }
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
      <link rel="canonical" href={`${businessInfo.urls.website}/`} />
      
      {/* Referrer Policy */}
      <meta name="referrer" content="no-referrer-when-downgrade" />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${businessInfo.name} | ${businessInfo.tagline}`} />
      <meta property="og:description" content={businessInfo.description} />
      <meta property="og:url" content={businessInfo.urls.website} />
      <meta property="og:site_name" content={businessInfo.name} />
      <meta property="og:locale" content="en_CA" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="CA-ON" />
      <meta name="geo.placename" content="Port Sydney, Muskoka" />
      <meta name="geo.position" content={`${businessInfo.geo.latitude};${businessInfo.geo.longitude}`} />
      <meta name="ICBM" content={`${businessInfo.geo.latitude}, ${businessInfo.geo.longitude}`} />
      
      {/* Structured Data - Combined Organization & LocalBusiness */}
      <script type="application/ld+json">
        {JSON.stringify(graphSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(aggregateRatingSchema)}
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
      
      {/* Individual Service Schemas */}
      {serviceSchemas.slice(0, 5).map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHelmet;
