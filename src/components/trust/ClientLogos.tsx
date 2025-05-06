
import React from 'react';
import { motion } from 'framer-motion';
import { LazyImage } from "@/components/ui/lazy-image";
import { Link, ExternalLink } from 'lucide-react';

const ClientLogos: React.FC = () => {
  const clients = [
    {
      name: "Davicor Construction",
      logo: "https://www.davicor.ca/wp-content/uploads/2023/02/cropped-Davicor-Logo.png",
      website: "https://www.davicor.ca/"
    },
    {
      name: "R&G Construction",
      logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=300&auto=format",
      website: "https://rgconstruction.ca/"
    },
    {
      name: "Riedmann Property Management",
      logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=300&auto=format",
      website: "https://riedmannmanagement.com/"
    },
    {
      name: "Hall Construction",
      logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=300&auto=format",
      website: "https://hallconstructioninc.com/"
    },
    {
      name: "Radius Construction",
      logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=300&auto=format",
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
              className="w-full flex justify-center hover:shadow-md p-3 rounded-lg transition-all duration-300"
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
                className="block w-full flex flex-col items-center space-y-2"
                aria-label={`Visit ${client.name} website`}
              >
                <div className="bg-white p-3 rounded-lg shadow-sm w-full h-24 flex items-center justify-center">
                  <LazyImage 
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="max-h-16 w-auto object-contain"
                    width={120}
                    height={80}
                  />
                </div>
                <div className="flex items-center text-sm font-medium text-atomic-navy">
                  <span>{client.name}</span>
                  <ExternalLink className="h-3 w-3 ml-1 text-atomic-turquoise" />
                </div>
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
              className="text-atomic-turquoise font-medium hover:text-atomic-navy transition-colors flex items-center"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              Join our growing list of satisfied clients
              <Link className="h-4 w-4 ml-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
