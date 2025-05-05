import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import PricingSection from '../components/PricingSection';
import BlogSection from '../components/BlogSection';
import TrendsSection from '../components/TrendsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import FreeTouchUpsButton from '../components/FreeTouchUpsButton';
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  // Add a scroll to top button
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('home');
  const { toast } = useToast();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    // Track which section is currently in view
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px', // Adjust these values as needed
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      sectionObserver.observe(section);
    });

    // Show welcome toast
    setTimeout(() => {
      toast({
        title: "Welcome to Roll On Painting",
        description: "Muskoka's premier painting company. Scroll down to explore our services.",
        variant: "default",
        duration: 5000,
      });
    }, 1500);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sectionObserver.disconnect();
    };
  }, [toast]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeSection={activeSection} />
      
      {/* Free Touch Ups Button positioned centrally below navbar */}
      <div className="w-full bg-white/80 backdrop-blur-sm py-2 shadow-sm border-b border-gray-100 sticky top-20 z-40">
        <div className="container mx-auto px-4 max-w-md">
          <FreeTouchUpsButton />
        </div>
      </div>
      
      <HeroSection />
      <AboutSection />
      <ServicesSection /> {/* This now serves as both Services and Gallery */}
      
      <TestimonialsSection />
      <PricingSection />
      
      <BlogSection />
      <TrendsSection />
      <ContactSection />
      <Footer />
      
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
