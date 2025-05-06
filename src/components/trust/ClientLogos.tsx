
import React from 'react';
import { motion } from 'framer-motion';
import { LazyImage } from "@/components/ui/lazy-image";

const ClientLogos: React.FC = () => {
  const clients = [
    {
      name: "Davicor Construction",
      logo: "https://res.cloudinary.com/dxqfou8jh/image/upload/v1746763692/davicor-construction-logo_wyng0p.png",
      website: "https://davicorconstruction.ca/"
    },
    {
      name: "R&G Construction",
      logo: "https://res.cloudinary.com/dxqfou8jh/image/upload/v1746763694/r-and-g-construction-logo_bgpdtx.png",
      website: "https://rgconstruction.ca/"
    },
    {
      name: "Riedmann Property Management",
      logo: "https://res.cloudinary.com/dxqfou8jh/image/upload/v1746763693/riedmann-property-management-logo_zt8tci.png",
      website: "https://riedmannmanagement.com/"
    },
    {
      name: "Hall Construction",
      logo: "https://res.cloudinary.com/dxqfou8jh/image/upload/v1746763693/hall-construction-logo_flcftr.png",
      website: "https://hallconstructioninc.com/"
    },
    {
      name: "Radius Construction",
      logo: "https://res.cloudinary.com/dxqfou8jh/image/upload/v1746763693/radius-construction-logo_l40xnk.png",
      website: "https://radiusconstruction.ca/"
    }
  ];

  return (
    <section className="py-16 bg-atomic-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Trusted by Businesses Across Muskoka</h2>
          <p className="text-gray-600 mt-2">We're proud to have worked with these amazing clients</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className="w-full flex justify-center grayscale hover:grayscale-0 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <a 
                href={client.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full flex justify-center"
                aria-label={`Visit ${client.name} website`}
              >
                <LazyImage 
                  src={client.logo} 
                  alt={`${client.name} logo`}
                  className="max-h-16 w-auto object-contain"
                  width={160}
                  height={80}
                />
              </a>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <a 
              href="#contact" 
              className="text-atomic-turquoise font-medium hover:text-atomic-navy transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              Join our growing list of satisfied clients →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
