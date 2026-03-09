
import React, { useRef } from 'react';
import ServiceCard from './services/ServiceCard';
import { services } from './services/ServicesData';
import GoNanoSection from './services/GoNanoSection';
import { Helmet } from 'react-helmet-async';

const ServicesSection = () => {
  const goNanoSectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="services" className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
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
            "telephone": "+1-705-787-1401",
            "priceRange": "$$",
            "image": "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745866797/IMG_20190920_121835_fchin4.jpg",
            "sameAs": ["https://www.facebook.com/rollonpainting", "https://www.instagram.com/rollonpainting"],
            "openingHoursSpecification": [{
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "08:00",
              "closes": "17:00"
            }],
            "service": [
              { "@type": "Service", "name": "Interior Painting", "description": "Transform your indoor spaces with our premium interior painting services" },
              { "@type": "Service", "name": "Exterior Painting", "description": "Enhance your home's curb appeal with our durable exterior painting services" },
              { "@type": "Service", "name": "Commercial Painting", "description": "Update your business space with minimal disruption" }
            ]
          })}
        </script>
      </Helmet>
      
      {/* Decorative elements - hidden for performance */}
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative mb-6 sm:mb-8 md:mb-12 inline-block">
            Our Services & Galleries
            <span className="absolute left-1/4 -bottom-2 sm:-bottom-4 h-1 w-1/2 bg-atomic-orange rounded-full" />
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 px-2">
            Browse our professional painting services and project galleries. Click on "View Gallery" to see examples of our completed work in each service area.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16 text-center">
          <a 
            href="#contact" 
            className="atomic-button button-pulse inline-block text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] active:scale-95 transition-transform"
            onClick={(e) => {
              e.preventDefault();
              if (window.location.pathname === '/') {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                window.location.href = '/#contact';
              }
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
