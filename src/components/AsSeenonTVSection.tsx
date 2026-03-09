import React from 'react';
import { Tv } from "lucide-react";

interface TVFeature {
  id: number;
  networkName: string;
  logo: string;
  seasonEpisode: string;
  date: string;
  url?: string;
}

const tvFeatures: TVFeature[] = [
  {
    id: 1,
    networkName: "Scott's Vacation House Rules",
    logo: "https://www.homenetwork.ca/wp-content/uploads/2023/03/scotts-vacation-house-rules-episode-407-1200x675.jpg",
    seasonEpisode: "Season 6, Episode 7",
    date: "October 2023",
    url: "https://www.homenetwork.ca/scotts-vacation-house-rules/"
  }
];

const AsSeenonTVSection = () => {
  return (
    <section 
      id="asseenontv" 
      className="py-24 relative overflow-hidden bg-atomic-cream"
    >
      {/* Simplified decorative elements */}
      <div className="hidden md:block absolute w-72 h-72 -top-20 right-10 rounded-full border-2 border-atomic-turquoise/20" aria-hidden="true" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading flex items-center justify-center gap-3">
            <Tv className="h-8 w-8 text-atomic-orange" aria-hidden="true" />
            <span>As Seen on TV</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Roll On Painting provided professional painting and wallpapering services for Scott's Vacation House Rules.
          </p>
        </div>
        
        <div className="flex justify-center">
          {tvFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
                <img 
                  src={feature.logo} 
                  alt={feature.networkName}
                  loading="lazy"
                  width={600}
                  height={256}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center">
                  <div className="bg-atomic-turquoise text-white text-xs px-3 py-1 rounded-full">
                    {feature.date}
                  </div>
                  <h3 className="text-white font-bold ml-auto">{feature.networkName}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-lg font-medium text-center mb-4">
                  {feature.seasonEpisode}
                </div>
                <div className="flex items-center justify-center">
                  <a 
                    href={feature.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-atomic-turquoise transition-colors flex items-center gap-2"
                  >
                    <div className="h-8 w-8 rounded-full bg-atomic-navy flex items-center justify-center text-white">
                      <Tv className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <span>Watch on Home Network</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              if (window.location.pathname === '/') {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#contact';
              }
            }}
            className="atomic-button-secondary inline-flex items-center text-center py-3 px-6 rounded-full group"
          >
            <span className="flex items-center">
              <span>Work with Us</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AsSeenonTVSection;
