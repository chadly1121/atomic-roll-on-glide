
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { Instagram, Linkedin, Facebook } from 'lucide-react';

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
    <section id="testimonials" className="py-24 relative overflow-hidden bg-background text-foreground">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">What Our Clients Say</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Don't just take our word for it. See what our satisfied clients have to say about our painting services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.slice(0, 6).map((testimonial) => (
            <Card key={testimonial.id} className="bg-muted backdrop-blur-sm border-0 h-full">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-atomic-turquoise flex items-center justify-center border-2 border-atomic-turquoise">
                    <span className="text-foreground font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{testimonial.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
                      <span className="text-xs text-yellow-400 font-medium">5-star Google review</span>
                      <span className="text-xs text-muted-foreground">{testimonial.location} • {testimonial.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <div className="mb-6">
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
          
          {/* Added social media icons below the Google Reviews link */}
          <div className="mt-8 flex justify-center">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0">
              <span className="text-foreground sm:mr-2">Follow Us:</span>
              <div className="flex space-x-6 items-center">
              <a 
                href="https://www.instagram.com/roll_on_painting/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-muted hover:bg-white/20 p-3 rounded-full transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-atomic-turquoise" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=100083040946938" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-muted hover:bg-white/20 p-3 rounded-full transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-atomic-turquoise" />
              </a>
              <a 
                href="https://ca.linkedin.com/in/chad-gilchrist-25332b104" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-muted hover:bg-white/20 p-3 rounded-full transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-atomic-turquoise" />
              </a>
              <a 
                href="https://goo.gl/maps/xwGdHUy9RwYXcGLb9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-muted hover:bg-white/20 p-3 rounded-full transition-all"
                aria-label="Google Maps"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="h-5 w-5 text-atomic-turquoise">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                </svg>
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
