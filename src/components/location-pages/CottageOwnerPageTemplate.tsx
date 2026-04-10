import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, CheckCircle, ArrowRight, MapPin, Shield, Star } from 'lucide-react';
import { businessInfo } from '@/data/businessInfo';
import { CottageOwnerPageData } from '@/data/cottageOwnerPages';
import PrivateClientBanner from '@/components/conversion/PrivateClientBanner';
import PrivateClientWhisper from '@/components/conversion/PrivateClientWhisper';

interface CottageOwnerPageTemplateProps {
  page: CottageOwnerPageData;
}

const CottageOwnerPageTemplate: React.FC<CottageOwnerPageTemplateProps> = ({ page }) => {
  const siteUrl = "https://www.roll-onpainting.com";
  const pageUrl = `${siteUrl}/${page.slug}`;
  const ogImage = "https://res.cloudinary.com/dxqfou8jh/image/upload/f_auto,q_80,w_1200/v1745866797/IMG_20190920_121835_fchin4.jpg";

  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        "url": pageUrl,
        "name": page.metaTitle,
        "isPartOf": { "@id": `${siteUrl}/#website` },
        "about": { "@id": `${siteUrl}/#localbusiness` },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".cottage-intro", ".cottage-sections"]
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
            { "@type": "ListItem", "position": 2, "name": "Private Client", "item": `${siteUrl}/private-client-muskoka-property-care` },
            { "@type": "ListItem", "position": 3, "name": `${page.cityName} to Muskoka`, "item": pageUrl }
          ]
        }
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        "name": `Muskoka Cottage Painting for ${page.cityName} Homeowners`,
        "description": page.metaDescription,
        "provider": { "@type": "ProfessionalService", "@id": `${siteUrl}/#localbusiness` },
        "areaServed": { "@type": "AdministrativeArea", "name": "Muskoka, Ontario" },
      },
      {
        "@type": "FAQPage",
        "mainEntity": page.faqs.map(faq => ({
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
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={pageUrl} />
        <link rel="alternate" hrefLang="en-CA" href={pageUrl} />
        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content={businessInfo.name} />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.metaTitle} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={ogImage} />

        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Muskoka, Ontario" />

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
          <section
            className="relative text-white py-24 md:py-32 bg-cover bg-center"
            style={{ backgroundImage: `url(${page.heroImage})` }}
          >
            <div className="absolute inset-0 bg-atomic-navy/75" />
            <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80 text-xs tracking-widest uppercase rounded-full mb-6">
                <MapPin className="w-3 h-3" />
                {page.cityName} → Muskoka
              </div>
              <h1 className="cottage-intro text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
                {page.headline}
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
                {page.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-7 py-3.5 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors shadow-lg"
                >
                  {page.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${businessInfo.phone.tel}`}
                  className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors backdrop-blur-sm"
                >
                  <Phone className="w-4 h-4" />
                  Call {businessInfo.phone.formatted}
                </a>
              </div>
            </div>
          </section>

          {/* Trust bar */}
          <div className="bg-muted/50 border-b border-border py-4">
            <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-500" />
                {businessInfo.ratings.average}/5 Google Rating
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-atomic-turquoise" />
                $5M Insured & WSIB
              </span>
              <span>As Seen on HGTV</span>
              <span>25+ Years Experience</span>
            </div>
          </div>

          {/* Body sections */}
          <div className="cottage-sections">
            {page.sections.map((section, idx) => (
              <section
                key={idx}
                className={`py-14 md:py-18 ${idx % 2 === 1 ? 'bg-muted/40' : 'bg-background'}`}
              >
                <div className="container mx-auto px-4 max-w-3xl">
                  <h2 className="text-2xl font-bold text-atomic-navy mb-4">{section.heading}</h2>
                  <p className="text-muted-foreground leading-relaxed">{section.body}</p>
                </div>
              </section>
            ))}
          </div>

          {/* Internal links */}
          <section className="py-12 bg-muted/30 border-y border-border/50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-lg font-semibold text-atomic-navy mb-5">Related</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/private-client-muskoka-property-care"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-muted-foreground hover:text-atomic-navy hover:border-atomic-navy/20 transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  Private Client Services
                </Link>
                <Link
                  to="/cottage-painting-muskoka"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-muted-foreground hover:text-atomic-navy hover:border-atomic-navy/20 transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  Muskoka Cottage Painting
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-muted-foreground hover:text-atomic-navy hover:border-atomic-navy/20 transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  Contact Us
                </Link>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-14 md:py-18" aria-labelledby="cottage-faq-heading">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 id="cottage-faq-heading" className="text-2xl font-bold text-atomic-navy mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {page.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-background p-6 rounded-lg shadow-sm border border-border">
                    <h3 className="font-semibold text-atomic-navy mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Private Client Banner — inherited */}
          <PrivateClientBanner />

          {/* CTA */}
          <section className="py-16 bg-atomic-navy text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{page.ctaText}</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Contact us to discuss your Muskoka property. We'll take it from there.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-8 py-3 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors"
                >
                  {page.ctaText}
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
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <Link to="/service-areas" className="text-white/50 text-xs hover:text-white/70">All Service Areas</Link>
              <Link to="/private-client-muskoka-property-care" className="text-white/50 text-xs hover:text-white/70">Private Client</Link>
              <Link to="/contact" className="text-white/50 text-xs hover:text-white/70">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CottageOwnerPageTemplate;
