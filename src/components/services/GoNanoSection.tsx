
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Switch } from "@/components/ui/switch";
import { VolumeX, Volume2, DollarSign, Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { LazyImage } from "@/components/ui/lazy-image";
import GoNanoVideo from "./GoNanoVideo";

interface GoNanoSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

const GoNanoSection = ({ sectionRef }: GoNanoSectionProps) => {

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
            <CardFooter className="flex flex-col gap-4 pb-6">
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname === '/') {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    window.location.href = '/#contact';
                  }
                }}
                className="atomic-button-secondary w-full text-center justify-center"
              >
                <span className="relative z-10">Get a Free Quote</span>
              </a>
              
              {/* Instant Estimate Section */}
              <div className="w-full border-t border-atomic-turquoise/20 pt-4">
                <div className="text-center mb-3">
                  <p className="text-sm font-semibold text-atomic-turquoise uppercase tracking-wide">
                    Get Your Price Now
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Instant online estimate tool - No waiting, no phone calls required
                  </p>
                </div>
                <Link 
                  to="/catalog#gonano"
                  className="atomic-button w-full text-center justify-center bg-gradient-to-r from-atomic-turquoise to-atomic-turquoise/80 hover:from-atomic-turquoise/90 hover:to-atomic-turquoise border-2 border-atomic-turquoise/30 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 block"
                >
                  <span className="relative z-10 font-bold">🚀 Instant Estimate Tool</span>
                </Link>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Calculate your GoNano coating cost instantly
                </p>
              </div>
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
        
        <div className="space-y-6">
          <GoNanoVideo />
        </div>
      </div>
    </div>
  );
};

export default GoNanoSection;
