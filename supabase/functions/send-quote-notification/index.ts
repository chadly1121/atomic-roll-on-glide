
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const allowedOrigins = [
  "https://www.roll-onpainting.com",
  "https://roll-onpainting.com",
  "http://localhost:8080",
  "http://localhost:5173",
  "http://localhost:3000",
];

function buildCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") || "";
  const isLovablePreview = /^https:\/\/[a-z0-9-]+\.lovable\.app$/.test(origin);
  const allowOrigin =
    allowedOrigins.includes(origin) || isLovablePreview
      ? origin
      : "https://www.roll-onpainting.com";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

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

serve(async (req) => {
  const corsHeaders = buildCorsHeaders(req);
  // Handle CORS preflight requests
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
    // Parse the request body
    const quoteRequest: QuoteRequest = await req.json();
    
    // Input validation
    if (!quoteRequest.name || !quoteRequest.email || !quoteRequest.phone || !quoteRequest.service) {
      throw new Error("Missing required fields");
    }

    if (!isValidEmail(quoteRequest.email)) {
      throw new Error("Invalid email format");
    }

    if (quoteRequest.name.length > 100 || quoteRequest.message.length > 5000) {
      throw new Error("Input too long");
    }

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
    
    // Sanitize inputs for Jobber API
    const sanitizedName = sanitizeHtml(quoteRequest.name);
    const sanitizedService = sanitizeHtml(quoteRequest.service);
    const sanitizedMessage = sanitizeHtml(quoteRequest.message || '');
    
    // Format the data for Jobber's API
    const jobberRequestData = {
      request: {
        client: {
          name: sanitizedName,
          email: quoteRequest.email, // Use original email for API calls
          phone: quoteRequest.phone,
        },
        work_request_description: `
Service Requested: ${sanitizedService}

${sanitizedMessage || "No additional details provided."}

${quoteRequest.hasAttachments ? "This request includes file attachments. Please check the admin dashboard." : ""}

Quote request ID: ${quoteRequest.id}
        `.trim(),
        title: `Quote Request: ${sanitizedService}`,
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
      throw new Error(`Failed to create request in Jobber`);
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
        error: "Failed to process quote request. Please try again." // Don't expose internal error details
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
