
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

// Updated gallery images with mostly residential uploads (80% homes, 20% commercial)
const galleryImages = [
  // Residential Interior Images (40%)
  "/lovable-uploads/033a3727-9412-4815-8892-28a94d347c4b.png", // Modern Kitchen Renovation
  "/lovable-uploads/ac6439b9-eade-4bf2-a528-888ee7a232be.png", // Living Room Transformation
  "/lovable-uploads/e1c9d1df-a4ed-49a4-b67c-c7ea2108092e.png", // Bedroom Paint Project
  "/lovable-uploads/44c0f726-e327-4bd3-84f8-39856de74304.png", // Hallway Interior Design
  "/lovable-uploads/54c5f452-ea9f-49eb-aa4c-4e0e8a24420f.png", // Modern Bathroom Design
  "/lovable-uploads/1855749d-b944-4711-a457-be80657744dc.png", // Living Space Paint Work
  "/lovable-uploads/5a06b919-e0cd-4254-928f-a8f7d589c4c8.png", // Modern Interior Design
  "/lovable-uploads/1e023552-0b11-4ade-8457-f7740f0317ee.png", // Contemporary Living Space
  "/lovable-uploads/f2f5fa2a-ca62-4c8c-9bc8-2b867c3894c3.png", // Kitchen Cabinet Refinishing
  "/lovable-uploads/78f72a33-8111-485a-8fb4-4f4a5a604a84.png", // Modern Staircase Design
  "/lovable-uploads/028cbdd4-fe73-4b51-8ee8-8f4bbddbeac5.png", // Interior Ceiling Work
  "/lovable-uploads/0c794870-482f-4343-924c-4465eac74869.png", // Home Office Renovation
  "/lovable-uploads/963fb41b-91e9-4c30-9898-38f5beeeb300.png", // Built-in Shelving Project
  "/lovable-uploads/2cb60864-841a-4261-9072-0e92b3621c4a.png", // Modern Cabinet Design
  "/lovable-uploads/5bb528e7-e3bf-47ea-a5ee-ca5d818e51d4.png", // Custom Home Theater Design
  "/lovable-uploads/8c765ad9-b10f-4684-8879-1c88fe91d661.png", // Modern Interior Renovation

  // Residential Exterior Images (40%)
  "/lovable-uploads/dad95b14-ad28-4aab-ab8b-05f9a56458ec.png", // Lakefront Cottage Exterior Painting
  "/lovable-uploads/c3ff2882-fdbf-4fb8-8b69-ae377584ec4d.png", // Commercial Building Project (residential style)
  "/lovable-uploads/461669ed-78ae-4205-8161-a3c05dc5143c.png", // Exterior Window Painting Project
  "/lovable-uploads/6e3d697a-e317-43d5-8987-a0a979709de5.png", // Garage Door Staining Project
  "/lovable-uploads/27dadd1c-1e08-4101-abe3-894002c6e8a0.png", // Residential Exterior Painting with Lift
  "/lovable-uploads/d455e973-829f-49e8-87be-80648d1b4326.png", // Cedar Shingle Restoration Project
  "/lovable-uploads/8ef8ff98-b72d-4bb2-981c-a2a94dae744a.png", // Deck Staining
  "/lovable-uploads/edc2e333-aeba-4888-8622-44f4bc074d81.png", // Fence Staining
  "/lovable-uploads/4ab7d8ed-5330-485e-bdbf-60697f8fe075.png", // Outdoor Wood Staining
  "/lovable-uploads/bd116ecc-c88e-41c9-a68f-001b95ab5a06.png", // Deck Refinishing
  "/lovable-uploads/1b232070-3535-4bae-ac21-3e011388fbdd.png", // Wood Fence Project
  "/lovable-uploads/22085489-537d-44d5-b570-3dd99a63f2e3.png", // Pre-finishing work

  // Commercial/Business Images (20%)
  "/lovable-uploads/025a31b7-5076-4ece-80fa-d0c7fc2c4915.png", // Commercial Building Exterior
  "/lovable-uploads/c8560baa-059c-446e-aae0-6707f5dd45f6.png", // Industrial Building Painting
  "/lovable-uploads/d531dd47-1462-4fdb-85d4-457945cee6cc.png", // Office Building Interior
  "/lovable-uploads/a0c2eeb2-2cdc-47e8-8b3e-e42327db815a.png", // Commercial Space Renovation
  "/lovable-uploads/d3367d55-c96e-44d7-bcd0-27507959a1fa.png", // Business Interior Design
  "/lovable-uploads/36027933-126d-4cb7-b430-bad5c5cd5737.png", // Office Space Design
  "/lovable-uploads/8f3d5fe7-fb52-4fad-a445-da9b0168bc60.png", // Business Space Renovation
  "/lovable-uploads/fc8610b5-0459-49bc-912e-ccc4d4c8f155.png" // Professional Office Design
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
