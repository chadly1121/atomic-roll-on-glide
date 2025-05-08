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
    
    // Get Jobber API credentials from environment variables
    const jobberApiToken = Deno.env.get("JOBBER_API_TOKEN");
    
    if (!jobberApiToken) {
      throw new Error("Jobber API token not found in environment variables");
    }
    
    console.log("Creating new quote request in Jobber via API...");
    
    // Format the data for Jobber's API
    const jobberRequestData = {
      request: {
        client: {
          name: quoteRequest.name,
          email: quoteRequest.email,
          phone: quoteRequest.phone,
        },
        work_request_description: `
Service Requested: ${quoteRequest.service}

${quoteRequest.message || "No additional details provided."}

${quoteRequest.hasAttachments ? "This request includes file attachments. Please check the admin dashboard." : ""}

Quote request ID: ${quoteRequest.id}
        `.trim(),
        title: `Quote Request: ${quoteRequest.service}`,
      }
    };
    
    // Create a request in Jobber (keeping for any programmatic submissions not using the embedded form)
    const jobberResponse = await fetch("https://api.getjobber.com/api/work_requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-VERSION": "2019-04-15",
        "Authorization": `Bearer ${jobberApiToken}`
      },
      body: JSON.stringify(jobberRequestData),
    });
    
    if (!jobberResponse.ok) {
      const errorText = await jobberResponse.text();
      console.error("Jobber API error:", errorText);
      throw new Error(`Failed to create request in Jobber: ${errorText}`);
    }
    
    const jobberResult = await jobberResponse.json();
    console.log("Quote request created in Jobber successfully:", jobberResult);
    
    // Note: Client confirmation is handled directly by Jobber's embedded form
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Quote request created in Jobber successfully",
        jobberRequestId: jobberResult.request?.id
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
