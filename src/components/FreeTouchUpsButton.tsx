
import React from 'react';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FreeTouchUpsButton = () => {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate('/free-touch-ups')}
      className="group relative w-full mx-auto overflow-hidden rounded-full bg-white border-2 border-atomic-orange p-1 transition-all hover:scale-[1.01] shadow-md"
      aria-label="Free Touch Ups for Life - Learn more"
    >
      <div className="relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-atomic-orange/10 via-white to-atomic-orange/10 px-3 py-2">
        <div className="text-center flex-1 min-w-0">
          <span className="text-xs sm:text-sm font-bold text-atomic-navy block">PERFECT FINISH PROMISE</span>
          <span className="block text-xs text-atomic-navy/80">Free Touch Ups for Life — Painting only</span>
        </div>
        <Info className="h-4 w-4 sm:h-5 sm:w-5 text-atomic-orange flex-shrink-0" />
      </div>
    </button>
  );
};

export default FreeTouchUpsButton;
