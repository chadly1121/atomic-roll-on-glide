import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async () => {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) return new Response(JSON.stringify({ error: "no key" }), { status: 500 });
  const headers = { Authorization: `Bearer ${key}` };
  const [domainsRes, emailsRes] = await Promise.all([
    fetch("https://api.resend.com/domains", { headers }),
    fetch("https://api.resend.com/emails?limit=20", { headers }),
  ]);
  const domains = await domainsRes.json().catch(() => ({ status: domainsRes.status }));
  const emails = await emailsRes.json().catch(() => ({ status: emailsRes.status }));
  return new Response(JSON.stringify({ domains, emails }, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
});