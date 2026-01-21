
export interface NavLink {
  name: string;
  href: string;
}

// Navigation links used in desktop and mobile navbars
export const navLinks: NavLink[] = [
  { name: 'AI Estimate', href: '#ai-estimator' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#services' },  // Gallery content is integrated within the Services section
  { name: 'GoNano', href: '#gonano' },
  { name: 'Trust', href: '#trust' },
  { name: 'Pricing', href: '#services' },  // Updated to point to services/gallery area
  { name: 'Contact', href: '#contact' }
];
