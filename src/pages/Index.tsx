
import React, { useState, useCallback, Suspense } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import FreeTouchUpsButton from '../components/FreeTouchUpsButton';

// Import our new refactored components
import ScrollToTopButton from '../components/layout/ScrollToTopButton';
import SectionObserver from '../components/layout/SectionObserver';
import WelcomeToast from '../components/layout/WelcomeToast';
import SEOHelmet from '../components/layout/SEOHelmet';
import LazySectionLoader from '../components/layout/LazySectionLoader';

const Index = () => {
  // Add a scroll to top button
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['home', 'about', 'services']));

  // Optimize scroll handler with useCallback
  const handleScroll = useCallback(() => {
    if (window.scrollY > 500) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  }, []);

  // Setup event listeners for scroll
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHelmet />
      
      <Navbar activeSection={activeSection} />
      
      {/* Free Touch Ups Button positioned centrally below navbar */}
      <div className="w-full bg-white/80 backdrop-blur-sm py-2 shadow-sm border-b border-gray-100 sticky top-20 z-40">
        <div className="container mx-auto px-4 max-w-md flex justify-center">
          <FreeTouchUpsButton />
        </div>
      </div>
      
      {/* Always loaded sections (above the fold) */}
      <HeroSection />
      <AboutSection />
      <ServicesSection /> {/* This now serves as both Services and Gallery */}
      
      {/* Lazy loaded sections (below the fold) */}
      <LazySectionLoader visibleSections={visibleSections} />
      
      {/* Scroll to Top Button */}
      <ScrollToTopButton showScrollTop={showScrollTop} />
      
      {/* Observer for section visibility */}
      <SectionObserver 
        setActiveSection={setActiveSection}
        setVisibleSections={setVisibleSections}
      />
      
      {/* Welcome toast */}
      <WelcomeToast />
    </div>
  );
};

export default Index;
