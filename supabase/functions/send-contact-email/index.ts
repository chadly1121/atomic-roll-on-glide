
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// More restrictive CORS headers - only allow your domain in production
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // TODO: Restrict to your domain in production
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

// HTML sanitization function to prevent XSS
function sanitizeHtml(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation (basic)
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)\.]{10,}$/;
  return phoneRegex.test(phone);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      { 
        status: 405,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        } 
      }
    );
  }

  try {
    const { name, email, phone, service, message }: ContactRequest = await req.json();
    
    // Input validation
    if (!name || !email || !phone || !service) {
      throw new Error("Missing required fields");
    }

    if (!isValidEmail(email)) {
      throw new Error("Invalid email format");
    }

    if (!isValidPhone(phone)) {
      throw new Error("Invalid phone format");
    }

    if (name.length > 100 || message.length > 5000) {
      throw new Error("Input too long");
    }

    // Sanitize all inputs to prevent XSS
    const sanitizedName = sanitizeHtml(name);
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedPhone = sanitizeHtml(phone);
    const sanitizedService = sanitizeHtml(service);
    const sanitizedMessage = sanitizeHtml(message);
    
    // Send email to business
    const businessEmailResponse = await resend.emails.send({
      from: "Roll On Painting <noreply@rollonpainting.com>",
      to: ["info@rollonpainting.com"],
      subject: `New Quote Request: ${sanitizedService}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Phone:</strong> ${sanitizedPhone}</p>
        <p><strong>Service:</strong> ${sanitizedService}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><em>This message was sent from the Roll On Painting website contact form.</em></p>
      `,
    });

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Roll On Painting <noreply@rollonpainting.com>",
      to: [email], // Use original email for sending, not sanitized version
      subject: "We received your message - Roll On Painting",
      html: `
        <h2>Thank you for contacting Roll On Painting!</h2>
        <p>Hi ${sanitizedName},</p>
        <p>We've received your message about <strong>${sanitizedService}</strong> and will get back to you within 24 hours.</p>
        
        <h3>Your Request Details:</h3>
        <p><strong>Service:</strong> ${sanitizedService}</p>
        <p><strong>Message:</strong> ${sanitizedMessage}</p>
        
        <p>If you have any urgent questions, feel free to call us directly.</p>
        
        <p>Best regards,<br>
        The Roll On Painting Team</p>
        
        <hr>
        <p><em>This is an automated confirmation email.</em></p>
      `,
    });

    console.log("Emails sent successfully:", { businessEmailResponse, customerEmailResponse });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully"
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        } 
      }
    );
    
  } catch (error) {
    console.error("Error in send-contact-email function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Failed to send email. Please try again." // Don't expose internal error details
      }),
      { 
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        } 
      }
    );
  }
});
