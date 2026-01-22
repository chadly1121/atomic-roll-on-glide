import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// Reduced to 6 high-quality images for better LCP performance
const galleryImages = [
  // Best residential images only
  "/lovable-uploads/033a3727-9412-4815-8892-28a94d347c4b.png",
  "/lovable-uploads/dad95b14-ad28-4aab-ab8b-05f9a56458ec.png",
  "/lovable-uploads/ac6439b9-eade-4bf2-a528-888ee7a232be.png",
  "/lovable-uploads/461669ed-78ae-4205-8161-a3c05dc5143c.png",
  "/lovable-uploads/e1c9d1df-a4ed-49a4-b67c-c7ea2108092e.png",
  "/lovable-uploads/c3ff2882-fdbf-4fb8-8b69-ae377584ec4d.png",
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
