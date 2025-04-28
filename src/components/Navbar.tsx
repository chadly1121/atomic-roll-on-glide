
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Blog', href: '#blog' },
  { name: 'Trends', href: '#trends' },
  { name: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - 100,
          behavior: 'smooth'
        });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center hover:opacity-90 transition-opacity">
          <img 
            src="https://lh3.googleusercontent.com/pw/AP1GczPXpne0XfmHhoZNF5sGV1sOfoR1ZE3n3kxyUK2YwQcdm8ssD2x-gBuDNR1EJ6pB4OGlsoYQPC6OQnoe2D-YWeD59ZavgYt-zaK9tpTOLwwlEq2wmHcb_1VZzRPO3WE1YJ0LyYRRKEC8c6JpNGBFLH0pYw=w1200-h600-s-no-gm" 
            alt="Roll On Painting Muskoka Logo" 
            className="h-12 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="nav-link after:transition-all after:duration-300 after:ease-in-out after:hover:w-full"
              onClick={handleNavLinkClick}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a 
            href="#contact" 
            className="atomic-button group overflow-hidden relative border-2 border-atomic-orange transition-all duration-300 hover:shadow-lg"
            onClick={handleNavLinkClick}
          >
            <span className="relative z-10 flex items-center group-hover:translate-x-1 transition-transform duration-300">
              Request A Quote
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden text-atomic-navy focus:outline-none transform transition-transform hover:scale-110"
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <nav className="flex flex-col px-4 py-2">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="py-3 border-b border-gray-100 last:border-0 font-poppins hover:text-atomic-orange transition-colors"
                onClick={handleNavLinkClick}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="atomic-button-secondary mt-4 mb-2 text-center group"
              onClick={handleNavLinkClick}
            >
              <span className="relative z-10 flex items-center justify-center">
                Request A Quote
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
