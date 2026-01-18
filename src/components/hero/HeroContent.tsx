
import React, { useMemo } from 'react';
import { throttle } from '@/utils/performance';

const HeroContent = () => {
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
    <div className="space-y-8 max-w-xl">
      <div className="mb-8">
        <span className="text-sm font-sans uppercase tracking-extra-wide text-gold">
          Craftsmanship & Excellence
        </span>
      </div>
      
      <div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold leading-tight mb-6 text-charcoal">
          Elevate Your Space
          <span className="block mt-2 text-gold">With Artistry</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed font-sans">
          Roll On Painting delivers exceptional quality and craftsmanship for residential and commercial projects. 
          Experience the perfect blend of time-honored techniques and modern innovation.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-6">
        <a 
          href="#contact" 
          className="btn-gold group inline-flex items-center justify-center"
          onClick={handleScrollToContact}
        >
          Request A Quote
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
        <a 
          href="#services" 
          className="btn-secondary inline-flex items-center justify-center"
          onClick={e => {
            e.preventDefault();
            document.querySelector('#services')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }}
        >
          Explore Services
        </a>
      </div>
      
      <div className="flex items-center space-x-6 pt-8 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-muted-foreground font-sans">5.0 Rating</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <p className="text-sm text-muted-foreground font-sans">Trusted by 500+ clients</p>
      </div>
    </div>
  );
};

export default HeroContent;