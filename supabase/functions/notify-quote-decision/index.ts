import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const FROM_ADDRESS = "Roll-On Painting <onboarding@resend.dev>";

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM_ADDRESS, to: [to], subject, html }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    // Verify caller is an admin
    const authHeader = req.headers.get("Authorization") ?? "";
    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: roleRow } = await admin.from("user_roles").select("role").eq("user_id", userData.user.id).eq("role", "admin").maybeSingle();
    if (!roleRow) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const body = await req.json();
    const quote_id = String(body.quote_id ?? "");
    const kind = body.kind === "declined" ? "declined" : "approved";
    const notes = String(body.notes ?? "").slice(0, 2000);
    if (!quote_id) return new Response(JSON.stringify({ error: "quote_id required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { data: quote } = await admin.from("quotes").select("*, clients(email, contact_name, company_name)").eq("id", quote_id).maybeSingle();
    if (!quote || !quote.clients?.email) return new Response(JSON.stringify({ ok: true, skipped: "no client email" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const subject = kind === "approved" ? `Quote ${quote.quote_number} approved` : `Quote ${quote.quote_number} update`;
    const intro = kind === "approved"
      ? `Good news — your prefinishing quote <strong>${quote.quote_number}</strong> has been approved by Roll-On Painting.`
      : `Your prefinishing quote <strong>${quote.quote_number}</strong> was reviewed and unfortunately we are unable to proceed as quoted.`;
    const notesBlock = notes ? `<p style="margin-top:16px"><strong>Notes from Roll-On Painting:</strong><br/>${escapeHtml(notes).replace(/\n/g, "<br/>")}</p>` : "";

    const html = `
      <div style="font-family:Arial,sans-serif;color:#111;max-width:600px">
        <h2 style="margin:0 0 16px">Quote ${quote.quote_number}</h2>
        <p>Hi ${escapeHtml(quote.clients.contact_name ?? "")},</p>
        <p>${intro}</p>
        <p>Total: <strong>$${Number(quote.total_cost ?? 0).toFixed(2)}</strong></p>
        ${notesBlock}
        <p style="margin-top:24px">Sign in to your portal to see the full breakdown.</p>
        <p>— Roll-On Painting</p>
      </div>`;

    await sendEmail(quote.clients.email, subject, html);

    return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? "Failed" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});