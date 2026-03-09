import React from 'react';
import { ExternalLink } from 'lucide-react';

// Use local placeholder images instead of external URLs that may fail
const clients = [
  {
    name: "Davicor Construction",
    website: "https://www.davicor.ca/"
  },
  {
    name: "R&G Construction",
    website: "https://rgconstruction.ca/"
  },
  {
    name: "Riedmann Property Management",
    website: "https://riedmannmanagement.com/"
  },
  {
    name: "Hall Construction",
    website: "https://hallconstructioninc.com/"
  },
  {
    name: "Radius Construction",
    website: "https://radiusconstruction.ca/"
  }
];

const ClientLogos: React.FC = () => {
  return (
    <section className="py-16 bg-atomic-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Trusted by Businesses Across Muskoka</h2>
          <p className="text-muted-foreground mt-2">We're proud to have worked with these amazing clients</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-items-center">
          {clients.map((client, index) => (
            <a
              key={index}
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              aria-label={`Visit ${client.name} website`}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-atomic-turquoise/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-atomic-turquoise">
                    {client.name.charAt(0)}
                  </span>
                </div>
                <div className="flex items-center text-sm font-medium text-foreground">
                  <span className="line-clamp-1">{client.name}</span>
                  <ExternalLink className="h-3 w-3 ml-1 text-atomic-turquoise flex-shrink-0" />
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#contact" 
            className="text-atomic-turquoise font-medium hover:text-atomic-navy transition-colors inline-flex items-center"
            onClick={(e) => {
              e.preventDefault();
              if (window.location.pathname === '/') {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                window.location.href = '/#contact';
              }
            }}
          >
            Join our growing list of satisfied clients
            <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
