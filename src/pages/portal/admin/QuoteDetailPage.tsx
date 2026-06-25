import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRow, useList, useUpdate, useInsert } from "@/hooks/portal/usePortalData";
import { PageHeader, LoadingBlock, StatusBadge } from "@/components/portal/admin/AdminUI";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function QuoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const quote = useRow<any>("quotes", id);
  const items = useList<any>("quote_lumber_items", { filter: (q) => q.eq("quote_id", id) });
  const shakeItems = useList<any>("quote_shake_items", { filter: (q) => q.eq("quote_id", id) });
  const clients = useList<any>("clients");
  const updateQuote = useUpdate("quotes");
  const insertOrder = useInsert("orders", { invalidate: ["quotes"] });

  const [notes, setNotes] = useState("");
  const q = quote.data;
  const c = q ? (clients.data ?? []).find((x: any) => x.id === q.client_id) : null;

  if (quote.isLoading || !q) return <LoadingBlock />;

  const notifyClient = async (kind: "approved" | "declined") => {
    try {
      await supabase.functions.invoke("notify-quote-decision", { body: { quote_id: id, kind, notes } });
    } catch (e: any) {
      console.warn("notify failed", e);
    }
  };

  const approve = async () => {
    await updateQuote.mutateAsync({ id: q.id, patch: { status: "approved", admin_notes: notes, approved_at: new Date().toISOString(), reviewed_at: new Date().toISOString() } });
    await notifyClient("approved");
    toast.success("Quote approved");
  };
  const decline = async () => {
    await updateQuote.mutateAsync({ id: q.id, patch: { status: "declined", admin_notes: notes, reviewed_at: new Date().toISOString() } });
    await notifyClient("declined");
    toast.success("Quote declined");
  };
  const convert = async () => {
    const order = await insertOrder.mutateAsync({
      quote_id: q.id,
      client_id: q.client_id,
      status: "received",
      payment_status: "unpaid",
    });
    await updateQuote.mutateAsync({ id: q.id, patch: { status: "converted_to_order" } });
    toast.success("Converted to order");
    if (order?.id) navigate(`/admin/orders/${order.id}`);
  };

  return (
    <div className="max-w-4xl">
      <PageHeader title={`Quote ${q.quote_number}`} description={c?.company_name ?? ""} actions={<StatusBadge status={q.status} kind="quote" />} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Line items</CardTitle></CardHeader>
          <CardContent className="p-0">
            {(items.data ?? []).length === 0 && (shakeItems.data ?? []).length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground">No items.</div>
            ) : (
              <ul className="divide-y text-sm">
                {(items.data ?? []).map((it: any) => (
                  <li key={it.id} className="px-4 py-3 grid grid-cols-2 gap-1">
                    <div className="font-medium">Lumber · {Number(it.lineal_feet).toFixed(0)} LF</div>
                    <div className="text-right">${Number(it.total_cost).toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground col-span-2">Coats {it.coats_front}F / {it.coats_back}B · {Number(it.gallons_required).toFixed(2)} gal · {Number(it.total_material_sqft).toFixed(0)} sqft</div>
                  </li>
                ))}
                {(shakeItems.data ?? []).map((it: any) => (
                  <li key={it.id} className="px-4 py-3 grid grid-cols-2 gap-1">
                    <div className="font-medium">Cedar shake · {it.number_of_bundles} bundles × {it.coats} coats</div>
                    <div className="text-right">${Number(it.total_cost).toFixed(2)}</div>
                  </li>
                ))}
              </ul>
            )}
            <div className="px-4 py-3 border-t bg-muted/30 grid grid-cols-3 text-sm gap-2">
              <div><div className="text-xs text-muted-foreground">Material</div>${Number(q.total_material_cost ?? 0).toFixed(2)}</div>
              <div><div className="text-xs text-muted-foreground">Labour</div>${Number(q.total_labour_cost ?? 0).toFixed(2)}</div>
              <div className="font-semibold"><div className="text-xs text-muted-foreground font-normal">Total</div>${Number(q.total_cost ?? 0).toFixed(2)}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Actions</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {q.client_notes && (
              <div className="text-xs"><div className="text-muted-foreground mb-1">Client notes</div><div className="p-2 bg-muted/40 rounded">{q.client_notes}</div></div>
            )}
            <div className="space-y-1"><Label className="text-xs">Admin notes</Label><Textarea rows={3} value={notes || q.admin_notes || ""} onChange={(e) => setNotes(e.target.value)} /></div>
            {q.status === "pending_review" && (
              <div className="flex flex-col gap-2">
                <Button onClick={approve} disabled={updateQuote.isPending}>Approve</Button>
                <Button variant="outline" onClick={decline} disabled={updateQuote.isPending}>Decline</Button>
              </div>
            )}
            {q.status === "approved" && (
              <Button onClick={convert} disabled={insertOrder.isPending}>Convert to order</Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}