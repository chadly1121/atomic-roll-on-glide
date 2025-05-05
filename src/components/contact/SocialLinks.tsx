
import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

const SocialLinks = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">Follow Us</h3>
      <div className="flex space-x-4">
        <a 
          href="https://www.instagram.com/roll_on_painting/" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-atomic-turquoise/20 flex items-center justify-center hover:bg-atomic-turquoise/40 transition-colors"
        >
          <Instagram className="h-6 w-6 text-atomic-turquoise" />
        </a>
        <a 
          href="https://www.facebook.com/people/Roll-On-Painting-Muskoka/100083040946938/" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-atomic-turquoise/20 flex items-center justify-center hover:bg-atomic-turquoise/40 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-atomic-turquoise" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
          </svg>
        </a>
        <a 
          href="https://www.linkedin.com/company/roll-onpainting/" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-atomic-turquoise/20 flex items-center justify-center hover:bg-atomic-turquoise/40 transition-colors"
        >
          <Linkedin className="h-6 w-6 text-atomic-turquoise" />
        </a>
        <a 
          href="https://g.co/kgs/hH1mnMH" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-atomic-turquoise/20 flex items-center justify-center hover:bg-atomic-turquoise/40 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="h-5 w-5">
            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
