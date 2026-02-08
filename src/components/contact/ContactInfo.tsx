
import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

const ContactInfo = () => {
  const isMobile = useIsMobile();

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // This ensures the email client opens properly on all devices
    const mailtoLink = "mailto:info@roll-onpainting.com?subject=Website%20Inquiry&body=Hello%20Roll%20On%20Painting%2C%0A%0AI'm%20interested%20in%20learning%20more%20about%20your%20services.%0A%0AThank%20you%2C%0A";
    window.location.href = mailtoLink;
    e.preventDefault(); // Prevent default only after setting location
  };

  return (
    <div className="space-y-5 md:space-y-6">
      <h3 className="text-2xl font-bold">Contact Information</h3>
      <div className="space-y-5 md:space-y-6">
        <div className="flex items-start">
          <div className="mr-4 bg-atomic-turquoise/20 p-3 rounded-full">
            <Mail className="h-6 w-6 text-atomic-turquoise" />
          </div>
          <div>
            <h4 className="font-bold">Email</h4>
            <a 
              href="mailto:info@roll-onpainting.com?subject=Website%20Inquiry&body=Hello%20Roll%20On%20Painting%2C%0A%0AI'm%20interested%20in%20learning%20more%20about%20your%20services.%0A%0AThank%20you%2C%0A"
              className="text-atomic-turquoise hover:underline active:text-atomic-turquoise/80 text-base md:text-lg"
              onClick={handleEmailClick}
              aria-label="Email info@roll-onpainting.com"
            >
              info@roll-onpainting.com
              {isMobile && (
                <span className="ml-2 text-xs bg-atomic-turquoise/10 text-atomic-turquoise px-2 py-1 rounded-full">
                  Tap to email
                </span>
              )}
            </a>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mr-4 bg-atomic-turquoise/20 p-3 rounded-full">
            <Phone className="h-6 w-6 text-atomic-turquoise" />
          </div>
          <div>
            <h4 className="font-bold">Phone</h4>
            <a 
              href="tel:+17057871401" 
              className="text-atomic-turquoise hover:underline active:text-atomic-turquoise/80 text-base md:text-lg flex items-center"
              aria-label="Call 705-787-1401"
            >
              <span>705-787-1401</span>
              {isMobile && (
                <span className="ml-2 text-xs bg-atomic-turquoise/10 text-atomic-turquoise px-2 py-1 rounded-full">
                  Tap to call
                </span>
              )}
            </a>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mr-4 bg-atomic-turquoise/20 p-3 rounded-full">
            <MapPin className="h-6 w-6 text-atomic-turquoise" />
          </div>
          <div>
            <h4 className="font-bold">Location</h4>
            <p>836 Greer Road, Port Sydney, Ontario P0B 1L0, Canada</p>
            <p className="mt-1 text-sm md:text-base text-white/80">Serving Muskoka and surrounding areas</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mr-4 bg-atomic-turquoise/20 p-3 rounded-full">
            <Clock className="h-6 w-6 text-atomic-turquoise" />
          </div>
          <div>
            <h4 className="font-bold">Working Hours</h4>
            <p>Monday - Friday: 7:00 AM - 5:00 PM</p>
            <p>Saturday: 10:00 AM - 2:00 PM</p>
            <p>Sunday: By appointment only</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
