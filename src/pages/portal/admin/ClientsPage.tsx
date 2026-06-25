import { useState } from "react";
import { useList, useInsert, useUpdate } from "@/hooks/portal/usePortalData";
import { PageHeader, LoadingBlock, EmptyState } from "@/components/portal/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

const empty = { company_name: "", contact_name: "", email: "", phone: "", address: "", city: "", province: "ON", postal_code: "", is_active: true, notes: "" };

export default function ClientsPage() {
  const { data, isLoading } = useList<any>("clients", { order: "company_name" });
  const quotes = useList<any>("quotes");
  const orders = useList<any>("orders");
  const insert = useInsert("clients");
  const update = useUpdate("clients");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [draft, setDraft] = useState<any>(empty);

  const list = data ?? [];
  const startNew = () => { setEditing(null); setDraft(empty); setOpen(true); };
  const startEdit = (c: any) => { setEditing(c); setDraft(c); setOpen(true); };
  const save = async () => {
    const { id, created_at, ...patch } = draft;
    if (editing) await update.mutateAsync({ id: editing.id, patch });
    else await insert.mutateAsync(patch);
    setOpen(false);
  };
  const F = (k: string, label: string) => (
    <div className="space-y-1"><Label className="text-xs">{label}</Label><Input value={draft[k] ?? ""} onChange={(e) => setDraft({ ...draft, [k]: e.target.value })} /></div>
  );

  return (
    <div className="max-w-6xl">
      <PageHeader title="Clients" description={`${list.length} clients`} actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button onClick={startNew}><Plus className="h-4 w-4 mr-1" /> Add client</Button></DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit client" : "New client"}</DialogTitle></DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {F("company_name", "Company")}
              {F("contact_name", "Contact name")}
              {F("email", "Email")}
              {F("phone", "Phone")}
              <div className="sm:col-span-2">{F("address", "Address")}</div>
              {F("city", "City")}
              {F("province", "Province")}
              {F("postal_code", "Postal code")}
              <div className="sm:col-span-2 space-y-1"><Label className="text-xs">Notes</Label><Textarea rows={2} value={draft.notes ?? ""} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} /></div>
              <div className="flex items-center gap-2"><Switch checked={!!draft.is_active} onCheckedChange={(v) => setDraft({ ...draft, is_active: v })} /><Label className="text-sm">Active</Label></div>
            </div>
            <DialogFooter><Button onClick={save} disabled={insert.isPending || update.isPending}>Save</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      } />
      {isLoading ? <LoadingBlock /> : list.length === 0 ? <EmptyState label="No clients yet." /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {list.map((c: any) => {
            const qCount = (quotes.data ?? []).filter((q: any) => q.client_id === c.id).length;
            const oCount = (orders.data ?? []).filter((o: any) => o.client_id === c.id).length;
            return (
              <Card key={c.id} className={!c.is_active ? "opacity-60" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{c.company_name}</div>
                      <div className="text-xs text-muted-foreground truncate">{c.contact_name} · {c.email}</div>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => startEdit(c)}><Pencil className="h-4 w-4" /></Button>
                  </div>
                  <div className="flex gap-3 mt-3 text-xs">
                    <Link to={`/admin/quotes?client=${c.id}`} className="hover:underline">{qCount} quotes</Link>
                    <Link to={`/admin/orders?client=${c.id}`} className="hover:underline">{oCount} orders</Link>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Switch checked={!!c.is_active} onCheckedChange={(v) => update.mutate({ id: c.id, patch: { is_active: v } })} />
                    <Label className="text-xs">Active</Label>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}