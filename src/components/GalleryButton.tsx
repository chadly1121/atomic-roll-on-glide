
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import GalleryPopup from './gallery/GalleryPopup';

const GalleryButton = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <>
      <Button 
        variant="outline"
        className="font-medium text-atomic-navy hover:text-atomic-orange hover:bg-white/80"
        onClick={() => setIsGalleryOpen(true)}
      >
        <Image className="h-4 w-4 mr-1" />
        View Gallery
      </Button>
      
      <GalleryPopup 
        open={isGalleryOpen} 
        onOpenChange={setIsGalleryOpen} 
      />
    </>
  );
};

export default GalleryButton;
