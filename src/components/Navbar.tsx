
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, Users } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from './nav/Logo';
import DesktopNav from './nav/DesktopNav';
import CTAButton from './nav/CTAButton';
import { navLinks } from './nav/NavLinks';

interface NavbarProps {
  activeSection?: string;
}

const Navbar = ({ activeSection = '' }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Don't render navbar on calendar page
  if (location.pathname === '/calendar') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/98 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo handleLogoClick={handleLogoClick} />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <DesktopNav navLinks={navLinks} handleNavLinkClick={handleNavLinkClick} />
          </div>
          
          {/* Desktop Auth & CTA Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/teams')}
                  className="flex items-center gap-2 text-charcoal hover:text-gold"
                >
                  <Users className="h-4 w-4" />
                  Teams
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 text-charcoal hover:text-gold">
                      <User className="h-4 w-4" />
                      {user.email}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border-border">
                    <DropdownMenuItem onClick={() => navigate('/calendar')}>
                      Calendar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/jobs')}>
                      Jobs
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/employees')}>
                      Employees
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/customers')}>
                      Customers
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/auth')}
                  className="flex items-center gap-2 text-charcoal hover:text-gold font-sans text-sm"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Button>
                <CTAButton handleNavLinkClick={handleNavLinkClick} />
              </>
            )}
          </div>
          
          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2 text-charcoal hover:text-gold transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-border"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map(link => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block py-3 text-sm font-sans uppercase tracking-widest text-charcoal hover:text-gold transition-colors border-b border-border/50 last:border-b-0"
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.name}
                </motion.a>
              ))}
              
              {user ? (
                <>
                  <motion.button
                    onClick={() => { navigate('/teams'); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left py-3 text-sm font-sans uppercase tracking-widest text-charcoal hover:text-gold transition-colors border-b border-border/50"
                    whileTap={{ scale: 0.98 }}
                  >
                    Teams
                  </motion.button>
                  <motion.button
                    onClick={handleSignOut}
                    className="block w-full text-left py-3 text-sm font-sans uppercase tracking-widest text-destructive"
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign Out
                  </motion.button>
                </>
              ) : (
                <div className="pt-6 space-y-4">
                  <Button
                    onClick={() => { navigate('/auth'); setIsMobileMenuOpen(false); }}
                    variant="outline"
                    className="w-full border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
                  >
                    Sign In
                  </Button>
                  <a 
                    href="#contact"
                    onClick={(e) => handleNavLinkClick(e, '#contact')}
                    className="btn-gold w-full block text-center"
                  >
                    Get Quote
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
