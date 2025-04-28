
import React from 'react';

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
              <div className="h-10 w-10 rounded-full bg-atomic-turquoise flex items-center justify-center overflow-hidden">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div className="ml-2">
                <h3 className="text-lg font-bold">Roll On <span className="text-atomic-turquoise">Painting</span></h3>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Professional interior and exterior painting services for residential and commercial properties.
            </p>
            <p className="text-gray-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-atomic-turquoise" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              836 Greer Road, Huntsville, Ontario, Canada
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
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://g.co/kgs/wMVjW8Q" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-atomic-turquoise transition-colors transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="h-5 w-5">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/roll-onpainting/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-atomic-turquoise transition-colors transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
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
