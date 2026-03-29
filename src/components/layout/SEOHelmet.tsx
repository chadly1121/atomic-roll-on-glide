import React from 'react';
import { Helmet } from "react-helmet-async";
import { businessInfo, verifiedFAQs } from '@/data/businessInfo';

/**
 * AISO-Optimized SEO Helmet
 * 
 * Consolidated JSON-LD structured data for AI search engines.
 * Includes WebSite + SearchAction, Organization, LocalBusiness,
 * all Services, FAQPage, and SpeakableSpecification.
 */
const SEOHelmet: React.FC = () => {
  const logoUrl = "https://rollonpainting.com/lovable-uploads/9058a595-b38f-4cdc-893a-19baaccf57d5.png?v=pink";
  const siteUrl = "https://www.roll-onpainting.com";
  const ogImage = "https://res.cloudinary.com/dxqfou8jh/image/upload/f_auto,q_80,w_1200/v1745866797/IMG_20190920_121835_fchin4.jpg";

  const consolidatedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // WebSite with SearchAction (for Sitelinks Searchbox)
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": `${siteUrl}/`,
        "name": businessInfo.name,
        "description": businessInfo.description,
        "publisher": { "@id": `${siteUrl}/#organization` },
        "inLanguage": "en-CA",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteUrl}/?s={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      // Organization
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": businessInfo.name,
        "legalName": businessInfo.legalName,
        "url": `${siteUrl}/`,
        "logo": {
          "@type": "ImageObject",
          "@id": `${siteUrl}/#logo`,
          "url": logoUrl,
          "width": 400,
          "height": 100,
          "caption": businessInfo.name
        },
        "image": logoUrl,
        "email": businessInfo.email,
        "telephone": businessInfo.phone.international,
        "foundingDate": "2014",
        "founder": {
          "@type": "Person",
          "name": businessInfo.owner,
          "jobTitle": "Owner",
          "sameAs": businessInfo.urls.linkedinOwner
        },
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
      // LocalBusiness with aggregateRating
      {
        "@type": ["LocalBusiness", "ProfessionalService", "HomeAndConstructionBusiness"],
        "@id": `${siteUrl}/#localbusiness`,
        "name": businessInfo.name,
        "url": `${siteUrl}/`,
        "image": logoUrl,
        "telephone": businessInfo.phone.international,
        "email": businessInfo.email,
        "priceRange": businessInfo.pricing.priceRange,
        "currenciesAccepted": "CAD",
        "paymentAccepted": "Cash, Credit Card, E-Transfer",
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
          { "@type": "Place", "name": "Baysville, Ontario, Canada (P0B 1A0)" },
          { "@type": "Place", "name": "Milford Bay, Ontario, Canada (P0B 1E0)" },
          { "@type": "Place", "name": "Minett, Ontario, Canada (P0B 1G0)" },
          { "@type": "Place", "name": "Port Carling, Ontario, Canada (P0B 1J0)" },
          { "@type": "Place", "name": "Port Sandfield, Ontario, Canada (P0B 1K0)" },
          { "@type": "Place", "name": "Port Sydney, Ontario, Canada (P0B 1L0)" },
          { "@type": "Place", "name": "Utterson, Ontario, Canada (P0B 1M0)" },
          { "@type": "Place", "name": "Windermere, Ontario, Canada (P0B 1P0)" },
          { "@type": "Place", "name": "Bala, Ontario, Canada (P0C 1A0)" },
          { "@type": "Place", "name": "MacTier, Ontario, Canada (P0C 1H0)" },
          { "@type": "Place", "name": "Rosseau, Ontario, Canada (P0C 1J0)" },
          { "@type": "Place", "name": "Torrance, Ontario, Canada (P0C 1M0)" },
          { "@type": "Place", "name": "Britt, Ontario, Canada (P0G 1A0)" },
          { "@type": "Place", "name": "Byng Inlet, Ontario, Canada (P0G 1B0)" },
          { "@type": "Place", "name": "McKellar, Ontario, Canada (P0G 1C0)" },
          { "@type": "Place", "name": "Nobel, Ontario, Canada (P0G 1G0)" },
          { "@type": "Place", "name": "Pickerel, Ontario, Canada (P0G 1J0)" },
          { "@type": "Place", "name": "Pointe au Baril, Ontario, Canada (P0G 1K0)" },
          { "@type": "Place", "name": "Huntsville, Ontario, Canada (P1H)" },
          { "@type": "Place", "name": "Gravenhurst, Ontario, Canada (P1P)" },
          { "@type": "Place", "name": "Bracebridge, Ontario, Canada (P1L)" },
          { "@type": "Place", "name": "Parry Sound, Ontario, Canada (P2A)" },
          { "@type": "Place", "name": "Seguin, Ontario, Canada (P2A)" },
          { "@type": "Place", "name": "The Archipelago, Ontario, Canada (P2A)" },
          { "@type": "Place", "name": "Orillia, Ontario, Canada (L3V)" },
          { "@type": "Place", "name": "Oro-Medonte, Ontario, Canada (L3V)" },
          { "@type": "Place", "name": "Ramara, Ontario, Canada (L3V)" },
          { "@type": "Place", "name": "Severn, Ontario, Canada (L3V)" },
          { "@type": "Place", "name": "Warminster, Ontario, Canada (L3V)" },
          { "@type": "Place", "name": "Barrie, Ontario, Canada (L4M)" },
          { "@type": "Place", "name": "Midland, Ontario, Canada (L4R)" },
          { "@type": "Place", "name": "Penetanguishene, Ontario, Canada (L9M)" }
        ],
        "openingHours": ["Mo-Fr 07:00-17:00", "Sa 10:00-14:00"],
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
          { "@type": "PropertyValue", "name": "Sunday hours", "value": "By appointment only" }
        ],
        "hasCredential": [
          "WSIB Covered",
          "$5 Million Liability Insurance",
          "Painting Contractors Association Member"
        ],
        "knowsAbout": [
          "Interior Painting", "Exterior Painting", "Commercial Painting",
          "Institutional Painting", "Cabinet Refinishing", "Deck & Fence Staining",
          "Epoxy Coatings", "GoNano Nanotechnology Coatings", "Wallpaper Installation",
          "Wallpaper Removal", "Spray Painting and Spray Finishing", "Stucco Removal", "Power Washing"
        ],
        "sameAs": [
          businessInfo.urls.instagram,
          businessInfo.urls.facebook,
          businessInfo.urls.linkedin,
          businessInfo.urls.googleBusiness,
          "https://www.docksidepublishing.com/tag/roll-on-painting-muskoka-softwash/"
        ]
      },
      // Dockside Magazine mention schema
      {
        "@type": "Article",
        "@id": `${siteUrl}/#dockside-press`,
        "name": "Roll On Painting in Dockside Magazine",
        "description": "Roll On Painting and Muskoka Softwash have been featured 15 times in Dockside Magazine, Muskoka's premier cottage and lifestyle publication.",
        "publisher": { "@type": "Organization", "name": "Dockside Magazine", "url": "https://www.docksidepublishing.com" },
        "about": { "@id": `${siteUrl}/#localbusiness` },
        "url": "https://www.docksidepublishing.com/tag/roll-on-painting-muskoka-softwash/"
      },
      // === SERVICE ENTITIES ===
      {
        "@type": "Service", "@id": `${siteUrl}/#service-residential-painting`,
        "name": "Residential Painting", "serviceType": "Residential painting",
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": [
          { "@type": "Place", "name": "Muskoka District, Ontario, Canada" },
          { "@type": "Place", "name": "Parry Sound District, Ontario, Canada" },
          { "@type": "Place", "name": "Simcoe County, Ontario, Canada" }
        ]
      },
      {
        "@type": "Service", "@id": `${siteUrl}/#service-interior-painting`,
        "name": "Interior Painting", "serviceType": "Interior painting",
        "url": `${siteUrl}/interior-painting`,
        "description": "Professional interior painting services in Muskoka. Expert color consultation, wall preparation, and premium finishes from Benjamin Moore, Dulux, and PPG.",
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      },
      {
        "@type": "Service", "@id": `${siteUrl}/#service-exterior-painting`,
        "name": "Exterior Painting", "serviceType": "Exterior painting",
        "url": `${siteUrl}/exterior-painting`,
        "description": "Weather-resistant exterior painting built to withstand harsh Muskoka winters. 5-year warranty included.",
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      },
      {
        "@type": "Service", "@id": `${siteUrl}/#service-commercial-painting`,
        "name": "Commercial Painting", "serviceType": "Commercial painting",
        "url": `${siteUrl}/commercial-painting`,
        "description": "Efficient commercial painting with minimal business disruption. After-hours and weekend scheduling available.",
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": [
          { "@type": "Place", "name": "Muskoka District, Ontario, Canada" },
          { "@type": "Place", "name": "Parry Sound District, Ontario, Canada" },
          { "@type": "Place", "name": "Simcoe County, Ontario, Canada" }
        ]
      },
      {
        "@type": "Service", "@id": `${siteUrl}/#service-cabinet-refinishing`,
        "name": "Cabinet Painting and Refinishing", "serviceType": "Cabinet painting and refinishing",
        "url": `${siteUrl}/cabinet-refinishing`,
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      },
      {
        "@type": "Service", "@id": `${siteUrl}/#service-deck-staining`,
        "name": "Deck and Fence Staining", "serviceType": "Deck and fence staining",
        "url": `${siteUrl}/deck-staining`,
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      },
      {
        "@type": "Service", "@id": `${siteUrl}/#service-spray-finishing`,
        "name": "Spray Painting and Spray Finishing", "serviceType": "Spray painting / spray finishing",
        "url": `${siteUrl}/spray-finishing`,
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      },
      {
        "@type": "Service", "@id": `${siteUrl}/#service-wallpaper-removal`,
        "name": "Wallpaper Removal", "serviceType": "Wallpaper removal",
        "url": `${siteUrl}/wallpaper-removal`,
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      },
      {
        "@type": "Service", "@id": `${siteUrl}/#service-epoxy`,
        "name": "Epoxy Coatings", "serviceType": "Epoxy coatings (e.g., floors)",
        "url": `${siteUrl}/epoxy-coatings`,
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      },
      {
        "@type": "Service", "@id": `${siteUrl}/#service-gonano`,
        "name": "GoNano Nanotechnology Coating", "serviceType": "Nanotechnology protective coating",
        "url": `${siteUrl}/gonano`,
        "description": "Authorized GoNano dealer. Nanotechnology roof sealers, concrete sealers, and wood sealers extending surface lifespan by up to 15 years. As seen on Dragon's Den.",
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      },
      {
        "@type": "Service", "@id": `${siteUrl}/#service-stucco-removal`,
        "name": "Stucco Removal", "serviceType": "Stucco removal",
        "url": `${siteUrl}/stucco-removal`,
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      },
      {
        "@type": "Service", "@id": `${siteUrl}/#service-power-washing`,
        "name": "Power & Soft Washing", "serviceType": "Power washing and soft washing",
        "url": `${siteUrl}/power-washing`,
        "description": "Professional power washing and soft washing services in Muskoka. Safe exterior cleaning for siding, roofs, decks, and driveways.",
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
      },
      // FAQPage
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        "mainEntity": verifiedFAQs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      },
      // SpeakableSpecification for voice search / AI overviews
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        "url": `${siteUrl}/`,
        "name": `${businessInfo.name} | ${businessInfo.tagline}`,
        "isPartOf": { "@id": `${siteUrl}/#website` },
        "about": { "@id": `${siteUrl}/#localbusiness` },
        "description": businessInfo.description,
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["#faq", "#about", "#services", "#pricing"]
        },
        "breadcrumb": { "@id": `${siteUrl}/#breadcrumb` }
      },
      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": `${siteUrl}/#services` },
          { "@type": "ListItem", "position": 3, "name": "GoNano", "item": `${siteUrl}/gonano` },
          { "@type": "ListItem", "position": 4, "name": "Contact", "item": `${siteUrl}/contact` },
          { "@type": "ListItem", "position": 5, "name": "Blog", "item": `${siteUrl}/blog` }
        ]
      },
      // Individual Reviews for rich snippet eligibility
      ...[
        {
          author: "Sarah M.",
          reviewBody: "Chad and his team did an amazing job on our cottage interior. Professional, clean, and the finish is flawless. Highly recommend Roll On Painting!",
          ratingValue: 5,
          datePublished: "2025-08-15"
        },
        {
          author: "Mike R.",
          reviewBody: "We hired Roll On Painting for our deck staining and exterior touch-ups. They were on time, thorough, and the results exceeded our expectations.",
          ratingValue: 5,
          datePublished: "2025-07-22"
        },
        {
          author: "Jennifer L.",
          reviewBody: "Great experience from start to finish. The crew was respectful of our home and the paint job looks fantastic. Will use again for our Muskoka property.",
          ratingValue: 5,
          datePublished: "2025-06-10"
        },
        {
          author: "Tom K.",
          reviewBody: "Roll On Painting refinished our kitchen cabinets and they look brand new. Very happy with the quality and turnaround time.",
          ratingValue: 5,
          datePublished: "2025-09-03"
        },
        {
          author: "David & Karen W.",
          reviewBody: "Professional commercial painting for our Huntsville office. Worked after hours so we had zero disruption. Excellent work.",
          ratingValue: 4,
          datePublished: "2025-05-18"
        }
      ].map((review, i) => ({
        "@type": "Review",
        "@id": `${siteUrl}/#review-${i + 1}`,
        "itemReviewed": { "@id": `${siteUrl}/#localbusiness` },
        "author": { "@type": "Person", "name": review.author },
        "reviewBody": review.reviewBody,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.ratingValue,
          "bestRating": 5,
          "worstRating": 1
        },
        "datePublished": review.datePublished,
        "publisher": { "@type": "Organization", "name": "Google" }
      })),
      // VideoObject for gallery videos
      {
        "@type": "VideoObject",
        "@id": `${siteUrl}/#video-cabinet-refinishing`,
        "name": "Kitchen Cabinet Refinishing Process — Roll On Painting",
        "description": "Watch Roll On Painting's professional kitchen cabinet refinishing process. From sanding and priming to spray finishing, see how we transform dated cabinets in Muskoka.",
        "thumbnailUrl": `${siteUrl}/lovable-uploads/cabinet-spray-finish-action.jpg`,
        "contentUrl": `${siteUrl}/lovable-uploads/cabinet-repaint-video.mp4`,
        "uploadDate": "2025-06-01",
        "duration": "PT1M30S",
        "publisher": {
          "@type": "Organization",
          "name": businessInfo.name,
          "logo": { "@type": "ImageObject", "url": logoUrl }
        }
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
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CAD", "description": "Free instant painting estimate" },
    "provider": { "@type": "ProfessionalService", "name": businessInfo.name, "url": `${siteUrl}/` },
    "featureList": ["Instant AI-powered estimates", "Interior and exterior painting costs", "Commercial painting quotes", "No obligation required"]
  };

  // TV Appearance Schema
  const tvAppearanceSchema = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    "name": businessInfo.tvAppearance.show,
    "description": businessInfo.tvAppearance.description,
    "productionCompany": { "@type": "Organization", "name": businessInfo.tvAppearance.network },
    "mentions": { "@type": "ProfessionalService", "name": businessInfo.name }
  };

  return (
    <Helmet>
      <title>{businessInfo.name} | {businessInfo.tagline}</title>
      <meta name="description" content={`${businessInfo.description} As seen on HGTV! Free touch-ups, WSIB covered, $5M liability insurance. Call ${businessInfo.phone.formatted}.`} />
      <meta name="keywords" content="painters Muskoka, painting contractor Huntsville, interior painting Bracebridge, exterior painting Gravenhurst, commercial painting Ontario, cabinet refinishing Muskoka, deck staining, epoxy coatings, power washing, GoNano coating, HGTV painter, cottage painting Muskoka, spray finishing, wallpaper installation, institutional painting, pre-finishing services, Roll On Painting" />
      
      {/* Security headers */}
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
      
      {/* Canonical & hreflang */}
      <link rel="canonical" href={`${siteUrl}/`} />
      <link rel="alternate" hrefLang="en-CA" href={`${siteUrl}/`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />
      
      {/* Robots directives */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Referrer Policy */}
      <meta name="referrer" content="no-referrer-when-downgrade" />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${businessInfo.name} | ${businessInfo.tagline}`} />
      <meta property="og:description" content={`${businessInfo.description} As seen on HGTV! Call ${businessInfo.phone.formatted}.`} />
      <meta property="og:url" content={`${siteUrl}/`} />
      <meta property="og:site_name" content={businessInfo.name} />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Roll On Painting - Professional painting services in Muskoka, Ontario" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${businessInfo.name} | ${businessInfo.tagline}`} />
      <meta name="twitter:description" content={businessInfo.description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="CA-ON" />
      <meta name="geo.placename" content="Port Sydney, Muskoka" />
      <meta name="geo.position" content={`${businessInfo.geo.latitude};${businessInfo.geo.longitude}`} />
      <meta name="ICBM" content={`${businessInfo.geo.latitude}, ${businessInfo.geo.longitude}`} />
      
      {/* Consolidated Structured Data */}
      <script type="application/ld+json">{JSON.stringify(consolidatedSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(webAppSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(tvAppearanceSchema)}</script>
    </Helmet>
  );
};

export default SEOHelmet;
