
import React, { useState, useRef, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import { VolumeX, Volume2, DollarSign, Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { LazyImage } from "@/components/ui/lazy-image";

interface GoNanoSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

const GoNanoSection = ({ sectionRef }: GoNanoSectionProps) => {
  const [videoError, setVideoError] = useState(false);

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

          {/* GoNano Price Card */}
          <Card className="mt-8 overflow-hidden border-2 border-atomic-turquoise/30 hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-atomic-turquoise/20 to-atomic-turquoise/10">
              <div className="flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-atomic-turquoise" />
                <CardTitle>GoNano Pricing</CardTitle>
              </div>
              <CardDescription>Simple, affordable protection for your surfaces</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold text-atomic-navy">$0.99</span>
                <span className="text-xl font-medium text-atomic-navy/70 ml-1">/ sq. foot</span>
                <span className="text-sm text-gray-500 ml-2">starting from</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-atomic-turquoise" />
                  <span className="text-gray-600">Square footage pricing for all surfaces</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-atomic-turquoise" />
                  <span className="text-gray-600">Custom quotes for complex projects</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-atomic-turquoise" />
                  <span className="text-gray-600">Volume discounts available</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-atomic-turquoise" />
                  <span className="text-gray-600">Includes professional application</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="atomic-button-secondary w-full text-center justify-center"
              >
                <span className="relative z-10">Get a Free Quote</span>
              </a>
            </CardFooter>
          </Card>
          
          <a 
            href="https://www.gonano.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-6 inline-block atomic-button-secondary hover:shadow-lg transform transition-transform hover:-translate-y-1"
          >
            <span className="relative z-10">Learn More About GoNano</span>
          </a>
        </div>
        
        <div className="space-y-6 animate-fade-in">
          {/* YouTube Video */}
          <div className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            {!videoError ? (
              <div className="relative pb-[177.78%] h-0"> {/* 9:16 aspect ratio for YouTube Shorts */}
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/MEwdfRxANKM?autoplay=1&mute=1&loop=1&playlist=MEwdfRxANKM&controls=1&modestbranding=1"
                  title="GoNano Protection Demonstration"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onError={() => setVideoError(true)}
                ></iframe>
              </div>
            ) : (
              <div className="relative pb-[177.78%] h-0 bg-gray-100 flex items-center justify-center">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="text-gray-500 text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <p className="text-lg font-semibold mb-2">Video Currently Unavailable</p>
                    <p className="text-sm">Watch our GoNano demonstration on YouTube</p>
                    <a 
                      href="https://youtube.com/shorts/MEwdfRxANKM" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              </div>
            )}
            <div className="p-6 bg-white">
              <h4 className="font-bold text-lg mb-2">See GoNano in Action</h4>
              <p className="text-gray-600">
                Watch our demonstration of GoNano's incredible protective properties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoNanoSection;
