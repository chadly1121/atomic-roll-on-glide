
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { type Service } from './ServicesData';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const Icon = service.icon;
  const hasPage = !!service.slug;

  const cardContent = (
    <div className="group relative rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image */}
      <div className="h-48 overflow-hidden bg-muted">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
          width={400}
          height={192}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-atomic-turquoise/10 flex items-center justify-center group-hover:bg-atomic-turquoise/20 transition-colors">
            <Icon className="w-5 h-5 text-atomic-turquoise" />
          </div>
          <h3 className="text-lg font-bold text-foreground group-hover:text-atomic-turquoise transition-colors">
            {service.title}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
        
        <div className="flex items-center text-sm font-medium text-atomic-turquoise group-hover:text-atomic-orange transition-colors">
          {hasPage ? 'Learn More' : 'Book a Consultation'}
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );

  if (hasPage) {
    return <Link to={`/${service.slug}`}>{cardContent}</Link>;
  }

  return (
    <a 
      href="/contact"
      onClick={(e) => {
        e.preventDefault();
        if (window.location.pathname === '/') {
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.location.href = '/contact';
        }
      }}
    >
      {cardContent}
    </a>
  );
};

export default ServiceCard;
