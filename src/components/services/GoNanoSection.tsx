
import React, { useState, useRef, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import { VolumeX, Volume2 } from "lucide-react";

interface GoNanoSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

const GoNanoSection = ({ sectionRef }: GoNanoSectionProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isMuted && videoRef.current) {
          videoRef.current.muted = false;
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isMuted, sectionRef]);

  return (
    <div className="mt-24 pt-16 border-t border-gray-200">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="section-heading">GoNano Products</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          As an authorized dealer and installer of GoNano products, we offer advanced nanotechnology solutions for your surfaces.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-bold text-atomic-navy">Revolutionary Surface Protection</h3>
          <p className="text-gray-600">
            GoNano products use cutting-edge nanotechnology to provide exceptional protection for various surfaces. Their environmentally friendly solutions offer powerful protection against water, stains, UV damage, and more.
          </p>
          <h3 className="text-2xl font-bold text-atomic-navy">Benefits of GoNano:</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
              <div className="mt-1 mr-2 text-atomic-turquoise">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Long-lasting hydrophobic protection</span>
            </li>
            <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
              <div className="mt-1 mr-2 text-atomic-turquoise">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Prevents mold, mildew, and algae growth</span>
            </li>
            <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
              <div className="mt-1 mr-2 text-atomic-turquoise">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Reduces cleaning time and maintenance costs</span>
            </li>
            <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
              <div className="mt-1 mr-2 text-atomic-turquoise">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Non-toxic, environmentally friendly formulations</span>
            </li>
          </ul>
          <a 
            href="https://www.gonano.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-6 inline-block atomic-button-secondary hover:shadow-lg transform transition-transform hover:-translate-y-1"
          >
            <span className="relative z-10">Learn More About GoNano</span>
          </a>
        </div>
        <div className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-fade-in relative flex justify-center">
          <div className="w-3/4 md:w-2/3 lg:w-1/2 aspect-[9/16] rounded-xl overflow-hidden">
            <video 
              ref={videoRef}
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-contain bg-black"
              poster="https://gonano.com/wp-content/uploads/2022/10/beading.jpg"
            >
              <source src="https://res.cloudinary.com/dxqfou8jh/video/upload/v1745874209/No_stress_no_mess_Vertical_Format_lgznrn.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-6 bg-white w-full">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-lg mb-2">Authorized Dealer & Installer</h4>
              <div className="flex items-center gap-2">
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                <Switch
                  checked={!isMuted}
                  onCheckedChange={handleToggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                />
              </div>
            </div>
            <p className="text-gray-600">
              Contact us today to learn how GoNano products can protect your surfaces and add value to your property.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoNanoSection;
