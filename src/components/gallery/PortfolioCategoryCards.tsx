import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

interface CategoryCardData {
  id: string;
  name: string;
  coverImage: string;
  count: number;
}

const categoryCards: CategoryCardData[] = [
  {
    id: 'interior',
    name: 'Interior',
    coverImage: '/lovable-uploads/interior-staining-walls-muskoka.webp',
    count: 65,
  },
  {
    id: 'exterior',
    name: 'Exterior',
    coverImage: '/lovable-uploads/exterior-softwash-before-muskoka-1.webp',
    count: 43,
  },
  {
    id: 'commercial',
    name: 'Commercial',
    coverImage: '/lovable-uploads/commercial-interior-spray-canvas-brewing.webp',
    count: 23,
  },
  {
    id: 'epoxy',
    name: 'Epoxy Coatings',
    coverImage: '/lovable-uploads/epoxy-canvas-brewery-huntsville-1.webp',
    count: 15,
  },
  {
    id: 'cabinet-painting',
    name: 'Cabinet Painting',
    coverImage: '/lovable-uploads/cabinet-onsite-spray-white.webp',
    count: 10,
  },
  {
    id: 'prefinishing',
    name: 'Pre-Finishing',
    coverImage: '/lovable-uploads/prefinishing-stained-boards-muskoka-1.webp',
    count: 8,
  },
  {
    id: 'training',
    name: 'Training',
    coverImage: '/lovable-uploads/commercial-training-team-session.webp',
    count: 7,
  },
  {
    id: 'wallpaper',
    name: 'Wallpaper',
    coverImage: '/lovable-uploads/wallpaper-feature-wall-collage.webp',
    count: 4,
  },
  {
    id: 'institutional',
    name: 'Institutional',
    coverImage: '/lovable-uploads/institutional-school-painting.webp',
    count: 4,
  },
];

interface PortfolioCategoryCardsProps {
  onSelectCategory: (categoryId: string) => void;
}

const PortfolioCategoryCards: React.FC<PortfolioCategoryCardsProps> = ({ onSelectCategory }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categoryCards.map((cat, index) => (
        <motion.button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-atomic-turquoise text-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.06 }}
        >
          {/* Cover image */}
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={cat.coverImage}
              alt={`${cat.name} painting projects by Roll On Painting`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              width="600"
              height="450"
              decoding="async"
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="text-xl font-bold text-white mb-1 group-hover:text-atomic-turquoise transition-colors duration-300">
              {cat.name}
            </h2>
            <div className="flex items-center gap-1.5 text-white/70 text-sm">
              <Camera className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{cat.count} projects</span>
            </div>
          </div>

          {/* Hover accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-atomic-turquoise scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </motion.button>
      ))}
    </div>
  );
};

export default PortfolioCategoryCards;
