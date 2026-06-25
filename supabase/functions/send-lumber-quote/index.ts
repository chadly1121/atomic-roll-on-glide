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
const ADMIN_PORTAL_URL = "https://www.rollonpainting.com/admin/quotes";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fmtMoney(n: number | null | undefined): string {
  const v = Number(n ?? 0);
  return `$${v.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
function fmtDateCA(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
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
    const quote_id = String(body.quote_id ?? "").trim();
    const project_name = String(body.project_name ?? "").trim().slice(0, 200);
    if (!quote_id) {
      return new Response(JSON.stringify({ error: "quote_id is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch the quote with the caller's RLS so they can only email their own quotes.
    const { data: quote, error: qErr } = await supabase
      .from("quotes")
      .select("*, clients:client_id(*)")
      .eq("id", quote_id)
      .maybeSingle();
    if (qErr || !quote) {
      return new Response(JSON.stringify({ error: "Quote not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const [{ data: lumberItems }, { data: shakeItems }] = await Promise.all([
      supabase
        .from("quote_lumber_items")
        .select("*, profile:profile_id(name), species:species_id(name), coating:coating_product_id(name)")
        .eq("quote_id", quote_id),
      supabase
        .from("quote_shake_items")
        .select("*, coating:coating_product_id(name)")
        .eq("quote_id", quote_id),
    ]);

    const client = quote.clients ?? {};
    const client_email = client.email ?? userData.user.email!;
    const contact_name = client.contact_name ?? client_email;
    const company = client.company_name ?? "";
    const submitted = quote.submitted_at ? new Date(quote.submitted_at) : new Date();

    const lumberRowsHtml = (lumberItems ?? []).map((i: any) => `
      <tr>
        <td style="padding:6px 8px;border-bottom:1px solid #eee">${escapeHtml(i.profile?.name ?? "—")}${i.species?.name ? ` · ${escapeHtml(i.species.name)}` : ""}</td>
        <td style="padding:6px 8px;border-bottom:1px solid #eee">${escapeHtml(i.coating?.name ?? "—")}</td>
        <td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:right">${i.lineal_feet} LF</td>
        <td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:center">${i.coats_front}F / ${i.coats_back}B</td>
        <td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:right">${fmtMoney(i.total_cost)}</td>
      </tr>`).join("");

    const shakeRowsHtml = (shakeItems ?? []).map((i: any) => `
      <tr>
        <td style="padding:6px 8px;border-bottom:1px solid #eee">${escapeHtml(i.coating?.name ?? "—")}</td>
        <td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:right">${i.number_of_bundles} bundles</td>
        <td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:center">${i.coats} coats</td>
        <td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:right">${fmtMoney(i.total_cost)}</td>
      </tr>`).join("");

    const itemsHtml = quote.quote_type === "cedar_shake"
      ? `<table style="width:100%;border-collapse:collapse;font-size:13px;margin-top:8px">
           <thead><tr style="background:#f6f6f6;text-align:left">
             <th style="padding:6px 8px">Coating</th><th style="padding:6px 8px;text-align:right">Bundles</th><th style="padding:6px 8px;text-align:center">Coats</th><th style="padding:6px 8px;text-align:right">Total</th>
           </tr></thead><tbody>${shakeRowsHtml}</tbody></table>`
      : `<table style="width:100%;border-collapse:collapse;font-size:13px;margin-top:8px">
           <thead><tr style="background:#f6f6f6;text-align:left">
             <th style="padding:6px 8px">Profile / Species</th><th style="padding:6px 8px">Coating</th><th style="padding:6px 8px;text-align:right">LF</th><th style="padding:6px 8px;text-align:center">Coats</th><th style="padding:6px 8px;text-align:right">Total</th>
           </tr></thead><tbody>${lumberRowsHtml}</tbody></table>`;

    const projectLabel = project_name || (quote.client_notes ?? "").split("\n")[0] || "—";
    const jobsite = [client.address_line1, client.city, client.province, client.postal_code].filter(Boolean).join(", ");
    const notes = quote.client_notes ?? "";

    // ---- Notify Chad ----
    const adminSubject = `New Quote Request - ${quote.quote_number} - ${company || contact_name}`;
    await sendEmail(ADMIN_EMAIL, adminSubject, `
      <div style="font-family:Arial,sans-serif;color:#111;max-width:680px">
        <h2 style="margin:0 0 12px">New Prefinishing Quote — ${escapeHtml(quote.quote_number)}</h2>
        <table style="border-collapse:collapse;font-size:14px">
          <tr><td style="padding:4px 12px 4px 0;color:#666">Client</td><td>${escapeHtml(contact_name)}${company ? ` · ${escapeHtml(company)}` : ""}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td>${escapeHtml(client_email)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Phone</td><td>${escapeHtml(client.phone ?? "—")}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Submitted</td><td>${fmtDateCA(submitted)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Project</td><td>${escapeHtml(projectLabel)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Job site</td><td>${escapeHtml(jobsite || "—")}</td></tr>
        </table>
        <h3 style="margin:18px 0 4px">Line items</h3>
        ${itemsHtml}
        <table style="margin-top:14px;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:2px 12px 2px 0;color:#666">Material</td><td style="text-align:right">${fmtMoney(quote.total_material_cost)}</td></tr>
          <tr><td style="padding:2px 12px 2px 0;color:#666">Labour</td><td style="text-align:right">${fmtMoney(quote.total_labour_cost)}</td></tr>
          <tr><td style="padding:6px 12px 2px 0;font-weight:600;border-top:1px solid #ddd">Total</td><td style="text-align:right;font-weight:600;border-top:1px solid #ddd">${fmtMoney(quote.total_cost)}</td></tr>
        </table>
        ${notes ? `<h3 style="margin:18px 0 4px">Special instructions</h3><div style="padding:10px;background:#f6f6f6;border-radius:6px;white-space:pre-wrap;font-size:13px">${escapeHtml(notes)}</div>` : ""}
        <p style="margin-top:20px"><a href="${ADMIN_PORTAL_URL}/${encodeURIComponent(quote.id)}" style="background:#111;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;font-size:14px">Review in admin portal</a></p>
      </div>`);

    // ---- Client confirmation ----
    const clientSubject = `Quote Received - Roll-On Painting - ${quote.quote_number}`;
    await sendEmail(client_email, clientSubject, `
      <div style="font-family:Arial,sans-serif;color:#111;max-width:600px">
        <p>Hi ${escapeHtml(contact_name)},</p>
        <p>Thank you for submitting your prefinishing quote to Roll-On Painting. Your reference number is <strong>${escapeHtml(quote.quote_number)}</strong>.</p>
        <p><strong>Summary</strong></p>
        ${itemsHtml}
        <table style="margin-top:14px;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:2px 12px 2px 0;color:#666">Estimated total</td><td style="text-align:right;font-weight:600">${fmtMoney(quote.total_cost)}</td></tr>
        </table>
        <p style="margin-top:18px">We will review your quote and contact you within <strong>1–2 business days</strong>.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
        <p style="font-size:13px;color:#555;margin:0">Roll-On Painting<br/>
        Phone: (705) 644-9929<br/>
        Email: info@rollonpainting.com<br/>
        Web: <a href="https://www.rollonpainting.com">rollonpainting.com</a></p>
      </div>`);

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