
import React from 'react';
import { motion } from "framer-motion";

interface CTAButtonProps {
  handleNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const CTAButton = ({ handleNavLinkClick }: CTAButtonProps) => {
  return (
    <motion.a
      href="#contact"
      onClick={(e) => handleNavLinkClick(e, '#contact')}
      className="atomic-button text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Request Quote
    </motion.a>
  );
};

export default CTAButton;
