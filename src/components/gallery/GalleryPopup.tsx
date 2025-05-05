
import React, { useState } from 'react';
import { galleryImages } from './GalleryData';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Image } from "lucide-react";
import GalleryGrid from './GalleryGrid';
import GalleryLightbox from './GalleryLightbox';
import GalleryFilters from './GalleryFilters';
import { galleryCategories } from './GalleryData';
import { useImagePreloader } from './useImagePreloader';

interface GalleryPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GalleryPopup: React.FC<GalleryPopupProps> = ({ open, onOpenChange }) => {
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
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl w-[90vw] max-h-[90vh] overflow-y-auto p-6" onOpenAutoFocus={(e) => e.preventDefault()}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Our Work Gallery</h2>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <GalleryFilters 
            categories={galleryCategories} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
          
          <div className="mt-6">
            <GalleryGrid 
              images={filteredImages} 
              onImageClick={handleImageClick} 
              isImagesLoaded={isImagesLoaded}
            />
          </div>
        </DialogContent>
      </Dialog>
      
      <GalleryLightbox 
        selectedImage={selectedImage}
        images={filteredImages}
        closeModal={closeModal}
        navigateImages={navigateImages}
      />
    </>
  );
};

export default GalleryPopup;
