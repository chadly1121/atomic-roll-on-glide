import React, { useState, useEffect, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  content: string;
  rating: number;
  location: string;
  date?: string;
}

// Actual Roll On Painting reviews from Google
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jacki Hart",
    image: "https://lh3.googleusercontent.com/a/ACg8ocKqLUnuF_yXpnNyqOGYAGYj_2AwyaKdAMbCSx8CCnClhOs=w36-h36-p-rp-mo-br100",
    content: "I never call anyone other than the great team at Roll On Painting - especially for the tough jobs that I can't do myself. They are detail oriented, meticulous on their after care clean up, leave my walls trim and house exterior looking like brand new... They have painted four different homes for me over the past ten years. Chad leads his team with passion, technical expertise and precision. They are second to none.",
    rating: 5,
    location: "Utterson, ON",
    date: "7 months ago"
  },
  {
    id: 2,
    name: "Randy Hamelin",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjUCalmgg3j3Q6UQtS5s3_r59vl9nqMCM48fGm_XvsZUug=w36-h36-p-rp-mo-br100",
    content: "Chad and his team are amazing! They are always professional, prompt and extremely detail oriented. They do quality work at a very reasonable price. I highly recommend Roll On Painting!",
    rating: 5,
    location: "Utterson, ON",
    date: "a year ago"
  },
  {
    id: 3,
    name: "Jo Ann Wilson",
    image: "https://lh3.googleusercontent.com/a/ACg8ocI6QjYQCGkZTufo9Cuq7R3d2psXY7OSW00E7P-_qFJl=w36-h36-p-rp-mo-br100",
    content: "Chad and his team of painters are reliable, professional and honest. We have hired them before and will definitely request their services again as needed.",
    rating: 5,
    location: "Utterson, ON",
    date: "a year ago"
  },
  {
    id: 4,
    name: "Bill Hawley",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjXDn_O1L5gqnq40W40rB3yXnS09KGPXRkZY8q39LTpUsQ=w36-h36-p-rp-mo-br100",
    content: "The roll on painting crew did a outstanding job the attention to detail and the quality of the workmanship is second to none. Thanks guys!",
    rating: 5,
    location: "Utterson, ON",
    date: "a year ago"
  },
  {
    id: 5,
    name: "Terry Mckay",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjWu6MXQQFw2nIjTioag9ATrbGi7jtvXwkH1GJ7gVuHZlg=w36-h36-p-rp-mo-br100",
    content: "I have been using Roll on Painting for over 20 years. They painted the inside of my house and now they have done the outside. I am impressed with them always! Great clean cut young men who work hard, know their trade. Never would I call anyone else for a painting job.",
    rating: 5,
    location: "Utterson, ON",
    date: "a year ago"
  },
  {
    id: 6,
    name: "Mark Hazen",
    image: "https://lh3.googleusercontent.com/a/ACg8ocLxkopz6PcgL26eeRIpBANj2by9mLkd71jmuSHX3kI_=w36-h36-p-rp-mo-br100",
    content: "A great local business. Recently repainted our boathouse and did an excellent job. Very professional, punctual and the job was completed on time. Will definitely use again.",
    rating: 5,
    location: "Utterson, ON",
    date: "a year ago"
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
    <section id="testimonials" className="py-24 relative overflow-hidden bg-atomic-navy text-white">
      <div className="atomic-circle w-80 h-80 -top-40 right-20 border-atomic-orange/30 animate-spin-slow"></div>
      <div className="atomic-circle w-64 h-64 -bottom-32 left-20 border-atomic-turquoise/40 animate-spin-slow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading text-white">What Our Clients Say</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Don't just take our word for it - hear from our satisfied customers about their experience with Roll On Painting.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
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
                    <div className="bg-white text-atomic-navy p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-6">
                        <div className="h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-atomic-turquoise shadow-lg">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              // Fallback for broken images
                              (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + testimonial.name.replace(' ', '+') + '&background=0D8ABC&color=fff';
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{testimonial.name}</h3>
                          <p className="text-gray-500 text-sm">{testimonial.location} {testimonial.date && `· ${testimonial.date}`}</p>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i}
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-4 w-4 ${i < testimonial.rating ? 'text-atomic-orange' : 'text-gray-300'} ${
                                  i < testimonial.rating ? 'animate-pulse' : ''
                                }`}
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
                        <p className="text-gray-600 italic">"<span className="animate-scale-in inline-block">{testimonial.content}</span>"</p>
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 h-10 w-10 rounded-full bg-white/30 hover:bg-white/70 flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 h-10 w-10 rounded-full bg-white/30 hover:bg-white/70 flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-3 w-3 rounded-full mx-1 transition-all duration-300 ${
                  activeIndex === index ? 'bg-atomic-turquoise scale-125' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-12">
          <a 
            href="https://www.google.com/maps/place/Roll+On+Painting/@45.2042095,-79.3084404,17z/data=!4m8!3m7!1s0x4d2a81346c7e41b5:0x674c0540cc9af033!8m2!3d45.2042095!4d-79.3084404!9m1!1b1!16s%2Fg%2F11c0w730_g?entry=ttu" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-white text-atomic-navy px-6 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="h-5 w-5 mr-2 group-hover:text-atomic-orange transition-colors">
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
