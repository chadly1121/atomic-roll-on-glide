
import React from 'react';

interface LogoProps {
  handleLogoClick: (e: React.MouseEvent) => void;
}

const Logo = ({ handleLogoClick }: LogoProps) => {
  return (
    <a href="#" className="flex items-center hover:opacity-90 transition-opacity group" onClick={handleLogoClick}>
      <img 
        src="/lovable-uploads/9058a595-b38f-4cdc-893a-19baaccf57d5.webp" 
        alt="Roll On Painting - Clean Reliable Painters in Muskoka" 
        className="h-14 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 max-w-none flex-shrink-0"
        width={240}
        height={80}
        decoding="async"
      />
    </a>
  );
};

export default Logo;
