
export interface NavLink {
  name: string;
  href: string;
}

// Navigation links used in desktop and mobile navbars
export const navLinks: NavLink[] = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'GoNano', href: '/gonano' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Catalog', href: '/catalog' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' }
];
