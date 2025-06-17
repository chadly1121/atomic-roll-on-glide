
import React from 'react';
import HeroContent from './hero/HeroContent';
import HeroCarousel from './hero/HeroCarousel';
import HeroBackground from './hero/HeroBackground';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden bg-atomic-cream bg-atomic-pattern">
      <HeroBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <HeroContent />
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
