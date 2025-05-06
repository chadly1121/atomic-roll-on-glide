
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Atom, FileImage } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// Updated gallery images with client's actual project photos
const galleryImages = [
  "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745941177/1000000519_vxsvyh.jpg",
  "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745941133/PXL_20240320_114244609_wvn8ru.jpg", 
  "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745941073/PXL_20240209_150136935_ai7mgs.jpg",
  "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745941017/PXL_20221031_143749288_lpjtju.jpg",
  "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745940981/PXL_20220729_194141640_nznwhm.jpg",
  "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745940978/PXL_20220511_190838626_erdkwk.jpg",
  "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745940774/IMG_20181206_082735_azfv0p.jpg",
  "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745940773/IMG_20181119_132931_nljipa.jpg",
  "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745940742/IMG_6195_temgmp.jpg",
  "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745940691/IMG_1121_sgh9qw.jpg",
  "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745940692/IMG_1224_b4bqib.jpg",
  "https://res.cloudinary.com/dxqfou8jh/image/upload/v1745940662/PXL_20241017_182116190_gbtvla.jpg"
];

const HeroSection = () => {
  const [loadedImages, setLoadedImages] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  
  // Preload hero images with priority
  useEffect(() => {
    const preloadImages = async () => {
      // Only preload the first 4 images immediately
      const highPriorityImages = galleryImages.slice(0, 4);
      const lowPriorityImages = galleryImages.slice(4);
      
      // Load high priority images first
      await Promise.all(
        highPriorityImages.map((src, index) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.fetchPriority = 'high';
            img.src = src;
            img.onload = () => {
              setLoadedImages(prev => prev + 1);
              resolve(undefined);
            };
            img.onerror = () => {
              setLoadedImages(prev => prev + 1);
              resolve(undefined);
            };
          });
        })
      );
      
      // Then load the rest with lower priority
      lowPriorityImages.forEach((src) => {
        const img = new Image();
        img.fetchPriority = 'low';
        img.loading = 'lazy';
        img.src = src;
      });
    };
    
    preloadImages();
  }, []);
  
  // Handle auto scrolling
  useEffect(() => {
    if (!isAutoScrolling) return;
    
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAutoScrolling]);
  
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth'
      });
    }
  };
  
  return <section id="hero" className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden bg-atomic-cream bg-atomic-pattern">
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
          
          <div className="atomic-shape relative">
            <div className="absolute inset-0 bg-atomic-pattern opacity-10"></div>
            <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-atomic-orange/20">
              <Carousel className="w-full" opts={{ loop: true, align: "center" }} 
                onMouseEnter={() => setIsAutoScrolling(false)}
                onMouseLeave={() => setIsAutoScrolling(true)}>
                <CarouselContent>
                  {galleryImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <img 
                          alt={`Roll On Painting Project ${index + 1}`} 
                          className="w-full h-[400px] object-cover transition-all duration-300" 
                          src={image}
                          loading={index < 2 ? "eager" : "lazy"}
                          fetchpriority={index < 2 ? "high" : "low"}
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
    </section>;
};

export default HeroSection;
