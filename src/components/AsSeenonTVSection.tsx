
import React from 'react';
import { motion } from 'framer-motion';
import { Tv } from "lucide-react";
import { optimizeCloudinaryUrl } from '../utils/imageOptimizer';

interface TVFeature {
  id: number;
  networkName: string;
  logo: string;
  quote: string;
  date: string;
  url?: string;
}

const tvFeatures: TVFeature[] = [
  {
    id: 1,
    networkName: "Scott's Vacation House Rules",
    logo: "https://www.homenetwork.ca/wp-content/uploads/2023/03/scotts-vacation-house-rules-episode-407-1200x675.jpg",
    quote: "The team at Roll On Painting showcases exceptional craftsmanship in lakeside properties.",
    date: "October 2023",
    url: "https://www.homenetwork.ca/scotts-vacation-house-rules/"
  }
];

const fadeInUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
      duration: 0.5
    }
  })
};

const AsSeenonTVSection = () => {
  return (
    <section id="asseenontv" className="py-24 relative overflow-hidden bg-atomic-cream">
      <div className="atomic-circle w-72 h-72 -top-20 right-10 border-atomic-turquoise/30 animate-spin-slow"></div>
      <div className="atomic-circle w-80 h-80 bottom-10 -left-20 border-atomic-orange/20 animate-spin-slow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-heading flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Tv className="h-8 w-8 text-atomic-orange" />
            <span>As Seen on TV</span>
          </motion.h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Roll On Painting has been featured on Scott's Vacation House Rules, showcasing our exceptional painting services across Muskoka and beyond.
          </p>
        </div>
        
        <div className="flex justify-center">
          {tvFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              custom={index}
              variants={fadeInUpVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group max-w-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10"></div>
                <img 
                  src={feature.logo} 
                  alt={feature.networkName}
                  onError={(e) => {
                    // Fallback in case the image fails to load
                    console.log("Image failed to load, setting fallback");
                    e.currentTarget.src = "https://www.homenetwork.ca/wp-content/uploads/2023/03/scotts-vacation-house-rules-episode-407-1200x675.jpg";
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center">
                  <div className="bg-atomic-turquoise text-white text-xs px-3 py-1 rounded-full">
                    {feature.date}
                  </div>
                  <h3 className="text-white font-bold ml-auto">{feature.networkName}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <blockquote className="italic text-gray-700 mb-4 relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-atomic-orange/20 absolute -top-2 -left-2 z-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <span className="relative z-10">{feature.quote}</span>
                </blockquote>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-atomic-navy flex items-center justify-center text-white">
                    <Tv className="h-4 w-4" />
                  </div>
                  <a 
                    href={feature.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium ml-2 hover:text-atomic-turquoise transition-colors"
                  >
                    Featured on {feature.networkName}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="atomic-button-secondary inline-flex items-center text-center py-3 px-6 rounded-full group"
          >
            <span className="flex items-center">
              <span>Work with Us</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AsSeenonTVSection;
