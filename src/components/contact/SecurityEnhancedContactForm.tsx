
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
import { Shield, Clock } from 'lucide-react';
import RateLimitWrapper from './RateLimitWrapper';

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
  honeypot: z.string().max(0, 'Bot detected'), // Hidden field for bot detection
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

const SecurityEnhancedContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
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
    },
  });

  const onSubmit = async (data: FormData, canSubmit: boolean) => {
    if (!canSubmit) {
      toast({
        title: "Rate limit exceeded",
        description: "Please wait before submitting another request.",
        variant: "destructive",
      });
      return;
    }

    // Record attempt for rate limiting
    document.dispatchEvent(new CustomEvent('record-form-attempt'));
    
    setIsSubmitting(true);
    setSubmissionCount(prev => prev + 1);
    
    try {
      // Additional client-side validation
      if (data.honeypot) {
        throw new Error('Bot submission detected');
      }

      // Enhanced input sanitization
      const sanitizedData = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        service: data.service,
        message: data.message.trim(),
      };

      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...sanitizedData,
          submissionId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        },
      });

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      form.reset();
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

              <Button 
                type="submit" 
                className="w-full bg-atomic-orange hover:bg-atomic-orange/90 text-white"
                disabled={isSubmitting || !canSubmit}
              >
                {isSubmitting ? 'Sending Securely...' : 'Send Secure Message'}
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                This form is protected by rate limiting and anti-spam measures.
              </p>
            </form>
          </Form>
        </div>
      )}
    </RateLimitWrapper>
  );
};

export default SecurityEnhancedContactForm;
