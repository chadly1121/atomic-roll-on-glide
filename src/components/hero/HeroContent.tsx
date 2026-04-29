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
        <h2 className="font-display text-base sm:text-xl font-bold text-atomic-orange tracking-widest uppercase">Clean Reliable Painters</h2>
      </div>
      
      <div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 sm:mb-4 tracking-tight">
          Muskoka House Painters
          <span className="text-atomic-orange block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-1">Huntsville, Bracebridge & Gravenhurst</span>
        </h1>

        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-atomic-navy font-medium">
          Roll On Painting is a trusted painting company in Muskoka serving Huntsville, Bracebridge, Gravenhurst, Port Carling and the surrounding lakes. Interior, exterior, cottage, and cabinet painting — done right the first time.
        </p>
        
        <p className="mt-2 text-sm sm:text-base text-atomic-navy/80 font-medium">
          HGTV Featured · $5M Insured · Perfect Finish Promise — Free Touch Ups for Life
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
        <a 
          href="#contact" 
          className="atomic-button group border-2 border-atomic-orange bg-atomic-orange hover:bg-atomic-orange/90 text-center w-full sm:w-auto text-base sm:text-lg py-4 px-8 font-bold" 
          onClick={handleScrollToContact}
        >
          <span className="relative z-10 flex items-center justify-center">
            Book Your Consultation
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </a>
        <Link 
          to="/portfolio" 
          className="text-sm sm:text-base text-atomic-navy/70 hover:text-atomic-orange underline underline-offset-4 transition-colors"
        >
          View Portfolio →
        </Link>
      </div>
      <PrivateClientWhisper />
      
      <div className="flex items-center space-x-3 sm:space-x-4 pt-3 sm:pt-4 bg-white/50 p-3 sm:p-4 rounded-xl backdrop-blur-sm">
        <div className="flex -space-x-2 flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-atomic-orange text-white flex items-center justify-center font-bold text-xs sm:text-sm">4.8</div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-atomic-turquoise text-white flex items-center justify-center font-bold text-sm sm:text-base">★</div>
        </div>
        <p className="text-xs sm:text-sm text-atomic-navy"><span className="font-bold">4.8/5</span> from 20 Google reviews</p>
      </div>
    </div>
  );
};

export default HeroContent;
