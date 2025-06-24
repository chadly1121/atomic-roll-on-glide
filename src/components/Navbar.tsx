
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './nav/Logo';
import DesktopNav from './nav/DesktopNav';
import MobileNav from './nav/MobileNav';
import CTAButton from './nav/CTAButton';
import { motion } from "framer-motion";
import { navLinks } from './nav/NavLinks';

interface NavbarProps {
  activeSection?: string;
}

const Navbar = ({ activeSection = '' }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      // Handle anchor links for same page navigation
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Handle regular navigation
      navigate(href);
    }
  };

  // Don't render navbar on calendar page
  if (location.pathname === '/calendar') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 w-screen z-50 bg-white/95 backdrop-blur-sm shadow-md max-w-full overflow-hidden">
      <div className="w-full px-1 py-0.5 max-w-full">
        <div className="flex items-center justify-between w-full gap-1">
          <div className="flex-shrink-0 min-w-0">
            <Logo handleLogoClick={handleLogoClick} />
          </div>
          <div className="flex items-center gap-1 flex-1 justify-end min-w-0 overflow-hidden">
            <div className="hidden md:block">
              <DesktopNav navLinks={navLinks} handleNavLinkClick={handleNavLinkClick} />
            </div>
            <div className="md:hidden flex-1 min-w-0 overflow-hidden mr-1">
              <MobileNav navLinks={navLinks} handleNavLinkClick={handleNavLinkClick} />
            </div>
            <div className="flex-shrink-0">
              <CTAButton handleNavLinkClick={handleNavLinkClick} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
