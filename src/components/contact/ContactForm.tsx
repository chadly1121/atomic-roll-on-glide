
import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";

const ContactForm = () => {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const scriptInitialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  // Enhanced Jobber form initialization with optimized eager loading strategy
  useEffect(() => {
    if (scriptInitialized.current) return;
    
    // Start loading the form assets immediately
    const loadAssets = async () => {
      try {
        // Add CSS link instantly
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css';
        document.head.appendChild(link);
      
        // Add script with high priority
        const script = document.createElement('script');
        script.src = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
        script.setAttribute('clienthub_id', "ea87a0d4-d7c5-44c8-b739-29fe788d4d6b");
        script.setAttribute('form_url', "https://clienthub.getjobber.com/client_hubs/ea87a0d4-d7c5-44c8-b739-29fe788d4d6b/public/work_request/embedded_work_request_form");
        script.setAttribute('async', 'false'); // Changed to false for faster loading
        script.setAttribute('defer', 'false'); // Changed to false for faster loading
        
        // Use a promise to track script loading
        await new Promise<void>((resolve) => {
          script.onload = () => resolve();
          document.body.appendChild(script);
        });
        
        // Give a small delay for the form to initialize
        setTimeout(() => {
          setIsLoading(false);
          scriptInitialized.current = true;
        }, 100); // Reduced timeout
      } catch (error) {
        console.error("Error loading Jobber form assets:", error);
        setIsLoading(false);
      }
    };
    
    loadAssets();
    
    // Cleanup function
    return () => {
      const script = document.querySelector('script[src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js"]');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={`bg-white text-atomic-navy p-4 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isMobile ? 'mx-auto max-w-full' : ''}`}>
      <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-atomic-navy">Request a Quote</h3>
      
      {/* Jobber Embedded Form with improved loading indicator */}
      <div 
        ref={formContainerRef} 
        className="relative min-h-[300px] overflow-hidden"
        style={{ touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' }} // Improve touch handling
      >
        <div 
          id="ea87a0d4-d7c5-44c8-b739-29fe788d4d6b" 
          className="jobber-embedded-form-container w-full"
        ></div>
        
        {/* Enhanced loading indicator with better visibility */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 z-10">
            <div className="w-12 h-12 border-4 border-atomic-turquoise border-t-atomic-orange rounded-full animate-spin mb-4"></div>
            <p className="text-sm text-gray-600 font-medium">Loading form...</p>
            <p className="text-xs text-gray-500 mt-1">This will only take a moment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
