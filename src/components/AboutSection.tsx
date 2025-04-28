import React from 'react';
import { Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";
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
              <p className="text-gray-600">Purchased by Chad Gilchrist, Roll On Painting has grown from a small local operation to a trusted name in the painting industry throughout Muskoka, Ontario and surrounding areas. With over 25 years of experience, we've built our reputation on quality workmanship and exceptional customer service.</p>
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
                  <p className="text-gray-600">836 Greer Road, Huntsville, Ontario, Canada</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-atomic-turquoise" />
                  <a href="tel:+17057871401" className="text-gray-600 hover:text-atomic-orange transition-colors">705-787-1401</a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-atomic-turquoise" />
                  <a href="mailto:info@rollonpainting.com" className="text-gray-600 hover:text-atomic-orange transition-colors">info@rollonpainting.com</a>
                </div>
                <div className="flex space-x-3 mt-4">
                  <a href="https://www.instagram.com/roll_on_painting/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-atomic-turquoise/20 flex items-center justify-center hover:bg-atomic-turquoise/40 transition-colors">
                    <Instagram className="h-5 w-5 text-atomic-turquoise" />
                  </a>
                  <a href="https://www.facebook.com/people/Roll-On-Painting-Muskoka/100083040946938/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-atomic-turquoise/20 flex items-center justify-center hover:bg-atomic-turquoise/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-atomic-turquoise" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/roll-onpainting/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-atomic-turquoise/20 flex items-center justify-center hover:bg-atomic-turquoise/40 transition-colors">
                    <Linkedin className="h-5 w-5 text-atomic-turquoise" />
                  </a>
                  <a href="https://g.co/kgs/hH1mnMH" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-atomic-turquoise/20 flex items-center justify-center hover:bg-atomic-turquoise/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-atomic-turquoise" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.008 16.255l-.36-1.2h-2.4l-.36 1.2h-1.32l2.04-6.48h1.68l2.04 6.48h-1.32zm-1.56-5.28l-.84 2.88h1.68l-.84-2.88zm5.359 5.28v-6.48h2.64c.56 0 1.07.093 1.53.28s.823.453 1.09.8c.267.347.4.767.4 1.26 0 .493-.133.913-.4 1.26-.267.347-.63.617-1.09.81s-.97.29-1.53.29h-1.32v1.78h-1.32zm1.32-2.96h1.32c.267 0 .493-.05.68-.15s.33-.237.43-.41.15-.367.15-.58c0-.213-.05-.407-.15-.58s-.243-.307-.43-.4c-.187-.093-.413-.14-.68-.14h-1.32v2.26z"></path>
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
                  <img src="https://lh3.googleusercontent.com/p/AF1QipP8f7e4b3580VMrNchHsOiYHeV8hifgA2EZyiqr=w768-h768-n-o-v1" alt="Interior Painting" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;