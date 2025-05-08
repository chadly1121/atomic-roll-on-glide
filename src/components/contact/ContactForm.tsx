
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import FormFields from './FormFields';
import FileUploader from './FileUploader';
import { supabase } from "@/integrations/supabase/client";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  
  const uploadFilesToStorage = async (quoteId: string) => {
    const uploadedFiles = [];
    
    for (const file of files) {
      // Create a unique path for each file
      const filePath = `${quoteId}/${file.name}`;
      
      const { data, error } = await supabase.storage
        .from('quote_attachments')
        .upload(filePath, file);
        
      if (error) {
        console.error('Error uploading file:', error);
        continue;
      }
      
      uploadedFiles.push(data.path);
    }
    
    return uploadedFiles;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.phone || !formData.service) {
        toast({
          title: "Missing Information",
          description: "Please fill out all required fields.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Insert the quote request into the database
      const { data, error } = await supabase
        .from('quote_requests')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          has_attachments: files.length > 0
        })
        .select();
      
      if (error) {
        throw error;
      }
      
      // If we have files, upload them to storage
      if (files.length > 0 && data && data[0]) {
        const quoteId = data[0].id;
        await uploadFilesToStorage(quoteId);
      }
      
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
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              <span className="relative z-10">Processing...</span>
            </>
          ) : (
            <span className="relative z-10">Request a Free Quote</span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
