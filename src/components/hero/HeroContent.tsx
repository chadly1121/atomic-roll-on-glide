
import React, { useMemo } from 'react';
import { Atom, FileImage } from 'lucide-react';
import { throttle } from '@/utils/performance';

const HeroContent = () => {
  // Throttled scroll handler for better performance
  const handleScrollToContact = useMemo(() => 
    throttle((e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        window.scrollTo({
          top: contactSection.getBoundingClientRect().top + window.scrollY - 100,
          behavior: 'smooth'
        });
      }
    }, 300),
  []);

  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-full bg-atomic-orange/10">
          <Atom className="w-8 h-8 text-atomic-orange animate-spin-slow" />
        </div>
        <h2 className="text-lg font-medium text-atomic-navy/60">Vintage Craftsmanship • Today's Science</h2>
      </div>
      
      <div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Transform Your Space With
          <span className="text-atomic-orange block">Roll On Painting</span>
        </h1>
        <p className="mt-6 text-lg text-atomic-navy/70">
          Roll On Painting delivers exceptional quality and craftsmanship for residential and commercial projects. 
          Experience the perfect blend of time-honored techniques and modern innovation.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
        <a href="#ai-estimator" className="atomic-button group border-2 border-atomic-pink bg-atomic-pink hover:bg-atomic-pink/90" onClick={e => {
          e.preventDefault();
          document.querySelector('#ai-estimator')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }}>
          <span className="relative z-10 flex items-center">
            Get Instant AI Estimate
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </a>
        <a href="#contact" className="atomic-button-secondary group border-2 border-atomic-turquoise" onClick={handleScrollToContact}>
          <span className="relative z-10 flex items-center">
            <FileImage className="h-5 w-5 mr-2" />
            Send Us Your Plans
          </span>
        </a>
        <a href="#services" className="atomic-button-secondary border-2 border-atomic-turquoise" onClick={e => {
        e.preventDefault();
        document.querySelector('#services')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }}>
          <span className="relative z-10">Our Services</span>
        </a>
      </div>
      
      <div className="flex items-center space-x-4 pt-4 bg-white/50 p-4 rounded-xl backdrop-blur-sm">
        <div className="flex -space-x-2">
          <div className="w-10 h-10 rounded-full bg-atomic-orange text-white flex items-center justify-center font-bold">5</div>
          <div className="w-10 h-10 rounded-full bg-atomic-turquoise text-white flex items-center justify-center font-bold">★</div>
        </div>
        <p className="text-sm text-atomic-navy"><span className="font-bold">5/5</span> from Google reviews</p>
      </div>
    </div>
  );
};

export default HeroContent;
