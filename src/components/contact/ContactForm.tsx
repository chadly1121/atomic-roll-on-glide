
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  
  const [files, setFiles] = useState<File[]>([]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      
      toast({
        title: "Files Uploaded",
        description: `${newFiles.length} file(s) have been attached to your request.`,
      });
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
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
    console.log('Files attached:', files);
    
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
    setFiles([]);
  };

  return (
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
            <Label htmlFor="plans">Upload Your Plans and/or Pictures</Label>
            <div className="flex items-center gap-2">
              <label htmlFor="plans" className="flex-1">
                <div className="border border-gray-300 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Upload className="h-5 w-5 text-atomic-turquoise" />
                  <span>Choose files...</span>
                </div>
                <input 
                  type="file" 
                  id="plans" 
                  className="sr-only" 
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  multiple
                />
              </label>
              <Button 
                type="button" 
                variant="upload"
                onClick={() => document.getElementById('plans')?.click()}
              >
                Upload
              </Button>
            </div>
            <p className="text-xs text-gray-500">Upload blueprints, plans or photos (PDF, DOC, PNG, JPG)</p>
            
            {/* Display uploaded files */}
            {files.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium mb-2">Uploaded files:</p>
                <ul className="space-y-1 max-h-32 overflow-y-auto border border-gray-200 rounded-md p-2">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between text-sm p-1 bg-gray-50 rounded">
                      <span className="truncate max-w-[200px]">{file.name}</span>
                      <button 
                        type="button" 
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
  );
};

export default ContactForm;
