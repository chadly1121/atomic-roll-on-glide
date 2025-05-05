
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface MessageFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const MessageField = ({ value, onChange }: MessageFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="message">Project Details</Label>
      <Textarea 
        id="message" 
        name="message"
        placeholder="Tell us about your project..." 
        rows={4}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default MessageField;
