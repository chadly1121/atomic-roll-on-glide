import React, { useState, useCallback, Suspense, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import FreeTouchUpsButton from '../components/FreeTouchUpsButton';
import AsSeenonTVSection from '../components/AsSeenonTVSection';
import FAQSection from '../components/FAQSection';
import ServiceAreaBlock from '../components/ServiceAreaBlock';
import ScrollToTopButton from '../components/layout/ScrollToTopButton';
import SectionObserver from '../components/layout/SectionObserver';
import SEOHelmet from '../components/layout/SEOHelmet';
import LazySectionLoader from '../components/layout/LazySectionLoader';
import TrustBadges from '../components/trust/TrustBadges';

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set([
    'home', 'about', 'services', 'pricing', 'contact', 'asseenontv'
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
      <AboutSection />
      <ServicesSection />
      <AsSeenonTVSection />
      <TrustBadges />
      <ServiceAreaBlock />
      <FAQSection />
      
      <LazySectionLoader visibleSections={visibleSections} />
      <ScrollToTopButton showScrollTop={showScrollTop} />
      <SectionObserver 
        setActiveSection={setActiveSection}
        setVisibleSections={setVisibleSections}
      />
    </div>
  );
};

export default Index;
