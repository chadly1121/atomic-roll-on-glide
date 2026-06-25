import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCurrentClient } from "@/hooks/portal/useCurrentClient";
import { PageHeader, LoadingBlock } from "@/components/portal/admin/AdminUI";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const FIELDS = [
  ["company_name", "Company"],
  ["contact_name", "Contact name"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["address", "Address"],
  ["city", "City"],
  ["province", "Province"],
  ["postal_code", "Postal code"],
] as const;

export default function ClientProfilePage() {
  const { data: client, isLoading } = useCurrentClient();
  const qc = useQueryClient();
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (client) {
      const init: Record<string, string> = {};
      FIELDS.forEach(([k]) => { init[k] = (client as any)[k] ?? ""; });
      setForm(init);
    }
  }, [client]);

  if (isLoading || !client) return <LoadingBlock />;

  const save = async () => {
    setSaving(true);
    const patch: any = {};
    FIELDS.forEach(([k]) => { patch[k] = form[k]?.trim() || null; });
    const { error } = await supabase.from("clients").update(patch).eq("id", client.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Profile saved");
    qc.invalidateQueries({ queryKey: ["clients", "me"] });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="My Profile" description="Keep your contact and billing info up to date." />
      <Card>
        <CardHeader><CardTitle className="text-base">Account details</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {FIELDS.map(([k, label]) => (
            <div key={k} className="space-y-1.5">
              <Label htmlFor={k}>{label}</Label>
              <Input id={k} value={form[k] ?? ""} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
            </div>
          ))}
          <div className="sm:col-span-2">
            <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}