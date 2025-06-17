
import React from 'react';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-atomic-navy text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/9058a595-b38f-4cdc-893a-19baaccf57d5.png" 
                alt="Roll On Painting Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 mb-6">
              Professional interior and exterior painting services for residential and commercial properties.
            </p>
            <p className="text-gray-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-atomic-turquoise" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              836 Greer Road, Port Sydney, Ontario, Canada
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => scrollToSection(e, '#about')}
                  className="text-gray-300 hover:text-atomic-turquoise transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => scrollToSection(e, '#services')}
                  className="text-gray-300 hover:text-atomic-turquoise transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#gallery" 
                  onClick={(e) => scrollToSection(e, '#gallery')}
                  className="text-gray-300 hover:text-atomic-turquoise transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a 
                  href="#gonano" 
                  onClick={(e) => scrollToSection(e, '#gonano')}
                  className="text-gray-300 hover:text-atomic-turquoise transition-colors"
                >
                  GoNano
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  onClick={(e) => scrollToSection(e, '#pricing')}
                  className="text-gray-300 hover:text-atomic-turquoise transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-gray-300 hover:text-atomic-turquoise transition-colors" onClick={(e) => scrollToSection(e, '#services')}>
                  Interior Painting
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-atomic-turquoise transition-colors" onClick={(e) => scrollToSection(e, '#services')}>
                  Exterior Painting
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-atomic-turquoise transition-colors" onClick={(e) => scrollToSection(e, '#services')}>
                  Commercial Painting
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-atomic-turquoise transition-colors" onClick={(e) => scrollToSection(e, '#services')}>
                  Cabinet Refinishing
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-atomic-turquoise transition-colors" onClick={(e) => scrollToSection(e, '#services')}>
                  Deck & Fence Staining
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-atomic-turquoise" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@rollonpainting.com" className="text-gray-300 hover:text-atomic-turquoise transition-colors">
                  info@rollonpainting.com
                </a>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-atomic-turquoise" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+17057871401" className="text-gray-300 hover:text-atomic-turquoise transition-colors">
                  (705) 787-1401
                </a>
              </li>
              <li className="mt-4">
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="bg-atomic-turquoise text-white px-6 py-2 rounded-full inline-block hover:bg-atomic-turquoise/80 transition-all hover:-translate-y-1 hover:shadow-md duration-300"
                >
                  Request a Quote
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 sm:mb-0">
              © {new Date().getFullYear()} Roll On Painting. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://www.instagram.com/roll_on_painting/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-atomic-turquoise transition-colors transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=100083040946938" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-atomic-turquoise transition-colors transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://ca.linkedin.com/in/chad-gilchrist-25332b104" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-atomic-turquoise transition-colors transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://goo.gl/maps/xwGdHUy9RwYXcGLb9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-atomic-turquoise transition-colors transform hover:scale-110"
                aria-label="Google Maps"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="h-5 w-5">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
