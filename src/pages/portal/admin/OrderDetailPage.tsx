import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRow, useUpdate, useList, useInsert } from "@/hooks/portal/usePortalData";
import { PageHeader, LoadingBlock, StatusBadge } from "@/components/portal/admin/AdminUI";
import { OrderStatusStepper, type OrderStatus } from "@/components/portal/admin/OrderStatusStepper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DELIVERY = ["client_delivers", "roll_on_picks_up", "third_party"] as const;
const WOOD_SUPPLIER = ["client", "roll_on"] as const;

export default function OrderDetailPage() {
  const { id } = useParams();
  const order = useRow<any>("orders", id);
  const clients = useList<any>("clients");
  const history = useList<any>("order_status_history", { filter: (q) => q.eq("order_id", id), order: "created_at", ascending: false });
  const update = useUpdate("orders");
  const insertHistory = useInsert("order_status_history", { invalidate: ["orders"] });

  const [form, setForm] = useState<any>(null);
  useEffect(() => { if (order.data && !form) setForm(order.data); }, [order.data]);

  if (order.isLoading || !form) return <LoadingBlock />;
  const c = (clients.data ?? []).find((x: any) => x.id === form.client_id);

  const F = (k: string, label: string, type = "text") => (
    <div className="space-y-1"><Label className="text-xs">{label}</Label><Input type={type} value={form[k] ?? ""} onChange={(e) => setForm({ ...form, [k]: e.target.value })} /></div>
  );
  const SW = (k: string, label: string) => (
    <div className="flex items-center gap-2"><Switch checked={!!form[k]} onCheckedChange={(v) => setForm({ ...form, [k]: v })} /><Label className="text-sm">{label}</Label></div>
  );

  const changeStatus = async (s: OrderStatus) => {
    const { data: { user } } = await supabase.auth.getUser();
    const patch: any = { status: s };
    if (s === "in_progress" && !form.actual_start_date) patch.actual_start_date = new Date().toISOString().slice(0,10);
    if ((s === "complete" || s === "shipped") && !form.actual_end_date) patch.actual_end_date = new Date().toISOString().slice(0,10);
    await update.mutateAsync({ id: form.id, patch });
    await insertHistory.mutateAsync({ order_id: form.id, status: s, changed_by: user?.id });
    setForm({ ...form, ...patch });
    toast.success(`Status → ${s.replace(/_/g, " ")}`);
  };

  const saveAll = async () => {
    const { id: _id, created_at, ...patch } = form;
    await update.mutateAsync({ id: form.id, patch });
  };

  return (
    <div className="max-w-5xl">
      <PageHeader title={`Order ${form.order_number}`} description={c?.company_name ?? ""} actions={<StatusBadge status={form.status} kind="order" />} />

      {/* Production status — mobile-first */}
      <Card className="mb-4 border-primary/30">
        <CardHeader><CardTitle className="text-base">Production status</CardTitle></CardHeader>
        <CardContent>
          <OrderStatusStepper status={form.status} onChange={changeStatus} disabled={update.isPending} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Job details</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {F("purchase_order_number", "PO number")}
            {F("job_number", "Job number")}
            {F("end_builder_name", "End builder")}
            {F("end_builder_company", "Builder company")}
            {F("end_builder_phone", "Builder phone")}
            {F("end_builder_email", "Builder email")}
            <div className="sm:col-span-2">{F("job_site_address", "Job site address")}</div>
            {F("job_site_city", "City")}
            {F("job_site_province", "Province")}
            {F("job_site_postal", "Postal")}
            {F("anticipated_start_date", "Anticipated start", "date")}
            {F("anticipated_end_date", "Anticipated end", "date")}
            {F("actual_start_date", "Actual start", "date")}
            {F("actual_end_date", "Actual end", "date")}
            <div className="space-y-1">
              <Label className="text-xs">Wood supplier</Label>
              <Select value={form.wood_supplied_by ?? "client"} onValueChange={(v) => setForm({ ...form, wood_supplied_by: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{WOOD_SUPPLIER.map(o => <SelectItem key={o} value={o}>{o.replace(/_/g, " ")}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Delivery</Label>
              <Select value={form.delivery_method ?? "client_delivers"} onValueChange={(v) => setForm({ ...form, delivery_method: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{DELIVERY.map(o => <SelectItem key={o} value={o}>{o.replace(/_/g, " ")}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Options & notes</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {SW("rush_order", "Rush order")}
              {SW("primer_required", "Primer required")}
              {SW("end_sealing_required", "End sealing")}
              {SW("return_delivery_required", "Return delivery")}
              {SW("photo_documentation_requested", "Photo docs")}
              {SW("warranty_registered", "Warranty registered")}
            </div>
            {F("assigned_staff", "Assigned staff")}
            {F("bundle_lot_numbers", "Bundle / lot numbers")}
            <div className="space-y-1"><Label className="text-xs">Special instructions</Label><Textarea rows={3} value={form.special_instructions ?? ""} onChange={(e) => setForm({ ...form, special_instructions: e.target.value })} /></div>
            <div className="space-y-1"><Label className="text-xs">Internal notes (admin only)</Label><Textarea rows={3} value={form.internal_notes ?? ""} onChange={(e) => setForm({ ...form, internal_notes: e.target.value })} /></div>
            <Button onClick={saveAll} disabled={update.isPending} className="w-full">Save changes</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader><CardTitle className="text-base">Status history</CardTitle></CardHeader>
        <CardContent className="p-0">
          {(history.data ?? []).length === 0 ? <div className="p-4 text-sm text-muted-foreground">No status changes logged yet.</div> : (
            <ul className="divide-y text-sm">
              {(history.data ?? []).map((h: any) => (
                <li key={h.id} className="px-4 py-2 flex justify-between">
                  <StatusBadge status={h.status} kind="order" />
                  <span className="text-xs text-muted-foreground">{new Date(h.created_at).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}