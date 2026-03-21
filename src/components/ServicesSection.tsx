
import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from './services/ServiceCard';
import { services } from './services/ServicesData';
import { ArrowRight } from 'lucide-react';

const ServicesSection = () => {
  return (
    <section id="services" className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-atomic-navy mb-4">
            Our Services
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-muted-foreground">
            From cottages to commercial buildings, we deliver premium results across every surface. Click any service to learn more.
          </p>
          <div className="mx-auto mt-4 h-1 w-20 bg-atomic-turquoise rounded-full" />
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* GoNano callout */}
        <div id="gonano" className="scroll-mt-24 mt-12 sm:mt-16 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-atomic-navy to-atomic-navy/90 text-white text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-2">GoNano Nanotechnology Coatings</h3>
          <p className="text-white/70 max-w-xl mx-auto mb-6 text-sm sm:text-base">
            As seen on Dragon's Den — permanent surface protection starting at $0.99/sq ft. Hydrophobic, UV-resistant, and eco-friendly.
          </p>
          <Link 
            to="/gonano" 
            className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-6 py-3 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors"
          >
            Explore GoNano
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Portfolio + Quote CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/portfolio" 
            className="inline-flex items-center gap-2 text-atomic-turquoise font-medium hover:text-atomic-orange transition-colors"
          >
            View Our Portfolio
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="hidden sm:inline text-border">|</span>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 text-atomic-turquoise font-medium hover:text-atomic-orange transition-colors"
          >
            Request a Free Quote
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
