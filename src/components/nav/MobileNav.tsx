
import React from 'react';
import { motion } from "framer-motion";
import { NavLink } from './NavLinks';
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileNavProps {
  navLinks: NavLink[];
  mobileMenuOpen: boolean;
  handleNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const MobileNav = ({ navLinks, mobileMenuOpen, handleNavLinkClick }: MobileNavProps) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className="md:hidden bg-white shadow-lg"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {mobileMenuOpen && (
        <nav className="flex flex-col px-6 py-6">
          {navLinks.map(link => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              className="py-5 border-b border-gray-100 last:border-0 font-poppins hover:text-atomic-orange transition-colors text-atomic-navy text-lg"
              onClick={(e) => handleNavLinkClick(e, link.href)}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: navLinks.indexOf(link) * 0.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <span className="mr-2 text-atomic-orange">#</span>
                {link.name}
              </div>
            </motion.a>
          ))}
          <motion.div className="pt-6 flex flex-col gap-4">
            <motion.a 
              href="tel:+6047581680"
              className="atomic-button flex justify-center items-center gap-2 w-full py-5 text-center group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Call Now
            </motion.a>
            <motion.a 
              href="#contact" 
              className="atomic-button-secondary w-full py-5 text-center group"
              onClick={(e) => handleNavLinkClick(e, '#contact')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                Request A Quote
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.a>
          </motion.div>
        </nav>
      )}
    </motion.div>
  );
};

export default MobileNav;
