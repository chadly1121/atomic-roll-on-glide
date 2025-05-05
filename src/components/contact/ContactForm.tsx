
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import FormFields from './FormFields';
import FileUploader from './FileUploader';

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
          <FormFields 
            formData={formData}
            handleChange={handleChange}
            handleServiceChange={handleServiceChange}
          />
          
          <FileUploader 
            files={files}
            onFileChange={handleFileChange}
            onRemoveFile={removeFile}
          />
        </div>
        
        <Button 
          type="submit" 
          className="atomic-button w-full flex items-center justify-center gap-2"
        >
          <span className="relative z-10">Request a Free Quote</span>
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
