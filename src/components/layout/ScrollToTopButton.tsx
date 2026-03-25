
import React from 'react';
import { useIsMobile } from "@/hooks/use-mobile";

interface ScrollToTopButtonProps {
  showScrollTop: boolean;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ showScrollTop }) => {
  const isMobile = useIsMobile();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed ${isMobile ? 'bottom-6 right-6 p-4' : 'bottom-8 right-8 p-3'} z-40 bg-atomic-turquoise text-white rounded-full shadow-lg hover:bg-atomic-orange transition-all duration-300 focus:outline-none hover:scale-110 active:scale-90 ${
        showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className={isMobile ? "h-7 w-7" : "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
