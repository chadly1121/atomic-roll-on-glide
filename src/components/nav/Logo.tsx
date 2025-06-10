
import React from 'react';
import { motion } from "framer-motion";

interface LogoProps {
  handleLogoClick: (e: React.MouseEvent) => void;
}

const Logo = ({ handleLogoClick }: LogoProps) => {
  return (
    <a href="#" className="flex items-center hover:opacity-90 transition-opacity group" onClick={handleLogoClick}>
      <motion.img 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        src="/lovable-uploads/e3ac56e1-5346-462a-912b-2b1950bc3bac.png" 
        alt="Roll On Painting Muskoka Logo - Vintage Craftsmanship, Today's Science" 
        className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </a>
  );
};

export default Logo;
