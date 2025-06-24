
import React from 'react';
import { motion } from "framer-motion";
import { NavLink } from './NavLinks';

interface MobileNavProps {
  navLinks: NavLink[];
  handleNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const MobileNav = ({ navLinks, handleNavLinkClick }: MobileNavProps) => {
  return (
    <nav className="md:hidden flex items-center space-x-2 overflow-x-auto max-w-[200px]">
      {navLinks.map(link => (
        <motion.a 
          key={link.name} 
          href={link.href} 
          className="nav-link whitespace-nowrap text-xs font-medium text-atomic-navy hover:text-atomic-orange transition-colors duration-300 relative flex-shrink-0"
          onClick={(e) => handleNavLinkClick(e, link.href)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {link.name}
        </motion.a>
      ))}
    </nav>
  );
};

export default MobileNav;
