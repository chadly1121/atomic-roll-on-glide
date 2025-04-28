
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import GallerySection from '../components/GallerySection';
import TestimonialsSection from '../components/TestimonialsSection';
import PricingSection from '../components/PricingSection';
import BlogSection from '../components/BlogSection';
import TrendsSection from '../components/TrendsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  // Add a scroll to top button
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toast]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <PricingSection />
      <BlogSection />
      <TrendsSection />
      <ContactSection />
      <Footer />
      
      {/* Scroll to Top Button with enhanced animation */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-atomic-turquoise text-white rounded-full shadow-lg hover:bg-atomic-turquoise/90 transition-all duration-300 animate-bounce hover:animate-none hover:scale-110 focus:outline-none"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Index;
