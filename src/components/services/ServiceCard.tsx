
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  galleryImages?: string[];
  slug?: string; // Link to dedicated service page
}

interface ServiceCardProps {
  service: Service;
}

// Map service titles to their dedicated page slugs
const serviceSlugMap: Record<string, string> = {
  "Interior Painting": "interior-painting",
  "Exterior Painting": "exterior-painting",
  "Commercial Painting": "commercial-painting",
  "Kitchen Cabinet Refinishing": "cabinet-refinishing",
  "Deck & Fence Staining": "deck-staining",
  "Epoxy Coatings": "epoxy-coatings",
};

const ServiceCard = ({ service }: ServiceCardProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const slug = service.slug || serviceSlugMap[service.title];
  
  return (
    <div className="retro-card group hover-lift transform transition-all duration-500">
      <div className="h-80 overflow-hidden bg-muted">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          decoding="async"
          width={400}
          height={320}
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-atomic-turquoise/20 flex items-center justify-center text-2xl mr-3 group-hover:bg-atomic-turquoise/40 transition-colors">
            {service.icon}
          </div>
          {slug ? (
            <Link 
              to={`/${slug}`}
              className="text-xl font-bold group-hover:text-atomic-turquoise transition-colors hover:underline"
            >
              {service.title}
            </Link>
          ) : (
            <h3 className="text-xl font-bold group-hover:text-atomic-turquoise transition-colors">{service.title}</h3>
          )}
        </div>
        <p className="text-gray-600">{service.description}</p>
        
        <div className="flex justify-between items-center mt-4 gap-2">
          {slug ? (
            <Link 
              to={`/${slug}`}
              className="inline-flex items-center text-atomic-turquoise hover:text-atomic-orange font-medium transition-colors"
            >
              Learn More
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          ) : (
            <a 
              href="#contact" 
              className="inline-flex items-center text-atomic-turquoise hover:text-atomic-orange font-medium transition-colors"
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
          )}
          
          {service.galleryImages && service.galleryImages.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <button className="px-3 py-1 text-sm bg-atomic-turquoise text-white rounded hover:bg-atomic-turquoise/90 transition-colors">
                  View Gallery
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 bg-transparent border-none shadow-none">
                <Carousel className="w-full" opts={{ loop: true, align: "center" }}>
                  <CarouselContent>
                    {service.galleryImages.map((image, index) => (
                      <CarouselItem key={index} className="p-1">
                        <div className="relative bg-black rounded-lg overflow-hidden">
                          <img 
                            src={image} 
                            alt={`${service.title} - Image ${index + 1}`}
                            className="w-full h-auto max-h-[80vh] object-contain"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 h-10 w-10 bg-atomic-turquoise hover:bg-atomic-turquoise/80 text-white border-0 opacity-70 hover:opacity-100" />
                  <CarouselNext className="right-2 h-10 w-10 bg-atomic-orange hover:bg-atomic-orange/80 text-white border-0 opacity-70 hover:opacity-100" />
                </Carousel>
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
                  <DialogClose className="px-6 py-2 rounded-full bg-gradient-to-r from-atomic-turquoise to-atomic-orange backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
