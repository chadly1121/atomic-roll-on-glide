
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo handleLogoClick={handleLogoClick} />
          
          {/* Centered navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <DesktopNav navLinks={navLinks} handleNavLinkClick={handleNavLinkClick} />
          </div>
          
          {/* CTA Button on the right */}
          <div className="hidden md:block">
            <CTAButton handleNavLinkClick={handleNavLinkClick} />
          </div>
          
          {/* Mobile layout */}
          <div className="md:hidden flex items-center space-x-4">
            <MobileNav navLinks={navLinks} handleNavLinkClick={handleNavLinkClick} />
            <CTAButton handleNavLinkClick={handleNavLinkClick} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
