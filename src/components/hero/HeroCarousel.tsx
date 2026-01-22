import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// Residential-only images for hero carousel
const galleryImages = [
  "/lovable-uploads/44c0f726-e327-4bd3-84f8-39856de74304.png", // Hallway Interior
  "/lovable-uploads/54c5f452-ea9f-49eb-aa4c-4e0e8a24420f.png", // Modern Bathroom
  "/lovable-uploads/1855749d-b944-4711-a457-be80657744dc.png", // Living Space
  "/lovable-uploads/dad95b14-ad28-4aab-ab8b-05f9a56458ec.png", // Lakefront Cottage Exterior
  "/lovable-uploads/d455e973-829f-49e8-87be-80648d1b4326.png", // Cedar Shingle Home
  "/lovable-uploads/8ef8ff98-b72d-4bb2-981c-a2a94dae744a.png", // Deck Staining
];

const HeroCarousel = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  const isFirstLoaded = loadedCount >= 1;

  return (
    <div className="atomic-shape relative">
      <div className="absolute inset-0 bg-atomic-pattern opacity-10" />
      <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-atomic-orange/20">
        <Carousel className="w-full" opts={{ loop: true, align: "center" }} autoScroll={true} autoScrollInterval={5000}>
          <CarouselContent>
            {galleryImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <img 
                    alt={`Roll On Painting Project ${index + 1}`} 
                    className={`w-full h-[400px] object-cover transition-opacity duration-300 ${
                      index === 0 && !isFirstLoaded ? 'opacity-0' : 'opacity-100'
                    }`}
                    src={image}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    width={800}
                    height={400}
                    decoding={index === 0 ? "sync" : "async"}
                    onLoad={() => setLoadedCount(c => c + 1)}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-atomic-turquoise hover:bg-atomic-turquoise/80 text-white border-0" />
          <CarouselNext className="right-2 bg-atomic-orange hover:bg-atomic-orange/80 text-white border-0" />
        </Carousel>
      </div>
    </div>
  );
};

export default HeroCarousel;
