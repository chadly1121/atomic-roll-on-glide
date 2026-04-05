
import React from 'react';

interface CTAButtonProps {
  handleNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const CTAButton = ({ handleNavLinkClick }: CTAButtonProps) => {
  return (
    <a
      href="/contact"
      onClick={(e) => handleNavLinkClick(e, '/contact')}
      className="atomic-button text-sm px-4 py-2 whitespace-nowrap block text-center md:inline-block w-full md:w-auto transition-transform hover:scale-105 active:scale-95"
    >
      Book Your Free Estimate
    </a>
  );
};

export default CTAButton;
