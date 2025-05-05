
import React from 'react';
import { motion } from "framer-motion";
import { GalleryCategory } from './types';

interface GalleryFiltersProps {
  categories: GalleryCategory[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const GalleryFilters: React.FC<GalleryFiltersProps> = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}) => {
  return (
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
  );
};

export default GalleryFilters;
