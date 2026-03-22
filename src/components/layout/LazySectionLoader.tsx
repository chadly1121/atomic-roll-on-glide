import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';

const TestimonialsSection = lazy(() => import('../TestimonialsSection'));
const ContactSection = lazy(() => import('../ContactSection'));
const Footer = lazy(() => import('../Footer'));

const SectionPlaceholder = () => (
  <div className="w-full py-16 flex justify-center">
    <div className="w-10 h-10 border-3 border-atomic-orange border-t-transparent rounded-full animate-spin" />
  </div>
);

interface LazySectionLoaderProps {
  visibleSections: Set<string>;
}

const LazySectionLoader: React.FC<LazySectionLoaderProps> = ({ visibleSections }) => {
  const [sectionsInView, setSectionsInView] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            if (sectionId) {
              setSectionsInView(prev => new Set([...prev, sectionId]));
            }
          }
        });
      },
      { rootMargin: '300px', threshold: 0 }
    );

    const placeholders = containerRef.current?.querySelectorAll('[data-section]');
    placeholders?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Testimonials */}
      <div data-section="testimonials">
        {sectionsInView.has('testimonials') ? (
          <Suspense fallback={<SectionPlaceholder />}>
            <TestimonialsSection />
          </Suspense>
        ) : (
          <div className="min-h-[200px]" />
        )}
      </div>

      {/* Contact */}
      <div id="contact" data-section="contact">
        {sectionsInView.has('contact') ? (
          <Suspense fallback={<SectionPlaceholder />}>
            <ContactSection />
          </Suspense>
        ) : (
          <div className="min-h-[400px] flex items-center justify-center">
            <SectionPlaceholder />
          </div>
        )}
      </div>

      {/* Footer */}
      <Suspense fallback={<SectionPlaceholder />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default LazySectionLoader;
