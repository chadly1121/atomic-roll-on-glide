import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

interface ServicePageInternalLinksProps {
  currentSlug: string;
}

const relatedServices = [
  { slug: 'interior-painting-muskoka', name: 'Interior Painting Muskoka' },
  { slug: 'exterior-painting-muskoka', name: 'Exterior Painting Muskoka' },
  { slug: 'spray-painting-muskoka', name: 'Spray Painting Muskoka' },
  { slug: 'cabinet-painting-muskoka', name: 'Cabinet Painting Muskoka' },
  { slug: 'interior-painting', name: 'Interior Painting' },
  { slug: 'exterior-painting', name: 'Exterior Painting' },
  { slug: 'cabinet-refinishing', name: 'Cabinet Refinishing' },
  { slug: 'spray-finishing', name: 'Spray Finishing' },
  { slug: 'deck-staining', name: 'Deck & Fence Staining' },
  { slug: 'power-washing', name: 'Power Washing' },
  { slug: 'wallpaper-installation', name: 'Wallpaper Installation' },
  { slug: 'epoxy-coatings', name: 'Epoxy Coatings' },
];

const serviceAreas = [
  { slug: 'painters-port-sydney', name: 'Port Sydney' },
  { slug: 'painters-huntsville', name: 'Huntsville' },
  { slug: 'painters-bracebridge', name: 'Bracebridge' },
  { slug: 'painters-gravenhurst', name: 'Gravenhurst' },
  { slug: 'painters-port-carling', name: 'Port Carling' },
  { slug: 'painters-lake-of-bays', name: 'Lake of Bays' },
  { slug: 'painters-parry-sound', name: 'Parry Sound' },
  { slug: 'painters-georgian-bay', name: 'Georgian Bay' },
  { slug: 'painters-bala', name: 'Bala' },
  { slug: 'painters-lake-rosseau', name: 'Lake Rosseau' },
  { slug: 'painters-lake-muskoka', name: 'Lake Muskoka' },
];

const ServicePageInternalLinks: React.FC<ServicePageInternalLinksProps> = ({ currentSlug }) => {
  const filteredServices = relatedServices.filter(s => s.slug !== currentSlug).slice(0, 6);

  return (
    <section className="py-12 bg-gray-50" aria-labelledby="internal-links-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Related Services */}
          <div>
            <h2 id="internal-links-heading" className="text-xl font-bold text-atomic-navy mb-4 flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-atomic-turquoise" aria-hidden="true" />
              More Painting Services
            </h2>
            <ul className="space-y-2">
              {filteredServices.map(service => (
                <li key={service.slug}>
                  <Link
                    to={`/${service.slug}`}
                    className="text-muted-foreground hover:text-atomic-orange transition-colors text-sm inline-flex items-center gap-1"
                  >
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas We Serve */}
          <div>
            <h3 className="text-xl font-bold text-atomic-navy mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-atomic-turquoise" aria-hidden="true" />
              Areas We Serve
            </h3>
            <ul className="space-y-2">
              {serviceAreas.map(area => (
                <li key={area.slug}>
                  <Link
                    to={`/${area.slug}`}
                    className="text-muted-foreground hover:text-atomic-orange transition-colors text-sm inline-flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3" aria-hidden="true" />
                    Painters in {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePageInternalLinks;
