
import React, { Suspense, lazy } from 'react';

// Loading fallback
const SectionLoading = () => (
  <div className="w-full py-24 flex justify-center items-center">
    <div className="w-16 h-16 border-4 border-atomic-turquoise border-t-atomic-orange rounded-full animate-spin"></div>
  </div>
);

// Lazy loaded components
const TestimonialsSection = lazy(() => import('../TestimonialsSection'));
const PricingSection = lazy(() => import('../PricingSection'));
const BlogSection = lazy(() => import('../BlogSection'));
const TrendsSection = lazy(() => import('../TrendsSection'));
const ContactSection = lazy(() => import('../ContactSection'));
const Footer = lazy(() => import('../Footer'));

interface LazySectionLoaderProps {
  visibleSections: Set<string>;
}

const LazySectionLoader: React.FC<LazySectionLoaderProps> = ({ visibleSections }) => {
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
      
      {visibleSections.has('blog') && (
        <Suspense fallback={<SectionLoading />}>
          <BlogSection />
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
