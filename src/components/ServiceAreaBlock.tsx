import React from 'react';
import { MapPin, Phone, Mail, Clock, Shield, CheckCircle } from 'lucide-react';
import { businessInfo } from '@/data/businessInfo';

/**
 * AISO Service Area Block
 * 
 * Machine-readable service area information for AI search engines.
 * Clear, structured content for citation by ChatGPT, Perplexity, etc.
 */
const ServiceAreaBlock: React.FC = () => {
  return (
    <section 
      id="service-area" 
      className="py-12 bg-background"
      aria-labelledby="service-area-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 
              id="service-area-heading"
              className="text-xl sm:text-2xl font-bold text-atomic-navy mb-2"
            >
              Serving Muskoka & Surrounding Areas
            </h2>
            <p className="text-muted-foreground">
              Based in {businessInfo.address.city}, Ontario, Canada
            </p>
          </div>

          {/* Service Area Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Cities Served */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-atomic-turquoise" aria-hidden="true" />
                <h3 className="font-semibold text-atomic-navy">Cities & Regions We Serve</h3>
              </div>
              <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                {businessInfo.serviceArea.cities.map((city, index) => (
                  <li key={index} className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-atomic-turquoise flex-shrink-0" aria-hidden="true" />
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-atomic-navy mb-4">Contact Information</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-atomic-turquoise flex-shrink-0" aria-hidden="true" />
                  <a href={`tel:${businessInfo.phone.tel}`} className="text-atomic-navy hover:text-atomic-turquoise">
                    {businessInfo.phone.formatted}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-atomic-turquoise flex-shrink-0" aria-hidden="true" />
                  <a href={`mailto:${businessInfo.email}`} className="text-atomic-navy hover:text-atomic-turquoise break-all">
                    {businessInfo.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-atomic-turquoise flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-muted-foreground">{businessInfo.address.full}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-atomic-turquoise flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="text-muted-foreground">
                    {businessInfo.hours.formatted.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-atomic-turquoise flex-shrink-0" aria-hidden="true" />
                  <span className="text-muted-foreground">WSIB Covered • $5M Liability Insurance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaBlock;
