
import React, { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import FreeTouchUpsButton from '../components/FreeTouchUpsButton';
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

// Lazy loaded components
const TestimonialsSection = lazy(() => import('../components/TestimonialsSection'));
const PricingSection = lazy(() => import('../components/PricingSection'));
const BlogSection = lazy(() => import('../components/BlogSection'));
const TrendsSection = lazy(() => import('../components/TrendsSection'));
const ContactSection = lazy(() => import('../components/ContactSection'));
const Footer = lazy(() => import('../components/Footer'));

// Loading fallback
const SectionLoading = () => (
  <div className="w-full py-24 flex justify-center items-center">
    <div className="w-16 h-16 border-4 border-atomic-turquoise border-t-atomic-orange rounded-full animate-spin"></div>
  </div>
);

const Index = () => {
  // Add a scroll to top button
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['home', 'about', 'services']));
  const { toast } = useToast();

  // Optimize scroll handler with useCallback
  const handleScroll = useCallback(() => {
    if (window.scrollY > 500) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  }, []);

  // Track sections in view and lazy load components as needed
  useEffect(() => {
    // Section observer configuration
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    // Handle intersection
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const sectionId = entry.target.id;
        
        if (entry.isIntersecting) {
          // Set active section for navbar highlighting
          setActiveSection(sectionId);
          
          // Mark section as visible for lazy loading
          setVisibleSections(prev => {
            const updated = new Set(prev);
            updated.add(sectionId);
            
            // Pre-load the next section(s) for smooth transitions
            if (sectionId === 'about') updated.add('services');
            if (sectionId === 'services') updated.add('testimonials');
            if (sectionId === 'testimonials') updated.add('pricing');
            if (sectionId === 'pricing') updated.add('blog');
            if (sectionId === 'blog') updated.add('trends');
            if (sectionId === 'trends') updated.add('contact');
            
            return updated;
          });
        }
      });
    };

    // Create and use observer
    const sectionObserver = new IntersectionObserver(handleIntersection, observerOptions);
    document.querySelectorAll('section[id]').forEach(section => {
      sectionObserver.observe(section);
    });

    // Welcome toast - show after short delay
    const toastTimeout = setTimeout(() => {
      toast({
        title: "Welcome to Roll On Painting",
        description: "Muskoka's premier painting company. Scroll down to explore our services.",
        variant: "default",
        duration: 5000,
      });
    }, 1500);

    // Scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sectionObserver.disconnect();
      clearTimeout(toastTimeout);
    };
  }, [toast, handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Roll On Painting | Muskoka's Premier Painting Service</title>
        <meta name="description" content="Professional painting services in Muskoka including interior, exterior, commercial, and GoNano permanent coating. Free touch-ups and expert service." />
        
        {/* BreadcrumbList schema for SEO */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://rollonpainting.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Services",
                  "item": "https://rollonpainting.com/#services"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Contact",
                  "item": "https://rollonpainting.com/#contact"
                }
              ]
            }
          `}
        </script>
        
        {/* Organization schema for business info */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Roll On Painting",
              "image": "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745866797/IMG_20190920_121835_fchin4.jpg",
              "logo": "https://rollonpainting.com/logo.png",
              "url": "https://rollonpainting.com",
              "telephone": "+1-705-555-1234",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Muskoka Road",
                "addressLocality": "Muskoka",
                "addressRegion": "ON",
                "postalCode": "P1H 1A1",
                "addressCountry": "CA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 45.0,
                "longitude": -79.0
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                  ],
                  "opens": "08:00",
                  "closes": "17:00"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/rollonpainting",
                "https://www.instagram.com/rollonpainting"
              ]
            }
          `}
        </script>
      </Helmet>
      
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
      
      {/* Scroll to Top Button with enhanced animation */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 p-3 bg-atomic-turquoise text-white rounded-full shadow-lg hover:bg-atomic-orange transition-all duration-300 focus:outline-none"
            aria-label="Scroll to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
