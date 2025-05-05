
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NameFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NameField = ({ value, onChange }: NameFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="name">Full Name</Label>
      <Input 
        id="name" 
        name="name"
        placeholder="John Doe" 
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default NameField;
