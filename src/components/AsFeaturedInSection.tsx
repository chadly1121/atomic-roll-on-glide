import React from 'react';
import { Tv, Newspaper, ExternalLink } from "lucide-react";
import { DOCKSIDE_FEATURE_COUNT, DOCKSIDE_TAG_URL } from '@/data/docksideArticles';

const AsFeaturedInSection = () => {
  return (
    <section 
      id="asseenontv" 
      className="py-16 sm:py-20 relative overflow-hidden bg-background"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-atomic-navy mb-3">
            As Featured In
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-10">
            Roll On Painting is proud to be regularly featured in leading media — from national TV to Muskoka's premier lifestyle magazine.
          </p>

          {/* Two-column media cards */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* HGTV Card */}
            <div className="bg-background border border-border rounded-xl p-6 text-left shadow-sm">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-atomic-orange/10 mb-4">
                <Tv className="h-5 w-5 text-atomic-orange" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-atomic-navy text-lg mb-1">HGTV Canada</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Featured <strong>5 times</strong> on Scott's Vacation House Rules, providing professional painting and wallpapering for Muskoka renovations.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-accent text-xs font-medium text-atomic-navy rounded-full">
                  🎬 5 TV Episodes
                </span>
                <span className="px-3 py-1 bg-accent text-xs font-medium text-atomic-navy rounded-full">
                  📺 Home Network
                </span>
              </div>
            </div>

            {/* Dockside Magazine Card */}
            <div className="bg-background border border-border rounded-xl p-6 text-left shadow-sm">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-atomic-turquoise/10 mb-4">
                <Newspaper className="h-5 w-5 text-atomic-turquoise" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-atomic-navy text-lg mb-1">Dockside Magazine</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Featured <strong>{DOCKSIDE_FEATURE_COUNT} times</strong> in Dockside Magazine, Muskoka's premier lifestyle publication covering cottage living.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-accent text-xs font-medium text-atomic-navy rounded-full">
                  📰 {DOCKSIDE_FEATURE_COUNT} Articles
                </span>
                <a
                  href={DOCKSIDE_TAG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 bg-accent text-xs font-medium text-atomic-turquoise rounded-full hover:bg-atomic-turquoise/10 transition-colors"
                >
                  Read Articles <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AsFeaturedInSection;
