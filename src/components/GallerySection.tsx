
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import GalleryFilters from './gallery/GalleryFilters';
import GalleryGrid from './gallery/GalleryGrid';
import GalleryLightbox from './gallery/GalleryLightbox';
import { galleryImages, galleryCategories } from './gallery/GalleryData';
import { useImagePreloader } from './gallery/useImagePreloader';

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { isImagesLoaded } = useImagePreloader(galleryImages);

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
