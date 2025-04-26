
import React from 'react';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden">
      {/* Background elements */}
      <div className="atomic-circle w-64 h-64 -top-20 -left-20"></div>
      <div className="atomic-circle w-96 h-96 -bottom-40 -right-20"></div>
      <div className="atomic-starburst w-72 h-72 top-32 right-64"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-xl">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-atomic-turquoise">Transform</span> Your Space With Premium Painting
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Roll On Painting delivers exceptional quality and craftsmanship for residential and commercial projects. 
                Experience the perfect blend of professionalism, skill, and attention to detail.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#contact" 
                className="atomic-button group"
                onClick={handleScrollToContact}
              >
                <span className="relative z-10 flex items-center">
                  Request A Quote
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                </span>
              </a>
              <a 
                href="#services" 
                className="atomic-button-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <span className="relative z-10">Our Services</span>
              </a>
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-atomic-turquoise flex items-center justify-center text-white font-bold">5</div>
                <div className="w-10 h-10 rounded-full bg-atomic-orange flex items-center justify-center text-white font-bold">★</div>
              </div>
              <p className="text-sm"><span className="font-bold">4.9/5</span> from over 150+ Google reviews</p>
            </div>
          </div>
          
          <div className="atomic-shape">
            <div className="rounded-3xl overflow-hidden shadow-2xl transform md:rotate-3 hover:rotate-0 transition-transform">
              <img 
                src="https://www.roll-onpainting.com/wp-content/uploads/2020/12/interior-paint-5-e1608121023242-1024x694.jpg" 
                alt="Roll On Painting Project" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
