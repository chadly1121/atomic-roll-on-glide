
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
      className="atomic-button text-sm px-4 py-2 whitespace-nowrap"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Get Quote
    </motion.a>
  );
};

export default CTAButton;
