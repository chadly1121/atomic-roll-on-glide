
import React from 'react';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="retro-card group hover-lift transform transition-all duration-500">
      <div className="h-48 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-atomic-turquoise/20 flex items-center justify-center text-2xl mr-3 group-hover:bg-atomic-turquoise/40 transition-colors">
            {service.icon}
          </div>
          <h3 className="text-xl font-bold group-hover:text-atomic-turquoise transition-colors">{service.title}</h3>
        </div>
        <p className="text-gray-600">{service.description}</p>
        <a 
          href="#contact" 
          className="mt-4 inline-flex items-center text-atomic-turquoise hover:text-atomic-orange font-medium transition-colors group-hover:translate-x-1 transition-transform duration-300"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }}
        >
          Get A Quote
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
