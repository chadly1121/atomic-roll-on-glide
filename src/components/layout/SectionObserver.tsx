
import React, { useEffect } from 'react';

interface SectionObserverProps {
  setActiveSection: (sectionId: string) => void;
  setVisibleSections: (prev: React.SetStateAction<Set<string>>) => void;
}

// This component sets up Intersection Observers to track which sections are in view
const SectionObserver: React.FC<SectionObserverProps> = ({ setActiveSection, setVisibleSections }) => {
  useEffect(() => {
    const sections = [
      'home', 
      'about',
      'services',
      'testimonials',
      'gonano', 
      'pricing',
      'blog', 
      'booking',
      'trends',
      'contact'
    ];

    // Track which section is most visible for active state
    const observerActive = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3, // Section must be 30% visible
      }
    );

    // Track all visible sections for loading
    const observerVisible = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          
          setVisibleSections(prev => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(id);
            }
            return newSet;
          });
        });
      },
      {
        root: null,
        rootMargin: '200px', // Load sections before they come into view
        threshold: 0.1,
      }
    );

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observerActive.observe(element);
        observerVisible.observe(element);
      }
    });

    // Cleanup
    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observerActive.unobserve(element);
          observerVisible.unobserve(element);
        }
      });
    };
  }, [setActiveSection, setVisibleSections]);

  return null; // This component doesn't render anything
};

export default SectionObserver;
