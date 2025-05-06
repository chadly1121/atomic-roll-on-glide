
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

type CTAVariant = 'primary' | 'secondary' | 'outline' | 'subtle';
type CTASize = 'sm' | 'md' | 'lg';

interface CallToActionProps {
  text: string;
  href: string;
  variant?: CTAVariant;
  size?: CTASize;
  icon?: boolean;
  className?: string;
}

const CallToAction = ({ 
  text, 
  href, 
  variant = 'primary', 
  size = 'md',
  icon = true,
  className = '' 
}: CallToActionProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Check if internal link or external
    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else if (href.startsWith('#')) {
      // If on homepage, scroll to section
      if (location.pathname === '/') {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If not on homepage, go to homepage then to the section
        navigate('/', { state: { scrollTo: href } });
      }
    } else {
      // Handle regular internal navigation
      navigate(href);
    }
  };

  // Variant styles
  const variantClasses = {
    primary: 'bg-atomic-orange text-white hover:bg-atomic-orange/90',
    secondary: 'bg-atomic-turquoise text-white hover:bg-atomic-turquoise/90',
    outline: 'bg-transparent border-2 border-atomic-orange text-atomic-orange hover:bg-atomic-orange/10',
    subtle: 'bg-gray-100 text-atomic-navy hover:bg-gray-200'
  };

  // Size styles
  const sizeClasses = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-3 px-6',
    lg: 'text-lg py-4 px-8'
  };
  
  return (
    <motion.button
      className={`rounded-full font-medium flex items-center justify-center gap-2 transition-all ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {text}
      {icon && <ArrowRight className="w-5 h-5" />}
    </motion.button>
  );
};

export default CallToAction;
