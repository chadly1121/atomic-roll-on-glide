
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Clock, Upload, X, Loader2, FileIcon, ImageIcon } from 'lucide-react';
import RateLimitWrapper from './RateLimitWrapper';
import CottageOwnerFields from './fields/CottageOwnerFields';
import PrivateClientWhisper from '@/components/conversion/PrivateClientWhisper';

const formSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(254, 'Email address too long'),
  phone: z.string()
    .min(10, 'Please enter a valid phone number')
    .max(20, 'Phone number too long')
    .regex(/^[\d\s\-\+\(\)\.]+$/, 'Invalid phone number format'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string()
    .min(10, 'Please provide more details about your project')
    .max(5000, 'Message is too long'),
  honeypot: z.string().max(0, 'Bot detected'),
  ownsCottage: z.string().optional(),
  cottageLocation: z.string().optional(),
  cottageLocationOther: z.string().max(200).optional(),
  propertyType: z.string().optional(),
  propertyValueRange: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const services = [
  'Interior Painting',
  'Exterior Painting',
  'Commercial Painting', 
  'Epoxy Flooring',
  'Deck Staining',
  'Pressure Washing',
  'Other'
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_FILES = 10;
const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic',
  'application/pdf', 
  'application/msword', 
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const SecurityEnhancedContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      honeypot: '',
      ownsCottage: '',
      cottageLocation: '',
      cottageLocationOther: '',
      propertyType: '',
      propertyValueRange: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    const validFiles = selectedFiles.filter(file => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type.`,
          variant: "destructive",
        });
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 50MB limit.`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (files.length + validFiles.length > MAX_FILES) {
      toast({
        title: "Too many files",
        description: `Maximum ${MAX_FILES} files allowed.`,
        variant: "destructive",
      });
      return;
    }

    setFiles(prev => [...prev, ...validFiles]);
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (submissionId: string): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${submissionId}/${Date.now()}-${i}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('quote-attachments')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('File upload error:', error);
        throw new Error(`Failed to upload ${file.name}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('quote-attachments')
        .getPublicUrl(data.path);
      
      uploadedUrls.push(publicUrl);
      setUploadProgress(Math.round(((i + 1) / files.length) * 100));
    }

    return uploadedUrls;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const isImageFile = (file: File): boolean => {
    return file.type.startsWith('image/');
  };

  const onSubmit = async (data: FormData, canSubmit: boolean) => {
    if (!canSubmit) {
      toast({
        title: "Rate limit exceeded",
        description: "Please wait before submitting another request.",
        variant: "destructive",
      });
      return;
    }

    document.dispatchEvent(new CustomEvent('record-form-attempt'));
    
    setIsSubmitting(true);
    setSubmissionCount(prev => prev + 1);
    setUploadProgress(0);
    
    try {
      if (data.honeypot) {
        throw new Error('Bot submission detected');
      }

      const submissionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      let fileUrls: string[] = [];
      if (files.length > 0) {
        fileUrls = await uploadFiles(submissionId);
      }

      const cottageLocation = data.cottageLocation === 'Other' 
        ? data.cottageLocationOther || 'Other' 
        : data.cottageLocation;

      const sanitizedData = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        service: data.service,
        message: data.message.trim(),
        ownsCottage: data.ownsCottage || '',
        cottageLocation: cottageLocation || '',
        propertyType: data.propertyType || '',
        propertyValueRange: data.propertyValueRange || '',
      };

      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...sanitizedData,
          submissionId,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          attachments: fileUrls,
          fileNames: files.map(f => f.name),
        },
      });

      if (error) throw error;

      // Fire Google Ads conversion event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          send_to: 'AW-481474558/contact_form_submit',
          value: 1.0,
          currency: 'CAD',
        });
      }

      toast({
        title: "Message sent successfully!",
        description: files.length > 0 
          ? `We'll get back to you within 24 hours. ${files.length} file(s) uploaded.`
          : "We'll get back to you within 24 hours.",
      });
      
      form.reset();
      setFiles([]);
      setSubmissionCount(0);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <RateLimitWrapper maxAttempts={3} windowMs={15 * 60 * 1000}>
      {(canSubmit, resetTime) => (
        <div className="bg-white text-atomic-navy p-4 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-atomic-orange" />
            <h3 className="text-xl md:text-2xl font-bold text-atomic-navy">Secure Contact Form</h3>
          </div>
          
          {!canSubmit && resetTime && (
            <Alert className="mb-6 border-orange-200 bg-orange-50">
              <Clock className="h-4 w-4" />
              <AlertDescription>
                Rate limit exceeded. Please wait {Math.ceil((resetTime - Date.now()) / 60000)} minutes before submitting again.
              </AlertDescription>
            </Alert>
          )}

          {submissionCount > 0 && (
            <Alert className="mb-6 border-blue-200 bg-blue-50">
              <AlertDescription>
                Form submission attempt #{submissionCount}. Multiple rapid submissions may be flagged.
              </AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => onSubmit(data, canSubmit))} className="space-y-4">
              {/* Honeypot field - hidden from users */}
              <FormField
                control={form.control}
                name="honeypot"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input {...field} tabIndex={-1} autoComplete="off" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        {...field} 
                        autoComplete="name"
                        maxLength={100}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        {...field} 
                        autoComplete="email"
                        maxLength={254}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel" 
                        placeholder="Enter your phone number" 
                        {...field} 
                        autoComplete="tel"
                        maxLength={20}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Needed *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cottage Owner Fields */}
              <CottageOwnerFields form={form} />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Details *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your project, timeline, and any specific requirements..."
                        className="min-h-[120px]"
                        {...field}
                        maxLength={5000}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* File Upload Section */}
              <div className="space-y-3">
                <FormLabel>Upload Photos & Documents (Optional)</FormLabel>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-atomic-orange transition-colors">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Upload className="h-8 w-8 text-atomic-turquoise" />
                      <span className="text-sm font-medium">Click to upload or drag and drop</span>
                      <span className="text-xs text-gray-500">
                        Images (JPG, PNG, GIF, WEBP) or Documents (PDF, DOC, DOCX)
                      </span>
                      <span className="text-xs text-gray-400">
                        Max 50MB per file • Up to 10 files
                      </span>
                    </div>
                    <input 
                      type="file" 
                      id="file-upload" 
                      className="sr-only" 
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.gif,.webp,.heic"
                      onChange={handleFileChange}
                      multiple
                      disabled={isSubmitting}
                    />
                  </label>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-atomic-navy">
                      {files.length} file{files.length > 1 ? 's' : ''} selected
                    </p>
                    <ul className="space-y-2 max-h-40 overflow-y-auto">
                      {files.map((file, index) => (
                        <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 min-w-0">
                            {isImageFile(file) ? (
                              <ImageIcon className="h-4 w-4 text-atomic-turquoise flex-shrink-0" />
                            ) : (
                              <FileIcon className="h-4 w-4 text-atomic-orange flex-shrink-0" />
                            )}
                            <span className="text-sm truncate">{file.name}</span>
                            <span className="text-xs text-gray-400 flex-shrink-0">
                              ({formatFileSize(file.size)})
                            </span>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                            disabled={isSubmitting}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Upload Progress */}
                {isSubmitting && files.length > 0 && uploadProgress > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Uploading files...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-atomic-orange h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-atomic-orange hover:bg-atomic-orange/90 text-white"
                disabled={isSubmitting || !canSubmit}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {files.length > 0 ? 'Uploading & Sending...' : 'Sending Securely...'}
                  </>
                ) : (
                  'Send Secure Message'
                )}
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                This form is protected by rate limiting and anti-spam measures.
              </p>
              <PrivateClientWhisper className="text-center" />
            </form>
          </Form>
        </div>
      )}
    </RateLimitWrapper>
  );
};

export default SecurityEnhancedContactForm;
