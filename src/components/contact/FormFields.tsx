
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormFieldsProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleServiceChange: (value: string) => void;
}

const FormFields = ({ formData, handleChange, handleServiceChange }: FormFieldsProps) => {
  return (
    <>
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
    </>
  );
};

export default FormFields;
