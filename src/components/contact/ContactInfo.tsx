
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">Contact Information</h3>
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="mr-4 bg-atomic-turquoise/20 p-3 rounded-full">
            <Mail className="h-6 w-6 text-atomic-turquoise" />
          </div>
          <div>
            <h4 className="font-bold">Email</h4>
            <a href="mailto:info@rollonpainting.com" className="text-atomic-turquoise hover:underline">info@rollonpainting.com</a>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mr-4 bg-atomic-turquoise/20 p-3 rounded-full">
            <Phone className="h-6 w-6 text-atomic-turquoise" />
          </div>
          <div>
            <h4 className="font-bold">Phone</h4>
            <a href="tel:+17057871401" className="text-atomic-turquoise hover:underline">705-787-1401</a>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mr-4 bg-atomic-turquoise/20 p-3 rounded-full">
            <MapPin className="h-6 w-6 text-atomic-turquoise" />
          </div>
          <div>
            <h4 className="font-bold">Location</h4>
            <p>836 Greer Road, Huntsville, Ontario, Canada</p>
            <p className="mt-1">Serving Muskoka and surrounding areas</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mr-4 bg-atomic-turquoise/20 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-atomic-turquoise" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </div>
          <div>
            <h4 className="font-bold">Working Hours</h4>
            <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
            <p>Saturday: 9:00 AM - 4:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
