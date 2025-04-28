import React, { useState, useRef, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import { VolumeX, Volume2 } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Interior Painting",
    description: "Transform your indoor spaces with our premium interior painting services, featuring expert color consultation and flawless finishes.",
    icon: "🏠",
    image: "https://lh3.googleusercontent.com/p/AF1QipP8f7e4b3580VMrNchHsOiYHeV8hifgA2EZyiqr=w768-h768-n-o-v1"
  },
  {
    id: 2,
    title: "Exterior Painting",
    description: "Enhance your home's curb appeal with our durable exterior painting services that withstand the elements while looking beautiful.",
    icon: "🏡",
    image: "https://lh3.googleusercontent.com/p/AF1QipPutw-6_bXURx63ShkpKm1y3ZLHT-_XrFVOAAZm=w768-h768-n-o-v1"
  },
  {
    id: 3,
    title: "Commercial Painting",
    description: "Update your business space with minimal disruption. Our commercial painting services are efficient, professional, and timely.",
    icon: "🏢",
    image: "https://lh3.googleusercontent.com/p/AF1QipOCxhCQTf67h55TND-LRHa3HJMNmWYISwmTrr4h=w768-h768-n-o-v1"
  },
  {
    id: 4,
    title: "Kitchen Cabinet Refinishing",
    description: "Give your kitchen a fresh look without the full renovation cost. Our cabinet refinishing services provide stunning results.",
    icon: "🪑",
    image: "https://lh3.googleusercontent.com/p/AF1QipMSVJJK54qlLq9k9aHYcC9BJYkV4xtdHFAKxPMZ=w768-h768-n-o-v1"
  },
  {
    id: 5,
    title: "Deck & Fence Staining",
    description: "Protect and beautify your outdoor wooden surfaces with our expert staining services for decks, fences, and more.",
    icon: "🌳",
    image: "https://lh3.googleusercontent.com/p/AF1QipNdJ5dqulNz8LpPgcd-TYcEaf7y0zyUls5poURI=w768-h768-n-o-v1"
  },
  {
    id: 6,
    title: "Institutional Painting",
    description: "Our specialized institutional painting services for schools, hospitals, and government buildings meet all regulatory requirements.",
    icon: "🏫",
    image: "https://lh3.googleusercontent.com/p/AF1QipMJcJv3Pn7RvOWXBFKbCGEU-RW7lepnRvxoJAQi=w1080-h608-p-no-v0"
  },
  {
    id: 7,
    title: "Pre-Finishing",
    description: "Get professional pre-finishing for your new construction materials, ensuring durability and perfect appearance.",
    icon: "🔨",
    image: "https://lh3.googleusercontent.com/p/AF1QipNcZtGKrh3rYrV0wbCdyxM74oi7dXj5lyQ3PwpQ=w768-h768-n-o-v1"
  },
  {
    id: 8,
    title: "Wallpaper Installation",
    description: "Add character and style to your spaces with our professional wallpaper installation services.",
    icon: "🖼️",
    image: "https://lh3.googleusercontent.com/p/AF1QipPl_-jCqoXlOl_Mc8Xk4SaFrIMzRbTsgrKYk9p9=w768-h768-n-o-v1"
  },
  {
    id: 9,
    title: "Epoxy Coatings",
    description: "Durable, attractive epoxy coatings for floors, countertops, and more, with expert application for lasting results.",
    icon: "✨",
    image: "https://lh3.googleusercontent.com/p/AF1QipMh6la7I0gaYKQbVIgl3g0cCs9erhTiIVAfvcQW=w768-h768-n-o-v1"
  },
  {
    id: 10,
    title: "Power & Soft Washing",
    description: "Professional cleaning services to remove dirt, grime, mold, and mildew from your exterior surfaces.",
    icon: "💦",
    image: "https://lh3.googleusercontent.com/p/AF1QipNMowS3FKFpBReXsawTvBaECeRDUKGJzoy8Hsv7=w768-h768-n-o-v1"
  }
];

const ServicesSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const goNanoSectionRef = useRef<HTMLDivElement>(null);

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isMuted && videoRef.current) {
          videoRef.current.muted = false;
        }
      },
      { threshold: 0.5 }
    );

    if (goNanoSectionRef.current) {
      observer.observe(goNanoSectionRef.current);
    }

    return () => {
      if (goNanoSectionRef.current) {
        observer.unobserve(goNanoSectionRef.current);
      }
    };
  }, [isMuted]);

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="atomic-starburst w-72 h-72 top-20 left-20"></div>
      <div className="atomic-circle w-96 h-96 -bottom-48 right-0 border-atomic-turquoise/30 animate-spin-slow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-heading">Our Services</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Professional painting services tailored to your specific needs, delivering quality results that last.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="retro-card group hover-lift transform transition-all duration-500">
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-atomic-turquoise/20 flex items-center justify-center text-2xl mr-3 group-hover:bg-atomic-turquoise/40 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-atomic-turquoise transition-colors">{service.title}</h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
                <a 
                  href="#contact" 
                  className="mt-4 inline-flex items-center text-atomic-turquoise hover:text-atomic-orange font-medium transition-colors group-hover:translate-x-1 transition-transform duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  Get A Quote
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="#contact" 
            className="atomic-button button-pulse"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
          >
            <span className="relative z-10">Request Custom Service</span>
          </a>
        </div>
        
        <div id="gonano" ref={goNanoSectionRef} className="mt-24 pt-16 border-t border-gray-200 scroll-mt-24">
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
              <a 
                href="https://www.gonano.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 inline-block atomic-button-secondary hover:shadow-lg transform transition-transform hover:-translate-y-1"
              >
                <span className="relative z-10">Learn More About GoNano</span>
              </a>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-fade-in relative flex justify-center">
              <div className="w-3/4 md:w-2/3 lg:w-1/2 aspect-[9/16] rounded-xl overflow-hidden">
                <video 
                  ref={videoRef}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-contain bg-black"
                  poster="https://gonano.com/wp-content/uploads/2022/10/beading.jpg"
                >
                  <source src="https://res.cloudinary.com/dxqfou8jh/video/upload/v1745874209/No_stress_no_mess_Vertical_Format_lgznrn.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-6 bg-white w-full">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-lg mb-2">Authorized Dealer & Installer</h4>
                  <div className="flex items-center gap-2">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    <Switch
                      checked={!isMuted}
                      onCheckedChange={handleToggleMute}
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    />
                  </div>
                </div>
                <p className="text-gray-600">
                  Contact us today to learn how GoNano products can protect your surfaces and add value to your property.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
