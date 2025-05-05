
import React from 'react';
import { motion } from "framer-motion";
import { NavLink } from './NavLinks';

interface MobileNavProps {
  navLinks: NavLink[];
  mobileMenuOpen: boolean;
  handleNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const MobileNav = ({ navLinks, mobileMenuOpen, handleNavLinkClick }: MobileNavProps) => {
  return (
    <motion.div 
      className="md:hidden bg-white shadow-lg"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {mobileMenuOpen && (
        <nav className="flex flex-col px-4 py-2">
          {navLinks.map(link => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              className="py-3 border-b border-gray-100 last:border-0 font-poppins hover:text-atomic-orange transition-colors text-atomic-navy"
              onClick={(e) => handleNavLinkClick(e, link.href)}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: navLinks.indexOf(link) * 0.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a 
            href="#contact" 
            className="atomic-button-secondary mt-4 mb-2 text-center group"
            onClick={(e) => handleNavLinkClick(e, '#contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              Request A Quote
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </motion.a>
        </nav>
      )}
    </motion.div>
  );
};

export default MobileNav;
