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

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Roll On Painting",
    "description": "Get a free painting quote from Roll On Painting in Muskoka. Contact us by phone, email, or fill out our online form.",
    "url": "https://rollonpainting.com/contact",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": businessInfo.name,
      "telephone": businessInfo.phone.primary,
      "email": businessInfo.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": businessInfo.address.street,
        "addressLocality": businessInfo.address.city,
        "addressRegion": businessInfo.address.regionCode,
        "postalCode": businessInfo.address.postalCode,
        "addressCountry": businessInfo.address.countryCode
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Us | Roll On Painting Muskoka - Free Quotes</title>
        <meta name="description" content="Contact Roll On Painting for a free painting estimate in Muskoka. Call 705-787-1401, email info@roll-onpainting.com, or fill out our online quote form." />
        <link rel="canonical" href="https://rollonpainting.com/contact" />
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
      </Helmet>

      <Navbar activeSection="contact" />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="bg-atomic-navy text-white py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Get In <span className="text-atomic-turquoise">Touch</span>
              </h1>
              <p className="text-lg text-gray-300">
                Ready to transform your space? Reach out for a free quote or to discuss your project.
                We'd love to hear from you.
              </p>
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
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
              {/* Form */}
              <div className="bg-card rounded-xl shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-atomic-navy mb-6">Request a Free Quote</h2>
                <ContactForm />
              </div>

              {/* Info */}
              <div className="space-y-8 text-atomic-navy">
                <ContactInfo />
                <SocialLinks />
                <FeatureBenefits />
              </div>
            </div>
          </div>
        </section>

        {/* Map / Service Area CTA */}
        <section className="py-12 bg-accent/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-atomic-navy mb-4">Serving Muskoka & Surrounding Areas</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We serve {businessInfo.serviceArea.totalLocations} communities across {businessInfo.serviceArea.primary}, Parry Sound, and Simcoe County.
            </p>
            <Link
              to="/service-areas"
              className="inline-flex items-center gap-2 text-atomic-turquoise font-medium hover:text-atomic-navy transition-colors"
            >
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
