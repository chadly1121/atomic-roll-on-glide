
import React, { useEffect, useRef } from 'react';
import { throttle } from '@/utils/performance';

const ContactForm = () => {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const scriptInitialized = useRef(false);

  // Optimized Jobber form initialization with memoization and lazy loading
  useEffect(() => {
    if (scriptInitialized.current) return;
    
    const loadJobberForm = () => {
      // Check if the form container is in viewport or close to it
      if (!formContainerRef.current) return;
      
      // Remove any existing script to prevent duplicate initialization
      const existingScript = document.querySelector('script[clienthub_id="ea87a0d4-d7c5-44c8-b739-29fe788d4d6b"]');
      if (existingScript) {
        existingScript.parentNode?.removeChild(existingScript);
      }
      
      // Create a fresh script element for Jobber with proper attributes
      const newScript = document.createElement('script');
      newScript.src = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
      newScript.setAttribute('clienthub_id', "ea87a0d4-d7c5-44c8-b739-29fe788d4d6b");
      newScript.setAttribute('form_url', "https://clienthub.getjobber.com/client_hubs/ea87a0d4-d7c5-44c8-b739-29fe788d4d6b/public/work_request/embedded_work_request_form");
      newScript.setAttribute('defer', 'true');
      
      // Add the new script to the body
      document.body.appendChild(newScript);
      
      // Mark as initialized to prevent duplicate initializations
      scriptInitialized.current = true;
    };

    // Use Intersection Observer to lazy load the form only when it's close to viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadJobberForm();
          observer.disconnect(); // Once loaded, disconnect observer
        }
      },
      { rootMargin: "200px" } // Start loading when within 200px of viewport
    );
    
    if (formContainerRef.current) {
      observer.observe(formContainerRef.current);
    }
    
    return () => {
      observer.disconnect();
      // Clean up script when component unmounts
      const cleanupScript = document.querySelector('script[clienthub_id="ea87a0d4-d7c5-44c8-b739-29fe788d4d6b"]');
      if (cleanupScript) {
        cleanupScript.parentNode?.removeChild(cleanupScript);
      }
    };
  }, []);
  
  return (
    <div className="bg-white text-atomic-navy p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <h3 className="text-2xl font-bold mb-6 text-atomic-navy">Request a Quote</h3>
      
      {/* Jobber Embedded Form with loading indicator */}
      <div ref={formContainerRef} className="relative min-h-[300px]">
        <div 
          id="ea87a0d4-d7c5-44c8-b739-29fe788d4d6b" 
          className="jobber-embedded-form-container"
        ></div>
        
        {/* Loading indicator that disappears when form loads */}
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 form-loading">
          <div className="w-12 h-12 border-4 border-atomic-turquoise border-t-atomic-orange rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
