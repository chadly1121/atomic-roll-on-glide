import React, { useState, useEffect, useRef } from 'react';

interface Testimonial {
  id: number;
  name: string;
  image: string;
  content: string;
  rating: number;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Lauren Vaage",
    image: "https://lh3.googleusercontent.com/a/ACg8ocLVC6RH6Gd1tBHX_O3OpwhlDqclP4Wve9ZgmSAehb8P=w36-h36-p-rp-mo-br100",
    content: "Roll On did an amazing job on our house interior! High quality and professional work with focus on the details to perfection and extremely clean, tidy and courteous. Project completed on schedule. Great company! Highly recommend Roll On Painting!",
    rating: 5,
    location: "Portland, OR"
  },
  {
    id: 2,
    name: "Sean Syrett",
    image: "https://lh3.googleusercontent.com/a/ACg8ocLAGWiqh_8ROJ_aU_GVQuZiNLL2MUCfD5xI47DCcXnp=w36-h36-p-rp-mo-br100",
    content: "Chad and his crew did a fantastic job painting my house. They were professional, courteous and very meticulous with their work. I would highly recommend Roll On Painting for any painting needs.",
    rating: 5,
    location: "Portland, OR"
  },
  {
    id: 3,
    name: "Tim Neville",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjXJD3sOum6MGFNG7JXAhxYtIokLmMoZuOLNXuDn6Ftp4y8=w36-h36-p-rp-mo-br100",
    content: "Chad was responsive, professional, and delivered quality work at a fair price. His team was efficient and clean, and the paint job came out just as we wanted. I would absolutely hire them again.",
    rating: 5,
    location: "Portland, OR"
  },
  {
    id: 4,
    name: "Anne Gentling",
    image: "https://lh3.googleusercontent.com/a/ACg8ocK4n06_MFZJou0KQ7gbm4l6U85ydvhP4bdl3NHt7fZE=w36-h36-p-rp-mo-br100",
    content: "Chad and his team transformed my house with excellent painting inside and out. They were professional, reliable, and focused on quality work. They did all the prep work needed, thoroughly cleaned up, and the results are beautiful. Highly recommend!",
    rating: 5,
    location: "Portland, OR"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    intervalRef.current = setInterval(nextTestimonial, 6000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeIndex, isAnimating]);

  const handleDotClick = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(nextTestimonial, 6000);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-atomic-navy text-white">
      <div className="atomic-circle w-80 h-80 -top-40 right-20 border-atomic-orange/30"></div>
      <div className="atomic-circle w-64 h-64 -bottom-32 left-20 border-atomic-turquoise/40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading text-white">What Our Clients Say</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Don't just take our word for it - hear from our satisfied customers about their experience with Roll On Painting.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial Cards */}
            <div className="overflow-hidden">
              <div 
                className="transition-transform duration-500 ease-in-out flex"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id}
                    className="min-w-full px-4"
                  >
                    <div className="bg-white text-atomic-navy p-8 rounded-2xl shadow-xl">
                      <div className="flex items-center mb-6">
                        <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{testimonial.name}</h3>
                          <p className="text-gray-500 text-sm">{testimonial.location}</p>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i}
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-4 w-4 ${i < testimonial.rating ? 'text-atomic-orange' : 'text-gray-300'}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <blockquote>
                        <p className="text-gray-600 italic">"{testimonial.content}"</p>
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 h-10 w-10 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center backdrop-blur-sm transition-colors"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 h-10 w-10 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center backdrop-blur-sm transition-colors"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-3 w-3 rounded-full transition-colors ${
                  activeIndex === index ? 'bg-atomic-turquoise' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-12">
          <a 
            href="https://www.google.com/search?q=roll+on+painting+reviews" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-white text-atomic-navy px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="h-5 w-5 mr-2">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
            </svg>
            See All Google Reviews
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
