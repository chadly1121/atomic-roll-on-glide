
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Using direct image URLs from your shared Google Photos links
const galleryImages = [
  {
    id: 1,
    src: "https://lh3.googleusercontent.com/pw/AP1GczNhIBJdvRX0hzC_9-XI1MTXdRrtcV_XUc50J3LUvIsb3STmZKLHfMg4G8MR50LwZn56jvEkDU6tU6bzfcwFNIXLVAbwgdfO2TShV-GuceFYPejC1Pk=w2400", 
    category: "interior",
    title: "Interior Painting Project"
  },
  {
    id: 2,
    src: "https://lh3.googleusercontent.com/pw/AP1GczNbgiqiTSrZO0Gg2exHO8bDKmKDbrb6ZuUGphvWYBCRbfSUvExyrhTRnio4Qgf6MCPZveTh7-Qhb5wUw2IUfudNJqOQoJQfbYACBPKVeqq1jY3z4a8=w2400", 
    category: "exterior",
    title: "Exterior Home Transformation"
  },
  {
    id: 3,
    src: "https://lh3.googleusercontent.com/pw/AP1GczPnuKfdHxsNLEcOOjiuw1jrH1PzKz0A1RTXfFiSV9LZxvUvdf2KI9dsQrh4MdqA1TO6Jgx8bTISjGDJCCflJad3Iah-wGZBxzk2-JrO-mZaeuPJuZ0=w2400", 
    category: "interior",
    title: "Kitchen Cabinet Refinishing"
  },
  {
    id: 4,
    src: "https://lh3.googleusercontent.com/pw/AP1GczMXsm2FCF1mxlCL2FyPi9T8VB8uEsk-p-cgmLzkCPy5xXHK_b-9t5iljiBYdMdonnx7oTqNaXTgUobUg3zpJx5OIWOru5pjE-Bk8wGJOj4iZpmaGDM=w2400", 
    category: "exterior",
    title: "Deck Transformation"
  },
  {
    id: 5,
    src: "https://lh3.googleusercontent.com/pw/AP1GczM7wLK9caudK-p7CJs8N1P4LrMbkQ0q0YLu-KIyhduBC3Tok08vxNM4x65UiOpuBVn2432p88LBxrHwOpktOqcStq6cu12Oj-no1KN4mLswtwdKd7c=w2400",
    category: "commercial",
    title: "Commercial Project"
  },
  {
    id: 6,
    src: "https://lh3.googleusercontent.com/pw/AP1GczOcULO5ByttswlWwLQiYkOtgFeT0cMa33ICj8Omh7BulP-zZ2BE2t5D4_dypSkv3Yg3G6aJZBj-ihLJahwQH8zP3nqQgJgn9YsMusqtNq8FWEoegYE=w2400",
    category: "interior",
    title: "Living Room Refresh"
  },
  {
    id: 7,
    src: "https://lh3.googleusercontent.com/pw/AP1GczM-XazT6A9OuFhdDlpD1tSLZb0s-_mCxJJvZ5GaRWYOCcr7Bo1yvtP0MRD_LwM1PSWDwbhcbT-jSZHNdACkB2ZzzaL0DzSuYacB7oJJoFqL4MKmA8U=w2400",
    category: "interior",
    title: "Interior Transformation"
  },
  {
    id: 8,
    src: "https://lh3.googleusercontent.com/pw/AP1GczPviA4cwqiRQgKl_9pnQMMO44BJUV-ZA4owFREafzBgEGYQou7N1hJipQPZXyVe5Xf_cngJ8AEFPR_9YrDefzXN1qihV1m6EoM1MIBuMBtvSiy6Fn4=w2400",
    category: "interior",
    title: "Staircase Renovation"
  },
  {
    id: 9,
    src: "https://lh3.googleusercontent.com/pw/AP1GczPyeR5EDzGxnoZkcabW8XDXZpaJGodMZhzEkd62n-Hbvsm3UJ_YpzCdmXcOKjGrFfXAzOMPYmbohdv_n4Q14NnPo42CDgl7vkCq7eZG-syP_2VOXeY=w2400",
    category: "commercial",
    title: "Office Transformation"
  },
  {
    id: 10,
    src: "https://lh3.googleusercontent.com/pw/AP1GczN2LnF28pp6_QA_UiYYMkW8C8BSJ1gMu-9gAA0gpc1_EDCiPmh7vJLW3Qo8FRKGE1nSoyJBCBmiz-ARJ4AKVDOn9tO-s3sFWh6vrbGIr2z_zNwPDNM=w2400",
    category: "exterior",
    title: "Beautiful Home Exterior"
  },
  {
    id: 11,
    src: "https://lh3.googleusercontent.com/pw/AP1GczPuAoGi6gm1AM3ZLAEh8XCdgkiOMkVyDVirOlf2yZk6DsvcLJbNE9C-HZ1E-mbJY4bikMaPSkU9w79mPMUhfXuhhtx_sh74Fz--AiJ5xkVGv10b50U=w2400",
    category: "interior",
    title: "Bathroom Renovation"
  },
  {
    id: 12,
    src: "https://lh3.googleusercontent.com/pw/AP1GczNm_X84bUL31U9hGPfLbmgZ7O_3pZwyFjVGJiDgUqDdQBRwGi7-rUaMDavkoFYi_xswHxiHkBDuibOj_zB92RMqZsivKRV2U0nNx4Gmb3tPRJBzPAg=w2400",
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
      try {
        const imagePromises = galleryImages.map((image) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image.src;
            img.onload = resolve;
            img.onerror = (err) => {
              console.error(`Failed to load image: ${image.src}`, err);
              reject(err);
            };
          });
        });
        
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
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Our Work</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Browse through our gallery of completed projects and get inspired for your next transformation.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex justify-center space-x-2 mb-12 overflow-x-auto pb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform ${
                activeCategory === category.id 
                  ? 'bg-atomic-turquoise text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>
        
        {!isImagesLoaded ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md bg-gray-200 h-64 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div 
                key={image.id} 
                className="rounded-xl overflow-hidden shadow-md cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group"
                onClick={() => handleImageClick(image.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
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
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Lightbox Modal with animated transitions */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div 
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="relative max-w-5xl max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4 z-10 bg-gradient-to-b from-black/70 to-transparent text-white">
                  <h3 className="text-lg font-bold">
                    {galleryImages.find(img => img.id === selectedImage)?.title}
                  </h3>
                  <motion.button 
                    onClick={closeModal}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/50 transition-colors"
                    aria-label="Close modal"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </div>
                
                <img 
                  src={galleryImages.find(img => img.id === selectedImage)?.src} 
                  alt={galleryImages.find(img => img.id === selectedImage)?.title}
                  className="w-full h-auto max-h-[90vh] object-contain"
                />
                
                <div className="absolute inset-x-0 bottom-0 flex justify-between items-center p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <motion.button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImages('prev');
                    }}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                  <motion.button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImages('next');
                    }}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;
