
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PhoneFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneField = ({ value, onChange }: PhoneFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number</Label>
      <Input 
        id="phone" 
        name="phone"
        placeholder="(555) 123-4567" 
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default PhoneField;
