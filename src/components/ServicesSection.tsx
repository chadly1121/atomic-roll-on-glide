
import React, { useRef } from 'react';
import ServiceCard from './services/ServiceCard';
import { services } from './services/ServicesData';
import GoNanoSection from './services/GoNanoSection';
import { Helmet } from 'react-helmet-async';

const ServicesSection = () => {
  const goNanoSectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Roll On Painting",
              "description": "Professional painting services in Muskoka including interior, exterior, commercial, and GoNano permanent coating.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Muskoka",
                "addressRegion": "Ontario",
                "addressCountry": "Canada"
              },
              "telephone": "+1-705-555-1234",
              "priceRange": "$$",
              "image": "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745866797/IMG_20190920_121835_fchin4.jpg",
              "sameAs": ["https://www.facebook.com/rollonpainting", "https://www.instagram.com/rollonpainting"],
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "17:00"
                }
              ],
              "service": [
                {
                  "@type": "Service",
                  "name": "Interior Painting",
                  "description": "Transform your indoor spaces with our premium interior painting services"
                },
                {
                  "@type": "Service",
                  "name": "Exterior Painting",
                  "description": "Enhance your home's curb appeal with our durable exterior painting services"
                },
                {
                  "@type": "Service",
                  "name": "Commercial Painting",
                  "description": "Update your business space with minimal disruption"
                }
              ]
            }
          `}
        </script>
      </Helmet>
      
      <div className="atomic-starburst w-72 h-72 top-20 left-20"></div>
      <div className="atomic-circle w-96 h-96 -bottom-48 right-0 border-atomic-turquoise/30 animate-spin-slow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-heading">Our Services & Galleries</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Browse our professional painting services and project galleries. Click on "View Gallery" to see examples of our completed work in each service area.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="#contact" 
            className="atomic-button button-pulse"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
          >
            <span className="relative z-10">Request Custom Service</span>
          </a>
        </div>
        
        <div id="gonano" ref={goNanoSectionRef} className="scroll-mt-24">
          <GoNanoSection sectionRef={goNanoSectionRef} />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
