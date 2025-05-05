
import React from 'react';
import { Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const FreeTouchUpsButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative w-full md:max-w-md mx-auto overflow-hidden rounded-lg bg-white border-2 border-atomic-navy p-[1px] transition-all hover:scale-[1.01]"
        aria-label="Free Touch Ups for Life - See conditions"
      >
        <div className="relative flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-white via-atomic-cream to-white px-3 py-2">
          <div className="flex-1 text-center">
            <span className="text-lg font-bold text-atomic-navy">FREE TOUCH UPS FOR LIFE!</span>
            <span className="block text-xs text-atomic-navy/70">Click to see conditions</span>
          </div>
          <Info className="h-5 w-5 text-atomic-navy flex-shrink-0" />
          <span className="absolute inset-0 scale-0 rounded-lg bg-atomic-cream transition-all group-hover:scale-100" />
        </div>
        {/* Thobe-inspired decorative elements */}
        <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-atomic-navy/30"></div>
        <div className="absolute top-0 bottom-0 right-3 w-[1px] bg-atomic-navy/30"></div>
        <div className="absolute h-[1px] left-0 right-0 top-3 bg-atomic-navy/30"></div>
        <div className="absolute h-[1px] left-0 right-0 bottom-3 bg-atomic-navy/30"></div>
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
              <Button
                onClick={() => setIsOpen(false)}
                variant="secondary"
                className="bg-atomic-turquoise text-white hover:bg-atomic-turquoise/90"
              >
                Got it!
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FreeTouchUpsButton;
