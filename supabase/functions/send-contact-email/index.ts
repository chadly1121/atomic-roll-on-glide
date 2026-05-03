
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  };
}

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
  ownsCottage?: string;
  cottageLocation?: string;
  propertyType?: string;
  propertyValueRange?: string;
}

interface LeadTagResult {
  tags: string[];
  internalNotes: string;
}

function computeLeadTags(req: ContactRequest): LeadTagResult {
  const tags: string[] = [];
  const notes: string[] = [];

  if (req.ownsCottage === 'Yes') {
    tags.push('Cottage Owner');

    const highValueRanges = ['$3M–$7M', '$7M+'];
    if (req.propertyValueRange && highValueRanges.includes(req.propertyValueRange)) {
      tags.push('Private Client Candidate');
    }

    const muskokaLakes = ['Lake Muskoka', 'Lake Rosseau', 'Lake Joseph'];
    if (req.cottageLocation && muskokaLakes.includes(req.cottageLocation)) {
      notes.push('High-value Muskoka lead – prioritize follow-up');
    }

    if (req.propertyType === 'Luxury / estate property') {
      tags.push('Private Client Candidate');
    }
  }

  // Deduplicate tags
  const uniqueTags = [...new Set(tags)];
  return { tags: uniqueTags, internalNotes: notes.join('; ') };
}

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

async function isRateLimited(ip: string): Promise<boolean> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);
  
  const windowStart = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  
  const { count, error: countError } = await supabase
    .from('edge_function_rate_limits')
    .select('*', { count: 'exact', head: true })
    .eq('ip_address', ip)
    .eq('function_name', 'send-contact-email')
    .gte('attempted_at', windowStart);
  
  if (countError) {
    console.error("Rate limit check error:", countError);
    return false;
  }
  
  if ((count ?? 0) >= 5) {
    return true;
  }
  
  await supabase.from('edge_function_rate_limits').insert({
    ip_address: ip,
    function_name: 'send-contact-email',
  });
  
  if (Math.random() < 0.1) {
    await supabase.rpc('cleanup_rate_limits');
  }
  
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

async function generateSignedUrls(storagePaths: string[]): Promise<string[]> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const signedUrls: string[] = [];
  
  for (const path of storagePaths) {
    if (!isValidStorageUrl(path, supabaseUrl)) {
      console.warn("Rejected non-Supabase attachment URL:", path);
      continue;
    }
    
    const bucketPath = extractStoragePath(path);
    if (!bucketPath) {
      console.warn("Could not extract storage path from:", path);
      continue;
    }
    
    const { data, error } = await supabase.storage
      .from('quote-attachments')
      .createSignedUrl(bucketPath, 60 * 60 * 24 * 7);
    
    if (error) {
      console.error("Error creating signed URL for path:", bucketPath, error);
      continue;
    } else {
      signedUrls.push(data.signedUrl);
    }
  }
  
  return signedUrls;
}

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

function extractStoragePath(url: string): string | null {
  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(/quote-attachments\/(.+)$/);
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    const match = url.split('?')[0].match(/quote-attachments\/(.+)$/);
    return match ? match[1] : null;
  }
}

