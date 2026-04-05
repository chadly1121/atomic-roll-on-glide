import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    const popupSeen = localStorage.getItem('exitIntentPopupSeen');
    if (popupSeen) return;
    
    // Desktop: mouse leaves window
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    };

    // Mobile: trigger after scrolling up significantly (scroll-up intent)
    let lastScrollY = window.scrollY;
    let scrollUpDistance = 0;
    const handleScroll = () => {
      if (hasTriggered) return;
      const currentY = window.scrollY;
      if (currentY < lastScrollY) {
        scrollUpDistance += lastScrollY - currentY;
      } else {
        scrollUpDistance = 0;
      }
      lastScrollY = currentY;
      // Trigger if user scrolls up 300px+ and is near top
      if (scrollUpDistance > 300 && currentY < 200) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasTriggered]);

  const handleClose = () => {
    setIsOpen(false);
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
    
    console.log('Email submitted:', email);
    
    toast({
      title: "Thank you!",
      description: "Your special offer has been sent to your email.",
    });
    
    setIsOpen(false);
    localStorage.setItem('exitIntentPopupSeen', 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="sm:max-w-md border-0 p-0">
        <div className="relative p-6">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 rounded-full p-1 hover:bg-muted"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
          
          <div className="text-center mb-6">
            <div className="bg-atomic-orange/10 inline-flex rounded-full p-3 mb-4">
              <span className="font-bold text-atomic-orange">Special Offer</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Wait! Don't Miss Out</h3>
            <p className="text-muted-foreground">
              Get 10% off your first painting project when you sign up for our newsletter.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-atomic-orange bg-background text-foreground text-base"
                required
              />
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                type="submit"
                className="w-full py-3 px-4 bg-atomic-orange text-white rounded-lg font-medium hover:bg-atomic-orange/90 transition-colors min-h-[44px]"
              >
                Get My 10% Discount
              </button>
              
              <button 
                type="button" 
                onClick={handleClose}
                className="text-sm text-muted-foreground hover:text-foreground min-h-[44px]"
              >
                No thanks, I'll pay full price
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
