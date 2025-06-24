
import React from 'react';
import { motion } from "framer-motion";
import { NavLink } from './NavLinks';

interface MobileNavProps {
  navLinks: NavLink[];
  handleNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const MobileNav = ({ navLinks, handleNavLinkClick }: MobileNavProps) => {
  return (
    <nav className="flex items-center space-x-4 overflow-x-auto">
      {navLinks.slice(0, 3).map(link => (
        <motion.a 
          key={link.name} 
          href={link.href} 
          className="nav-link whitespace-nowrap text-xs font-medium"
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
