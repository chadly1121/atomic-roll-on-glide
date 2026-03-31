
import React from 'react';
import HeroContent from './hero/HeroContent';
import HeroBackground from './hero/HeroBackground';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-80px)] sm:min-h-screen pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16 flex items-center overflow-hidden bg-atomic-cream bg-atomic-pattern">
      <HeroBackground />
      
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          <HeroContent />
          <div className="hidden sm:block">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/lovable-uploads/exterior-boathouse-dockside-painting.webp"
                alt="Dockside boathouse painting by Roll On Painting — Muskoka waterfront exterior"
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                width="800"
                height="600"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
