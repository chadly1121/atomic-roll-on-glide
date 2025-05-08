
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
    
    // Send email to company (in a real implementation, this would use an email service)
    // For now, we'll log it for demonstration purposes
    console.log("Sending email to company (info@rollonpainting.com):");
    console.log(companyEmailContent);
    
    // Send confirmation email to client
    console.log(`Sending confirmation email to client (${quoteRequest.email}):`);
    console.log(clientEmailContent);
    
    // In a real implementation, we would use an email service SDK here
    // This is where you'd integrate with services like SendGrid, Amazon SES, etc.
    
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
