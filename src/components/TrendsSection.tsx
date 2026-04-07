
import React, { memo } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// Demo trend images - will be replaced with real content later
const trendImages = [
  "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745941177/1000000519_vxsvyh.jpg",
  "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745941133/PXL_20240320_114244609_wvn8ru.jpg", 
  "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745941073/PXL_20240209_150136935_ai7mgs.jpg",
];

// Memoized components for better performance
const TrendImageItem = memo(({ image, index }: { image: string, index: number }) => (
  <CarouselItem key={index} className="md:basis-1/2">
    <div className="p-1">
      <div className="overflow-hidden rounded-xl">
        <img 
          src={image} 
          alt={`Paint Trend ${index + 1}`}
          className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
          loading="lazy"
          decoding="async"
          width="400"
          height="256"
        />
      </div>
    </div>
  </CarouselItem>
));

const TrendsSection = () => {
  return (
    <section id="trends" className="py-24 relative overflow-hidden">
      {/* Schema centralized in SEOHelmet — do not add component-level JSON-LD */}
      
      <div className="atomic-circle w-80 h-80 -bottom-40 -right-20 border-atomic-orange/30"></div>
      <div className="atomic-starburst w-72 h-72 top-20 left-1/4"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">Paint Trends</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Stay ahead with the latest painting trends and innovative techniques for your next project.
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center p-12 bg-white/80 rounded-xl shadow-md max-w-3xl mx-auto">
          <Carousel autoScroll={true} autoScrollInterval={4000} className="w-full" opts={{ loop: true, align: "center" }}>
            <CarouselContent>
              {trendImages.map((image, index) => (
                <TrendImageItem key={index} image={image} index={index} />
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-atomic-turquoise hover:bg-atomic-turquoise/80 text-white border-0" />
            <CarouselNext className="right-2 bg-atomic-orange hover:bg-atomic-orange/80 text-white border-0" />
          </Carousel>
          
          <h3 className="text-2xl font-bold text-atomic-navy mt-6 mb-3">Coming Soon!</h3>
          <p className="text-lg text-gray-600 text-center mb-4">
            Our team is curating the latest painting trends and techniques to help inspire your next project. Stay tuned!
          </p>
          <div className="flex items-center justify-center w-full max-w-md">
            <div className="h-1 bg-atomic-orange/20 w-full rounded-full overflow-hidden">
              <div className="h-full bg-atomic-orange w-2/3 rounded-full"></div>
            </div>
            <span className="ml-3 text-atomic-orange font-medium">65%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendsSection;
