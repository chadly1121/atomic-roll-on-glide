import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Service + location link mapping for automatic internal linking from blog posts.
 * Maps keywords found in blog content to relevant service and location pages.
 */
const serviceLinks = [
  { keywords: ['interior paint', 'indoor paint', 'wall paint', 'room paint'], url: '/interior-painting', label: 'Interior Painting' },
  { keywords: ['exterior paint', 'outdoor paint', 'house paint'], url: '/exterior-painting', label: 'Exterior Painting' },
  { keywords: ['cabinet', 'kitchen cabinet', 'refinish'], url: '/cabinet-refinishing', label: 'Cabinet Refinishing' },
  { keywords: ['deck', 'fence', 'stain'], url: '/deck-staining', label: 'Deck & Fence Staining' },
  { keywords: ['commercial paint', 'office paint', 'business paint'], url: '/commercial-painting', label: 'Commercial Painting' },
  { keywords: ['institutional', 'school paint', 'hospital paint', 'government build'], url: '/institutional-painting', label: 'Institutional Painting' },
  { keywords: ['prefinish', 'pre-finish', 'pre-stain', 'tongue and groove', 't&g', 'millwork'], url: '/prefinishing', label: 'Pre-Finishing' },
  { keywords: ['epoxy', 'garage floor', 'floor coat'], url: '/epoxy-coatings', label: 'Epoxy Coatings' },
  { keywords: ['gonano', 'nano', 'roof seal', 'nanotechnology'], url: '/gonano', label: 'GoNano Coatings' },
  { keywords: ['wallpaper install', 'wallpaper hang', 'accent wall paper'], url: '/wallpaper-installation', label: 'Wallpaper Installation' },
  { keywords: ['wallpaper remov', 'strip wallpaper', 'wall paper remov'], url: '/wallpaper-removal', label: 'Wallpaper Removal' },
  { keywords: ['spray paint', 'spray finish', 'airless spray'], url: '/spray-finishing', label: 'Spray Finishing' },
  { keywords: ['power wash', 'pressure wash', 'soft wash'], url: '/power-washing', label: 'Power Washing' },
  { keywords: ['stucco'], url: '/stucco-removal', label: 'Stucco Removal' },
];

const locationLinks = [
  { keywords: ['bracebridge'], url: '/painters-bracebridge', label: 'Painters in Bracebridge' },
  { keywords: ['huntsville'], url: '/painters-huntsville', label: 'Painters in Huntsville' },
  { keywords: ['gravenhurst'], url: '/painters-gravenhurst', label: 'Painters in Gravenhurst' },
  { keywords: ['port carling'], url: '/painters-port-carling', label: 'Painters in Port Carling' },
  { keywords: ['parry sound'], url: '/painters-parry-sound', label: 'Painters in Parry Sound' },
  { keywords: ['lake of bays', 'dorset', 'baysville', 'dwight'], url: '/painters-lake-of-bays', label: 'Painters in Lake of Bays' },
  { keywords: ['georgian bay'], url: '/painters-georgian-bay', label: 'Painters in Georgian Bay' },
  { keywords: ['bala'], url: '/painters-bala', label: 'Painters in Bala' },
  { keywords: ['rosseau', 'lake rosseau'], url: '/painters-lake-rosseau', label: 'Painters in Lake Rosseau' },
  { keywords: ['lake joseph'], url: '/painters-lake-joseph', label: 'Painters in Lake Joseph' },
  { keywords: ['port sydney'], url: '/painters-port-sydney', label: 'Painters in Port Sydney' },
];

interface BlogServiceLinksProps {
  contentHtml: string;
  tags?: string[];
}

/**
 * Renders contextual internal links to service and location pages based on blog post content/tags.
 * Improves internal link equity and helps readers discover relevant services.
 */
const BlogServiceLinks: React.FC<BlogServiceLinksProps> = ({ contentHtml, tags = [] }) => {
  const lowerContent = (contentHtml + ' ' + tags.join(' ')).toLowerCase();

  const matchedServices = serviceLinks.filter(service =>
    service.keywords.some(kw => lowerContent.includes(kw))
  );

  const matchedLocations = locationLinks.filter(loc =>
    loc.keywords.some(kw => lowerContent.includes(kw))
  );

  if (matchedServices.length === 0 && matchedLocations.length === 0) return null;

  return (
    <aside className="mt-12 pt-8 border-t border-border" aria-label="Related services and locations">
      {matchedServices.length > 0 && (
        <>
          <h3 className="text-lg font-bold text-foreground mb-4">Related Services</h3>
          <div className="flex flex-wrap gap-3 mb-6">
            {matchedServices.slice(0, 6).map(service => (
              <Link
                key={service.url}
                to={service.url}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                {service.label} →
              </Link>
            ))}
          </div>
        </>
      )}
      {matchedLocations.length > 0 && (
        <>
          <h3 className="text-lg font-bold text-foreground mb-4">We Serve These Areas</h3>
          <div className="flex flex-wrap gap-3 mb-6">
            {matchedLocations.slice(0, 5).map(loc => (
              <Link
                key={loc.url}
                to={loc.url}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/80 transition-colors"
              >
                {loc.label} →
              </Link>
            ))}
          </div>
        </>
      )}
      <p className="text-xs text-muted-foreground">
        Serving Muskoka, Parry Sound & Simcoe County · <Link to="/contact" className="text-primary hover:underline">Get a Free Quote</Link>
      </p>
    </aside>
  );
};

export default BlogServiceLinks;