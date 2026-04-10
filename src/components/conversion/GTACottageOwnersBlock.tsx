import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface GTACottageOwnersBlockProps {
  variant?: 'light' | 'dark';
  heading?: string;
}

const gtaPages = [
  { slug: '/rosedale-muskoka-cottage-painting', label: 'Rosedale to Muskoka' },
  { slug: '/oakville-muskoka-cottage-painting', label: 'Oakville to Muskoka' },
  { slug: '/post-road-muskoka-cottage-painting', label: 'Post Road & Bridle Path to Muskoka' },
];

const GTACottageOwnersBlock: React.FC<GTACottageOwnersBlockProps> = ({ 
  variant = 'light',
  heading = 'Serving Toronto & GTA Cottage Owners' 
}) => {
  const isDark = variant === 'dark';

  return (
    <section className={`py-10 border-t border-b ${isDark ? 'bg-[hsl(220,20%,8%)] border-[hsl(0,0%,12%)]' : 'bg-muted/30 border-border'}`}>
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-[hsl(0,0%,60%)]' : 'text-foreground'}`}>
          {heading}
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
          {gtaPages.map((page) => (
            <Link
              key={page.slug}
              to={page.slug}
              className={`inline-flex items-center gap-1.5 text-sm transition-colors ${
                isDark 
                  ? 'text-[hsl(0,0%,40%)] hover:text-[hsl(0,0%,65%)]' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <ArrowRight className="w-3 h-3 flex-shrink-0" />
              {page.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GTACottageOwnersBlock;
