
import React, { useEffect, useCallback } from 'react';

interface SectionObserverProps {
  setActiveSection: (sectionId: string) => void;
  setVisibleSections: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const SectionObserver: React.FC<SectionObserverProps> = ({ setActiveSection, setVisibleSections }) => {
  // Track sections in view and lazy load components as needed
  useEffect(() => {
    // Section observer configuration
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    // Handle intersection
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const sectionId = entry.target.id;
        
        if (entry.isIntersecting) {
          // Set active section for navbar highlighting
          setActiveSection(sectionId);
          
          // Mark section as visible for lazy loading
          setVisibleSections(prev => {
            const updated = new Set(prev);
            updated.add(sectionId);
            
            // Pre-load the next section(s) for smooth transitions
            if (sectionId === 'about') updated.add('services');
            if (sectionId === 'services') updated.add('testimonials');
            if (sectionId === 'testimonials') updated.add('pricing');
            if (sectionId === 'pricing') updated.add('blog');
            if (sectionId === 'blog') updated.add('trends');
            if (sectionId === 'trends') updated.add('contact');
            
            return updated;
          });
        }
      });
    };

    // Create and use observer
    const sectionObserver = new IntersectionObserver(handleIntersection, observerOptions);
    document.querySelectorAll('section[id]').forEach(section => {
      sectionObserver.observe(section);
    });
    
    return () => {
      sectionObserver.disconnect();
    };
  }, [setActiveSection, setVisibleSections]);

  return null; // This component doesn't render anything
};

export default SectionObserver;
