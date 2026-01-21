
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Sparkles } from 'lucide-react';

const FloatingEstimateButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the AI estimator section (roughly 800px)
      const shouldShow = window.scrollY > 800;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToEstimator = () => {
    document.querySelector('#ai-estimator')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
          onClick={scrollToEstimator}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-atomic-pink text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-atomic-pink/90 transition-all group"
          aria-label="Get instant AI painting estimate"
        >
          <div className="relative">
            <Calculator className="w-5 h-5" />
            <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
          </div>
          <span className="font-semibold">Get AI Estimate</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="ml-1"
          >
            →
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingEstimateButton;
