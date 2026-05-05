import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 relative overflow-hidden bg-accent/30">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative mb-6 sm:mb-8 md:mb-12 inline-block">
            About Roll On Painting
            <span className="absolute left-1/4 -bottom-2 sm:-bottom-4 h-1 w-1/2 bg-atomic-orange rounded-full" />
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground px-2">
            We're not just painters — we're craftsmen dedicated to transforming your spaces with precision and care.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 order-2 md:order-1">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-atomic-navy">
                Our <span className="text-atomic-orange">Story</span>
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Serving Muskoka since 1999, Roll On Painting has grown from a small local operation 
                to a trusted name in the painting industry throughout Muskoka, Ontario and surrounding areas. 
                With 25+ years of experience under owner Chad Gilchrist, we've built our reputation on 
                quality workmanship and exceptional customer service.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-atomic-navy">
                Our <span className="text-atomic-orange">Mission</span>
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                We're committed to delivering premium painting services that exceed expectations. 
                Every brush stroke or sprayed product is applied with precision, every surface prepared 
                with care, and every project completed with pride.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {[
                '$5M Insured',
                'WSIB Covered',
                '5x on HGTV',
                'Free Touch Ups for Life'
              ].map((badge) => (
                <span key={badge} className="px-3 py-1.5 bg-atomic-orange/15 text-atomic-navy text-xs font-semibold rounded-full border border-atomic-orange/20">
                  {badge}
                </span>
              ))}
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden h-40 sm:h-56 shadow-lg bg-muted">
                  <img 
                    alt="Professional Interior Painting" 
                    className="w-full h-full object-cover" 
                    src="/lovable-uploads/44c0f726-e327-4bd3-84f8-39856de74304.webp"
                    loading="lazy"
                    width={300}
                    height={224}
                  />
                </div>
                <div className="rounded-xl sm:rounded-2xl overflow-hidden h-28 sm:h-40 shadow-lg bg-muted">
                  <img 
                    alt="Chad and daughter on the job site — Roll On Painting family business" 
                    className="w-full h-full object-cover object-top" 
                    src="/lovable-uploads/about-team-selfie.webp"
                    loading="lazy"
                    width={300}
                    height={160}
                  />
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-10">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden h-28 sm:h-40 shadow-lg bg-muted">
                  <img 
                    alt="Commercial Painting Services" 
                    className="w-full h-full object-cover" 
                    src="/lovable-uploads/033a3727-9412-4815-8892-28a94d347c4b.webp"
                    loading="lazy"
                    width={300}
                    height={160}
                  />
                </div>
                <div className="rounded-xl sm:rounded-2xl overflow-hidden h-40 sm:h-56 shadow-lg bg-muted">
                  <img 
                    alt="Exterior Home Painting" 
                    className="w-full h-full object-cover" 
                    src="/lovable-uploads/dad95b14-ad28-4aab-ab8b-05f9a56458ec.webp"
                    loading="lazy"
                    width={300}
                    height={224}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
