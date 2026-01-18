
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
    <footer className="bg-charcoal text-white py-20">
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
            <p className="text-white/60 mb-6 font-sans text-sm leading-relaxed">
              Professional interior and exterior painting services for residential and commercial properties.
            </p>
            <p className="text-white/60 flex items-center text-sm font-sans">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gold" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              836 Greer Road, Port Sydney, Ontario
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-sans uppercase tracking-widest mb-6 text-gold">Quick Links</h3>
            <ul className="space-y-3">
              {['About', 'Services', 'Gallery', 'GoNano', 'Pricing'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => scrollToSection(e, `#${item.toLowerCase()}`)}
                    className="text-white/60 hover:text-gold transition-colors font-sans text-sm"
                  >
                    {item === 'About' ? 'About Us' : item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-sans uppercase tracking-widest mb-6 text-gold">Services</h3>
            <ul className="space-y-3">
              {['Interior Painting', 'Exterior Painting', 'Commercial Painting', 'Cabinet Refinishing', 'Deck & Fence Staining'].map((service) => (
                <li key={service}>
                  <a 
                    href="#services" 
                    onClick={(e) => scrollToSection(e, '#services')}
                    className="text-white/60 hover:text-gold transition-colors font-sans text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-sans uppercase tracking-widest mb-6 text-gold">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:leonardo@roll-onpainting.com" className="text-white/60 hover:text-gold transition-colors font-sans text-sm">
                  leonardo@roll-onpainting.com
                </a>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+17057871401" className="text-white/60 hover:text-gold transition-colors font-sans text-sm">
                  (705) 787-1401
                </a>
              </li>
              <li className="mt-6">
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="btn-gold inline-block text-sm"
                >
                  Request a Quote
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-white/40 text-sm font-sans mb-4 sm:mb-0">
              © {new Date().getFullYear()} Roll On Painting. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://www.instagram.com/roll_on_painting/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/40 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=100083040946938" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/40 hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://ca.linkedin.com/in/chad-gilchrist-25332b104" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/40 hover:text-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;