import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// Reduced to 3 images for faster mobile loading
const galleryImages = [
  "/lovable-uploads/44c0f726-e327-4bd3-84f8-39856de74304.png", // Hallway Interior
  "/lovable-uploads/dad95b14-ad28-4aab-ab8b-05f9a56458ec.png", // Lakefront Cottage Exterior
  "/lovable-uploads/d455e973-829f-49e8-87be-80648d1b4326.png", // Cedar Shingle Home
];

const HeroCarousel = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  const isFirstLoaded = loadedCount >= 1;

  return (
    <div className="relative">
      <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-atomic-orange/20">
        <Carousel className="w-full" opts={{ loop: true, align: "center" }} autoScroll={true} autoScrollInterval={6000}>
          <CarouselContent>
            {galleryImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <img 
                    alt={`Roll On Painting Project ${index + 1}`} 
                    className={`w-full h-[350px] lg:h-[400px] object-cover transition-opacity duration-200 ${
                      index === 0 && !isFirstLoaded ? 'opacity-0' : 'opacity-100'
                    }`}
                    src={image}
                    loading={index === 0 ? "eager" : "lazy"}
                    {...{ fetchpriority: index === 0 ? "high" : "low" }}
                    width={600}
                    height={350}
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
