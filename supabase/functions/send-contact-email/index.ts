
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
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
  attachments?: string[];
  fileNames?: string[];
}

const rateLimitMap = new Map<string, { attempts: number; resetTime: number }>();

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

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
}

function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)\.]{10,20}$/;
  return phoneRegex.test(phone);
}

function isValidName(name: string): boolean {
  const nameRegex = /^[a-zA-Z\s\-'\.]{2,100}$/;
  return nameRegex.test(name);
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { attempts: 1, resetTime: now + (15 * 60 * 1000) });
    return false;
  }
  
  if (userLimit.attempts >= 5) {
    return true;
  }
  
  userLimit.attempts++;
  return false;
}

function detectBot(userAgent?: string, submissionSpeed?: number): boolean {
  if (!userAgent) return false;
  
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i,
    /curl/i, /wget/i, /python-requests/i, /java\//i,
    /headless/i, /phantom/i, /selenium/i
  ];
  
  if (botPatterns.some(pattern => pattern.test(userAgent))) {
    return true;
  }
  
  if (submissionSpeed && submissionSpeed < 500) {
    return true;
  }
  
  return false;
}

function isImageUrl(url: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic'];
  const lowerUrl = url.toLowerCase();
  return imageExtensions.some(ext => lowerUrl.includes(ext));
}

/**
 * Generate signed URLs for attachments stored in the private bucket.
 * Uses the service role key to create short-lived signed URLs (7 days).
 */
async function generateSignedUrls(storagePaths: string[]): Promise<string[]> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  
  const supabase = createClient(supabaseUrl, serviceRoleKey);
  
  const signedUrls: string[] = [];
  
  for (const path of storagePaths) {
    // Validate URL belongs to our Supabase storage — reject external URLs
    if (!isValidStorageUrl(path, supabaseUrl)) {
      console.warn("Rejected non-Supabase attachment URL:", path);
      continue; // skip instead of falling back to raw URL
    }
    
    const bucketPath = extractStoragePath(path);
    if (!bucketPath) {
      console.warn("Could not extract storage path from:", path);
      continue; // skip instead of falling back to raw URL
    }
    
    const { data, error } = await supabase.storage
      .from('quote-attachments')
      .createSignedUrl(bucketPath, 60 * 60 * 24 * 7); // 7 days
    
    if (error) {
      console.error("Error creating signed URL for path:", bucketPath, error);
      continue; // skip instead of falling back to raw URL
    } else {
      signedUrls.push(data.signedUrl);
    }
  }
  
  return signedUrls;
}

/**
 * Validate that a URL belongs to our Supabase storage project.
 * Rejects any external/attacker-controlled URLs.
 */
function isValidStorageUrl(url: string, supabaseUrl: string): boolean {
  try {
    const parsed = new URL(url);
    const supabaseParsed = new URL(supabaseUrl);
    return parsed.hostname === supabaseParsed.hostname &&
           parsed.pathname.includes('/storage/v1/object/') &&
           parsed.pathname.includes('quote-attachments/');
  } catch {
    return false;
  }
}

/**
 * Extract the storage path from a full Supabase storage URL.
 * Input: https://xxx.supabase.co/storage/v1/object/public/quote-attachments/submissionId/file.jpg
 * Output: submissionId/file.jpg
 */
function extractStoragePath(url: string): string | null {
  const match = url.match(/quote-attachments\/(.+)$/);
  return match ? match[1] : null;
}

