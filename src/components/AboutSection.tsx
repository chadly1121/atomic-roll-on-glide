
import React from 'react';
import { Instagram, Linkedin, MapPin, Phone, Mail, Facebook } from "lucide-react";

const AboutSection = () => {
  return <section id="about" className="py-24 relative overflow-hidden bg-accent/30">
      {/* Decorative elements */}
      <div className="atomic-circle w-80 h-80 top-10 -right-20 border-atomic-orange"></div>
      <div className="atomic-starburst w-60 h-60 bottom-20 left-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">About Roll On Painting Muskoka</h2>
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
              <p className="text-gray-600">Purchased by Chad Gilchrist in 2014, Roll On Painting has grown from a small local operation to a trusted name in the painting industry throughout Muskoka, Ontario and surrounding areas. With over 25 years of experience, we've built our reputation on quality workmanship and exceptional customer service.</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-3 text-atomic-navy">
                Our <span className="text-atomic-orange">Mission</span>
              </h3>
              <p className="text-gray-600">We're committed to delivering premium painting services that exceed expectations. Every brush stroke or sprayed product is applied with precision, every surface prepared with care, and every project completed with pride.</p>
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
                <li className="flex items-start">
                  <div className="mt-1 mr-2 text-atomic-turquoise">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span><strong>Team:</strong> We work together as a cohesive unit to deliver exceptional results</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-3 text-atomic-navy">
                Connect <span className="text-atomic-orange">With Us</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-atomic-turquoise" />
                  <p className="text-gray-600">836 Greer Road, Port Sydney, Ontario, Canada</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-atomic-turquoise" />
                  <a href="tel:+17057871401" className="text-gray-600 hover:text-atomic-orange transition-colors">705-787-1401</a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-atomic-turquoise" />
                  <a href="mailto:info@rollonpainting.com" className="text-gray-600 hover:text-atomic-orange transition-colors">info@rollonpainting.com</a>
                </div>
                <div className="flex space-x-4 mt-4">
                  <a href="https://www.instagram.com/roll_on_painting/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-atomic-turquoise flex items-center justify-center hover:bg-atomic-turquoise/80 transition-colors">
                    <Instagram className="h-6 w-6 text-white" />
                  </a>
                  <a href="https://www.facebook.com/people/Roll-On-Painting-Muskoka/100083040946938/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-atomic-turquoise flex items-center justify-center hover:bg-atomic-turquoise/80 transition-colors">
                    <Facebook className="h-6 w-6 text-white" />
                  </a>
                  <a href="https://www.linkedin.com/company/roll-onpainting/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-atomic-turquoise flex items-center justify-center hover:bg-atomic-turquoise/80 transition-colors">
                    <Linkedin className="h-6 w-6 text-white" />
                  </a>
                  <a href="https://g.co/kgs/hH1mnMH" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-atomic-turquoise flex items-center justify-center hover:bg-atomic-turquoise/80 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="white">
                      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-56 shadow-lg transform hover:-translate-y-2 transition-transform">
                  <img alt="Exterior Painting" className="w-full h-full object-cover" src="https://res.cloudinary.com/dxqfou8jh/image/upload/v1745866842/PXL_20220729_143220227_g0vkxt.jpg" />
                </div>
                <div className="rounded-2xl overflow-hidden h-40 shadow-lg transform hover:-translate-y-2 transition-transform">
                  <img alt="Painting Services" className="w-full h-full object-cover" src="https://res.cloudinary.com/dxqfou8jh/image/upload/v1745866832/PXL_20211007_170401403_khjvil.jpg" />
                </div>
              </div>
              <div className="space-y-4 pt-10">
                <div className="rounded-2xl overflow-hidden h-40 shadow-lg transform hover:-translate-y-2 transition-transform">
                  <img alt="Interior Painting Process" className="w-full h-full object-cover" src="https://res.cloudinary.com/dxqfou8jh/image/upload/v1745866781/IMG_5080_k6y99w.jpg" />
                </div>
                <div className="rounded-2xl overflow-hidden h-56 shadow-lg transform hover:-translate-y-2 transition-transform">
                  <img alt="Interior Painting" className="w-full h-full object-cover" src="https://res.cloudinary.com/dxqfou8jh/image/upload/v1745866829/PXL_20210915_185630588_olhtoa.jpg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default AboutSection;
