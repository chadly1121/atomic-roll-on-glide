
import React, { useState } from 'react';

const galleryImages = [
  {
    id: 1,
    src: "https://lh3.googleusercontent.com/p/AF1QipP8f7e4b3580VMrNchHsOiYHeV8hifgA2EZyiqr=w768-h768-n-o-v1",
    category: "interior",
    title: "Modern Living Room"
  },
  {
    id: 2,
    src: "https://lh3.googleusercontent.com/p/AF1QipPutw-6_bXURx63ShkpKm1y3ZLHT-_XrFVOAAZm=w768-h768-n-o-v1",
    category: "exterior",
    title: "Home Exterior"
  },
  {
    id: 3,
    src: "https://lh3.googleusercontent.com/p/AF1QipMSVJJK54qlLq9k9aHYcC9BJYkV4xtdHFAKxPMZ=w768-h768-n-o-v1",
    category: "interior",
    title: "Kitchen Cabinets"
  },
  {
    id: 4,
    src: "https://lh3.googleusercontent.com/p/AF1QipNdJ5dqulNz8LpPgcd-TYcEaf7y0zyUls5poURI=w768-h768-n-o-v1",
    category: "exterior",
    title: "Deck Staining"
  },
  {
    id: 5,
    src: "https://lh3.googleusercontent.com/p/AF1QipOCxhCQTf67h55TND-LRHa3HJMNmWYISwmTrr4h=w768-h768-n-o-v1",
    category: "commercial",
    title: "Commercial Space"
  },
  {
    id: 6,
    src: "https://lh3.googleusercontent.com/p/AF1QipMJcJv3Pn7RvOWXBFKbCGEU-RW7lepnRvxoJAQi=w1080-h608-p-no-v0",
    category: "interior",
    title: "Residential Painting"
  },
  {
    id: 7,
    src: "https://lh3.googleusercontent.com/p/AF1QipNcZtGKrh3rYrV0wbCdyxM74oi7dXj5lyQ3PwpQ=w768-h768-n-o-v1",
    category: "interior",
    title: "Interior Detail"
  },
  {
    id: 8,
    src: "https://lh3.googleusercontent.com/p/AF1QipPl_-jCqoXlOl_Mc8Xk4SaFrIMzRbTsgrKYk9p9=w768-h768-n-o-v1",
    category: "interior",
    title: "Stairway Renovation"
  },
  {
    id: 9,
    src: "https://lh3.googleusercontent.com/p/AF1QipMh6la7I0gaYKQbVIgl3g0cCs9erhTiIVAfvcQW=w768-h768-n-o-v1",
    category: "commercial",
    title: "Commercial Project"
  }
];

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeCategory === category.id 
                  ? 'bg-atomic-turquoise text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map(image => (
            <div 
              key={image.id} 
              className="rounded-xl overflow-hidden shadow-md cursor-pointer transform hover:-translate-y-1 transition-transform group"
              onClick={() => handleImageClick(image.id)}
            >
              <div className="relative h-64">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-medium">{image.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div 
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={closeModal}
                className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-gray-800 hover:bg-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <img 
                src={galleryImages.find(img => img.id === selectedImage)?.src} 
                alt={galleryImages.find(img => img.id === selectedImage)?.title}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              
              <div className="p-4 bg-white">
                <h3 className="text-lg font-bold">
                  {galleryImages.find(img => img.id === selectedImage)?.title}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