function generateAttachmentsHtml(attachments: string[], fileNames: string[]): string {
  if (!attachments || attachments.length === 0) return '';

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

function generateCottageInfoHtml(req: ContactRequest, leadResult: LeadTagResult): string {
  if (req.ownsCottage !== 'Yes') return '';

  const tagBadges = leadResult.tags.map(tag => {
    const color = tag === 'Private Client Candidate' ? '#dc2626' : '#f97316';
    return `<span style="display:inline-block;background:${color};color:white;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:bold;margin-right:4px;">${sanitizeHtml(tag)}</span>`;
  }).join('');

  return `
    <div style="margin-top: 24px; padding: 16px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f97316;">
      <h3 style="color: #92400e; margin-bottom: 12px; font-size: 16px;">🏡 Cottage Owner Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 4px 0; font-weight: bold; width: 160px;">Cottage Location:</td><td>${sanitizeHtml(req.cottageLocation || 'Not specified')}</td></tr>
        <tr><td style="padding: 4px 0; font-weight: bold;">Property Type:</td><td>${sanitizeHtml(req.propertyType || 'Not specified')}</td></tr>
        <tr><td style="padding: 4px 0; font-weight: bold;">Property Value:</td><td>${sanitizeHtml(req.propertyValueRange || 'Not specified')}</td></tr>
      </table>
      ${tagBadges ? `<div style="margin-top: 12px;"><strong>Tags:</strong> ${tagBadges}</div>` : ''}
      ${leadResult.internalNotes ? `<div style="margin-top: 8px; padding: 8px; background: #fde68a; border-radius: 4px; font-size: 13px;"><strong>⚡ Note:</strong> ${sanitizeHtml(leadResult.internalNotes)}</div>` : ''}
    </div>
  `;
}

serve(async (req) => {
  const corsHeaders = buildCorsHeaders(req);
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'unknown';
    
    if (await isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({ success: false, error: "Rate limit exceeded. Please wait before submitting again." }),
        { status: 429, headers: { "Content-Type": "application/json", "Retry-After": "900", ...corsHeaders } }
      );
    }

    const contactReq: ContactRequest = await req.json();
    const { 
      name, email, phone, service, message,
      submissionId, userAgent, timestamp,
      attachments, fileNames,
      ownsCottage, cottageLocation, propertyType, propertyValueRange
    } = contactReq;
    
    if (!name || !email || !phone || !service) {
      throw new Error("Missing required fields");
    }
    if (!isValidEmail(email)) throw new Error("Invalid email format");
    if (!isValidPhone(phone)) throw new Error("Invalid phone format");
    if (!isValidName(name)) throw new Error("Invalid name format");
    if (name.length > 100 || message.length > 5000) throw new Error("Input too long");

    const submissionTime = timestamp ? Date.now() - new Date(timestamp).getTime() : undefined;
    if (detectBot(userAgent, submissionTime)) {
      console.log("Bot submission detected:", { userAgent, submissionTime, clientIP });
      throw new Error("Automated submission detected");
    }

    // Compute lead tags
    const leadResult = computeLeadTags(contactReq);

    const sanitizedName = sanitizeHtml(name);
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedPhone = sanitizeHtml(phone);
    const sanitizedService = sanitizeHtml(service);
    const sanitizedMessage = sanitizeHtml(message);
    
    // Generate signed URLs for attachments
    const hasAttachments = attachments && attachments.length > 0;
    let signedAttachmentUrls: string[] = [];
    if (hasAttachments) {
      signedAttachmentUrls = await generateSignedUrls(attachments!);
    }
    
    const attachmentsHtml = generateAttachmentsHtml(signedAttachmentUrls, fileNames || []);
    const cottageInfoHtml = generateCottageInfoHtml(contactReq, leadResult);

    // Save to database with lead tags
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    await supabase.from('quote_requests').insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      service,
      message: message.trim(),
      has_attachments: hasAttachments || false,
      owns_cottage: ownsCottage || null,
      cottage_location: cottageLocation || null,
      property_type: propertyType || null,
      property_value_range: propertyValueRange || null,
      lead_tags: leadResult.tags,
      internal_notes: leadResult.internalNotes || null,
    });
    
    console.log("Processing secure contact form submission:", { 
      submissionId, 
      clientIP, 
      userAgent: userAgent?.substring(0, 100),
      attachmentCount: attachments?.length || 0,
      leadTags: leadResult.tags,
    });

    // Determine email subject with lead tag prefix
    const tagPrefix = leadResult.tags.includes('Private Client Candidate') 
      ? '🔥 PRIVATE CLIENT: '
      : leadResult.tags.includes('Cottage Owner') 
        ? '🏡 COTTAGE OWNER: '
        : '';

    // Add priority follow-up note for Private Client Candidates
    const priorityNote = leadResult.tags.includes('Private Client Candidate')
      ? '\n⚡ PRIORITY: Flag for follow-up within 1–2 hours.'
      : '';
    
    // Send email to business
    const businessEmailResponse = await resend.emails.send({
      from: "Roll On Painting <noreply@rollonpainting.com>",
      to: ["info@roll-onpainting.com"],
      replyTo: "info@roll-onpainting.com",
      subject: `${tagPrefix}New Quote Request: ${sanitizedService}${hasAttachments ? ` (${attachments?.length} files)` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #f97316; padding-bottom: 8px;">New Quote Request</h2>
          ${priorityNote ? `<div style="margin-top: 12px; padding: 10px 14px; background: #fef2f2; border-left: 4px solid #dc2626; font-size: 14px; font-weight: bold; color: #991b1b;">${sanitizeHtml(priorityNote)}</div>` : ''}
          
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
          
          ${cottageInfoHtml}
          
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

    // Determine which confirmation email to send
    const isCottageOwner = ownsCottage === 'Yes';

    const customerSubject = isCottageOwner
      ? 'Your Muskoka Property Request'
      : 'Your Request \u2013 Received';

    const customerHtml = isCottageOwner
      ? `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #111111; background-color: #ffffff;">
          <div style="margin-bottom: 40px;">
            <strong style="font-size: 16px; letter-spacing: 0.5px; color: #111111;">ROLL-ON PAINTING</strong>
          </div>

          <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">We've received your request \u2014 thank you.</p>

          <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">We'll review the details of your property and follow up shortly.</p>

          <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">If applicable, we may also outline a more fully managed approach, where inspections, maintenance planning, and exterior work are handled throughout the season.</p>

          <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">For many clients, this removes the need to coordinate multiple projects or be onsite during the work.</p>

          <p style="font-size: 15px; line-height: 1.7; margin: 0 0 40px;">We'll be in touch shortly.</p>

          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 0 0 24px;" />

          <p style="font-size: 14px; line-height: 1.6; margin: 0 0 24px; color: #111111;">Roll-On Painting</p>

          <p style="font-size: 13px; line-height: 1.6; margin: 0; color: #666666;">P.S. If your timeline is tied to an upcoming visit or season opening, feel free to include that in your reply.</p>
        </div>
      `
      : `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #111111; background-color: #ffffff;">
          <div style="margin-bottom: 40px;">
            <strong style="font-size: 16px; letter-spacing: 0.5px; color: #111111;">ROLL-ON PAINTING</strong>
          </div>

          <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">We've received your request.</p>

          <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">Thank you for reaching out.</p>

          <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">We'll review the details and follow up shortly with next steps.</p>

          <p style="font-size: 15px; line-height: 1.7; margin: 0 0 40px;">In the meantime, no further action is required.</p>

          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 0 0 24px;" />

          <p style="font-size: 14px; line-height: 1.6; margin: 0 0 24px; color: #111111;">Roll-On Painting</p>

          <p style="font-size: 13px; line-height: 1.6; margin: 0; color: #666666;">P.S. If your timeline is tied to an upcoming project date, feel free to include that in your reply.</p>
        </div>
      `;

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Roll On Painting <noreply@rollonpainting.com>",
      replyTo: "info@roll-onpainting.com",
      to: [email],
      subject: customerSubject,
      html: customerHtml,
    });

    console.log("Emails sent successfully:", { 
      businessEmailResponse: businessEmailResponse.id, 
      customerEmailResponse: customerEmailResponse.id,
      submissionId,
      confirmationType: isCottageOwner ? 'cottage-owner' : 'standard',
      attachmentCount: attachments?.length || 0,
      leadTags: leadResult.tags,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully", submissionId }),
      { headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
    
  } catch (error) {
    console.error("Error in send-contact-email function:", error);
    
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send email. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
