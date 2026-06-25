import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

const ADMIN_EMAIL = "chad@roll-onpainting.com";
const FROM_ADDRESS = "Roll-On Painting <onboarding@resend.dev>";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_ADDRESS, to: [to], subject, html }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Resend ${res.status}: ${t}`);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Require an authenticated client
    const authHeader = req.headers.get("Authorization") ?? "";
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const project_name = String(body.project_name ?? "").trim().slice(0, 200);
    const contact_name = String(body.contact_name ?? "").trim().slice(0, 120);
    const contact_phone = String(body.contact_phone ?? "").trim().slice(0, 40);
    const details = String(body.details ?? "").trim().slice(0, 5000);
    const client_email = userData.user.email!;

    if (!project_name || !contact_name || !details) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const detailsHtml = escapeHtml(details).replace(/\n/g, "<br/>");

    // Notify Chad
    await sendEmail(
      ADMIN_EMAIL,
      `New Lumber Quote — ${project_name}`,
      `
        <div style="font-family:Arial,sans-serif;color:#111;max-width:600px">
          <h2 style="margin:0 0 16px">New Prefinishing Quote Request</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:6px 0;color:#666;width:140px">Project</td><td>${escapeHtml(project_name)}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Client</td><td>${escapeHtml(contact_name)} &lt;${escapeHtml(client_email)}&gt;</td></tr>
            <tr><td style="padding:6px 0;color:#666">Phone</td><td>${escapeHtml(contact_phone) || "—"}</td></tr>
          </table>
          <h3 style="margin:20px 0 8px">Details</h3>
          <div style="padding:12px;background:#f6f6f6;border-radius:6px;white-space:pre-wrap">${detailsHtml}</div>
        </div>
      `,
    );

    // Confirmation to client
    await sendEmail(
      client_email,
      "We received your quote request — Roll-On Painting",
      `
        <div style="font-family:Arial,sans-serif;color:#111;max-width:600px">
          <p>Hi ${escapeHtml(contact_name)},</p>
          <p>Thank you for submitting your quote request. Roll-On Painting will review your quote and be in touch shortly.</p>
          <p style="color:#666;font-size:13px">Project: <strong>${escapeHtml(project_name)}</strong></p>
          <p style="margin-top:24px">— Roll-On Painting</p>
        </div>
      `,
    );

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-lumber-quote error", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});