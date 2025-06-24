
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
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="w-full px-2 sm:px-4 py-2 sm:py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex-shrink-0 min-w-0">
            <Logo handleLogoClick={handleLogoClick} />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 md:gap-6 flex-1 justify-end min-w-0">
            <div className="hidden md:block">
              <DesktopNav navLinks={navLinks} handleNavLinkClick={handleNavLinkClick} />
            </div>
            <div className="md:hidden flex-1 max-w-[140px] sm:max-w-[180px]">
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
