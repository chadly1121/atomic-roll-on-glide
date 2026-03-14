import React, { useState, useCallback, Suspense, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import FreeTouchUpsButton from '../components/FreeTouchUpsButton';
import PricingSection from '../components/PricingSection';
import AsSeenonTVSection from '../components/AsSeenonTVSection';
import FAQSection from '../components/FAQSection';
import ServiceAreaBlock from '../components/ServiceAreaBlock';

// Import our new refactored components
import ScrollToTopButton from '../components/layout/ScrollToTopButton';
import SectionObserver from '../components/layout/SectionObserver';
import SEOHelmet from '../components/layout/SEOHelmet';
import LazySectionLoader from '../components/layout/LazySectionLoader';

// Import conversion components
import InlineCTA from '../components/conversion/InlineCTA';

// Import trust components
import TrustBadges from '../components/trust/TrustBadges';

// Updated: Feb 2025 - AISO implementation
const Index = () => {
  // Add a scroll to top button
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set([
    'home', 'about', 'services', 'pricing', 'contact', 'asseenontv'
  ]));

  // Optimize scroll handler with useCallback
  const handleScroll = useCallback(() => {
    if (window.scrollY > 500) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  }, []);

  // Handle hash-based scrolling when navigating from another page
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      // Delay to ensure sections are rendered
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
      return () => clearTimeout(timer);
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
      
      {/* Free Touch Ups Button - Responsive sticky bar */}
      <div className="w-full bg-white/80 backdrop-blur-sm py-1.5 sm:py-2 shadow-sm border-b border-gray-100 sticky top-14 sm:top-16 z-40">
        <div className="container mx-auto px-2 sm:px-4 max-w-sm sm:max-w-md flex justify-center">
          <FreeTouchUpsButton />
        </div>
      </div>
      
      {/* Always loaded sections (above the fold) */}
      <HeroSection />
      
      <AboutSection />
      
      {/* First Inline CTA with Trust Badges */}
      <div className="container mx-auto px-4 my-16">
        <InlineCTA 
          title="Transform Your Space Today"
          description="Ready to refresh your home? Get a free, no-obligation quote for your painting project."
          primaryCTA={{ text: "Get a Free Quote", href: "#contact" }}
          secondaryCTA={{ text: "See Our Work", href: "#services" }}
          variant="accent"
          showTrustBadges={true}
        />
      </div>
      
      <ServicesSection /> {/* This now serves as both Services, Gallery, and Pricing */}
      
      {/* Add PricingSection directly to improve loading time */}
      <PricingSection />
      
      {/* "As Seen on TV" Section */}
      <AsSeenonTVSection />
      
      {/* Trust Badges Section */}
      <TrustBadges />
      
      {/* Service Area Block - AISO optimized */}
      <ServiceAreaBlock />
      
      {/* FAQ Section - AISO optimized with FAQPage schema */}
      <FAQSection />
      
      {/* Lazy loaded sections (below the fold) */}
      <LazySectionLoader visibleSections={visibleSections} />
      
      {/* Scroll to Top Button */}
      <ScrollToTopButton showScrollTop={showScrollTop} />
      
      
      {/* Observer for section visibility */}
      <SectionObserver 
        setActiveSection={setActiveSection}
        setVisibleSections={setVisibleSections}
      />
      
    </div>
  );
};

export default Index;
