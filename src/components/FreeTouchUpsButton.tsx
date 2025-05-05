
import React from 'react';
import { Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const FreeTouchUpsButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative w-full md:max-w-md mx-auto overflow-hidden rounded-lg bg-gradient-to-r from-atomic-orange to-atomic-turquoise p-[2px] transition-all hover:scale-[1.01] animate-pulse-slow"
        aria-label="Free Touch Ups for Life - See conditions"
      >
        <div className="relative flex items-center justify-center gap-2 rounded-[6px] bg-white px-3 py-2">
          <div className="flex-1 text-center">
            <span className="text-lg font-bold text-atomic-navy">FREE TOUCH UPS FOR LIFE!</span>
            <span className="block text-xs text-atomic-navy/70">Click to see conditions</span>
          </div>
          <Info className="h-5 w-5 text-atomic-navy flex-shrink-0" />
          <span className="absolute inset-0 scale-0 rounded-lg bg-gradient-to-r from-atomic-orange/20 to-atomic-turquoise/20 transition-all group-hover:scale-100" />
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-center text-atomic-navy">Free Touch Ups for Life</DialogTitle>
            <DialogDescription className="text-center">
              Our commitment to lasting quality
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div className="bg-atomic-cream rounded-lg p-4">
              <h4 className="font-bold text-lg text-atomic-navy mb-2">Conditions</h4>
              <ul className="space-y-2 text-atomic-navy">
                <li className="flex items-start">
                  <div className="mr-2 text-atomic-turquoise mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>One visit per year per contract</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 text-atomic-turquoise mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Maximum 2 hours of work</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 text-atomic-turquoise mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>No questions asked</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 text-atomic-turquoise mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>No carry over to next year</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 text-atomic-turquoise mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Non-transferable</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Contact us for more information about our Free Touch Ups for Life program.
              </p>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-atomic-turquoise text-white px-6 py-2 rounded-full font-medium hover:bg-atomic-turquoise/90 transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FreeTouchUpsButton;
