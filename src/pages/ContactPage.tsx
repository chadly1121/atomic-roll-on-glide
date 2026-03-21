import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import SocialLinks from '../components/contact/SocialLinks';
import FeatureBenefits from '../components/contact/FeatureBenefits';
import FreeTouchUpsButton from '../components/FreeTouchUpsButton';
import { businessInfo } from '@/data/businessInfo';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const siteUrl = "https://www.roll-onpainting.com";
  const ogImage = "https://res.cloudinary.com/dxqfou8jh/image/upload/f_auto,q_80,w_1200/v1745866797/IMG_20190920_121835_fchin4.jpg";

  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${siteUrl}/contact/#webpage`,
        "name": "Contact Roll On Painting",
        "description": "Get a free painting quote from Roll On Painting in Muskoka. Contact us by phone, email, or fill out our online form.",
        "url": `${siteUrl}/contact`,
        "isPartOf": { "@id": `${siteUrl}/#website` },
        "about": { "@id": `${siteUrl}/#localbusiness` },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
            { "@type": "ListItem", "position": 2, "name": "Contact", "item": `${siteUrl}/contact` }
          ]
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        "name": businessInfo.name,
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
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": businessInfo.geo.latitude,
          "longitude": businessInfo.geo.longitude
        },
        "openingHours": ["Mo-Fr 07:00-17:00", "Sa 10:00-14:00"],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": businessInfo.phone.international,
          "contactType": "customer service",
          "email": businessInfo.email,
          "availableLanguage": "English",
          "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" }
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Us | Roll On Painting Muskoka - Free Quotes</title>
        <meta name="description" content="Contact Roll On Painting for a free painting estimate in Muskoka. Call 705-787-1401, email info@roll-onpainting.com, or fill out our online quote form. WSIB covered, $5M insurance." />
        <link rel="canonical" href={`${siteUrl}/contact`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Roll On Painting | Free Quotes in Muskoka" />
        <meta property="og:description" content="Get a free painting quote from Muskoka's premier painting service. Call 705-787-1401 or fill out our online form." />
        <meta property="og:url" content={`${siteUrl}/contact`} />
        <meta property="og:site_name" content={businessInfo.name} />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Roll On Painting | Free Quotes" />
        <meta name="twitter:description" content="Get a free painting estimate in Muskoka. Call 705-787-1401." />
        <meta name="twitter:image" content={ogImage} />
        
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
      </Helmet>

      <Navbar activeSection="contact" />

      <main className="pt-24 pb-16">
        {/* Header */}
        <section className="pt-10 pb-6 sm:pt-14 sm:pb-8">
          <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-atomic-navy mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-atomic-navy mb-3">
                Get In <span className="text-atomic-turquoise">Touch</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Ready to transform your space? Reach out for a free quote or to discuss your project.
                We'd love to hear from you.
              </p>
              <div className="mx-auto mt-4 h-1 w-20 bg-atomic-turquoise rounded-full" />
            </div>
          </div>
        </section>

        {/* Free Touch Ups */}
        <div className="container mx-auto px-4 -mt-6 relative z-10">
          <div className="max-w-md mx-auto">
            <FreeTouchUpsButton />
          </div>
        </div>

        {/* Contact Form + Info */}
        <section className="py-16 sm:py-20" aria-labelledby="contact-form-heading">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
              <div className="bg-card rounded-xl shadow-lg p-6 sm:p-8">
                <h2 id="contact-form-heading" className="text-2xl font-bold text-atomic-navy mb-6">Request a Free Quote</h2>
                <ContactForm />
              </div>
              <div className="space-y-8 text-atomic-navy">
                <ContactInfo />
                <SocialLinks />
                <FeatureBenefits />
              </div>
            </div>
          </div>
        </section>

        {/* Service Area CTA */}
        <section className="py-12 bg-accent/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-atomic-navy mb-4">Serving Muskoka & Surrounding Areas</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We serve {businessInfo.serviceArea.totalLocations} communities across {businessInfo.serviceArea.primary}, Parry Sound, and Simcoe County.
            </p>
            <Link to="/service-areas" className="inline-flex items-center gap-2 text-atomic-turquoise font-medium hover:text-atomic-navy transition-colors">
              View All Service Areas →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
