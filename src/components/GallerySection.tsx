
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import GalleryFilters from './gallery/GalleryFilters';
import GalleryGrid from './gallery/GalleryGrid';
import GalleryLightbox from './gallery/GalleryLightbox';
import { galleryImages, galleryCategories } from './gallery/GalleryData';
import { useImagePreloader } from './gallery/useImagePreloader';
import { useIsMobile } from '@/hooks/use-mobile';

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isImagesLoaded } = useImagePreloader(galleryImages);
  const isMobile = useIsMobile();
...
  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };
...
  const navigateImages = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;

    const currentIndex = filteredImages.findIndex(img => img.src === selectedImage);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    }

    setSelectedImage(filteredImages[newIndex].src);
  };

  // Enable keyboard navigation for desktop
  useEffect(() => {
    if (!isMobile && selectedImage !== null) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          navigateImages('prev');
        } else if (e.key === 'ArrowRight') {
          navigateImages('next');
        } else if (e.key === 'Escape') {
          closeModal();
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImage, isMobile]);

  return (
    <section id="gallery" className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-white to-accent/30">
      <div className="atomic-starburst w-48 md:w-64 h-48 md:h-64 top-20 md:top-40 right-10 md:right-20"></div>
      <div className="atomic-circle w-56 md:w-72 h-56 md:h-72 -bottom-20 md:-bottom-32 left-10 md:left-20 border-atomic-orange/30 animate-spin-slow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Our Work</h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600">
            Browse through our gallery of completed projects and get inspired for your next transformation.
          </p>
        </motion.div>
        
        <GalleryFilters 
          categories={galleryCategories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        
        <GalleryGrid 
          images={filteredImages} 
          onImageClick={handleImageClick} 
          isImagesLoaded={isImagesLoaded}
        />
        
        {/* Mobile-specific CTA that shows after browsing gallery */}
        {isMobile && (
          <div className="mt-8 px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-5 shadow-md border-2 border-atomic-orange/20"
            >
              <h3 className="text-xl font-bold text-center mb-3">Like what you see?</h3>
              <p className="text-center text-gray-600 mb-4">Get your free quote today and transform your space!</p>
              <div className="flex flex-col gap-3">
                <a href="#contact" className="atomic-button w-full text-center py-3.5">
                  Request Free Quote
                </a>
                <a href="tel:+6047581680" className="atomic-button-secondary w-full text-center py-3.5 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Call Now
                </a>
              </div>
            </motion.div>
          </div>
        )}
        
        <GalleryLightbox 
          selectedImage={selectedImage}
          images={filteredImages}
          closeModal={closeModal}
          navigateImages={navigateImages}
        />
      </div>
    </section>
  );
};

export default GallerySection;
