
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, BadgeCheck, Star } from 'lucide-react';

interface TrustItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TrustItem: React.FC<TrustItemProps> = ({ icon, title, description }) => (
  <motion.div 
    className="flex flex-col items-center text-center p-4"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
  >
    <div className="mb-3 text-atomic-turquoise">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </motion.div>
);

const TrustBadges: React.FC = () => {
  const certifications = [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Uniformed Professional Painters",
      description: "Member of the Painting Contractors Association"
    },
    {
      icon: <BadgeCheck className="h-12 w-12" />,
      title: "W.S.I.B and 5 Million Liability Insurance",
      description: "Fully covered for your peace of mind"
    },
    {
      icon: <Star className="h-12 w-12" />,
      title: "5-Star Service",
      description: "Consistently rated 5 stars by our satisfied customers"
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Free Estimates",
      description: "Professional estimates with no obligation"
    }
  ];
  
  return (
    <section id="trust" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Why Trust Roll On Painting</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            We're proud to be recognized for our commitment to quality and excellence
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <TrustItem
              key={index}
              icon={cert.icon}
              title={cert.title}
              description={cert.description}
            />
          ))}
        </div>
        
        {/* Partners and Affiliations */}
        <div className="mt-16 pt-12 border-t">
          <h3 className="text-2xl font-bold text-center mb-8">Our Partners & Affiliations</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            <motion.div
              className="grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://res.cloudinary.com/dxqfou8jh/image/upload/v1746119789/benjamin-moore-logo_umiuly.png" 
                alt="Benjamin Moore" 
                className="max-h-16 w-auto"
              />
            </motion.div>
            
            <motion.div
              className="grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://cdn.sansin.com/wp-content/uploads/2018/03/06232406/sansin-logo-en.png" 
                alt="Sansin Stain" 
                className="max-h-16 w-auto"
              />
            </motion.div>
            
            <motion.div
              className="grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://res.cloudinary.com/dxqfou8jh/image/upload/v1746119789/pca-logo_u8fzz6.png" 
                alt="Painting Contractors Association" 
                className="max-h-16 w-auto"
              />
            </motion.div>
            
            <motion.div
              className="grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://www.dulux.ca/content/dam/dulux/icons/logos/dulux/logo.svg" 
                alt="Dulux" 
                className="max-h-16 w-auto"
              />
            </motion.div>
            
            <motion.div
              className="grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://www.ppg.com/content/dam/ppgcom/global-site/en/images/branding/logos/ppg_logo.svg" 
                alt="PPG" 
                className="max-h-16 w-auto"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
