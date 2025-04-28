
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Using direct image URLs from the provided Google Photos links
const galleryImages = [
  {
    id: 1,
    src: "https://lh3.googleusercontent.com/pw/AP1GczO3pMf-srlZSxjLAWSE7wMR0rGrrLiOmALSDK27yDqzeTkYjTBlHCFoTY0e0S3nOlO9jYwoKkMwvC6Rs9OJ-NWLaKHb1bS0F4oDeMdEq2Djkgq1v4A=w2400",
    category: "interior",
    title: "Interior Painting Project"
  },
  {
    id: 2,
    src: "https://lh3.googleusercontent.com/pw/AP1GczNqYnbwCc-p0SCWStSG90mVj9RozJYJe1nNULa-FTXODLtH8v5wAsCoOUfOzQzYM4Y63egj1rMJ2DmqYEQ7f9oEBGAhN7-6qi6YyLbmVZPSFKQ4GJ0=w2400",
    category: "exterior",
    title: "Exterior Home Transformation"
  },
  {
    id: 3,
    src: "https://lh3.googleusercontent.com/pw/AP1GczM_hBaruOaWDZ4I8JnJ-VmqeooStoqgH9NUX04gaMSNseoNQXAbH0cI3LOCj_ByZd43fXvGH9S9XMKkYYNgQKN2q6erIqi8mkO4EXaOopf5pPQNAGc=w2400",
    category: "interior",
    title: "Kitchen Cabinet Refinishing"
  },
  {
    id: 4,
    src: "https://lh3.googleusercontent.com/pw/AP1GczNGqy7K9RQXNe63Y4FhClYPj590tmI08zox_3E0nshLneOJL6WfsSPetVx735KqeLeZdOqgiSIr65UA-LI_QZ8QXTZwiiTy3jmdl7AkdcBcPVUUUTE=w2400",
    category: "exterior",
    title: "Deck Transformation"
  },
  {
    id: 5,
    src: "https://lh3.googleusercontent.com/pw/AP1GczPP7fAjQDPBsJODTeJAq2mqKrhyf6SQXrN1LRx8XA3jK6pP3gGdR6jsf5yVR2Eanp0XqUZPcNd4cB_hhSotXprOjmQ7yJTfemlurFq_Jcf950vLwrA=w2400",
    category: "commercial",
    title: "Commercial Project"
  },
  {
    id: 6,
    src: "https://lh3.googleusercontent.com/pw/AP1GczOcPNV2uUSxqxgjDKQSBGXg7SQeJwMWSzB3dL9Qg4tq0LNBP2940T34KScBtE45Rfc5Ezp-yyQaDIM-l3wQphOXYoqm0rVu-NqgfsDdMMmL-Vs8JVU=w2400",
    category: "interior",
    title: "Living Room Refresh"
  },
  {
    id: 7,
    src: "https://lh3.googleusercontent.com/pw/AP1GczOvHsLu2XzwxPo5zkMc8ct2TNdV3UBwTVYkhw57WNOQSzSht5yZBLQTXbpLkiCZGbJskgKuVtvphWiyTdi5B3xWT7GAXTqEjdK-cvLqV3vnkEf-xMk=w2400",
    category: "interior",
    title: "Interior Transformation"
  },
  {
    id: 8,
    src: "https://lh3.googleusercontent.com/pw/AP1GczMirX_VShPnTvnl6h8_SYnYGSa3vvFiBktIN5MB8t0f8EGXRafN0taQTMGCAKpv24Ih4uulgFbBspWq4s7SQUg6xK7zVyCpXfD8is9yqZxoSTzPB_Y=w2400",
    category: "interior",
    title: "Staircase Renovation"
  },
  {
    id: 9,
    src: "https://lh3.googleusercontent.com/pw/AP1GczN0g4jtVSqTnxXJWGGnlSMGyL66gxAaQB9V8RvMm7y300xz3nDprE13aCXKNCtTvaMJdDYFCWKD2lR_Jdq-Yv_e_R9uCe5uJxxGkQeRBPlUMAR9h5k=w2400",
    category: "commercial",
    title: "Office Transformation"
  },
  {
    id: 10,
    src: "https://lh3.googleusercontent.com/pw/AP1GczMQOB1ZIQm5c7tmnwMOj6yOgxwhM6q-eE5fsHphlmyjE0hTqRJonXvuXZkvblJe1NsdG_0GcHAGBxU5kOYa0SM7Mzy6v6kbjGsgRhVQEH5sV0IsS9w=w2400",
    category: "exterior",
    title: "Beautiful Home Exterior"
  },
  {
    id: 11,
    src: "https://lh3.googleusercontent.com/pw/AP1GczNskiMsCkee0bU4ICcJZ7x4jDheO_edyybAlVA57_GhOjP9W7y3coZqRqCBK5ymkyAtpGGUtpfKYS-ED82IsQAK3UcdIrYCqjljZ0jTE4OpEG0vZ_I=w2400",
    category: "interior",
    title: "Bathroom Renovation"
  },
  {
    id: 12,
    src: "https://lh3.googleusercontent.com/pw/AP1GczOmshwoJm-_IxQ--OfyJIASx3FUK_Qxb4XT6kMcdAPrTVKiw4z9HourdzhynHB0bXbgw7zkrVd5fg1TNR6f4CVOiLOraklajWXcmv0LYo01f_cKoYo=w2400",
    category: "exterior",
    title: "Finished Exterior Project"
  }
];

