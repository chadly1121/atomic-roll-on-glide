
import React from 'react';
import { Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const FreeTouchUpsButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative w-full md:max-w-md mx-auto overflow-hidden rounded-full bg-white border-2 border-atomic-orange p-[1px] transition-all hover:scale-[1.01] animate-pulse-slow shadow-md"
        aria-label="Free Touch Ups for Life - See conditions"
      >
        <div className="relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-atomic-orange/10 via-white to-atomic-orange/10 px-6 py-3">
          <div className="flex-1 text-center">
            <span className="text-lg font-bold text-atomic-navy">FREE TOUCH UPS FOR LIFE!</span>
            <span className="block text-xs text-atomic-navy/80">Painting only. Excludes new construction</span>
          </div>
          <Info className="h-5 w-5 text-atomic-orange flex-shrink-0" />
          <span className="absolute inset-0 scale-0 rounded-full bg-atomic-orange/5 transition-all group-hover:scale-100" />
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
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
              <li><span className="font-semibold">Original Owner:</span> Valid only for the original property owner who purchased our services.</li>
              <li><span className="font-semibold">Same Color:</span> Touch-ups must be the same color as originally painted.</li>
              <li><span className="font-semibold">Limited Area:</span> Each touch-up is limited to a 4 sq. ft. area per room/surface.</li>
              <li><span className="font-semibold">Normal Wear:</span> Covers normal wear and tear only, not damage from impacts or water.</li>
              <li><span className="font-semibold">Timeframe:</span> Available within 5 years of the original service date.</li>
              <li><span className="font-semibold">Scheduling:</span> Subject to our regular scheduling availability.</li>
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
