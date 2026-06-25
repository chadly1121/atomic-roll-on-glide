import { useState } from "react";
import { useList, useInsert } from "@/hooks/portal/usePortalData";
import { PageHeader, LoadingBlock } from "@/components/portal/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export default function ShakePricingPage() {
  const current = useList<any>("cedar_shake_pricing", { order: "created_at", ascending: false });
  const history = useList<any>("cedar_shake_pricing_history", { order: "created_at", ascending: false });
  const insertCurrent = useInsert("cedar_shake_pricing");
  const insertHistory = useInsert("cedar_shake_pricing_history");

  const active = (current.data ?? [])[0];
  const [rate, setRate] = useState<number>(125);
  const [notes, setNotes] = useState("");

  const save = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    await insertCurrent.mutateAsync({ labour_per_bundle_per_coat: rate, notes });
    await insertHistory.mutateAsync({ labour_per_bundle_per_coat: rate, changed_by: user?.id, notes });
    setNotes("");
  };

  return (
    <div className="max-w-3xl">
      <PageHeader title="Cedar Shake Pricing" description="Labour per bundle, per coat" />
      {current.isLoading ? <LoadingBlock /> : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Current rate</CardTitle></CardHeader>
            <CardContent>
              <div className="font-serif text-3xl">${Number(active?.labour_per_bundle_per_coat ?? 125).toFixed(2)}</div>
              <div className="text-xs text-muted-foreground mt-1">per bundle, per coat</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Update rate</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5"><Label className="text-xs">New rate</Label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
              <div className="space-y-1.5"><Label className="text-xs">Notes</Label><Textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
              <Button onClick={save} disabled={insertCurrent.isPending}>Save</Button>
            </CardContent>
          </Card>
        </div>
      )}
      <Card className="mt-6">
        <CardHeader><CardTitle className="text-base">Change history</CardTitle></CardHeader>
        <CardContent className="p-0">
          {(history.data ?? []).length === 0 ? <div className="p-4 text-sm text-muted-foreground">No changes yet.</div> : (
            <ul className="divide-y text-sm">
              {(history.data ?? []).map((h: any) => (
                <li key={h.id} className="px-4 py-3 flex justify-between gap-2">
                  <div>
                    <div className="font-medium">${Number(h.labour_per_bundle_per_coat).toFixed(2)}</div>
                    {h.notes && <div className="text-xs text-muted-foreground">{h.notes}</div>}
                  </div>
                  <div className="text-xs text-muted-foreground">{new Date(h.created_at).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}