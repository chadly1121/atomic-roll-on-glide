
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Sparkles } from 'lucide-react';

const FloatingEstimateButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 800;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openEstimator = () => {
    // Scroll to the section and click the CTA button to open the modal
    const section = document.querySelector('#ai-estimator');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Find and click the estimator CTA button after scrolling
      setTimeout(() => {
        const btn = section.querySelector('button');
        btn?.click();
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
          onClick={openEstimator}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-1.5 sm:gap-2 bg-atomic-pink text-white px-3 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-atomic-pink/90 transition-all group"
          aria-label="Get instant AI painting estimate"
        >
          <div className="relative">
            <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
          </div>
          <span className="font-semibold text-sm sm:text-base">AI Estimate</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="ml-0.5 sm:ml-1 hidden xs:inline"
          >
            →
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingEstimateButton;
