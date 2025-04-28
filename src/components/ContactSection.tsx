import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleServiceChange = (value: string) => {
    setFormData(prevState => ({
      ...prevState,
      service: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, you would send the form data to your server
    console.log('Form submitted:', formData);
    
    // Show success toast
    toast({
      title: "Quote Request Submitted",
      description: "We'll get back to you within 24 hours!",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-atomic-navy text-white">
      <div className="atomic-starburst w-80 h-80 top-0 right-0 opacity-20"></div>
      <div className="atomic-circle w-72 h-72 -bottom-36 left-10 border-atomic-turquoise/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading text-white">Get In Touch</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Ready to transform your space? Reach out for a free quote or to discuss your project.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white text-atomic-navy p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Request a Quote</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    placeholder="(555) 123-4567" 
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service">Service Interested In</Label>
                  <Select
                    value={formData.service}
                    onValueChange={handleServiceChange}
                  >
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interior">Interior Painting</SelectItem>
                      <SelectItem value="exterior">Exterior Painting</SelectItem>
                      <SelectItem value="commercial">Commercial Painting</SelectItem>
                      <SelectItem value="institutional">Institutional Painting</SelectItem>
                      <SelectItem value="prefinishing">Pre-Finishing</SelectItem>
                      <SelectItem value="cabinet">Cabinet Refinishing</SelectItem>
                      <SelectItem value="deck">Deck & Fence Staining</SelectItem>
                      <SelectItem value="wallpaper">Wallpaper Installation</SelectItem>
                      <SelectItem value="epoxy">Epoxy Coatings</SelectItem>
                      <SelectItem value="washing">Power & Soft Washing</SelectItem>
                      <SelectItem value="gonano">GoNano Products</SelectItem>
                      <SelectItem value="other">Other Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Project Details</Label>
                  <Textarea 
                    id="message" 
                    name="message"
                    placeholder="Tell us about your project..." 
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <button type="submit" className="atomic-button w-full">
                <span className="relative z-10">Submit Request</span>
              </button>
            </form>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 bg-atomic-turquoise/20 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-atomic-turquoise" />
                  </div>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <a href="mailto:info@rollonpainting.com" className="text-atomic-turquoise hover:underline">info@rollonpainting.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 bg-atomic-turquoise/20 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-atomic-turquoise" />
                  </div>
                  <div>
                    <h4 className="font-bold">Phone</h4>
                    <a href="tel:+17057871401" className="text-atomic-turquoise hover:underline">705-787-1401</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 bg-atomic-turquoise/20 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-atomic-turquoise" />
                  </div>
                  <div>
                    <h4 className="font-bold">Location</h4>
                    <p>836 Greer Road, Huntsville, Ontario, Canada</p>
                    <p className="mt-1">Serving Muskoka and surrounding areas</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 bg-atomic-turquoise/20 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-atomic-turquoise" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Working Hours</h4>
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Follow Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/roll_on_painting/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-atomic-turquoise/20 flex items-center justify-center hover:bg-atomic-turquoise/40 transition-colors"
                >
                  <Instagram className="h-6 w-6 text-atomic-turquoise" />
                </a>
                <a 
                  href="https://www.facebook.com/people/Roll-On-Painting-Muskoka/100083040946938/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-atomic-turquoise/20 flex items-center justify-center hover:bg-atomic-turquoise/40 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-atomic-turquoise" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/company/roll-onpainting/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-atomic-turquoise/20 flex items-center justify-center hover:bg-atomic-turquoise/40 transition-colors"
                >
                  <Linkedin className="h-6 w-6 text-atomic-turquoise" />
                </a>
                <a 
                  href="https://g.co/kgs/hH1mnMH" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-atomic-turquoise/20 flex items-center justify-center hover:bg-atomic-turquoise/40 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="h-5 w-5">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-atomic-turquoise/20 space-y-2">
              <h3 className="font-bold text-lg">Why Choose Us?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-atomic-turquoise" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Licensed & Fully Insured</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-atomic-turquoise" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Premium Quality Materials</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-atomic-turquoise" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Satisfaction Guaranteed</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-atomic-turquoise" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Free Detailed Estimates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
