import React from 'react';
import { Link } from 'react-router-dom';

interface PrivateClientWhisperProps {
  variant?: 'light' | 'dark';
  className?: string;
}

const PrivateClientWhisper: React.FC<PrivateClientWhisperProps> = ({ variant = 'light', className = '' }) => {
  return (
    <p className={`text-xs font-normal mt-3 ${variant === 'dark' ? 'text-white/50' : 'text-muted-foreground/70'} ${className}`}>
      Own a Muskoka cottage? Ask about our{' '}
      <Link
        to="/private-client-muskoka-property-care"
        className={`underline underline-offset-2 transition-colors ${
          variant === 'dark'
            ? 'hover:text-white/80'
            : 'hover:text-muted-foreground'
        }`}
      >
        Private Client program
      </Link>
      .
    </p>
  );
};

export default PrivateClientWhisper;
