
import React from 'react';
import ContactForm from './contact/ContactForm';
import ContactInfo from './contact/ContactInfo';
import SocialLinks from './contact/SocialLinks';
import FeatureBenefits from './contact/FeatureBenefits';
import FreeTouchUpsButton from './FreeTouchUpsButton';

const ContactSection = () => {
  // Ensure all form submissions use HTTPS and handle any loading errors
  React.useEffect(() => {
    try {
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        if (form.action && form.action.startsWith('http:')) {
          form.action = form.action.replace('http:', 'https:');
        }
      });
      
      // Ensure Jobber form scripts are loaded
      const jobberScript = document.createElement('script');
      jobberScript.src = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js';
      jobberScript.setAttribute('clienthub_id', 'ea87a0d4-d7c5-44c8-b739-29fe788d4d6b');
      jobberScript.setAttribute('form_url', 'https://clienthub.getjobber.com/client_hubs/ea87a0d4-d7c5-44c8-b739-29fe788d4d6b/public/work_request/embedded_work_request_form');
      document.body.appendChild(jobberScript);
      
      return () => {
        document.body.removeChild(jobberScript);
      };
    } catch (error) {
      console.error("Error in ContactSection setup:", error);
    }
  }, []);

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-atomic-navy text-white">
      <div className="atomic-starburst w-80 h-80 top-0 right-0 opacity-20"></div>
      <div className="atomic-circle w-72 h-72 -bottom-36 left-10 border-atomic-turquoise/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading text-white">Get In Touch</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Ready to transform your space? Reach out for a free quote or to discuss your project.
          </p>
        </div>
        
        {/* Adding back FreeTouchUpsButton here */}
        <div className="mb-12 max-w-md mx-auto">
          <FreeTouchUpsButton />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <ContactForm />
          
          <div className="space-y-8">
            <ContactInfo />
            <SocialLinks />
            <FeatureBenefits />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
