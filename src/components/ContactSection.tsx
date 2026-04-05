
import React from 'react';
import ContactForm from './contact/ContactForm';
import ContactInfo from './contact/ContactInfo';
import SocialLinks from './contact/SocialLinks';
import FeatureBenefits from './contact/FeatureBenefits';
import FreeTouchUpsButton from './FreeTouchUpsButton';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background text-foreground">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative mb-6 sm:mb-8 md:mb-12 inline-block text-foreground">
            Get In Touch
            <span className="absolute left-1/4 -bottom-2 sm:-bottom-4 h-1 w-1/2 bg-atomic-orange rounded-full" />
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Ready to transform your space? Reach out for a free quote or to discuss your project.
          </p>
        </div>
        
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
