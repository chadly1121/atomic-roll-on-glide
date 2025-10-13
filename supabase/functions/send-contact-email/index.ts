
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Enhanced CORS headers with security headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // TODO: Restrict to your domain in production
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  submissionId?: string;
  userAgent?: string;
  timestamp?: string;
}

// Rate limiting storage (in production, use Redis or similar)
const rateLimitMap = new Map<string, { attempts: number; resetTime: number }>();

// Enhanced HTML sanitization function to prevent XSS
function sanitizeHtml(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/\\/g, '&#x5C;')
    .replace(/`/g, '&#x60;');
}

// Enhanced email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Enhanced phone validation
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)\.]{10,20}$/;
  return phoneRegex.test(phone);
}

// Name validation to prevent malicious input
function isValidName(name: string): boolean {
  const nameRegex = /^[a-zA-Z\s\-'\.]{2,100}$/;
  return nameRegex.test(name);
}

// Rate limiting function
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { attempts: 1, resetTime: now + (15 * 60 * 1000) }); // 15 minutes
    return false;
  }
  
  if (userLimit.attempts >= 5) { // Max 5 attempts per 15 minutes
    return true;
  }
  
  userLimit.attempts++;
  return false;
}

// Detect potential bot submissions
function detectBot(userAgent?: string, submissionSpeed?: number): boolean {
  if (!userAgent) return true;
  
  // Check for common bot patterns
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i,
    /curl/i, /wget/i, /python/i, /java/i
  ];
  
  if (botPatterns.some(pattern => pattern.test(userAgent))) {
    return true;
  }
  
  // Check submission speed (if submitted too fast, likely a bot)
  if (submissionSpeed && submissionSpeed < 3000) { // Less than 3 seconds
    return true;
  }
  
  return false;
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
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'unknown';
    
    // Check rate limiting
    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({ success: false, error: "Rate limit exceeded. Please wait before submitting again." }),
        { 
          status: 429,
          headers: { 
            "Content-Type": "application/json",
            "Retry-After": "900", // 15 minutes
            ...corsHeaders
          } 
        }
      );
    }

    const { name, email, phone, service, message, submissionId, userAgent, timestamp }: ContactRequest = await req.json();
    
    // Enhanced input validation
    if (!name || !email || !phone || !service) {
      throw new Error("Missing required fields");
    }

    if (!isValidEmail(email)) {
      throw new Error("Invalid email format");
    }

    if (!isValidPhone(phone)) {
      throw new Error("Invalid phone format");
    }

    if (!isValidName(name)) {
      throw new Error("Invalid name format");
    }

    if (name.length > 100 || message.length > 5000) {
      throw new Error("Input too long");
    }

    // Bot detection
    const submissionTime = timestamp ? Date.now() - new Date(timestamp).getTime() : undefined;
    if (detectBot(userAgent, submissionTime)) {
      console.log("Bot submission detected:", { userAgent, submissionTime, clientIP });
      throw new Error("Automated submission detected");
    }

    // Sanitize all inputs to prevent XSS
    const sanitizedName = sanitizeHtml(name);
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedPhone = sanitizeHtml(phone);
    const sanitizedService = sanitizeHtml(service);
    const sanitizedMessage = sanitizeHtml(message);
    
    console.log("Processing secure contact form submission:", { 
      submissionId, 
      clientIP, 
      userAgent: userAgent?.substring(0, 100) 
    });
    
    // Send email to business (leonardo@roll-onpainting.com)
    const businessEmailResponse = await resend.emails.send({
      from: "Roll On Painting <noreply@rollonpainting.com>",
      to: ["leonardo@roll-onpainting.com"],
      subject: `New Secure Quote Request: ${sanitizedService}`,
      html: `
        <h2>New Secure Quote Request</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Phone:</strong> ${sanitizedPhone}</p>
        <p><strong>Service:</strong> ${sanitizedService}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><strong>Security Information:</strong></p>
        <p><strong>Submission ID:</strong> ${submissionId || 'N/A'}</p>
        <p><strong>Client IP:</strong> ${clientIP}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        
        <hr>
        <p><em>This message was sent from the Roll On Painting secure contact form with enhanced security measures.</em></p>
      `,
    });

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Roll On Painting <noreply@rollonpainting.com>",
      to: [email], // Use original email for sending
      subject: "We received your secure message - Roll On Painting",
      html: `
        <h2>Thank you for contacting Roll On Painting!</h2>
        <p>Hi ${sanitizedName},</p>
        <p>We've securely received your message about <strong>${sanitizedService}</strong> and will get back to you within 24 hours.</p>
        
        <h3>Your Request Details:</h3>
        <p><strong>Service:</strong> ${sanitizedService}</p>
        <p><strong>Message:</strong> ${sanitizedMessage}</p>
        <p><strong>Reference ID:</strong> ${submissionId || 'N/A'}</p>
        
        <p>If you have any urgent questions, feel free to call us directly.</p>
        
        <p>Best regards,<br>
        The Roll On Painting Team</p>
        
        <hr>
        <p><em>This is an automated confirmation email from our secure contact system.</em></p>
      `,
    });

    console.log("Secure emails sent successfully:", { 
      businessEmailResponse: businessEmailResponse.id, 
      customerEmailResponse: customerEmailResponse.id,
      submissionId 
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Secure email sent successfully",
        submissionId
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        } 
      }
    );
    
  } catch (error) {
    console.error("Error in secure send-contact-email function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Failed to send secure email. Please try again." 
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
