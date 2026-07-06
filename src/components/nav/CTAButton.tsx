
import React from 'react';

interface CTAButtonProps {
  handleNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const CTAButton = ({ handleNavLinkClick }: CTAButtonProps) => {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === '/contact') {
      e.preventDefault();
      const el = document.getElementById('contact') || document.querySelector('iframe[title="Estimate Form"]');
      if (el) {
        (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    handleNavLinkClick(e, '/contact');
  };
  return (
    <a
      href="/contact"
      onClick={onClick}
      className="atomic-button text-sm px-4 py-2 whitespace-nowrap block text-center md:inline-block w-full md:w-auto transition-transform hover:scale-105 active:scale-95"
    >
      Book Your Consultation
    </a>
  );
};

export default CTAButton;
