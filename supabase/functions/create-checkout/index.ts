import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { Resend } from "npm:resend@2.0.0";

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
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Vary": "Origin",
  };
}

serve(async (req) => {
  const corsHeaders = buildCorsHeaders(req);
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { priceId, serviceName, customerName, customerEmail, customerPhone, jobsiteAddress, quantity } =
      await req.json();

    if (!priceId || !serviceName || !customerName || !customerEmail || !customerPhone) {
      throw new Error("Missing required fields");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check for existing Stripe customer
    const customers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Find or create the 13% HST tax rate
    let hstTaxRateId: string | undefined;
    const existingTaxRates = await stripe.taxRates.list({ limit: 100, active: true });
    const hstRate = existingTaxRates.data.find(
      (tr) => tr.percentage === 13 && tr.display_name === "HST" && tr.inclusive === false
    );
    if (hstRate) {
      hstTaxRateId = hstRate.id;
    } else {
      const newRate = await stripe.taxRates.create({
        display_name: "HST",
        description: "Harmonized Sales Tax (Ontario)",
        percentage: 13,
        inclusive: false,
        jurisdiction: "CA",
        country: "CA",
      });
      hstTaxRateId = newRate.id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : customerEmail,
      line_items: [{ price: priceId, quantity: quantity || 1, tax_rates: [hstTaxRateId] }],
      mode: "payment",
      metadata: {
        customerName,
        customerPhone,
        jobsiteAddress: jobsiteAddress || "",
        serviceName,
      },
      success_url: `${req.headers.get("origin")}/payment-success?service=${encodeURIComponent(serviceName)}`,
      cancel_url: `${req.headers.get("origin")}/catalog`,
    });

    // Send confirmation email to customer
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    await resend.emails.send({
      from: "Roll On Painting <noreply@rollonpainting.com>",
      to: [customerEmail],
      subject: `Booking Confirmed — ${serviceName} | Roll On Painting`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #f97316; padding-bottom: 8px;">
            Thank You for Your Booking!
          </h2>
          <p>Hi ${customerName},</p>
          <p>We've received your payment for <strong>${serviceName}</strong> at <strong>${jobsiteAddress || "your location"}</strong>. A member of our team will be in touch shortly to schedule your appointment.</p>
          <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin: 24px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">What happens next?</h3>
            <ol style="color: #374151; line-height: 1.8;">
              <li>Our team reviews your booking</li>
              <li>We'll contact you within 24 hours to schedule</li>
              <li>We confirm the date & time that works for you</li>
            </ol>
          </div>
          <p>If you have any questions in the meantime, feel free to call or email us.</p>
          <p>Best regards,<br><strong>The Roll On Painting Team</strong></p>
        </div>
      `,
    });

    // Send notification email to team
    await resend.emails.send({
      from: "Roll On Painting <noreply@rollonpainting.com>",
      to: ["chad@roll-onpainting.com", "leonardo@roll-onpainting.com"],
      subject: `💰 New Booking: ${serviceName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #22c55e; padding-bottom: 8px;">
            New Paid Booking Received!
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">Service:</td>
              <td style="padding: 8px 0;">${serviceName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Name:</td>
              <td style="padding: 8px 0;">${customerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${customerEmail}">${customerEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 8px 0;"><a href="tel:${customerPhone}">${customerPhone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Jobsite:</td>
              <td style="padding: 8px 0;">${jobsiteAddress || "Not provided"}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background-color: #fef3c7; border-radius: 8px;">
            <p style="margin: 0; font-weight: bold; color: #92400e;">⚡ Action Required</p>
            <p style="margin: 8px 0 0; color: #92400e;">Please contact the customer within 24 hours to schedule their appointment.</p>
          </div>
          <div style="margin-top: 16px; font-size: 12px; color: #6b7280;">
            <p>Timestamp: ${new Date().toISOString()}</p>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