// Updated component with enhanced image display and animations
const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'interior', name: 'Interior' },
    { id: 'exterior', name: 'Exterior' },
    { id: 'commercial', name: 'Commercial' }
  ];

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  useEffect(() => {
    // Preload images
    const preloadImages = async () => {
      const imagePromises = galleryImages.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = image.src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      
      try {
        await Promise.all(imagePromises);
        setIsImagesLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        // Set as loaded anyway to show what we can
        setIsImagesLoaded(true);
      }
    };
    
    preloadImages();
  }, []);

  const handleImageClick = (id: number) => {
    setSelectedImage(id);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImages = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(filteredImages[newIndex].id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      navigateImages('prev');
    } else if (e.key === 'ArrowRight') {
      navigateImages('next');
    } else if (e.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    if (selectedImage !== null) {
      window.addEventListener('keydown', handleKeyDown as any);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [selectedImage, filteredImages]);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-gradient-to-br from-white to-accent/30">
      <div className="atomic-starburst w-64 h-64 top-40 right-20"></div>
      <div className="atomic-circle w-72 h-72 -bottom-32 left-20 border-atomic-orange/30 animate-spin-slow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-heading">Our Work</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Browse through our gallery of completed projects and get inspired for your next transformation.
          </p>
        </div>
        
        <div className="flex justify-center space-x-2 mb-12 overflow-x-auto pb-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id 
                  ? 'bg-atomic-turquoise text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {!isImagesLoaded ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md bg-gray-200 h-64 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id} 
                className="rounded-xl overflow-hidden shadow-md cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group"
                onClick={() => handleImageClick(image.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative h-64">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 transition-opacity duration-300 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="w-full">
                      <span className="text-white font-medium block">{image.title}</span>
                      <span className="text-gray-300 text-sm">{image.category.charAt(0).toUpperCase() + image.category.slice(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Featured Projects</h3>
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {galleryImages.map((image) => (
                <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <div 
                      className="rounded-xl overflow-hidden h-64 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                      onClick={() => handleImageClick(image.id)}
                    >
                      <img 
                        src={image.src} 
                        alt={image.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h4 className="text-center mt-2 font-medium">{image.title}</h4>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white/80 hover:bg-white" />
            <CarouselNext className="right-0 bg-white/80 hover:bg-white" />
          </Carousel>
        </div>
        
        {/* Lightbox Modal with animated transitions */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={closeModal}
          >
            <div 
              className="relative max-w-5xl max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4 z-10 bg-gradient-to-b from-black/70 to-transparent text-white">
                <h3 className="text-lg font-bold">
                  {galleryImages.find(img => img.id === selectedImage)?.title}
                </h3>
                <button 
                  onClick={closeModal}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/50 transition-colors"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <img 
                src={galleryImages.find(img => img.id === selectedImage)?.src} 
                alt={galleryImages.find(img => img.id === selectedImage)?.title}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              
              <div className="absolute inset-x-0 bottom-0 flex justify-between items-center p-4 bg-gradient-to-t from-black/70 to-transparent">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImages('prev');
                  }}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImages('next');
                  }}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
