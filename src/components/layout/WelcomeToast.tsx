
import React, { useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

const WelcomeToast: React.FC = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Welcome toast - show after short delay
    const toastTimeout = setTimeout(() => {
      toast({
        title: "Welcome to Roll On Painting",
        description: "Muskoka's premier painting company. Scroll down to explore our services.",
        variant: "default",
        duration: 5000,
      });
    }, 1500);
    
    return () => clearTimeout(toastTimeout);
  }, [toast]);

  return null; // This component doesn't render anything
};

export default WelcomeToast;
