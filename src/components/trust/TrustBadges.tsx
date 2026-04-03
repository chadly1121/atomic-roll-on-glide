import React from 'react';
import { Shield, BadgeCheck, Star } from 'lucide-react';
import { partnerLogos } from '@/data/partnerLogos';

interface TrustItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TrustItem: React.FC<TrustItemProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="mb-3 text-atomic-turquoise">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const TrustBadges: React.FC = () => {
  const certifications = [
    {
      icon: <Shield className="h-12 w-12" aria-hidden="true" />,
      title: "Uniformed Professional Painters",
      description: "Member of the Painting Contractors Association"
    },
    {
      icon: <BadgeCheck className="h-12 w-12" aria-hidden="true" />,
      title: "W.S.I.B and 5 Million Liability Insurance",
      description: "Fully covered for your peace of mind"
    },
    {
      icon: <Star className="h-12 w-12" aria-hidden="true" />,
      title: "5-Star Service",
      description: "Consistently rated 5 stars by our satisfied customers"
    },
    {
      icon: <Shield className="h-12 w-12" aria-hidden="true" />,
      title: "Free Estimates",
      description: "Professional estimates with no obligation"
    }
  ];
  
  return (
    <section id="trust" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Why Trust Roll On Painting</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            We're proud to be recognized for our commitment to quality and excellence
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <TrustItem
              key={index}
              icon={cert.icon}
              title={cert.title}
              description={cert.description}
            />
          ))}
        </div>
        
        {/* Partners and Affiliations */}
        <div className="mt-16 pt-12 border-t">
          <h3 className="text-2xl font-bold text-center mb-8">Our Partners & Affiliations</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {partnerLogos.map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${partner.name} website`}
                className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 w-full flex items-center justify-center h-24"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.altText}
                  width={140}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="max-h-16 max-w-[140px] w-auto h-auto object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
