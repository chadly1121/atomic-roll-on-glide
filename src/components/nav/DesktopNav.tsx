import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { NavLink } from './NavLinks';

interface DesktopNavProps {
  navLinks: NavLink[];
  handleNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const DesktopNav = ({ navLinks, handleNavLinkClick }: DesktopNavProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const open = (i: number) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenIndex(i);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenIndex(null), 120);
  };

  const linkClass =
    'nav-link after:transition-all after:duration-300 after:ease-in-out after:hover:w-full text-atomic-navy hover:text-atomic-orange text-sm lg:text-base transition-transform hover:scale-105 active:scale-95';

  return (
    <nav className="hidden md:flex items-center space-x-3 lg:space-x-5 xl:space-x-6">
      {navLinks.map((link, i) => {
        if (!link.children) {
          return (
            <a
              key={link.name}
              href={link.href}
              className={linkClass}
              onClick={(e) => handleNavLinkClick(e, link.href)}
            >
              {link.name}
            </a>
          );
        }
        const isOpen = openIndex === i;
        return (
          <div
            key={link.name}
            className="relative"
            onMouseEnter={() => open(i)}
            onMouseLeave={scheduleClose}
            onFocus={() => open(i)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
            }}
          >
            <a
              href={link.href}
              className={`${linkClass} inline-flex items-center gap-1`}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              aria-haspopup="true"
              aria-expanded={isOpen}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  open(i);
                } else if (e.key === 'Escape') {
                  setOpenIndex(null);
                }
              }}
            >
              {link.name}
              <ChevronDown
                size={14}
                className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </a>
            {isOpen && (
              <div
                role="menu"
                className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
              >
                <div className="min-w-[240px] bg-white rounded-lg shadow-lg border border-border py-2">
                  {link.children.map((child) => (
                    <React.Fragment key={`${child.name}-${child.href}`}>
                      {child.divider && <div className="my-2 border-t border-border" />}
                      <a
                        href={child.href}
                        role="menuitem"
                        className={`block px-4 py-2 text-sm transition-colors ${
                          child.accent
                            ? 'font-semibold text-atomic-orange hover:bg-atomic-orange/10'
                            : 'text-atomic-navy hover:bg-atomic-orange/10 hover:text-atomic-orange'
                        }`}
                        onClick={(e) => {
                          handleNavLinkClick(e, child.href);
                          setOpenIndex(null);
                        }}
                      >
                        {child.name}
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default DesktopNav;
