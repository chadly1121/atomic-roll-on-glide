
import React, { useState, useCallback, Suspense, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import FreeTouchUpsButton from '../components/FreeTouchUpsButton';
import PricingSection from '../components/PricingSection';
import AsSeenonTVSection from '../components/AsSeenonTVSection';

// Import our new refactored components
import ScrollToTopButton from '../components/layout/ScrollToTopButton';
import SectionObserver from '../components/layout/SectionObserver';
import WelcomeToast from '../components/layout/WelcomeToast';
import SEOHelmet from '../components/layout/SEOHelmet';
import LazySectionLoader from '../components/layout/LazySectionLoader';

// Import conversion components
import InlineCTA from '../components/conversion/InlineCTA';
import ExitIntentPopup from '../components/conversion/ExitIntentPopup';

// Import trust components
import TrustBadges from '../components/trust/TrustBadges';

const Index = () => {
  // Add a scroll to top button
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set([
    'home', 'about', 'services', 'pricing', 'contact'
  ]));

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
  
  // Preload Jobber form assets for better performance
  useEffect(() => {
    // Add preload for Jobber form scripts
    const preloadJobberScript = document.createElement('link');
    preloadJobberScript.rel = 'preload';
    preloadJobberScript.as = 'script';
    preloadJobberScript.href = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js';
    document.head.appendChild(preloadJobberScript);
    
    // Preload CSS
    const preloadJobberCSS = document.createElement('link');
    preloadJobberCSS.rel = 'preload';
    preloadJobberCSS.as = 'style';
    preloadJobberCSS.href = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css';
    document.head.appendChild(preloadJobberCSS);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHelmet />
      
      <Navbar activeSection={activeSection} />
      
      {/* Free Touch Ups Button - No color consultation offered */}
      <div className="w-full bg-white/80 backdrop-blur-sm py-2 shadow-sm border-b border-gray-100 sticky top-20 z-40">
        <div className="container mx-auto px-4 max-w-md flex justify-center">
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
      
      {/* Exit Intent Popup */}
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
