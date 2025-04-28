import React, { useState, useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
const testimonials: Testimonial[] = [{
  id: 1,
  name: "Jacki Hart",
  image: "https://lh3.googleusercontent.com/a/ACg8ocKqLUnuF_yXpnNyqOGYAGYj_2AwyaKdAMbCSx8CCnClhOs=w36-h36-p-rp-mo-br100",
  content: "I never call anyone other than the great team at Roll On Painting - especially for the tough jobs that I can't do myself. They are detail oriented, meticulous on their after care clean up, leave my walls trim and house exterior looking like brand new... They have painted four different homes for me over the past ten years. Chad leads his team with passion, technical expertise and precision. They are second to none.",
  rating: 5,
  location: "Utterson, ON",
  date: "7 months ago"
}, {
  id: 2,
  name: "Randy Hamelin",
  image: "https://lh3.googleusercontent.com/a-/ALV-UjUCalmgg3j3Q6UQtS5s3_r59vl9nqMCM48fGm_XvsZUug=w36-h36-p-rp-mo-br100",
  content: "Chad and his team are amazing! They are always professional, prompt and extremely detail oriented. They do quality work at a very reasonable price. I highly recommend Roll On Painting!",
  rating: 5,
  location: "Utterson, ON",
  date: "a year ago"
}, {
  id: 3,
  name: "Jo Ann Wilson",
  image: "https://lh3.googleusercontent.com/a/ACg8ocI6QjYQCGkZTufo9Cuq7R3d2psXY7OSW00E7P-_qFJl=w36-h36-p-rp-mo-br100",
  content: "Chad and his team of painters are reliable, professional and honest. We have hired them before and will definitely request their services again as needed.",
  rating: 5,
  location: "Utterson, ON",
  date: "a year ago"
}, {
  id: 4,
  name: "Bill Hawley",
  image: "https://lh3.googleusercontent.com/a-/ALV-UjXDn_O1L5gqnq40W40rB3yXnS09KGPXRkZY8q39LTpUsQ=w36-h36-p-rp-mo-br100",
  content: "The roll on painting crew did a outstanding job the attention to detail and the quality of the workmanship is second to none. Thanks guys!",
  rating: 5,
  location: "Utterson, ON",
  date: "a year ago"
}, {
  id: 5,
  name: "Terry Mckay",
  image: "https://lh3.googleusercontent.com/a-/ALV-UjWu6MXQQFw2nIjTioag9ATrbGi7jtvXwkH1GJ7gVuHZlg=w36-h36-p-rp-mo-br100",
  content: "I have been using Roll on Painting for over 20 years. They painted the inside of my house and now they have done the outside. I am impressed with them always! Great clean cut young men who work hard, know their trade. Never would I call anyone else for a painting job.",
  rating: 5,
  location: "Utterson, ON",
  date: "a year ago"
}, {
  id: 6,
  name: "Mark Hazen",
  image: "https://lh3.googleusercontent.com/a/ACg8ocLxkopz6PcgL26eeRIpBANj2by9mLkd71jmuSHX3kI_=w36-h36-p-rp-mo-br100",
  content: "A great local business. Recently repainted our boathouse and did an excellent job. Very professional, punctual and the job was completed on time. Will definitely use again.",
  rating: 5,
  location: "Utterson, ON",
  date: "a year ago"
}];
const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(prev => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };
  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
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
  return <section id="testimonials" className="py-24 relative overflow-hidden bg-atomic-navy text-white">
      <div className="atomic-circle w-80 h-80 -top-40 right-20 border-atomic-orange/30 animate-spin-slow"></div>
      <div className="atomic-circle w-64 h-64 -bottom-32 left-20 border-atomic-turquoise/40 animate-spin-slow"></div>
      
      
    </section>;
};
export default TestimonialsSection;