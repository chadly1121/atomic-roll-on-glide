import React from 'react';
import { Tv } from "lucide-react";

const AsSeenonTVSection = () => {
  return (
    <section 
      id="asseenontv" 
      className="py-16 sm:py-20 relative overflow-hidden bg-accent/30"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-atomic-orange/10 mb-5">
            <Tv className="h-7 w-7 text-atomic-orange" aria-hidden="true" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-atomic-navy mb-4">
            As Seen on HGTV
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-6">
            Roll On Painting has been Roll On Painting has been featured <strong>5 times</strong> on Scott's Vacation House Rules, on Scott's Vacation House Rules, 
            providing professional painting and wallpapering services for Muskoka property renovations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium text-atomic-navy">
              🎬 5 TV Appearances
            </span>
            <span className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium text-atomic-navy">
              📺 Scott's Vacation House Rules
            </span>
            <span className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium text-atomic-navy">
              🏠 HGTV Canada
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AsSeenonTVSection;
