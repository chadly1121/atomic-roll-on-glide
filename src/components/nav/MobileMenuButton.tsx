
import React from 'react';

interface MobileMenuButtonProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const MobileMenuButton = ({ mobileMenuOpen, toggleMobileMenu }: MobileMenuButtonProps) => {
  return (
    <button 
      onClick={toggleMobileMenu} 
      className="md:hidden text-atomic-navy focus:outline-none transform transition-transform hover:scale-110 active:scale-95 p-3"
      aria-label="Toggle menu"
    >
      <div className="w-12 h-12 flex items-center justify-center bg-white/80 rounded-full shadow-sm">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="w-8 h-8"
        >
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </div>
    </button>
  );
};

export default MobileMenuButton;
