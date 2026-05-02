import React from 'react';
import { Link } from 'react-router-dom';
import { services } from './services/ServicesData';
import { ArrowRight, Phone } from 'lucide-react';

const ServicesSection = () => {
  const primaryServices = services.filter(s => s.slug);
  const secondaryServices = services.filter(s => !s.slug);

  return (
    <section id="services" className="py-16 sm:py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-atomic-navy mb-4">
            Our Services
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg">
            Over 25 years of experience. Featured 5 times on HGTV's Scott's Vacation House Rules.
            $5M insured. WSIB covered. Free Touch Ups for Life on every project.
          </p>
          <div className="mx-auto mt-5 h-1 w-20 bg-atomic-orange rounded-full" />
        </div>

        {/* Primary services — image cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-6">
          {primaryServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                to={`/${service.slug}`}
                className="group relative rounded-xl overflow-hidden border border-border bg-card hover:border-atomic-orange/40 shadow-sm hover:shadow-lg transition-all duration-300"
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
                      <Icon className="w-5 h-5 text-atomic-orange" />
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-atomic-orange transition-colors mb-1.5">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{service.description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-atomic-orange">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
            {secondaryServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  to="/contact"
                  className="group relative rounded-xl overflow-hidden border border-border bg-card hover:border-atomic-orange/40 shadow-sm hover:shadow-lg transition-all duration-300"
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
                        <Icon className="w-5 h-5 text-atomic-orange" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-atomic-orange transition-colors mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{service.description}</p>
                    <span className="inline-flex items-center text-sm font-medium text-atomic-orange">
                      Get a Quote
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}


        {/* Bottom CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 border border-atomic-orange text-atomic-orange px-6 py-2.5 rounded-lg font-medium hover:bg-atomic-orange hover:text-white transition-colors text-sm"
          >
            View Our Portfolio <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-atomic-orange text-white px-6 py-2.5 rounded-lg font-medium hover:bg-atomic-orange/90 transition-colors text-sm"
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
