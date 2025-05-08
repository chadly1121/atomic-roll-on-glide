
import React, { useEffect, useRef, useState } from 'react';

const ContactForm = () => {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const scriptInitialized = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  // Optimized Jobber form initialization with eager loading strategy
  useEffect(() => {
    if (scriptInitialized.current) return;
    
    // Immediately start loading the form assets
    setIsLoading(true);
    
    // Add the CSS first for faster visual rendering
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css';
    document.head.appendChild(link);
    
    // Immediately load and execute the script
    const script = document.createElement('script');
    script.src = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
    script.setAttribute('clienthub_id', "ea87a0d4-d7c5-44c8-b739-29fe788d4d6b");
    script.setAttribute('form_url', "https://clienthub.getjobber.com/client_hubs/ea87a0d4-d7c5-44c8-b739-29fe788d4d6b/public/work_request/embedded_work_request_form");
    
    script.onload = () => {
      setIsLoading(false);
      scriptInitialized.current = true;
    };
    
    document.body.appendChild(script);
    
    return () => {
      // Clean up is important for SPA
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="bg-white text-atomic-navy p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <h3 className="text-2xl font-bold mb-6 text-atomic-navy">Request a Quote</h3>
      
      {/* Jobber Embedded Form with optimized loading indicator */}
      <div 
        ref={formContainerRef} 
        className="relative min-h-[300px]"
      >
        <div 
          id="ea87a0d4-d7c5-44c8-b739-29fe788d4d6b" 
          className="jobber-embedded-form-container"
        ></div>
        
        {/* Improved loading indicator - only shown briefly during initial load */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90">
            <div className="w-12 h-12 border-4 border-atomic-turquoise border-t-atomic-orange rounded-full animate-spin mb-3"></div>
            <p className="text-sm text-gray-600">Loading form...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
