
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Using direct image URLs that are accessible and won't break
const galleryImages = [
  {
    id: 1,
    src: "https://lh3.googleusercontent.com/pw/AP1GczNEoH6wO8DwrU5rFbU7TlXAdm-ucz3fICh-G3A5wTAfQTnR14z8iIKOeDUkOEKGaI59Rfw5JE2jOhG9s_tPu992QtmfHkxslidDcyVPLSttxQYXmTzmPve307oOV_W0LSB-qiZLxydky6a_I9fhmLFFvg=w1000-h750-s-no-gm",
    category: "interior",
    title: "Modern Living Room"
  },
  {
    id: 2,
    src: "https://lh3.googleusercontent.com/pw/AP1GczMDXCqeaae8y7rdfZCAbiCoTyfxw9e5SehLVHuPpMdx69yJ1E-RYOg_f7hoTiEHz_wdwVxu4jz-MbslM5LE2KOJ7CSFC2s9PHO08C59_0BMuL9ZyxXrWPDSDRR8v_x2FPx7uWrNe-1RYG8g0St1BNDRFA=w1000-h750-s-no-gm",
    category: "exterior",
    title: "Home Exterior"
  },
  {
    id: 3,
    src: "https://lh3.googleusercontent.com/pw/AP1GczOOvsxUppVwJzNdk7KfhchVnW-MQxgq1lt9rgdZlR4-r4j0IyiZsXZojBnQEYBe8TnuFmF98DnPIGGo4w7FevkaOd_LsHVerP63ztEPwl3IcH0rg-geEv6C-EkSvfMkCZry8kbv1IsSvZFVkinC-_DpTA=w1000-h750-s-no-gm",
    category: "interior",
    title: "Kitchen Cabinets"
  },
  {
    id: 4,
    src: "https://lh3.googleusercontent.com/pw/AP1GczP5cZgdTrblQ37DIZKcmRve25BVJlgabTpXONGKsm3F7gt1SOOXCCF4JHWo9K-jJnZyfNWNNl8cyrDbRLMsQELZvvIiDcKu_-6nVtRaJcX9PnW3NmVBY12rdUArMTGtRFtolgyBIKIFsJzW8R0ZvultWQ=w1322-h926-s-no-gm",
    category: "exterior",
    title: "Deck Staining"
  },
  {
    id: 5,
    src: "https://lh3.googleusercontent.com/pw/AP1GczMnqZZDG8znTZFRofNF2NKEax_OdMZ1sSQ8hKQcOvIXqeaktm9FxMWc22ViEdAv1dxTs9KC3KQGrYbF01aVs3KxKn1ZvT7qemzUuA4S97W5dq6GsD84Bb4IrW2fzeuE63rqvDlkQ55-TN6_o8w-gZ7hAA=w500-h375-s-no-gm",
    category: "commercial",
    title: "Commercial Space"
  },
  {
    id: 6,
    src: "https://lh3.googleusercontent.com/pw/AP1GczP9djj7Y3QgJHVHRCoKNxg78tLZiUyfAcrui9CcZ4_LsoHi4jwz81UPfavzb-jJh9LP04FVqmMGBNYXM0U8ZDtTC_U3FtGrOrDp_cD4t5JHEccnb0mRcBmCWSrMhihL057QVJP_7YP46tgR5eslLthjRg=w1000-h750-s-no-gm",
    category: "interior",
    title: "Residential Painting"
  },
  {
    id: 7,
    src: "https://lh3.googleusercontent.com/pw/AP1GczMDPxtVBu5JlUU8qkEbWeizsSL-4EjNK7Hfjs1zsmmlnQPzgmLX0R-J2anccc97F-7hseYYwzwjDQz1YrDCYC7pNwBJUdU5gwxCsfu9F3Ul9A4XnD0m3Y8vf0Jkx5NB9LkZ7wpxPH0hCckuOmVgy_z9Qg=w1000-h750-s-no-gm",
    category: "interior",
    title: "Interior Detail"
  },
  {
    id: 8,
    src: "https://lh3.googleusercontent.com/pw/AP1GczMy011IeyBiPRxbI4bYQ4Nc8zAml4JvgXTtF7ugvIWn3_XLrP5lI_mpwk5fwWc4oRz6MxZApqv2Xr_6XnTo_FpWoQEV7IB3rCOn7HrfJ3U-CgnJvO5i2tXiPWyUPNIfDR8Ggdt6CzxlfVtOwSLBpIlf-A=w932-h1242-s-no-gm",
    category: "interior",
    title: "Stairway Renovation"
  },
  {
    id: 9,
    src: "https://lh3.googleusercontent.com/pw/AP1GczMJf18bQA-ZbCcBS7mCGZv31P5qY1Alp5nd28UTot0XpA-xxLGrSMXzeSXYA-N6GLucEhosMoxohS54XD3MbVgayufKEROvopxbHzQL1ZD_VyfJhXn9RpswMotdPBvdaxwaKWwWGltZnJC8GEHw0O-r2Q=w1000-h750-s-no-gm",
    category: "commercial",
    title: "Commercial Project"
  }
];

// Updated component to include Google Photo album integration
const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'interior', name: 'Interior' },
    { id: 'exterior', name: 'Exterior' },
    { id: 'commercial', name: 'Commercial' }
  ];

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

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
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className="rounded-xl overflow-hidden shadow-md cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
              onClick={() => handleImageClick(image.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-64">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 transition-opacity duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  <span className="text-white font-medium">{image.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Featured Projects</h3>
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {galleryImages.map((image) => (
                <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <div className="rounded-xl overflow-hidden h-64 shadow-md hover:shadow-lg transition-shadow">
                      <img 
                        src={image.src} 
                        alt={image.title}
                        className="w-full h-full object-cover"
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
        
        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={closeModal}
          >
            <div 
              className="relative max-w-5xl max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4 z-10 bg-gradient-to-b from-black/50 to-transparent text-white">
                <h3 className="text-lg font-bold">
                  {galleryImages.find(img => img.id === selectedImage)?.title}
                </h3>
                <button 
                  onClick={closeModal}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
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
              
              <div className="absolute inset-x-0 bottom-0 flex justify-between items-center p-4 bg-gradient-to-t from-black/50 to-transparent">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImages('prev');
                  }}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImages('next');
                  }}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
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
