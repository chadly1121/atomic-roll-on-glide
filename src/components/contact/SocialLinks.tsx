
import React from 'react';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

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
          aria-label="Follow us on Instagram"
        >
          <Instagram className="h-6 w-6 text-atomic-turquoise" />
        </a>
        <a 
          href="https://www.facebook.com/profile.php?id=100083040946938" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-atomic-turquoise/20 flex items-center justify-center hover:bg-atomic-turquoise/40 transition-colors"
          aria-label="Follow us on Facebook"
        >
          <Facebook className="h-6 w-6 text-atomic-turquoise" />
        </a>
        <a 
          href="https://ca.linkedin.com/in/chad-gilchrist-25332b104" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-atomic-turquoise/20 flex items-center justify-center hover:bg-atomic-turquoise/40 transition-colors"
          aria-label="Connect with us on LinkedIn"
        >
          <Linkedin className="h-6 w-6 text-atomic-turquoise" />
        </a>
        <a 
          href="https://goo.gl/maps/xwGdHUy9RwYXcGLb9" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-atomic-turquoise/20 flex items-center justify-center hover:bg-atomic-turquoise/40 transition-colors"
          aria-label="Find us on Google Maps"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="h-5 w-5 text-atomic-turquoise">
            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
