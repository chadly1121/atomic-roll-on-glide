
import React from 'react';
import { motion } from 'framer-motion';

const ClientLogos: React.FC = () => {
  const clients = [
    {
      name: "Muskoka Lakes Resort",
      logo: "https://res.cloudinary.com/dxqfou8jh/image/upload/v1746119789/client-logo-1_vrpg8v.png"
    },
    {
      name: "Huntsville Lodge",
      logo: "https://res.cloudinary.com/dxqfou8jh/image/upload/v1746119789/client-logo-2_ucmqtq.png"
    },
    {
      name: "Port Carling Marina",
      logo: "https://res.cloudinary.com/dxqfou8jh/image/upload/v1746119789/client-logo-3_fjv8re.png"
    },
    {
      name: "Gravenhurst Waterfront",
      logo: "https://res.cloudinary.com/dxqfou8jh/image/upload/v1746119789/client-logo-4_q9zrhx.png"
    },
    {
      name: "Northern Builders",
      logo: "https://res.cloudinary.com/dxqfou8jh/image/upload/v1746119789/client-logo-5_gpcg8k.png"
    },
    {
      name: "Cottage Country Developers",
      logo: "https://res.cloudinary.com/dxqfou8jh/image/upload/v1746119789/client-logo-6_yu28i3.png"
    }
  ];

  return (
    <section className="py-16 bg-atomic-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Trusted by Businesses Across Muskoka</h2>
          <p className="text-gray-600 mt-2">We're proud to have worked with these amazing clients</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
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
              <img 
                src={client.logo} 
                alt={client.name} 
                className="max-h-16 w-auto"
                loading="lazy"
              />
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
