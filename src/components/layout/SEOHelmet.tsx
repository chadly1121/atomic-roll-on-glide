
import React from 'react';
import { Helmet } from "react-helmet-async";

const SEOHelmet: React.FC = () => {
  return (
    <Helmet>
      <title>Roll On Painting | rollonpainting.com</title>
      <meta name="description" content="Professional painting services in Muskoka including interior, exterior, commercial, and GoNano permanent coating. Free touch-ups and expert service." />
      
      {/* Security headers for SSL compatibility across devices */}
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
      
      {/* Force HTTPS for all connections */}
      <link rel="canonical" href="https://rollonpainting.com/" />
      
      {/* Add secure connection preference */}
      <meta name="referrer" content="no-referrer-when-downgrade" />
      
      {/* BreadcrumbList schema for SEO */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://rollonpainting.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "AI Painting Estimate",
                "item": "https://rollonpainting.com/#ai-estimator"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Services",
                "item": "https://rollonpainting.com/#services"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Contact",
                "item": "https://rollonpainting.com/#contact"
              },
              {
                "@type": "ListItem",
                "position": 5,
                "name": "As Seen on TV",
                "item": "https://rollonpainting.com/#asseenontv"
              }
            ]
          }
        `}
      </script>
      
      {/* AI Estimator WebApplication schema for SEO */}
      <script type="application/ld+json">
        {`
          {
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
              "name": "Roll On Painting",
              "url": "https://rollonpainting.com"
            },
            "featureList": [
              "Instant AI-powered estimates",
              "Interior and exterior painting costs",
              "Commercial painting quotes",
              "No obligation required"
            ]
          }
        `}
      </script>
      
      {/* Organization schema for business info */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Roll On Painting",
            "image": "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745866797/IMG_20190920_121835_fchin4.jpg",
            "logo": "https://rollonpainting.com/logo.png",
            "url": "https://rollonpainting.com",
            "telephone": "+1-705-555-1234",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Muskoka Road",
              "addressLocality": "Muskoka",
              "addressRegion": "ON",
              "postalCode": "P1H 1A1",
              "addressCountry": "CA"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 45.0,
              "longitude": -79.0
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "08:00",
                "closes": "17:00"
              }
            ],
            "sameAs": [
              "https://www.facebook.com/rollonpainting",
              "https://www.instagram.com/rollonpainting"
            ],
            "award": [
              "Best of Muskoka 2024",
              "PCA Certified Painters"
            ],
            "hasCredential": [
              "Licensed Professional Painters",
              "Fully Insured"
            ],
            "specialty": [
              "Interior Painting",
              "Exterior Painting",
              "Commercial Painting",
              "GoNano Permanent Coating",
              "As Seen on HGTV"
            ]
          }
        `}
      </script>
      
      {/* Review aggregate for trust signals */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "AggregateRating",
            "itemReviewed": {
              "@type": "ProfessionalService",
              "name": "Roll On Painting",
              "image": "https://rollonpainting.com/logo.png"
            },
            "ratingValue": "4.9",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "87",
            "reviewCount": "87"
          }
        `}
      </script>
      
      {/* TV Appearance Schema */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "TVSeries",
            "name": "Scott's Vacation House Rules",
            "productionCompany": {
              "@type": "Organization",
              "name": "Home Network"
            },
            "episode": {
              "@type": "TVEpisode",
              "episodeNumber": "7",
              "seasonNumber": "6",
              "name": "Muskoka Property Renovation",
              "description": "Episode featuring Roll On Painting's professional services"
            },
            "sameAs": "https://www.homenetwork.ca/scotts-vacation-house-rules/"
          }
        `}
      </script>
    </Helmet>
  );
};

export default SEOHelmet;
