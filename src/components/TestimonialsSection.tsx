
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
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-atomic-navy text-white">
      <div className="atomic-circle w-80 h-80 -top-40 right-20 border-atomic-orange/30 animate-spin-slow"></div>
      <div className="atomic-circle w-64 h-64 -bottom-32 left-20 border-atomic-turquoise/40 animate-spin-slow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">What Our Clients Say</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Don't just take our word for it. See what our satisfied clients have to say about our painting services.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/10 backdrop-blur-sm border-0 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="shrink-0">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="rounded-full w-12 h-12 object-cover border-2 border-atomic-turquoise"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-white">{testimonial.name}</h3>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-xs text-gray-300 ml-1">{testimonial.location} • {testimonial.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-200">"{testimonial.content}"</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="relative inset-0 translate-y-0 bg-atomic-turquoise hover:bg-atomic-turquoise/80 border-0" />
              <CarouselNext className="relative inset-0 translate-y-0 bg-atomic-turquoise hover:bg-atomic-turquoise/80 border-0" />
            </div>
          </Carousel>
          
          <div className="mt-10 text-center">
            <a 
              href="https://g.page/r/CTad7LzFXozZEAE/review" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-atomic-turquoise hover:text-atomic-orange transition-colors"
            >
              <MessageSquare className="h-5 w-5" /> 
              <span className="font-semibold">View All Google Reviews</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
