
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Interior Painting",
    description: "Transform your indoor spaces with our premium interior painting services, featuring expert color consultation and flawless finishes.",
    icon: "🏠",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/interior-paint-3-scaled.jpg"
  },
  {
    id: 2,
    title: "Exterior Painting",
    description: "Enhance your home's curb appeal with our durable exterior painting services that withstand the elements while looking beautiful.",
    icon: "🏡",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/exterior-painting-5-scaled.jpg"
  },
  {
    id: 3,
    title: "Commercial Painting",
    description: "Update your business space with minimal disruption. Our commercial painting services are efficient, professional, and timely.",
    icon: "🏢",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/commercial-painting.jpg"
  },
  {
    id: 4,
    title: "Cabinet Refinishing",
    description: "Give your kitchen a fresh look without the full renovation cost. Our cabinet refinishing services provide stunning results.",
    icon: "🪑",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/interior-paint-5-e1608121023242.jpg"
  },
  {
    id: 5,
    title: "Deck & Fence Staining",
    description: "Protect and beautify your outdoor wooden surfaces with our expert staining services for decks, fences, and more.",
    icon: "🌳",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/services_feature3.jpg"
  },
  {
    id: 6,
    title: "Color Consultation",
    description: "Not sure which colors will work best? Our professional color consultation helps you choose the perfect palette for your space.",
    icon: "🎨",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/interior-painting-process3-scaled.jpg"
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="atomic-starburst w-72 h-72 top-20 left-20"></div>
      <div className="atomic-circle w-96 h-96 -bottom-48 right-0 border-atomic-turquoise/30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">Our Services</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Professional painting services tailored to your specific needs, delivering quality results that last.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="retro-card group">
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-atomic-turquoise/20 flex items-center justify-center text-2xl mr-3">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
                <a 
                  href="#contact" 
                  className="mt-4 inline-flex items-center text-atomic-turquoise hover:text-atomic-orange font-medium transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  Get A Quote
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="#contact" 
            className="atomic-button"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
          >
            <span className="relative z-10">Request Custom Service</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
