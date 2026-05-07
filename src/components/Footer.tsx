
import React from 'react';
import { Instagram, Linkedin, Facebook } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { businessInfo } from '@/data/businessInfo';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const element = document.querySelector(sectionId);
      if (element) {
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - 100,
          behavior: 'smooth'
        });
      }
    } else {
      navigate('/' + sectionId);
    }
  };

  return (
    <footer className="bg-background text-foreground py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1: Brand + NAP */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/9058a595-b38f-4cdc-893a-19baaccf57d5.webp" 
                alt="Roll On Painting Logo" 
                className="h-12 w-auto object-contain"
                width={200}
                height={48}
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-muted-foreground mb-4">
              Professional interior and exterior painting services for residential and commercial properties.
            </p>
            <address className="text-muted-foreground not-italic text-sm space-y-1">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-atomic-turquoise flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {businessInfo.address.street}, {businessInfo.address.city}, {businessInfo.address.region}, {businessInfo.address.postalCode}
              </p>
            </address>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">About</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">Services</Link></li>
              <li><Link to="/service-areas" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">Service Areas</Link></li>
              <li><Link to="/portfolio" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">Portfolio</Link></li>
              <li><Link to="/how-we-quote" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">How We Quote</Link></li>
              <li><Link to="/reviews" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">Reviews</Link></li>
              <li><Link to="/catalog" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">Catalog</Link></li>
              <li><Link to="/gonano" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">GoNano Coatings</Link></li>
              <li><Link to="/free-touch-ups" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">Free Touch-Ups</Link></li>
              <li><Link to="/private-client-muskoka-property-care" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">Private Client Program</Link></li>
              <li><Link to="/media" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">Media</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">FAQ</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/interior-painting-muskoka" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">
                  Interior Painting Muskoka
                </Link>
              </li>
              <li>
                <Link to="/cottage-painting-muskoka" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">
                  Cottage Painting Muskoka
                </Link>
              </li>
              <li>
                <Link to="/exterior-painting-muskoka" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">
                  Exterior Painting Muskoka
                </Link>
              </li>
              <li>
                <Link to="/spray-painting-muskoka" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">
                  Spray Painting Muskoka
                </Link>
              </li>
              <li>
                <Link to="/cabinet-painting-muskoka" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">
                  Cabinet Painting Muskoka
                </Link>
              </li>
              <li>
                <Link to="/cabinet-refinishing" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">
                  Cabinet Refinishing
                </Link>
              </li>
              <li>
                <Link to="/deck-staining" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">
                  Deck & Fence Staining
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-bold mt-6 mb-4">For Toronto & GTA Cottage Owners</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/rosedale-muskoka-cottage-painting" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">
                  Rosedale to Muskoka
                </Link>
              </li>
              <li>
                <Link to="/oakville-muskoka-cottage-painting" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">
                  Oakville to Muskoka
                </Link>
              </li>
              <li>
                <Link to="/post-road-muskoka-cottage-painting" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">
                  Post Road to Muskoka
                </Link>
              </li>
              <li>
                <Link to="/private-client-muskoka-property-care" className="text-muted-foreground hover:text-atomic-turquoise transition-colors">
                  Private Client Services
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact + Hours */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-atomic-turquoise" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${businessInfo.email}`} className="text-muted-foreground hover:text-atomic-turquoise transition-colors">
                  {businessInfo.email}
                </a>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-atomic-turquoise" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${businessInfo.phone.tel}`} className="text-muted-foreground hover:text-atomic-turquoise transition-colors">
                  {businessInfo.phone.formatted}
                </a>
              </li>
            </ul>

            {/* Business Hours */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">Business Hours</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>Mon – Fri: 7:00 AM – 5:00 PM</li>
                <li>Saturday: 10:00 AM – 2:00 PM</li>
                <li>Sunday: By appointment only</li>
              </ul>
            </div>

            <div className="mt-6">
              <a 
                href="/contact" 
                className="bg-atomic-turquoise text-white px-6 py-2 rounded-full inline-block hover:bg-atomic-turquoise/80 transition-all hover:-translate-y-1 hover:shadow-md duration-300"
              >
                Start the Conversation
              </a>
            </div>

            {/* Review request — boosts review velocity for SEO */}
            <div className="mt-6 p-4 bg-atomic-orange/10 border border-atomic-orange/20 rounded-lg">
              <h4 className="text-sm font-bold text-atomic-navy mb-1">Worked with us?</h4>
              <p className="text-xs text-muted-foreground mb-3">A 30-second Google review helps neighbours find us.</p>
              <a
                href="https://g.page/r/CRNVBxUKJEU0EAE/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-atomic-orange hover:underline"
              >
                ★ Leave a Google Review →
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} {businessInfo.legalName}. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                WSIB Covered · $5M Liability Insurance · Painting Contractors Association Member
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Serving Muskoka, Port Sydney, Huntsville, Bracebridge, Gravenhurst & surrounding areas
              </p>
            </div>
            <div className="flex space-x-6">
              <a 
                href={businessInfo.urls.instagram}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-atomic-turquoise transition-colors transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href={businessInfo.urls.facebook}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-atomic-turquoise transition-colors transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={businessInfo.urls.linkedinOwner}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-atomic-turquoise transition-colors transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href={businessInfo.urls.googleBusiness}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-atomic-turquoise transition-colors transform hover:scale-110"
                aria-label="Google Business"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="h-5 w-5">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
