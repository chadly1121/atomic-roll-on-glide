
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

// Optimized lazy loaded components with preloaded TrendsSection
const TestimonialsSection = lazy(() => import('../TestimonialsSection'));
const PricingSection = lazy(() => import('../PricingSection'));
const ContactSection = lazy(() => 
  // High priority for contact section with loading optimization
  import('../ContactSection').then(module => {
    // Preload Jobber form assets if this is the contact section
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css';
    link.as = 'style';
    document.head.appendChild(link);
    
    return module;
  })
);
const TrendsSection = lazy(() => import('../TrendsSection'));
const Footer = lazy(() => import('../Footer'));

interface LazySectionLoaderProps {
  visibleSections: Set<string>;
}

const LazySectionLoader: React.FC<LazySectionLoaderProps> = ({ visibleSections }) => {
  // Preload critical sections that will likely be viewed
  useEffect(() => {
    // Preload contact section after a delay if it's not already visible
    if (!visibleSections.has('contact')) {
      const timer = setTimeout(() => {
        // This will trigger preloading of the contact section
        import('../ContactSection');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [visibleSections]);
  
  return (
    <>
      {/* Conditionally loaded sections (below the fold) */}
      {visibleSections.has('testimonials') && (
        <Suspense fallback={<SectionLoading />}>
          <TestimonialsSection />
        </Suspense>
      )}
      
      {visibleSections.has('pricing') && (
        <Suspense fallback={<SectionLoading />}>
          <PricingSection />
        </Suspense>
      )}
      
      {visibleSections.has('trends') && (
        <Suspense fallback={<SectionLoading />}>
          <TrendsSection />
        </Suspense>
      )}
      
      {visibleSections.has('contact') && (
        <Suspense fallback={<SectionLoading />}>
          <ContactSection />
        </Suspense>
      )}
      
      <Suspense fallback={<SectionLoading />}>
        <Footer />
      </Suspense>
    </>
  );
};

export default LazySectionLoader;
