import React, { useState, useCallback, lazy, Suspense, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FreeTouchUpsButton from '../components/FreeTouchUpsButton';
import ScrollToTopButton from '../components/layout/ScrollToTopButton';
import SectionObserver from '../components/layout/SectionObserver';
import SEOHelmet from '../components/layout/SEOHelmet';

// Lazy-load everything below the fold to cut TBT and improve LCP/FCP
const ServicesSection = lazy(() => import('../components/ServicesSection'));
const AsFeaturedInSection = lazy(() => import('../components/AsFeaturedInSection'));
const TrustBadges = lazy(() => import('../components/trust/TrustBadges'));
const ServiceAreaBlock = lazy(() => import('../components/ServiceAreaBlock'));
const FAQSection = lazy(() => import('../components/FAQSection'));
const LazySectionLoader = lazy(() => import('../components/layout/LazySectionLoader'));

const SectionPlaceholder = () => (
  <div className="w-full py-16 flex justify-center">
    <div className="w-10 h-10 border-3 border-atomic-orange border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set([
    'home', 'services', 'pricing', 'contact', 'asseenontv'
  ]));

  const handleScroll = useCallback(() => {
    setShowScrollTop(window.scrollY > 500);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      const timer = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHelmet />
      <Navbar activeSection={activeSection} />
      
      {/* Free Touch Ups sticky bar */}
      <div className="w-full bg-background/80 backdrop-blur-sm py-1.5 sm:py-2 shadow-sm border-b border-border sticky top-14 sm:top-16 z-40">
        <div className="container mx-auto px-2 sm:px-4 max-w-sm sm:max-w-md flex justify-center">
          <FreeTouchUpsButton />
        </div>
      </div>

      <HeroSection />
      
      {/* Below-fold sections - lazy loaded */}
      <Suspense fallback={<SectionPlaceholder />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <AsFeaturedInSection />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <TrustBadges />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <ServiceAreaBlock />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <FAQSection />
      </Suspense>
      
      <Suspense fallback={<SectionPlaceholder />}>
        <LazySectionLoader visibleSections={visibleSections} />
      </Suspense>
      <ScrollToTopButton showScrollTop={showScrollTop} />
      <SectionObserver 
        setActiveSection={setActiveSection}
        setVisibleSections={setVisibleSections}
      />
    </div>
  );
};

export default Index;
