
export interface NavChild {
  name: string;
  href: string;
  divider?: boolean;
  accent?: boolean;
}

export interface NavLink {
  name: string;
  href: string;
  children?: NavChild[];
}

// Primary navigation — slim 6-item structure with grouped Services dropdown.
export const navLinks: NavLink[] = [
  { name: 'About', href: '/about' },
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: 'All Services', href: '/services' },
      { name: 'Service Areas', href: '/service-areas' },
      { name: 'Interior Painting', href: '/interior-painting' },
      { name: 'Exterior Painting', href: '/exterior-painting' },
      { name: 'Cabinet Refinishing', href: '/cabinet-refinishing' },
      { name: 'Deck & Dock Staining', href: '/deck-staining' },
      { name: 'GoNano Coatings', href: '/gonano' },
      { name: 'Commercial Painting', href: '/commercial-painting' },
      { name: 'View All Services →', href: '/services', divider: true, accent: true },
    ],
  },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'How We Quote', href: '/how-we-quote' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Contact', href: '/contact' },
];