function generateAttachmentsHtml(attachments: string[], fileNames: string[]): string {
  if (!attachments || attachments.length === 0) {
    return '';
  }

  const attachmentItems = attachments.map((url, index) => {
    const fileName = fileNames?.[index] || `Attachment ${index + 1}`;
    const isImage = isImageUrl(url);
    
    if (isImage) {
      return `
        <div style="margin-bottom: 16px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <a href="${url}" target="_blank" style="display: block;">
            <img src="${url}" alt="${sanitizeHtml(fileName)}" style="max-width: 100%; height: auto; display: block;" />
          </a>
          <div style="padding: 8px 12px; background-color: #f9fafb;">
            <a href="${url}" target="_blank" style="color: #2563eb; text-decoration: none; font-size: 14px;">
              📷 ${sanitizeHtml(fileName)}
            </a>
          </div>
        </div>
      `;
    } else {
      return `
        <div style="margin-bottom: 8px; padding: 12px; background-color: #f9fafb; border-radius: 8px;">
          <a href="${url}" target="_blank" style="color: #2563eb; text-decoration: none; display: flex; align-items: center; gap: 8px;">
            📄 ${sanitizeHtml(fileName)}
          </a>
        </div>
      `;
    }
  }).join('');

  return `
    <div style="margin-top: 24px; padding-top: 24px; border-top: 2px solid #e5e7eb;">
      <h3 style="margin-bottom: 16px; color: #1f2937; font-size: 18px;">📎 Attached Files (${attachments.length})</h3>
      <p style="font-size: 12px; color: #6b7280; margin-bottom: 12px;">Links expire in 7 days.</p>
      ${attachmentItems}
    </div>
  `;
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
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'unknown';
    
    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({ success: false, error: "Rate limit exceeded. Please wait before submitting again." }),
        { 
          status: 429,
          headers: { 
            "Content-Type": "application/json",
            "Retry-After": "900",
            ...corsHeaders
          } 
        }
      );
    }

    const { 
      name, 
      email, 
      phone, 
      service, 
      message, 
      submissionId, 
      userAgent, 
      timestamp,
      attachments,
      fileNames
    }: ContactRequest = await req.json();
    
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

    const submissionTime = timestamp ? Date.now() - new Date(timestamp).getTime() : undefined;
    if (detectBot(userAgent, submissionTime)) {
      console.log("Bot submission detected:", { userAgent, submissionTime, clientIP });
      throw new Error("Automated submission detected");
    }

    const sanitizedName = sanitizeHtml(name);
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedPhone = sanitizeHtml(phone);
    const sanitizedService = sanitizeHtml(service);
    const sanitizedMessage = sanitizeHtml(message);
    
    // Generate signed URLs for attachments (bucket is now private)
    const hasAttachments = attachments && attachments.length > 0;
    let signedAttachmentUrls: string[] = [];
    if (hasAttachments) {
      signedAttachmentUrls = await generateSignedUrls(attachments!);
    }
    
    const attachmentsHtml = generateAttachmentsHtml(signedAttachmentUrls, fileNames || []);
    
    console.log("Processing secure contact form submission:", { 
      submissionId, 
      clientIP, 
      userAgent: userAgent?.substring(0, 100),
      attachmentCount: attachments?.length || 0
    });
    
    // Send email to business
    const businessEmailResponse = await resend.emails.send({
      from: "Roll On Painting <noreply@rollonpainting.com>",
      to: ["info@roll-onpainting.com"],
      subject: `New Quote Request: ${sanitizedService}${hasAttachments ? ` (${attachments?.length} files)` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #f97316; padding-bottom: 8px;">New Quote Request</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 8px 0;">${sanitizedName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb;">${sanitizedEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #2563eb;">${sanitizedPhone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Service:</td>
              <td style="padding: 8px 0;">${sanitizedService}</td>
            </tr>
          </table>
          
          <div style="margin-top: 24px;">
            <h3 style="color: #1f2937; margin-bottom: 8px;">Project Details:</h3>
            <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; white-space: pre-wrap;">
              ${sanitizedMessage.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          ${attachmentsHtml}
          
          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
            <p><strong>Submission ID:</strong> ${submissionId || 'N/A'}</p>
            <p><strong>Client IP:</strong> ${clientIP}</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Roll On Painting <noreply@rollonpainting.com>",
      to: [email],
      subject: "We received your quote request - Roll On Painting",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937;">Thank you for contacting Roll On Painting!</h2>
          <p>Hi ${sanitizedName},</p>
          <p>We've received your quote request for <strong>${sanitizedService}</strong> and will get back to you within 24 hours.</p>
          
          <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin: 24px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Your Request Summary:</h3>
            <p><strong>Service:</strong> ${sanitizedService}</p>
            <p><strong>Message:</strong> ${sanitizedMessage}</p>
            ${hasAttachments ? `<p><strong>Files Uploaded:</strong> ${attachments?.length} file(s)</p>` : ''}
            <p><strong>Reference ID:</strong> ${submissionId || 'N/A'}</p>
          </div>
          
          <p>If you have any urgent questions, feel free to call us directly.</p>
          
          <p>Best regards,<br>
          <strong>The Roll On Painting Team</strong></p>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { 
      businessEmailResponse: businessEmailResponse.id, 
      customerEmailResponse: customerEmailResponse.id,
      submissionId,
      attachmentCount: attachments?.length || 0
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully",
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
    console.error("Error in send-contact-email function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Failed to send email. Please try again." 
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
