
import React from 'react';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FreeTouchUpsButton = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <button
        onClick={() => navigate('/free-touch-ups')}
        className="group relative w-full mx-auto overflow-hidden rounded-full bg-white border-2 border-atomic-orange p-1 transition-all hover:scale-[1.01] animate-pulse-slow shadow-md"
        aria-label="Free Touch Ups for Life - Learn more"
      >
        <div className="relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-atomic-orange/10 via-white to-atomic-orange/10 px-3 py-2">
          <div className="text-center flex-1 min-w-0">
            <span className="text-xs sm:text-sm font-bold text-atomic-navy block">FREE TOUCH UPS FOR LIFE!</span>
            <span className="block text-xs text-atomic-navy/80">Painting only. Excludes new construction</span>
          </div>
          <Info className="h-4 w-4 sm:h-5 sm:w-5 text-atomic-orange flex-shrink-0" />
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Free Touch Ups for Life</DialogTitle>
            <DialogDescription>
              Conditions apply to our Free Touch Ups for Life program.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm">
              Roll On Painting offers free touch-ups for life on our painting services with the following conditions:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li><span className="font-semibold">Painting Services Only:</span> This offer applies only to our painting services and excludes new construction projects.</li>
              <li><span className="font-semibold">Original Work Only:</span> Only applies to work performed by Roll On Painting originally.</li>
              <li><span className="font-semibold">Original Owner:</span> Valid only for the original property owner who purchased our services.</li>
              <li><span className="font-semibold">Same Color:</span> Touch-ups must be the same color as originally painted.</li>
              <li><span className="font-semibold">No Questions Asked:</span> We'll handle your touch-ups without hassle or complicated explanations.</li>
            </ul>
            <p className="text-sm italic">
              Contact us for full details and to schedule your free touch-up.
            </p>
          </div>
          <DialogClose asChild>
            <Button type="button" className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FreeTouchUpsButton;
