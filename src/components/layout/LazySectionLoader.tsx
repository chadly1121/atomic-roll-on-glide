
import React, { Suspense, lazy, useEffect } from 'react';

// Loading fallback with reduced animation when reduced motion is preferred
const SectionLoading = () => {
  const [reducedMotion, setReducedMotion] = React.useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="w-full py-24 flex justify-center items-center">
      <div className={`w-16 h-16 border-4 border-atomic-turquoise border-t-atomic-orange rounded-full ${!reducedMotion ? 'animate-spin' : ''}`}></div>
    </div>
  );
};

// Import sections directly instead of lazy loading to avoid dynamic import issues
import TestimonialsSection from '../TestimonialsSection';
import TrendsSection from '../TrendsSection';
import ContactSection from '../ContactSection';
import Footer from '../Footer';

interface LazySectionLoaderProps {
  visibleSections: Set<string>;
}

const LazySectionLoader: React.FC<LazySectionLoaderProps> = ({ visibleSections }) => {
  // No need for preloading since we're importing directly
  return (
    <>
      {/* Conditionally rendered sections (below the fold) */}
      {visibleSections.has('testimonials') && (
        <TestimonialsSection />
      )}
      
      {visibleSections.has('trends') && (
        <TrendsSection />
      )}
      
      {visibleSections.has('contact') && (
        <ContactSection />
      )}
      
      <Footer />
    </>
  );
};

export default LazySectionLoader;
