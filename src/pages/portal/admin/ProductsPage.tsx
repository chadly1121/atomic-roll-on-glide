import { useState } from "react";
import { useList, useInsert, useUpdate } from "@/hooks/portal/usePortalData";
import { PageHeader, LoadingBlock, EmptyState } from "@/components/portal/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil } from "lucide-react";

const PRODUCT_CAP = 20;
const empty = {
  name: "", manufacturer: "", cost_per_gallon: 0,
  coverage_smooth_sqft_per_gallon: 300,
  coverage_rough_sqft_per_gallon: 250,
  coverage_mdf_preprimed_sqft_per_gallon: 300,
  coverage_mdf_raw_first_coat_sqft_per_gallon: 200,
  coverage_mdf_raw_subsequent_sqft_per_gallon: 300,
  is_active: true, notes: "",
};

function ProductForm({ value, onChange }: { value: any; onChange: (v: any) => void }) {
  const f = (k: string, label: string, type = "text", step?: string) => (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      <Input type={type} step={step} value={value[k] ?? ""} onChange={(e) => onChange({ ...value, [k]: type === "number" ? Number(e.target.value) : e.target.value })} />
    </div>
  );
  const sale = value.cost_per_gallon ? (value.cost_per_gallon / 0.6).toFixed(2) : "—";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {f("name", "Product name")}
      {f("manufacturer", "Manufacturer")}
      {f("cost_per_gallon", "Cost / gallon", "number", "0.01")}
      <div className="space-y-1.5">
        <Label className="text-xs">Sale / gallon (auto)</Label>
        <div className="h-9 px-3 flex items-center rounded-md border bg-muted/40 text-sm">${sale}</div>
      </div>
      {f("coverage_smooth_sqft_per_gallon", "Smooth coverage (sqft/gal)", "number")}
      {f("coverage_rough_sqft_per_gallon", "Rough coverage (sqft/gal)", "number")}
      {f("coverage_mdf_preprimed_sqft_per_gallon", "MDF preprimed (sqft/gal)", "number")}
      {f("coverage_mdf_raw_first_coat_sqft_per_gallon", "MDF raw 1st coat (sqft/gal)", "number")}
      {f("coverage_mdf_raw_subsequent_sqft_per_gallon", "MDF raw subsequent (sqft/gal)", "number")}
      <div className="sm:col-span-2 space-y-1.5">
        <Label className="text-xs">Notes</Label>
        <Textarea rows={2} value={value.notes ?? ""} onChange={(e) => onChange({ ...value, notes: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={!!value.is_active} onCheckedChange={(v) => onChange({ ...value, is_active: v })} />
        <Label className="text-sm">Active</Label>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const { data, isLoading } = useList<any>("coating_products", { order: "name" });
  const insert = useInsert("coating_products");
  const update = useUpdate("coating_products");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<any>(empty);
  const [editing, setEditing] = useState<any | null>(null);

  const products = data ?? [];
  const atCap = products.length >= PRODUCT_CAP;

  const startNew = () => { setEditing(null); setDraft(empty); setOpen(true); };
  const startEdit = (p: any) => { setEditing(p); setDraft(p); setOpen(true); };
  const save = async () => {
    const { id, sale_price_per_gallon, created_at, ...patch } = draft;
    if (editing) await update.mutateAsync({ id: editing.id, patch });
    else await insert.mutateAsync(patch);
    setOpen(false);
  };

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="Coating Products"
        description={`${products.length} / ${PRODUCT_CAP} products`}
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button onClick={startNew} disabled={atCap}><Plus className="h-4 w-4 mr-1" /> Add product</Button></DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader><DialogTitle>{editing ? "Edit product" : "New product"}</DialogTitle></DialogHeader>
              <ProductForm value={draft} onChange={setDraft} />
              <DialogFooter><Button onClick={save} disabled={insert.isPending || update.isPending}>Save</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      {isLoading ? <LoadingBlock /> : products.length === 0 ? <EmptyState label="No products yet." /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {products.map((p: any) => (
            <Card key={p.id} className={!p.is_active ? "opacity-60" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.manufacturer}</div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => startEdit(p)}><Pencil className="h-4 w-4" /></Button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                  <div><span className="text-muted-foreground">Cost:</span> ${Number(p.cost_per_gallon).toFixed(2)}</div>
                  <div><span className="text-muted-foreground">Sale:</span> ${Number(p.sale_price_per_gallon).toFixed(2)}</div>
                  <div><span className="text-muted-foreground">Smooth:</span> {p.coverage_smooth_sqft_per_gallon}</div>
                  <div><span className="text-muted-foreground">Rough:</span> {p.coverage_rough_sqft_per_gallon}</div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Switch checked={!!p.is_active} onCheckedChange={(v) => update.mutate({ id: p.id, patch: { is_active: v } })} />
                  <Label className="text-xs">Active</Label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}