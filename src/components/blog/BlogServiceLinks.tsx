import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Service link mapping for automatic internal linking from blog posts.
 * Maps keywords found in blog content to relevant service pages.
 */
const serviceLinks = [
  { keywords: ['interior paint', 'indoor paint', 'wall paint', 'room paint'], url: '/interior-painting', label: 'Interior Painting' },
  { keywords: ['exterior paint', 'outdoor paint', 'house paint'], url: '/exterior-painting', label: 'Exterior Painting' },
  { keywords: ['cabinet', 'kitchen cabinet', 'refinish'], url: '/cabinet-refinishing', label: 'Cabinet Refinishing' },
  { keywords: ['deck', 'fence', 'stain'], url: '/deck-staining', label: 'Deck & Fence Staining' },
  { keywords: ['commercial paint', 'office paint', 'business paint'], url: '/commercial-painting', label: 'Commercial Painting' },
  { keywords: ['epoxy', 'garage floor', 'floor coat'], url: '/epoxy-coatings', label: 'Epoxy Coatings' },
  { keywords: ['gonano', 'nano', 'roof seal', 'nanotechnology'], url: '/gonano', label: 'GoNano Coatings' },
  { keywords: ['wallpaper', 'wall paper'], url: '/wallpaper-removal', label: 'Wallpaper Services' },
  { keywords: ['spray paint', 'spray finish', 'prefinish'], url: '/spray-finishing', label: 'Spray Finishing' },
  { keywords: ['power wash', 'pressure wash', 'soft wash'], url: '/power-washing', label: 'Power Washing' },
  { keywords: ['stucco'], url: '/stucco-removal', label: 'Stucco Removal' },
];

interface BlogServiceLinksProps {
  contentHtml: string;
  tags?: string[];
}

/**
 * Renders contextual internal links to service pages based on blog post content/tags.
 * Improves internal link equity and helps readers discover relevant services.
 */
const BlogServiceLinks: React.FC<BlogServiceLinksProps> = ({ contentHtml, tags = [] }) => {
  const lowerContent = (contentHtml + ' ' + tags.join(' ')).toLowerCase();

  const matchedServices = serviceLinks.filter(service =>
    service.keywords.some(kw => lowerContent.includes(kw))
  );

  if (matchedServices.length === 0) return null;

  return (
    <aside className="mt-12 pt-8 border-t border-border" aria-label="Related services">
      <h3 className="text-lg font-bold text-foreground mb-4">Related Services</h3>
      <div className="flex flex-wrap gap-3">
        {matchedServices.slice(0, 5).map(service => (
          <Link
            key={service.url}
            to={service.url}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
          >
            {service.label} →
          </Link>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        Serving Muskoka, Parry Sound & Simcoe County · <Link to="/contact" className="text-primary hover:underline">Get a Free Quote</Link>
      </p>
    </aside>
  );
};

export default BlogServiceLinks;
