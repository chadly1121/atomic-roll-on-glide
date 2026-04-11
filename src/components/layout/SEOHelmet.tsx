import React from 'react';
import { Helmet } from "react-helmet-async";
import { businessInfo, verifiedFAQs } from '@/data/businessInfo';

/**
 * AISO-Optimized SEO Helmet
 * 
 * Consolidated JSON-LD structured data for AI search engines.
 * Includes WebSite + SearchAction, Organization, LocalBusiness,
 * all Services, FAQPage, and SpeakableSpecification.
 * 
 * NOTE: index.html contains a STATIC copy of core schema for crawlers
 * that don't execute JS. Keep both in sync.
 */
const SEOHelmet: React.FC = () => {
  const logoUrl = "https://rollonpainting.com/lovable-uploads/9058a595-b38f-4cdc-893a-19baaccf57d5.webp?v=pink";
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
      // Organization (hasCredential and knowsAbout are valid here)
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
        "hasCredential": [
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "certificate", "name": "WSIB Covered" },
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "certificate", "name": "$5 Million Liability Insurance" },
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "membership", "name": "Painting Contractors Association Member" }
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
        "sameAs": [
          businessInfo.urls.instagram,
          businessInfo.urls.facebook,
          businessInfo.urls.linkedin,
          businessInfo.urls.googleBusiness
        ],
        "review": [
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Jacki Hart" },
            "reviewBody": "I never call anyone other than the great team at Roll On Painting - especially for the tough jobs that I can't do myself. They are detail oriented, meticulous on their after care clean up, leave my walls trim and house exterior looking like brand new... They have painted four different homes for me over the past ten years. Chad leads his team with passion, technical expertise and precision. They are second to none.",
            "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5, "worstRating": 1 },
            "datePublished": "2024-09-01"
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "David Tattle" },
            "reviewBody": "Chad and his team went the extra mile at every turn. They provide a high quality product and they are a pleasure having them in your home! Highly recommend!!!!!",
            "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5, "worstRating": 1 },
            "datePublished": "2024-03-01"
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "John Chapman" },
            "reviewBody": "Chad and all the Roll On crew were knowledgeable efficient and courteous! The amount of moss algae and accumulated pine needles over the last 20 years was considerable and ugly. After four days of effort our roof is almost new again! We wholeheartedly recommend Roll On",
            "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5, "worstRating": 1 },
            "datePublished": "2024-06-01"
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Leo Ciccone" },
            "reviewBody": "Great job, had whole exterior of cottage and garage done. They came when they said they would, neat and tidy, would highly recommend.",
            "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5, "worstRating": 1 },
            "datePublished": "2024-01-24"
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Ray Rahni" },
            "reviewBody": "I'm a painting contractor in New York and have known Chad throughout the years in our trade association and other professional business organizations we both belong to. I've come to know and trust him as a skillful craftsman and someone you can count on when it comes to anything painting or staining. He's been always willing to share his knowledge with others in regards to wood preservation, staining, and painting. I won't hesitate to recommend Roll on Painting to anyone looking to hire professional company for their next interior or exterior painting.",
            "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5, "worstRating": 1 },
            "datePublished": "2023-01-28"
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Steve Warren" },
            "reviewBody": "Chad is very professional and gets the job done right.",
            "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5, "worstRating": 1 },
            "datePublished": "2023-01-26"
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Kevin Brumpton" },
            "reviewBody": "Amazing company, delivers fantastic quality at a competitive price point.",
            "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5, "worstRating": 1 },
            "datePublished": "2024-01-01"
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Jeff McLeod" },
            "reviewBody": "I'm the owner of a residential painting company in Toronto. Roll On Painting delivers professional quality work.",
            "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5, "worstRating": 1 },
            "datePublished": "2024-01-01"
          }
        ]
      },
      // Dockside Magazine & Media authority schema
      {
        "@type": "Article",
        "@id": `${siteUrl}/#dockside-press`,
        "name": "Roll On Painting in Dockside Magazine",
        "description": "Roll On Painting and Muskoka Softwash have been featured 15 times in Dockside Magazine, Muskoka's premier cottage and lifestyle publication.",
        "publisher": { "@type": "Organization", "name": "Dockside Magazine", "url": "https://www.docksidepublishing.com" },
        "about": { "@id": `${siteUrl}/#localbusiness` },
        "url": "https://www.docksidepublishing.com/?s=roll+on+painting",
        "headline": "Roll On Painting in Dockside Magazine",
        "datePublished": "2020-01-01"
      },
      // HGTV / Home Network media authority schema
      {
        "@type": "TVSeries",
        "@id": `${siteUrl}/#hgtv-appearances`,
        "name": "Scott's Vacation House Rules",
        "description": "Roll On Painting has been featured 5 times on Scott's Vacation House Rules (Home Network / HGTV Canada), providing painting, staining, and wallpapering for Muskoka cottage renovations. Episodes: Whimsical Woodlands (S6E3), Bayside Bungalow (S4E5), Lakeside Landing (S5E8), Heritage Hideaway (S4 Finale), European Villa (S3E13).",
        "productionCompany": { "@type": "Organization", "name": "Home Network (formerly HGTV Canada)" },
        "actor": { "@type": "Person", "name": "Scott McGillivray" },
        "url": "https://www.homenetwork.ca/scotts-vacation-house-rules/",
        "mentions": { "@id": `${siteUrl}/#localbusiness` }
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
      // WebPage with SpeakableSpecification for voice search / AI overviews
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
          "cssSelector": ["h1", "h2"]
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
      // VideoObject for gallery videos
      {
        "@type": "VideoObject",
        "@id": `${siteUrl}/#video-cabinet-refinishing`,
        "name": "Kitchen Cabinet Refinishing Process — Roll On Painting",
        "description": "Watch Roll On Painting's professional kitchen cabinet refinishing process. From sanding and priming to spray finishing, see how we transform dated cabinets in Muskoka.",
        "thumbnailUrl": `${siteUrl}/lovable-uploads/cabinet-spray-finish-action.webp`,
        "contentUrl": `${siteUrl}/lovable-uploads/cabinet-repaint-video.mp4`,
        "uploadDate": "2025-06-01",
        "duration": "PT1M30S",
        "publisher": {
          "@type": "Organization",
          "name": businessInfo.name,
          "logo": {
            "@type": "ImageObject",
            "url": logoUrl,
            "width": 400,
            "height": 100
          }
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
    "featureList": "Instant AI-powered estimates, Interior and exterior painting costs, Commercial painting quotes, No obligation required"
  };

  return (
    <Helmet>
      <title>Painters Muskoka | HGTV Featured | Huntsville, Bracebridge & Gravenhurst — Roll On Painting</title>
      <meta name="description" content="Muskoka's #1 rated painters. HGTV featured, $5M insured, WSIB covered. Interior, exterior, cabinet & cottage painting. Free touch-ups for life. Call 705-787-1401 for a free estimate." />
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
      <meta httpEquiv="Content-Language" content="en-CA" />
      
      {/* Robots directives */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Referrer Policy */}
      <meta name="referrer" content="no-referrer-when-downgrade" />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Painters Muskoka | HGTV Featured | Roll On Painting" />
      <meta property="og:description" content="Muskoka's #1 rated painters. HGTV featured, $5M insured. Interior, exterior, cabinet & cottage painting. Free touch-ups for life. 705-787-1401." />
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
    </Helmet>
  );
};

export default SEOHelmet;
