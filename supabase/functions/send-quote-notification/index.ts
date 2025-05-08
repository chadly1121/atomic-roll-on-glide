
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers to allow cross-origin requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Interface for the request body
interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  hasAttachments: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const quoteRequest: QuoteRequest = await req.json();
    
    // Create a Supabase client with the auth context of the function
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Compose the message to send to the company
    const companyEmailContent = `
      New Quote Request:
      
      Name: ${quoteRequest.name}
      Email: ${quoteRequest.email}
      Phone: ${quoteRequest.phone}
      Service Requested: ${quoteRequest.service}
      Message: ${quoteRequest.message || "No message provided"}
      
      ${quoteRequest.hasAttachments ? "This request includes file attachments. Please check the admin dashboard." : ""}
      
      Quote request ID: ${quoteRequest.id}
    `;
    
    // Compose the confirmation email for the client
    const clientEmailContent = `
      Dear ${quoteRequest.name},
      
      Thank you for contacting Roll On Painting. We've received your quote request for ${quoteRequest.service} service.
      
      We'll review your information and get back to you within 24-48 hours.
      
      If you have any urgent questions, please call us at (555) 123-4567.
      
      Regards,
      The Roll On Painting Team
    `;
    
    console.log("Attempting to send email to company...");
    
    // Using Formspree's free tier to send emails
    // You'll need to create a free form at formspree.io and replace FORM_ID with your form ID
    const companyEmailResponse = await fetch("https://formspree.io/f/FORM_ID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: quoteRequest.name,
        email: quoteRequest.email,
        phone: quoteRequest.phone,
        service: quoteRequest.service,
        message: companyEmailContent,
        _subject: "New Quote Request from " + quoteRequest.name,
        replyTo: quoteRequest.email
      })
    });
    
    if (!companyEmailResponse.ok) {
      throw new Error(`Failed to send company email: ${await companyEmailResponse.text()}`);
    }
    
    console.log("Company email sent successfully");
    console.log("Attempting to send confirmation email to client...");
    
    // Send confirmation email to client using a separate Formspree form
    // You'll need a second form for client emails
    const clientEmailResponse = await fetch("https://formspree.io/f/ANOTHER_FORM_ID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Roll On Painting",
        email: quoteRequest.email,
        message: clientEmailContent,
        _subject: "Thank You for Your Quote Request - Roll On Painting",
      })
    });
    
    if (!clientEmailResponse.ok) {
      throw new Error(`Failed to send client email: ${await clientEmailResponse.text()}`);
    }
    
    console.log("Client confirmation email sent successfully");
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Notification emails sent successfully" 
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        } 
      }
    );
    
  } catch (error) {
    console.error("Error in send-quote-notification function:", error);
    
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
