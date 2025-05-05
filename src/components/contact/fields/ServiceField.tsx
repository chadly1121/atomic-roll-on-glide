
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ServiceFieldProps {
  value: string;
  onValueChange: (value: string) => void;
}

const ServiceField = ({ value, onValueChange }: ServiceFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="service">Service Interested In</Label>
      <Select
        value={value}
        onValueChange={onValueChange}
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
  );
};

export default ServiceField;
