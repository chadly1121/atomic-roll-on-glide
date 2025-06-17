
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, message }: ContactRequest = await req.json();
    
    // Send email to business
    const businessEmailResponse = await resend.emails.send({
      from: "Roll On Painting <noreply@rollonpainting.com>",
      to: ["info@rollonpainting.com"],
      subject: `New Quote Request: ${service}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><em>This message was sent from the Roll On Painting website contact form.</em></p>
      `,
    });

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Roll On Painting <noreply@rollonpainting.com>",
      to: [email],
      subject: "We received your message - Roll On Painting",
      html: `
        <h2>Thank you for contacting Roll On Painting!</h2>
        <p>Hi ${name},</p>
        <p>We've received your message about <strong>${service}</strong> and will get back to you within 24 hours.</p>
        
        <h3>Your Request Details:</h3>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
        
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
        error: error.message 
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
