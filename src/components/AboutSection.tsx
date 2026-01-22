import React from 'react';
import { Instagram, Linkedin, MapPin, Phone, Mail, Facebook } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 relative overflow-hidden bg-accent/30">
      {/* Decorative elements removed for performance */}
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative mb-6 sm:mb-8 md:mb-12 inline-block">
            About Roll On Painting Muskoka
            <span className="absolute left-1/4 -bottom-2 sm:-bottom-4 h-1 w-1/2 bg-atomic-orange rounded-full" />
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 px-2">
            We're not just painters - we're craftsmen dedicated to transforming your spaces with precision and care.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 order-2 md:order-1">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-atomic-navy">
                Our <span className="text-atomic-turquoise">Story</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-600">Purchased by Chad Gilchrist in 2014, Roll On Painting has grown from a small local operation to a trusted name in the painting industry throughout Muskoka, Ontario and surrounding areas. With over 25 years of experience, we've built our reputation on quality workmanship and exceptional customer service.</p>
            </div>
            
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-atomic-navy">
                Our <span className="text-atomic-orange">Mission</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-600">We're committed to delivering premium painting services that exceed expectations. Every brush stroke or sprayed product is applied with precision, every surface prepared with care, and every project completed with pride.</p>
            </div>
            
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-atomic-navy">
                Our <span className="text-atomic-coral">Values</span>
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-600">
                {[
                  { title: 'Quality', desc: "We never compromise on materials or techniques" },
                  { title: 'Integrity', desc: "Honest pricing and transparent communication" },
                  { title: 'Reliability', desc: "We show up on time and complete projects as promised" },
                  { title: 'Team', desc: "We work together as a cohesive unit to deliver exceptional results" }
                ].map((item) => (
                  <li key={item.title} className="flex items-start">
                    <div className="mt-0.5 sm:mt-1 mr-2 text-atomic-turquoise flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base"><strong>{item.title}:</strong> {item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 sm:mt-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-atomic-navy">
                Connect <span className="text-atomic-orange">With Us</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-atomic-turquoise flex-shrink-0" aria-hidden="true" />
                  <p className="text-sm sm:text-base text-gray-600">836 Greer Road, Port Sydney, Ontario, Canada</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-atomic-turquoise flex-shrink-0" aria-hidden="true" />
                  <a href="tel:+17057871401" className="text-sm sm:text-base text-gray-600 hover:text-atomic-orange transition-colors py-1">705-787-1401</a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-atomic-turquoise flex-shrink-0" aria-hidden="true" />
                  <a href="mailto:leonardo@roll-onpainting.com" className="text-sm sm:text-base text-gray-600 hover:text-atomic-orange transition-colors py-1 break-all">leonardo@roll-onpainting.com</a>
                </div>
                {/* Social links with touch-friendly sizing */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {[
                    { href: "https://www.instagram.com/roll_on_painting/", label: "Instagram", icon: Instagram },
                    { href: "https://www.facebook.com/people/Roll-On-Painting-Muskoka/100083040946938/", label: "Facebook", icon: Facebook },
                    { href: "https://www.linkedin.com/company/roll-onpainting/", label: "LinkedIn", icon: Linkedin },
                  ].map((social) => (
                    <a 
                      key={social.label}
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-atomic-turquoise flex items-center justify-center hover:bg-atomic-turquoise/80 transition-colors active:scale-95"
                      aria-label={`Follow us on ${social.label}`}
                    >
                      <social.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                    </a>
                  ))}
                  <a 
                    href="https://g.co/kgs/hH1mnMH" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-atomic-turquoise flex items-center justify-center hover:bg-atomic-turquoise/80 transition-colors active:scale-95"
                    aria-label="View our Google Business Profile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden h-40 sm:h-56 shadow-lg bg-muted">
                  <img 
                    alt="Professional Interior Painting" 
                    className="w-full h-full object-cover" 
                    src="/lovable-uploads/44c0f726-e327-4bd3-84f8-39856de74304.png"
                    loading="lazy"
                    width={300}
                    height={224}
                  />
                </div>
                <div className="rounded-xl sm:rounded-2xl overflow-hidden h-28 sm:h-40 shadow-lg bg-muted">
                  <img 
                    alt="Quality Craftsmanship" 
                    className="w-full h-full object-cover" 
                    src="/lovable-uploads/8eb8d5ba-169c-496d-be2a-d7f9cf241058.png"
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
                    src="/lovable-uploads/033a3727-9412-4815-8892-28a94d347c4b.png"
                    loading="lazy"
                    width={300}
                    height={160}
                  />
                </div>
                <div className="rounded-xl sm:rounded-2xl overflow-hidden h-40 sm:h-56 shadow-lg bg-muted">
                  <img 
                    alt="Exterior Home Painting" 
                    className="w-full h-full object-cover" 
                    src="/lovable-uploads/dad95b14-ad28-4aab-ab8b-05f9a56458ec.png"
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
