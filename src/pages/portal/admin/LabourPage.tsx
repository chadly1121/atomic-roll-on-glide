import { useState } from "react";
import { useList, useInsert } from "@/hooks/portal/usePortalData";
import { PageHeader, LoadingBlock } from "@/components/portal/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export default function LabourPage() {
  const rates = useList<any>("labour_rates", { order: "effective_date", ascending: false });
  const profiles = useList<any>("profiles_lumber", { order: "name" });
  const history = useList<any>("labour_rate_history", { order: "created_at", ascending: false });
  const insertRate = useInsert("labour_rates");
  const insertHistory = useInsert("labour_rate_history");

  const [rate, setRate] = useState<number>(0.5);
  const [profileId, setProfileId] = useState<string>("__default__");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");

  const activeRates = rates.data ?? [];
  const defaultRate = activeRates.find((r: any) => !r.profile_id && r.is_active);
  const overrides = activeRates.filter((r: any) => r.profile_id && r.is_active);

  const save = async () => {
    const pid = profileId === "__default__" ? null : profileId;
    const { data: { user } } = await supabase.auth.getUser();
    await insertRate.mutateAsync({
      profile_id: pid,
      rate_per_lineal_ft_per_pass: rate,
      effective_date: date,
      is_active: true,
      notes,
    });
    await insertHistory.mutateAsync({
      profile_id: pid,
      rate_per_lineal_ft_per_pass: rate,
      effective_date: date,
      changed_by: user?.id,
      notes,
    });
    setNotes("");
  };

  return (
    <div className="max-w-4xl">
      <PageHeader title="Labour Rates" description="Per lineal foot, per pass" />
      {rates.isLoading ? <LoadingBlock /> : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Current default</CardTitle></CardHeader>
            <CardContent>
              <div className="font-serif text-3xl">${Number(defaultRate?.rate_per_lineal_ft_per_pass ?? 0).toFixed(2)}</div>
              <div className="text-xs text-muted-foreground mt-1">/ lineal ft / pass · effective {defaultRate?.effective_date ?? "—"}</div>
              <div className="mt-4">
                <div className="text-xs font-medium mb-2">Profile-specific overrides</div>
                {overrides.length === 0 ? <div className="text-xs text-muted-foreground">None</div> : (
                  <ul className="text-sm space-y-1">
                    {overrides.map((o: any) => {
                      const p = (profiles.data ?? []).find((x: any) => x.id === o.profile_id);
                      return <li key={o.id} className="flex justify-between"><span className="truncate">{p?.name ?? o.profile_id}</span><span>${Number(o.rate_per_lineal_ft_per_pass).toFixed(2)}</span></li>;
                    })}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Add / update rate</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Applies to</Label>
                <Select value={profileId} onValueChange={setProfileId}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__default__">Default (all profiles)</SelectItem>
                    {(profiles.data ?? []).map((p: any) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5"><Label className="text-xs">Rate</Label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
                <div className="space-y-1.5"><Label className="text-xs">Effective date</Label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
              </div>
              <div className="space-y-1.5"><Label className="text-xs">Notes</Label><Textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
              <Button onClick={save} disabled={insertRate.isPending}>Save rate</Button>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="mt-6">
        <CardHeader><CardTitle className="text-base">Change history</CardTitle></CardHeader>
        <CardContent className="p-0">
          {(history.data ?? []).length === 0 ? <div className="p-4 text-sm text-muted-foreground">No changes yet.</div> : (
            <ul className="divide-y text-sm">
              {(history.data ?? []).map((h: any) => {
                const p = h.profile_id ? (profiles.data ?? []).find((x: any) => x.id === h.profile_id) : null;
                return (
                  <li key={h.id} className="px-4 py-3 flex flex-wrap justify-between gap-2">
                    <div>
                      <div className="font-medium">${Number(h.rate_per_lineal_ft_per_pass).toFixed(2)} <span className="text-muted-foreground font-normal">— {p?.name ?? "default"}</span></div>
                      {h.notes && <div className="text-xs text-muted-foreground">{h.notes}</div>}
                    </div>
                    <div className="text-xs text-muted-foreground">{new Date(h.created_at).toLocaleString()}</div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}