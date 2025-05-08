
import React from 'react';
import { motion } from "framer-motion";

interface CTAButtonProps {
  handleNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const CTAButton = ({ handleNavLinkClick }: CTAButtonProps) => {
  return (
    <div className="hidden md:block">
      <motion.a 
        href="#contact" 
        className="atomic-button-secondary group overflow-hidden relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        onClick={(e) => {
          e.preventDefault();
          // Ensure we scroll to the contact section
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Focus on the Jobber form after scrolling
            setTimeout(() => {
              const jobberForm = document.querySelector('.jobber-embedded-form-container');
              if (jobberForm) {
                jobberForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 800);
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10 flex items-center group-hover:translate-x-1 transition-transform duration-300">
          Request A Quote
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </motion.a>
    </div>
  );
};

export default CTAButton;
