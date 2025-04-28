
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from 'react-router-dom';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'GoNano', href: '#gonano' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'As Seen on TV', href: '#asseenontv' },
  { name: 'Blog', href: '#blog' },
  { name: 'Trends', href: '#trends' },
  { name: 'Contact', href: '#contact' }
];

interface NavbarProps {
  activeSection?: string;
}

const Navbar = ({ activeSection = '' }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Check if we're on the homepage
    if (location.pathname === '/') {
      // On homepage, scroll to the section
      if (href.startsWith('#')) {
        const element = document.querySelector(href);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      }
    } else {
      // On other pages, navigate to homepage first and then handle the hash
      if (href === '#blog') {
        navigate('/blog');
      } else {
        navigate(`/${href}`);
      }
    }
    
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center hover:opacity-90 transition-opacity group" onClick={handleLogoClick}>
          <motion.img 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            src="https://res.cloudinary.com/dxqfou8jh/image/upload/v1745867167/RollOnPaintingLogo_cplgbj.jpg" 
            alt="Roll On Painting Muskoka Logo" 
            className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              className={`nav-link after:transition-all after:duration-300 after:ease-in-out after:hover:w-full ${
                activeSection === link.href.substring(1) ? "text-atomic-orange" : ""
              }`}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <motion.a 
            href="#contact" 
            className="atomic-button group overflow-hidden relative border-2 border-atomic-orange transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            onClick={(e) => handleNavLinkClick(e, '#contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center group-hover:translate-x-1 transition-transform duration-300">
              Request A Quote
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden text-atomic-navy focus:outline-none transform transition-transform hover:scale-110"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
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
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className="md:hidden bg-white shadow-lg"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {mobileMenuOpen && (
          <nav className="flex flex-col px-4 py-2">
            {navLinks.map(link => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                className="py-3 border-b border-gray-100 last:border-0 font-poppins hover:text-atomic-orange transition-colors"
                onClick={(e) => handleNavLinkClick(e, link.href)}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay: navLinks.indexOf(link) * 0.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a 
              href="#contact" 
              className="atomic-button-secondary mt-4 mb-2 text-center group"
              onClick={(e) => handleNavLinkClick(e, '#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                Request A Quote
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.a>
          </nav>
        )}
      </motion.div>
    </header>
  );
};

export default Navbar;
