
import React from 'react';
import { motion } from "framer-motion";

interface MobileMenuButtonProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const MobileMenuButton = ({ mobileMenuOpen, toggleMobileMenu }: MobileMenuButtonProps) => {
  return (
    <motion.button 
      onClick={toggleMobileMenu} 
      className="md:hidden text-atomic-navy focus:outline-none transform transition-transform hover:scale-110 p-2"
      aria-label="Toggle menu"
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-10 h-10 flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="w-7 h-7"
        >
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </div>
    </motion.button>
  );
};

export default MobileMenuButton;
