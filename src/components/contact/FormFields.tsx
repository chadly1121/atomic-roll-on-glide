
import React from 'react';
import NameField from './fields/NameField';
import EmailField from './fields/EmailField';
import PhoneField from './fields/PhoneField';
import ServiceField from './fields/ServiceField';
import MessageField from './fields/MessageField';

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
      <NameField 
        value={formData.name} 
        onChange={handleChange} 
      />
      
      <EmailField 
        value={formData.email} 
        onChange={handleChange} 
      />
      
      <PhoneField 
        value={formData.phone} 
        onChange={handleChange} 
      />
      
      <ServiceField 
        value={formData.service} 
        onValueChange={handleServiceChange} 
      />
      
      <MessageField 
        value={formData.message} 
        onChange={handleChange} 
      />
    </>
  );
};

export default FormFields;
