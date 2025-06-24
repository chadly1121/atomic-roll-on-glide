
import React from 'react';
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './nav/Logo';
import DesktopNav from './nav/DesktopNav';
import MobileNav from './nav/MobileNav';
import { motion } from "framer-motion";

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

  // Don't render navbar on calendar page
  if (location.pathname === '/calendar') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo handleLogoClick={handleLogoClick} />
        <DesktopNav activeSection={activeSection} />
        <MobileNav activeSection={activeSection} />
      </div>
    </header>
  );
};

export default Navbar;
