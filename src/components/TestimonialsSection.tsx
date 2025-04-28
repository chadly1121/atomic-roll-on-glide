
import React, { useState, useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  content: string;
  rating: 5;
  location: string;
  date?: string;
}

// Updated Roll On Painting reviews from Google
const testimonials: Testimonial[] = [{
  id: 1,
  name: "Jacki Hart",
  image: "https://lh3.googleusercontent.com/a/ACg8ocKqLUnuF_yXpnNyqOGYAGYj_2AwyaKdAMbCSx8CCnClhOs=w36-h36-p-rp-mo-br100",
  content: "I never call anyone other than the great team at Roll On Painting - especially for the tough jobs that I can't do myself. They are detail oriented, meticulous on their after care clean up, leave my walls trim and house exterior looking like brand new... They have painted four different homes for me over the past ten years. Chad leads his team with passion, technical expertise and precision. They are second to none.",
  rating: 5,
  location: "Bracebridge, ON",
  date: "7 months ago"
}, {
  id: 2,
  name: "David Tattle",
  image: "https://lh3.googleusercontent.com/a-/ALV-UjUCalmgg3j3Q6UQtS5s3_r59vl9nqMCM48fGm_XvsZUug=w36-h36-p-rp-mo-br100",
  content: "Chad and his team went the extra mile at every turn. They provide a high quality product and they are a pleasure having them in your home! Highly recommend!!!!!",
  rating: 5,
  location: "Gravenhurst, ON",
  date: "a year ago"
}, {
  id: 3,
  name: "John Chapman",
  image: "https://lh3.googleusercontent.com/a/ACg8ocI6QjYQCGkZTufo9Cuq7R3d2psXY7OSW00E7P-_qFJl=w36-h36-p-rp-mo-br100",
  content: "Chad and all the Roll On crew were knowledgeable efficient and courteous! The amount of moss algae and accumulated pine needles over the last 20 years was considerable and ugly. After four days of effort our roof is almost new again! We wholeheartedly recommend Roll On",
  rating: 5,
  location: "Port Carling, ON",
  date: "41 weeks ago"
}, {
  id: 4,
  name: "Leo Ciccone",
  image: "https://lh3.googleusercontent.com/a/ACg8ocI6QjYQCGkZTufo9Cuq7R3d2psXY7OSW00E7P-_qFJl=w36-h36-p-rp-mo-br100",
  content: "Great job, had whole exterior of cottage and garage done. They came when they said they would, neat and tidy, would highly recommend.",
  rating: 5,
  location: "Huntsville, ON",
  date: "Jan 24, 2024"
}, {
  id: 5,
  name: "Ray Rahni",
  image: "https://lh3.googleusercontent.com/a/ACg8ocI6QjYQCGkZTufo9Cuq7R3d2psXY7OSW00E7P-_qFJl=w36-h36-p-rp-mo-br100",
  content: "I'm a painting contractor in New York and have known Chad throughout the years in our trade association and other professional business organizations we both belong to. I've come to know and trust him as a skillful craftsman and someone you can count on when it comes to anything painting or staining. He's been always willing to share his knowledge with others in regards to wood preservation, staining, and painting. I won't hesitate to recommend Roll on Painting to anyone looking to hire professional company for their next interior or exterior painting.",
  rating: 5,
  location: "New York",
  date: "Jan 28, 2023"
}, {
  id: 6,
  name: "Steve Warren",
  image: "https://lh3.googleusercontent.com/a/ACg8ocI6QjYQCGkZTufo9Cuq7R3d2psXY7OSW00E7P-_qFJl=w36-h36-p-rp-mo-br100",
  content: "Chad is very professional and gets the job done right.",
  rating: 5,
  location: "Muskoka, ON",
  date: "Jan 26, 2023"
}, {
  id: 7,
  name: "Mike Jensen",
  image: "https://lh3.googleusercontent.com/a/ACg8ocI6QjYQCGkZTufo9Cuq7R3d2psXY7OSW00E7P-_qFJl=w36-h36-p-rp-mo-br100",
  content: "It was a pleasure having Chad and his team to our cottage this winter. Price was fair, quality was high and we definitely have Roll-On back for our future painting needs. Mike & Kelly Jensen",
  rating: 5,
  location: "Muskoka, ON",
  date: "Jan 26, 2023"
}, {
  id: 8,
  name: "Steve McCaig",
  image: "https://lh3.googleusercontent.com/a/ACg8ocI6QjYQCGkZTufo9Cuq7R3d2psXY7OSW00E7P-_qFJl=w36-h36-p-rp-mo-br100",
  content: "Roll-On-Painting is a one shop stop business. Chad and team are amazing, painting is not the only thing they do, ask, they do more than that. If not, he knows a guy/gal that does. Highly-qualified, highly recommend. Steve",
  rating: 5,
  location: "Parry Sound, ON",
  date: "Jan 26, 2023"
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
