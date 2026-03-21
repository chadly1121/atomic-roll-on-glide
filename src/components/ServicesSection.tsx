
import React from 'react';
import { Link } from 'react-router-dom';
import { services } from './services/ServicesData';
import { ArrowRight, Shield, Star, Tv, Phone } from 'lucide-react';

const ServicesSection = () => {
  // Split into primary (with dedicated pages) and secondary services
  const primaryServices = services.filter(s => s.slug);
  const secondaryServices = services.filter(s => !s.slug);

  return (
    <section id="services" className="py-16 sm:py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-atomic-navy mb-4">
            What We Do
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg">
            Over 25 years of experience. Featured on HGTV's Scott's Vacation House Rules 4 times. 
            $5M insured. WSIB covered. Free Touch Ups for Life on every project.
          </p>
          <div className="mx-auto mt-5 h-1 w-20 bg-atomic-turquoise rounded-full" />
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-12 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-atomic-turquoise" /> $5M Insured</span>
          <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-atomic-turquoise" /> 4.9/5 Google</span>
          <span className="flex items-center gap-1.5"><Tv className="w-4 h-4 text-atomic-turquoise" /> As Seen on HGTV</span>
        </div>
        
        {/* Primary services — large cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-6">
          {primaryServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link 
                key={service.id} 
                to={`/${service.slug}`}
                className="group relative rounded-xl overflow-hidden border border-border bg-card hover:border-atomic-turquoise/40 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="h-44 sm:h-48 overflow-hidden bg-muted relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={192}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <div className="w-9 h-9 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-5 h-5 text-atomic-turquoise" />
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-atomic-turquoise transition-colors mb-1.5">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{service.description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-atomic-turquoise group-hover:text-atomic-orange transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Secondary services — compact row */}
        {secondaryServices.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {secondaryServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  to="/contact"
                  className="group flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-atomic-turquoise/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-atomic-turquoise/10 flex items-center justify-center flex-shrink-0 group-hover:bg-atomic-turquoise/20 transition-colors">
                    <Icon className="w-5 h-5 text-atomic-turquoise" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-atomic-turquoise transition-colors text-sm">
                      {service.title}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">{service.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* GoNano highlight */}
        <div id="gonano" className="scroll-mt-24 rounded-xl bg-atomic-navy text-white overflow-hidden">
          <div className="p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-atomic-turquoise/20 text-atomic-turquoise text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                Specialty Coating
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">GoNano Nanotechnology</h3>
              <p className="text-white/60 text-sm sm:text-base mb-4 max-w-lg">
                Permanent surface protection starting at $0.99/sq ft. Hydrophobic, UV-resistant, eco-friendly. As seen on Dragon's Den.
              </p>
              <Link 
                to="/gonano" 
                className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-6 py-2.5 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors text-sm"
              >
                Explore GoNano <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex items-center gap-4 text-center">
              <div className="px-5 py-3 bg-white/10 rounded-lg">
                <div className="text-2xl font-bold text-atomic-turquoise">$0.99</div>
                <div className="text-xs text-white/50">per sq ft</div>
              </div>
              <div className="px-5 py-3 bg-white/10 rounded-lg">
                <div className="text-2xl font-bold text-atomic-turquoise">10+</div>
                <div className="text-xs text-white/50">year protection</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/portfolio" 
            className="inline-flex items-center gap-2 border border-atomic-turquoise text-atomic-turquoise px-6 py-2.5 rounded-lg font-medium hover:bg-atomic-turquoise hover:text-white transition-colors text-sm"
          >
            View Our Portfolio <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-6 py-2.5 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors text-sm"
          >
            <Phone className="w-4 h-4" />
            Get a Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
