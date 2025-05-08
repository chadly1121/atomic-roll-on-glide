
import React, { useEffect, useRef, useState } from 'react';
import { throttle } from '@/utils/performance';

const ContactForm = () => {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const scriptInitialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  // Optimized Jobber form initialization with progressive enhancement
  useEffect(() => {
    if (scriptInitialized.current) return;
    
    // First, check if Jobber script is already loaded
    const existingScript = document.querySelector('script[clienthub_id="ea87a0d4-d7c5-44c8-b739-29fe788d4d6b"]');
    
    const initializeForm = () => {
      if (!formContainerRef.current) return;
      
      // Create or use existing form container
      const formContainer = document.getElementById('ea87a0d4-d7c5-44c8-b739-29fe788d4d6b') || 
                          document.querySelector('.jobber-embedded-form-container');
      
      if (formContainer) {
        // If form exists but is empty, initialize it
        if (!formContainer.children.length) {
          // Create a fresh script element for Jobber with proper attributes
          const newScript = document.createElement('script');
          newScript.src = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
          newScript.setAttribute('clienthub_id', "ea87a0d4-d7c5-44c8-b739-29fe788d4d6b");
          newScript.setAttribute('form_url', "https://clienthub.getjobber.com/client_hubs/ea87a0d4-d7c5-44c8-b739-29fe788d4d6b/public/work_request/embedded_work_request_form");
          
          // Add onload handler to hide loading indicator
          newScript.onload = () => {
            setTimeout(() => setIsLoading(false), 300); // Give a small delay for form to render
          };
          
          // Add the new script to the body
          document.body.appendChild(newScript);
        } else {
          // Form already has content, just hide loading indicator
          setIsLoading(false);
        }
      }
      
      // Mark as initialized to prevent duplicate initializations
      scriptInitialized.current = true;
    };
    
    // Use Intersection Observer to lazy load the form only when it's close to viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Preload CSS before loading the script
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css';
          link.onload = initializeForm;
          document.head.appendChild(link);
          
          observer.disconnect(); // Once loaded, disconnect observer
        }
      },
      { rootMargin: "300px" } // Start loading when within 300px of viewport (more aggressive preloading)
    );
    
    if (formContainerRef.current) {
      observer.observe(formContainerRef.current);
    }
    
    // Add event listener for custom event to initialize form
    document.addEventListener('initialize-jobber-form', initializeForm);
    
    return () => {
      observer.disconnect();
      document.removeEventListener('initialize-jobber-form', initializeForm);
    };
  }, []);
  
  // Handle form display state
  const handleFormAvailability = () => {
    if (isLoading) {
      // Trigger form load if still loading
      const event = new CustomEvent('initialize-jobber-form');
      document.dispatchEvent(event);
    }
  };
  
  return (
    <div className="bg-white text-atomic-navy p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <h3 className="text-2xl font-bold mb-6 text-atomic-navy">Request a Quote</h3>
      
      {/* Jobber Embedded Form with optimized loading indicator */}
      <div 
        ref={formContainerRef} 
        className="relative min-h-[300px]" 
        onClick={handleFormAvailability}
      >
        <div 
          id="ea87a0d4-d7c5-44c8-b739-29fe788d4d6b" 
          className="jobber-embedded-form-container"
        ></div>
        
        {/* Improved loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 form-loading">
            <div className="w-12 h-12 border-4 border-atomic-turquoise border-t-atomic-orange rounded-full animate-spin mb-3"></div>
            <p className="text-sm text-gray-600">Loading our quote request form...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
