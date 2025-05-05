
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailField = ({ value, onChange }: EmailFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input 
        id="email" 
        name="email"
        type="email" 
        placeholder="john@example.com" 
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default EmailField;
