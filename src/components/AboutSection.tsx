
import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-accent/30">
      {/* Decorative elements */}
      <div className="atomic-circle w-80 h-80 top-10 -right-20 border-atomic-orange"></div>
      <div className="atomic-starburst w-60 h-60 bottom-20 left-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">About Roll On Painting</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            We're not just painters - we're craftsmen dedicated to transforming your spaces with precision and care.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 md:order-1">
            <div>
              <h3 className="text-2xl font-bold mb-3 text-atomic-navy">
                Our <span className="text-atomic-turquoise">Story</span>
              </h3>
              <p className="text-gray-600">
                Founded by Chad Gilchrist, Roll On Painting has grown from a small local operation to a trusted name in the painting industry. With over 15 years of experience, we've built our reputation on quality workmanship and exceptional customer service.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-3 text-atomic-navy">
                Our <span className="text-atomic-orange">Mission</span>
              </h3>
              <p className="text-gray-600">
                We're committed to delivering premium painting services that exceed expectations. Every brush stroke is applied with precision, every surface prepared with care, and every project completed with pride.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-3 text-atomic-navy">
                Our <span className="text-atomic-coral">Values</span>
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <div className="mt-1 mr-2 text-atomic-turquoise">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span><strong>Quality:</strong> We never compromise on materials or techniques</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-2 text-atomic-turquoise">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span><strong>Integrity:</strong> Honest pricing and transparent communication</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-2 text-atomic-turquoise">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span><strong>Reliability:</strong> We show up on time and complete projects as promised</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-56 shadow-lg transform hover:-translate-y-2 transition-transform">
                  <img 
                    src="https://www.roll-onpainting.com/wp-content/uploads/2020/12/exterior-painting-5-scaled.jpg" 
                    alt="Exterior Painting" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-40 shadow-lg transform hover:-translate-y-2 transition-transform">
                  <img 
                    src="https://www.roll-onpainting.com/wp-content/uploads/2020/12/services_feature3.jpg" 
                    alt="Painting Services" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-10">
                <div className="rounded-2xl overflow-hidden h-40 shadow-lg transform hover:-translate-y-2 transition-transform">
                  <img 
                    src="https://www.roll-onpainting.com/wp-content/uploads/2020/12/interior-painting-process3-scaled.jpg" 
                    alt="Interior Painting Process" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-56 shadow-lg transform hover:-translate-y-2 transition-transform">
                  <img 
                    src="https://www.roll-onpainting.com/wp-content/uploads/2020/12/interior-paint-3-scaled.jpg" 
                    alt="Interior Painting" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
