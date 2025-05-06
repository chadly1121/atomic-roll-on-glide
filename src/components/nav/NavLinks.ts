
export interface NavLink {
  name: string;
  href: string;
}

// Navigation links used in desktop and mobile navbars
export const navLinks: NavLink[] = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#services' },  // Gallery content is integrated within the Services section
  { name: 'GoNano', href: '#gonano' },
  { name: 'Trust', href: '#trust' },       // Added Trust link
  { name: 'Pricing', href: '#pricing' },
  { name: 'Blog', href: '#blog' },
  { name: 'Booking', href: '#booking' },
  { name: 'Trends', href: '#trends' },
  { name: 'Contact', href: '#contact' }
];
