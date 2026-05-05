import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PrivateClientWhisper from '@/components/conversion/PrivateClientWhisper';

const HeroContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#contact');
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-xl px-2 sm:px-0">
      <div className="flex items-center gap-2 sm:gap-4 mb-2">
        <h2 className="font-display text-xs sm:text-sm font-bold text-atomic-orange tracking-[0.2em] uppercase">MUSKOKA COTTAGE PAINTING · SINCE 1999</h2>
      </div>
      
      <div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-atomic-navy mb-3 sm:mb-4 tracking-tight" style={{ lineHeight: 1.1 }}>
          Your cottage deserves a painter who knows the lake.
        </h1>

        <p className="text-atomic-orange font-display font-semibold text-lg sm:text-xl md:text-2xl lg:text-[2.25rem] leading-snug">
          Lake Joseph · Rosseau · Muskoka · Lake of Bays · Three Mile · Skeleton · Mary · Fairy · Peninsula
        </p>

        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-atomic-navy font-medium">
          For 25 years, Roll On Painting has cared for Muskoka's most beautiful lakefront properties — from quiet boathouses on Lake Rosseau to design-forward cottages featured five times on HGTV. We understand what cottages do that houses don't: settle, breathe, weather, freeze. And we paint them so they hold up to all of it.
        </p>

        <p className="mt-3 text-xs sm:text-sm text-atomic-navy/70 font-semibold uppercase tracking-[0.15em]">
          5× HGTV FEATURED  ·  15× IN DOCKSIDE MAGAZINE  ·  GONANO + SANSIN CERTIFIED  ·  $5M INSURED + WSIB  ·  25+ YEARS
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
        <a 
          href="#contact" 
          className="atomic-button group border-2 border-atomic-orange bg-atomic-orange hover:bg-atomic-orange/90 text-center w-full sm:w-auto text-base sm:text-lg py-4 px-8 font-bold" 
          onClick={handleScrollToContact}
        >
          <span className="relative z-10 flex items-center justify-center">
            Book Your Cottage Consultation
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </a>
        <Link 
          to="/portfolio" 
          className="text-sm sm:text-base text-atomic-navy/70 hover:text-atomic-orange underline underline-offset-4 transition-colors"
        >
          See our cottage portfolio →
        </Link>
      </div>
      <PrivateClientWhisper />
      
      <div className="flex items-center space-x-2 pt-2 opacity-70">
        <span className="text-atomic-orange font-bold text-xs">4.8 ★</span>
        <p className="text-xs text-atomic-navy/70">4.8/5 from 20 Google reviews</p>
      </div>
    </div>
  );
};

export default HeroContent;
