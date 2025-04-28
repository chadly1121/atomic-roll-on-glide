
import React, { useRef } from 'react';
import ServiceCard from './services/ServiceCard';
import { services } from './services/ServicesData';
import GoNanoSection from './services/GoNanoSection';

const ServicesSection = () => {
  const goNanoSectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="atomic-starburst w-72 h-72 top-20 left-20"></div>
      <div className="atomic-circle w-96 h-96 -bottom-48 right-0 border-atomic-turquoise/30 animate-spin-slow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-heading">Our Services</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Professional painting services tailored to your specific needs, delivering quality results that last.
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
