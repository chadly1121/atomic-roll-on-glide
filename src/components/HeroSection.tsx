
import React from 'react';
import HeroContent from './hero/HeroContent';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-80px)] sm:min-h-screen pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16 flex items-center overflow-hidden bg-background">
      {/* Full-width background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/lovable-uploads/interior-modern-cottage-living.webp"
          alt="Modern cottage great room interior painting by Roll On Painting — Port Carling, Muskoka"
          className="w-full h-full object-cover"
          width={1440}
          height={808}
          loading="eager"
          fetchpriority="high"
          decoding="sync"
        />
        {/* Mobile: heavy overlay for readability; Desktop: left-to-right fade */}
        <div 
          className="absolute inset-0 block sm:hidden"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.93) 0%, rgba(255,255,255,0.88) 60%, rgba(255,255,255,0.7) 85%, rgba(255,255,255,0.5) 100%)'
          }}
        />
        <div 
          className="absolute inset-0 hidden sm:block"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0) 100%)'
          }}
        />
      </div>
      
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="max-w-xl">
          <HeroContent />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
