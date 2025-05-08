
import React, { useEffect } from 'react';

const ContactForm = () => {
  // Add an effect to ensure the Jobber form is properly initialized
  useEffect(() => {
    // This will attempt to re-initialize the Jobber form if needed
    const script = document.querySelector('script[clienthub_id="ea87a0d4-d7c5-44c8-b739-29fe788d4d6b"]');
    if (script) {
      const newScript = document.createElement('script');
      newScript.src = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
      newScript.setAttribute('clienthub_id', "ea87a0d4-d7c5-44c8-b739-29fe788d4d6b");
      newScript.setAttribute('form_url', "https://clienthub.getjobber.com/client_hubs/ea87a0d4-d7c5-44c8-b739-29fe788d4d6b/public/work_request/embedded_work_request_form");
      
      // Remove the old script and add the new one to reinitialize
      script.parentNode?.removeChild(script);
      document.body.appendChild(newScript);
    }
  }, []);
  
  return (
    <div className="bg-white text-atomic-navy p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <h3 className="text-2xl font-bold mb-6 text-atomic-navy">Request a Quote</h3>
      
      {/* Jobber Embedded Form */}
      <div 
        id="ea87a0d4-d7c5-44c8-b739-29fe788d4d6b" 
        className="jobber-embedded-form-container"
      ></div>
    </div>
  );
};

export default ContactForm;
