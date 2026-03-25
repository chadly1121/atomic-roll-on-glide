
import React from 'react';
import { NavLink } from './NavLinks';

interface DesktopNavProps {
  navLinks: NavLink[];
  handleNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const DesktopNav = ({ navLinks, handleNavLinkClick }: DesktopNavProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-3 lg:space-x-5 xl:space-x-6">
      {navLinks.map(link => (
        <a 
          key={link.name} 
          href={link.href} 
          className="nav-link after:transition-all after:duration-300 after:ease-in-out after:hover:w-full text-atomic-navy hover:text-atomic-orange text-sm lg:text-base transition-transform hover:scale-105 active:scale-95"
          onClick={(e) => handleNavLinkClick(e, link.href)}
        >
          {link.name}
        </a>
      ))}
    </nav>
  );
};

export default DesktopNav;
