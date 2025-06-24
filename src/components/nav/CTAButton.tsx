
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
      className="atomic-button text-xs px-1.5 py-1 whitespace-nowrap text-center min-w-0"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Quote
    </motion.a>
  );
};

export default CTAButton;
