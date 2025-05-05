
import React from 'react';
import { Hourglass } from 'lucide-react';

const TrendsSection = () => {
  return (
    <section id="trends" className="py-24 relative overflow-hidden">
      <div className="atomic-circle w-80 h-80 -bottom-40 -right-20 border-atomic-orange/30"></div>
      <div className="atomic-starburst w-72 h-72 top-20 left-1/4"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">Paint Trends</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Stay ahead with the latest painting trends and innovative techniques for your next project.
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center p-12 bg-white/80 rounded-xl shadow-md max-w-3xl mx-auto">
          <Hourglass size={64} className="text-atomic-orange mb-6" />
          <h3 className="text-2xl font-bold text-atomic-navy mb-3">Coming Soon!</h3>
          <p className="text-lg text-gray-600 text-center mb-4">
            Our team is curating the latest painting trends and techniques to help inspire your next project. Stay tuned!
          </p>
          <div className="flex items-center justify-center w-full max-w-md">
            <div className="h-1 bg-atomic-orange/20 w-full rounded-full overflow-hidden">
              <div className="h-full bg-atomic-orange w-2/3 rounded-full"></div>
            </div>
            <span className="ml-3 text-atomic-orange font-medium">65%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendsSection;
