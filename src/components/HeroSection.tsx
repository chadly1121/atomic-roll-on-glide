
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Atom, FileImage } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { throttle } from '@/utils/performance';

// Updated gallery images with locally uploaded photos for faster loading
const galleryImages = [
  "/lovable-uploads/22085489-537d-44d5-b570-3dd99a63f2e3.png",
  "/lovable-uploads/323140ca-6825-4ad3-abcd-6dae649a4b02.png", 
  "/lovable-uploads/28a50dd0-0c72-41ce-b0d4-1fb4c4b9a6cc.png",
  "/lovable-uploads/7671fcb5-a810-4e9a-84fc-76713831e5ba.png",
  "/lovable-uploads/41fed3c2-d734-4c98-aa94-862ae8f83f1b.png",
  "/lovable-uploads/d92e575b-d7e8-477c-a4d6-d34674df328a.png",
  "/lovable-uploads/1855749d-b944-4711-a457-be80657744dc.png",
  "/lovable-uploads/8db1f419-2ee2-49da-b2cd-c17a8edafd7c.png",
  "/lovable-uploads/5a06b919-e0cd-4254-928f-a8f7d589c4c8.png",
  "/lovable-uploads/1e023552-0b11-4ade-8457-f7740f0317ee.png",
  "/lovable-uploads/f2f5fa2a-ca62-4c8c-9bc8-2b867c3894c3.png",
  "/lovable-uploads/f73a02c1-39a6-483e-9f22-4d1984faa38c.png",
  "/lovable-uploads/025a31b7-5076-4ece-80fa-d0c7fc2c4915.png",
  "/lovable-uploads/c8560baa-059c-446e-aae0-6707f5dd45f6.png"
];

const HeroSection = () => {
  const [loadedImages, setLoadedImages] = useState(0);
  
  // Preload hero images with optimized strategy
  useEffect(() => {
    // Only preload the first 2 images immediately with high priority
    const highPriorityImages = galleryImages.slice(0, 2);
    
    const preloadHighPriorityImages = async () => {
      await Promise.all(
        highPriorityImages.map(src => {
          return new Promise<void>(resolve => {
            const img = new Image();
            img.fetchPriority = 'high';
            img.src = src;
            img.onload = () => {
              setLoadedImages(prev => prev + 1);
              resolve();
            };
            img.onerror = () => {
              setLoadedImages(prev => prev + 1);
              resolve();
            };
          });
        })
      );
      
      // After high priority images are loaded, use Intersection Observer for the rest
      const lazyLoadImages = () => {
        const imageObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const lazyImage = entry.target as HTMLImageElement;
                if (lazyImage.dataset.src) {
                  lazyImage.src = lazyImage.dataset.src;
                  lazyImage.removeAttribute('data-src');
                  observer.unobserve(lazyImage);
                }
              }
            });
          },
          { rootMargin: '200px 0px' }
        );
        
        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      };
      
      // Execute lazy loading after a small delay to prioritize critical content
      setTimeout(lazyLoadImages, 1000);
    };
    
    preloadHighPriorityImages();
  }, []);
  
  // Throttled scroll handler for better performance
  const handleScrollToContact = useMemo(() => 
    throttle((e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        window.scrollTo({
          top: contactSection.getBoundingClientRect().top + window.scrollY - 100,
          behavior: 'smooth'
        });
      }
    }, 300),
  []);
  
  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden bg-atomic-cream bg-atomic-pattern">
      {/* Background elements */}
      <div className="atomic-circle w-64 h-64 -top-20 -left-20 border-atomic-orange"></div>
      <div className="atomic-circle w-96 h-96 -bottom-40 -right-20 border-atomic-turquoise"></div>
      <div className="atomic-starburst w-72 h-72 top-32 right-64 opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-atomic-orange/10">
                <Atom className="w-8 h-8 text-atomic-orange animate-spin-slow" />
              </div>
              <h2 className="text-lg font-medium text-atomic-navy/60">Vintage Craftsmanship • Today's Science</h2>
            </div>
            
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
                Transform Your Space With
                <span className="text-atomic-orange block">Roll On Painting</span>
              </h1>
              <p className="mt-6 text-lg text-atomic-navy/70">
                Roll On Painting delivers exceptional quality and craftsmanship for residential and commercial projects. 
                Experience the perfect blend of time-honored techniques and modern innovation.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
              <a href="#contact" className="atomic-button group border-2 border-atomic-orange" onClick={handleScrollToContact}>
                <span className="relative z-10 flex items-center">
                  Request A Quote
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              <a href="#contact" className="atomic-button-secondary group border-2 border-atomic-turquoise" onClick={handleScrollToContact}>
                <span className="relative z-10 flex items-center">
                  <FileImage className="h-5 w-5 mr-2" />
                  Send Us Your Plans
                </span>
              </a>
              <a href="#services" className="atomic-button-secondary border-2 border-atomic-turquoise" onClick={e => {
              e.preventDefault();
              document.querySelector('#services')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }}>
                <span className="relative z-10">Our Services</span>
              </a>
            </div>
            
            <div className="flex items-center space-x-4 pt-4 bg-white/50 p-4 rounded-xl backdrop-blur-sm">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-atomic-orange text-white flex items-center justify-center font-bold">5</div>
                <div className="w-10 h-10 rounded-full bg-atomic-turquoise text-white flex items-center justify-center font-bold">★</div>
              </div>
              <p className="text-sm text-atomic-navy"><span className="font-bold">5/5</span> from Google reviews</p>
            </div>
          </div>
          
          <div className="atomic-shape relative will-change-transform">
            <div className="absolute inset-0 bg-atomic-pattern opacity-10"></div>
            <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-atomic-orange/20">
              <Carousel className="w-full" opts={{ loop: true, align: "center" }} autoScroll={true} autoScrollInterval={5000}>
                <CarouselContent>
                  {galleryImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <img 
                          alt={`Roll On Painting Project ${index + 1}`} 
                          className="w-full h-[400px] object-cover transition-all duration-300" 
                          src={image}
                          loading={index < 2 ? "eager" : "lazy"}
                          fetchPriority={index < 2 ? "high" : "low"}
                          width="800"
                          height="400"
                          decoding="async"
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
