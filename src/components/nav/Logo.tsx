
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
        src="/lovable-uploads/9058a595-b38f-4cdc-893a-19baaccf57d5.png" 
        alt="Roll On Painting - Vintage Craftsmanship, Today's Science" 
        className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105 max-w-none flex-shrink-0"
      />
    </a>
  );
};

export default Logo;
