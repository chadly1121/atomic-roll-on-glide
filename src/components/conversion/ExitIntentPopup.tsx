
import React, { useEffect, useState } from 'react';
import { Dialog } from "@/components/ui/dialog";
import { X } from "lucide-react";
import CallToAction from './CallToAction';
import { useToast } from "@/hooks/use-toast";

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user has already seen the popup
    const popupSeen = localStorage.getItem('exitIntentPopupSeen');
    if (popupSeen) return;
    
    // Trigger popup when mouse leaves the window (exit intent)
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse moves to the top of the page
      if (e.clientY <= 0 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    };
    
    // Add event listeners
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggered]);

  const handleClose = () => {
    setIsOpen(false);
    // Set flag in localStorage to not show again for this session
    localStorage.setItem('exitIntentPopupSeen', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email is required",
        description: "Please enter your email to receive your special offer.",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would typically send this to your email service
    console.log('Email submitted:', email);
    
    toast({
      title: "Thank you!",
      description: "Your special offer has been sent to your email.",
    });
    
    setIsOpen(false);
    localStorage.setItem('exitIntentPopupSeen', 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="sm:max-w-md border-0">
        <div className="relative p-6">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 rounded-full p-1 hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          
          {/* Offer content */}
          <div className="text-center mb-6">
            <div className="bg-atomic-orange/10 inline-flex rounded-full p-3 mb-4">
              <span className="font-bold text-atomic-orange">Special Offer</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Wait! Don't Miss Out</h3>
            <p className="text-gray-600">
              Get 10% off your first painting project when you sign up for our newsletter.
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-atomic-orange"
                required
              />
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                type="submit"
                className="w-full py-3 px-4 bg-atomic-orange text-white rounded-lg font-medium hover:bg-atomic-orange/90 transition-colors"
              >
                Get My 10% Discount
              </button>
              
              <button 
                type="button" 
                onClick={handleClose}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                No thanks, I'll pay full price
              </button>
            </div>
          </form>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default ExitIntentPopup;
