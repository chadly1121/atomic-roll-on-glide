
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './nav/Logo';
import DesktopNav from './nav/DesktopNav';
import CTAButton from './nav/CTAButton';
import { navLinks } from './nav/NavLinks';

interface NavbarProps {
  activeSection?: string;
}

const Navbar = ({ activeSection = '' }: NavbarProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const location = useLocation();

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
      if (location.pathname === '/') {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/' + href);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Logo handleLogoClick={handleLogoClick} />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <DesktopNav navLinks={navLinks} handleNavLinkClick={handleNavLinkClick} />
          </div>
          
          {/* Desktop CTA Section */}
          <div className="hidden md:flex items-center">
            <CTAButton handleNavLinkClick={handleNavLinkClick} />
          </div>
          
          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2 rounded-md text-atomic-navy hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - CSS transition instead of framer-motion */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 shadow-lg transition-all duration-200 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-[calc(100vh-3.5rem)] opacity-100 overflow-y-auto overscroll-contain'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 py-6 space-y-2 pb-8">
          {navLinks.map((link) => (
            <MobileNavItem
              key={link.name}
              link={link}
              handleNavLinkClick={handleNavLinkClick}
            />
          ))}
          
          <div className="pt-4">
            <CTAButton handleNavLinkClick={handleNavLinkClick} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

interface MobileNavItemProps {
  link: import('./nav/NavLinks').NavLink;
  handleNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ link, handleNavLinkClick }) => {
  const [open, setOpen] = useState(false);
  const baseLink =
    'block py-3 px-2 text-lg font-medium text-atomic-navy hover:text-atomic-orange transition-colors active:scale-95';

  if (!link.children) {
    return (
      <a
        href={link.href}
        className={`${baseLink} border-b border-gray-100`}
        onClick={(e) => handleNavLinkClick(e, link.href)}
      >
        {link.name}
      </a>
    );
  }

  return (
    <div className="border-b border-gray-100">
      <div className="flex items-center justify-between">
        <a
          href={link.href}
          className={`${baseLink} flex-1`}
          onClick={(e) => handleNavLinkClick(e, link.href)}
        >
          {link.name}
        </a>
        <button
          type="button"
          aria-label={`Toggle ${link.name} submenu`}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="p-3 text-atomic-navy hover:text-atomic-orange min-w-[48px] min-h-[48px] flex items-center justify-center"
        >
          <ChevronDown
            size={20}
            className={`transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
      {open && (
        <div className="pl-4 pb-2 space-y-1">
          {link.children.map((child) => (
            <React.Fragment key={`${child.name}-${child.href}`}>
              {child.divider && <div className="my-2 border-t border-gray-100" />}
              <a
                href={child.href}
                className="block py-2 px-2 text-base text-atomic-navy hover:text-atomic-orange transition-colors"
                onClick={(e) => handleNavLinkClick(e, child.href)}
              >
                {child.name}
              </a>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
