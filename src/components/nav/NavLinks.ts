
export interface NavLink {
  name: string;
  href: string;
}

// Navigation links used in desktop and mobile navbars
export const navLinks: NavLink[] = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'GoNano', href: '/gonano' },
  { name: 'Catalog', href: '/catalog' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' }
];
