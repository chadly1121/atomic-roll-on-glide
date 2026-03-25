
import React from 'react';
import { NavLink } from './NavLinks';

interface MobileNavProps {
  navLinks: NavLink[];
  handleNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const MobileNav = ({ navLinks, handleNavLinkClick }: MobileNavProps) => {
  return (
    <nav className="flex items-center space-x-4 overflow-x-auto">
      {navLinks.slice(0, 3).map(link => (
        <a 
          key={link.name} 
          href={link.href} 
          className="nav-link whitespace-nowrap text-xs font-medium transition-transform hover:scale-105 active:scale-95"
          onClick={(e) => handleNavLinkClick(e, link.href)}
        >
          {link.name}
        </a>
      ))}
    </nav>
  );
};

export default MobileNav;
