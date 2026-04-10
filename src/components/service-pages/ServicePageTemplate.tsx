import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import { businessInfo } from '@/data/businessInfo';
import { ServicePageData } from '@/data/servicePages';
import AIAnswerBlock from './AIAnswerBlock';
import ServiceGallery from './ServiceGallery';
import ServicePageInternalLinks from './ServicePageInternalLinks';
import DocksideArticlesBlock from './DocksideArticlesBlock';
import PrivateClientBanner from '@/components/conversion/PrivateClientBanner';
import GTACottageOwnersBlock from '@/components/conversion/GTACottageOwnersBlock';
import PrivateClientWhisper from '@/components/conversion/PrivateClientWhisper';

interface ServicePageTemplateProps {
  service: ServicePageData;
}

/**
 * Service Page Template — AISO-optimized
 * 
 * Includes: Service schema, FAQPage schema, BreadcrumbList,
 * SpeakableSpecification, OG/Twitter cards, and semantic HTML.
 */
const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({ service }) => {
  const siteUrl = "https://www.roll-onpainting.com";
  const serviceUrl = `${siteUrl}/${service.slug}`;
  const ogImage = "https://res.cloudinary.com/dxqfou8jh/image/upload/f_auto,q_80,w_1200/v1745866797/IMG_20190920_121835_fchin4.jpg";

  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Service
      {
        "@type": "Service",
        "@id": `${serviceUrl}/#service`,
        "name": service.name,
        "description": service.description,
        "provider": { "@type": "ProfessionalService", "@id": `${siteUrl}/#localbusiness`, "name": businessInfo.name },
        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" },
        "serviceType": service.name,
      },
      // WebPage with Speakable + Breadcrumb
      {
        "@type": "WebPage",
        "@id": `${serviceUrl}/#webpage`,
        "url": serviceUrl,
        "name": `${service.name} | Roll On Painting`,
        "isPartOf": { "@id": `${siteUrl}/#website` },
        "about": { "@id": `${serviceUrl}/#service` },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".ai-answer-block", ".service-hero"]
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": `${siteUrl}/#services` },
            { "@type": "ListItem", "position": 3, "name": service.name, "item": serviceUrl }
          ]
        }
      },
    ]
  };

  return (
    <>
      <Helmet>
        <title>{service.name} | Roll On Painting | Muskoka</title>
        <meta name="description" content={service.metaDescription} />
        <meta name="keywords" content={`${service.name.toLowerCase()}, ${service.name.toLowerCase()} Muskoka, ${service.name.toLowerCase()} Huntsville, ${service.name.toLowerCase()} Bracebridge, painters Muskoka, painting contractor Ontario, Roll On Painting`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={serviceUrl} />
        
        {/* Canadian geo-targeting */}
        <link rel="alternate" hrefLang="en-CA" href={serviceUrl} />
        <link rel="alternate" hrefLang="en" href={serviceUrl} />
        <link rel="alternate" hrefLang="x-default" href={serviceUrl} />
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Muskoka, Ontario" />
        <meta name="geo.position" content="45.3501;-79.2168" />
        <meta name="ICBM" content="45.3501, -79.2168" />
        <meta httpEquiv="Content-Language" content="en-CA" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${service.name} | Roll On Painting Muskoka`} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:url" content={serviceUrl} />
        <meta property="og:site_name" content={businessInfo.name} />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${service.name} | Roll On Painting`} />
        <meta name="twitter:description" content={service.metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        
        <script type="application/ld+json">{JSON.stringify(graphSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
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
          <section className="service-hero bg-gradient-to-b from-atomic-navy to-atomic-navy/90 text-white py-16 md:py-24" aria-labelledby="service-heading">
            <div className="container mx-auto px-4 text-center">
              <span className="inline-block px-3 py-1 bg-atomic-turquoise/20 text-atomic-turquoise text-sm font-medium rounded-full mb-4 capitalize">
                {service.category} Service
              </span>
              <h1 id="service-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{service.headline}</h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">{service.description}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-atomic-orange text-white px-8 py-3.5 rounded-lg font-bold text-lg hover:bg-atomic-orange/90 transition-colors shadow-lg">
                  Book Your Free Estimate
                </Link>
                <a href={`tel:${businessInfo.phone.tel}`} className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                  <Phone className="w-4 h-4" />Call {businessInfo.phone.formatted}
                </a>
              </div>
              <PrivateClientWhisper variant="dark" className="text-center mt-4" />
            </div>
          </section>

          <AIAnswerBlock {...service.aiAnswerBlock} />

          {(service.galleryImages?.length || service.galleryVideos?.length) && (
            <ServiceGallery
              images={service.galleryImages || []}
              videos={service.galleryVideos || []}
              serviceName={service.name}
            />
          )}

          {/* Mid-page CTA with urgency */}
          <section className="py-10 bg-atomic-orange/5 border-y border-atomic-orange/10">
            <div className="container mx-auto px-4 text-center">
              <p className="text-lg font-semibold text-atomic-navy mb-2">
                🔥 Summer booking fills fast in Muskoka — secure your spot now
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-atomic-orange text-white px-6 py-3 rounded-lg font-medium hover:bg-atomic-orange/90 transition-colors">
                  Get a Fast Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <a href={`tel:${businessInfo.phone.tel}`} className="inline-flex items-center gap-2 text-atomic-navy font-medium hover:text-atomic-orange transition-colors">
                  <Phone className="w-4 h-4" />Call {businessInfo.phone.formatted}
                </a>
              </div>
            </div>
          </section>

          {service.benefits && (
            <section className="py-12" aria-labelledby="benefits-heading">
              <div className="container mx-auto px-4">
                <h2 id="benefits-heading" className="text-2xl font-bold text-atomic-navy text-center mb-8">Why Choose Roll On Painting for {service.name}</h2>
                <div className="max-w-3xl mx-auto">
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                        <CheckCircle className="w-5 h-5 text-atomic-turquoise flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Process section */}
          {service.process && (
            <section className="py-12 bg-white" aria-labelledby="process-heading">
              <div className="container mx-auto px-4">
                <h2 id="process-heading" className="text-2xl font-bold text-atomic-navy text-center mb-3">Our {service.name} Process</h2>
                <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">Here's exactly what happens when you hire Roll On Painting — no guesswork, no surprises.</p>
                <div className="max-w-3xl mx-auto space-y-4">
                  {service.process.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start bg-gray-50 p-5 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-atomic-navy text-white flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-atomic-navy mb-1">{item.step}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {service.faqs && (
            <section className="py-12 bg-gray-50" aria-labelledby="service-faq-heading">
              <div className="container mx-auto px-4">
                <h2 id="service-faq-heading" className="text-2xl font-bold text-atomic-navy text-center mb-8">Frequently Asked Questions About {service.name}</h2>
                <div className="max-w-3xl mx-auto space-y-4">
                  {service.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-atomic-navy mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <DocksideArticlesBlock serviceSlug={service.slug} serviceName={service.name} />

          <PrivateClientBanner />

          {service.slug === 'cottage-painting-muskoka' && (
            <GTACottageOwnersBlock />
          )}

          <ServicePageInternalLinks currentSlug={service.slug} />

          <section className="py-16 bg-atomic-navy text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Contact Roll On Painting today for a free, no-obligation quote on your {service.name.toLowerCase()} project.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-8 py-3 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors">
                  Request a Quote
                </Link>
                <a href={`mailto:${businessInfo.email}`} className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />{businessInfo.email}
                </a>
              </div>
              <PrivateClientWhisper variant="dark" className="text-center mt-4" />
            </div>
          </section>
        </main>

        <footer className="bg-atomic-navy/95 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/70 text-sm">© {new Date().getFullYear()} {businessInfo.legalName}. All rights reserved.</p>
            <p className="text-white/50 text-xs mt-2">{businessInfo.address.full} | WSIB Covered | $5M Liability Insurance</p>
            <div className="mt-4">
              <Link to="/service-areas" className="text-white/50 text-xs hover:text-white/70">View All Service Areas</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ServicePageTemplate;
