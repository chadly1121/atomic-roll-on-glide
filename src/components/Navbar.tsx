
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from 'react-router-dom';
import { navLinks } from './nav/NavLinks';
import DesktopNav from './nav/DesktopNav';
import MobileNav from './nav/MobileNav';
import Logo from './nav/Logo';
import CTAButton from './nav/CTAButton';
import MobileMenuButton from './nav/MobileMenuButton';

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
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Add a small delay before closing the mobile menu to ensure scroll starts
          setTimeout(() => {
            setMobileMenuOpen(false);
          }, 300);
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
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo handleLogoClick={handleLogoClick} />
        <DesktopNav navLinks={navLinks} handleNavLinkClick={handleNavLinkClick} />
        <CTAButton handleNavLinkClick={handleNavLinkClick} />
        <MobileMenuButton mobileMenuOpen={mobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
      </div>
      <MobileNav 
        navLinks={navLinks}
        mobileMenuOpen={mobileMenuOpen}
        handleNavLinkClick={handleNavLinkClick}
      />
    </header>
  );
};

export default Navbar;
