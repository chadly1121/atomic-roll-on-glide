
import React from 'react';
import { CalendarClock } from 'lucide-react';

const BlogSection = () => {
  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-accent/30">
      <div className="atomic-starburst w-60 h-60 -top-10 left-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">Our Blog</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Get inspired with the latest painting trends, tips, and insights from our experienced team.
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center p-12 bg-white/80 rounded-xl shadow-md max-w-3xl mx-auto">
          <CalendarClock size={64} className="text-atomic-turquoise mb-6" />
          <h3 className="text-2xl font-bold text-atomic-navy mb-3">Coming Soon!</h3>
          <p className="text-lg text-gray-600 text-center mb-4">
            We're working on creating valuable content for our blog. Check back soon for painting tips, trends, and project showcases.
          </p>
          <div className="flex items-center justify-center w-full max-w-md">
            <div className="h-1 bg-atomic-orange/20 w-full rounded-full overflow-hidden">
              <div className="h-full bg-atomic-turquoise w-3/4 rounded-full"></div>
            </div>
            <span className="ml-3 text-atomic-turquoise font-medium">75%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
