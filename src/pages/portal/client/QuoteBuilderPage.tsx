import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useCurrentClient } from "@/hooks/portal/useCurrentClient";
import { useList } from "@/hooks/portal/usePortalData";
import { calculateLumberQuote, calculateShakeQuote } from "@/lib/pricing/lumberPricing";
import { PageHeader, LoadingBlock } from "@/components/portal/admin/AdminUI";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface LumberRow {
  id: string;
  species_id: string;
  profile_id: string;
  coating_product_id: string;
  lineal_feet: number;
  coats_front: 1 | 2 | 3;
  coats_back: 0 | 1 | 2;
  notes: string;
}
interface ShakeRow {
  id: string;
  coating_product_id: string;
  number_of_bundles: number;
  coats: number;
  notes: string;
}

const newLumberRow = (): LumberRow => ({
  id: crypto.randomUUID(), species_id: "", profile_id: "", coating_product_id: "",
  lineal_feet: 0, coats_front: 2, coats_back: 0, notes: "",
});
const newShakeRow = (): ShakeRow => ({
  id: crypto.randomUUID(), coating_product_id: "", number_of_bundles: 0, coats: 2, notes: "",
});

export default function QuoteBuilderPage() {
  const navigate = useNavigate();
  const { data: client, isLoading: clientLoading } = useCurrentClient();
  const { data: species = [] } = useList<any>("species", { order: "name", filter: (q) => q.eq("is_active", true) });
  const { data: profiles = [] } = useList<any>("profiles_lumber", { order: "name", filter: (q) => q.eq("is_active", true) });
  const { data: products = [] } = useList<any>("coating_products", { order: "name", filter: (q) => q.eq("is_active", true) });
  const { data: labour = [] } = useList<any>("labour_rates", { filter: (q) => q.eq("is_active", true).is("profile_id", null) });
  const { data: shakePricing = [] } = useList<any>("cedar_shake_pricing");

  const [tab, setTab] = useState<"lumber" | "cedar_shake">("lumber");
  const [projectName, setProjectName] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [lumberRows, setLumberRows] = useState<LumberRow[]>([newLumberRow()]);
  const [shakeRows, setShakeRows] = useState<ShakeRow[]>([newShakeRow()]);
  const [submitting, setSubmitting] = useState(false);

  const defaultLabour = labour[0]?.rate_per_lineal_ft_per_pass ?? 0;
  const defaultShakeLabour = shakePricing[0]?.labour_per_bundle_per_coat ?? 125;

  const priced = useMemo(() => {
    if (tab === "lumber") {
      return lumberRows.map((r) => {
        const profile = profiles.find((p) => p.id === r.profile_id);
        const product = products.find((p) => p.id === r.coating_product_id);
        if (!profile || !product || r.lineal_feet <= 0) return { row: r, result: null };
        try {
          const result = calculateLumberQuote({
            profile,
            lineal_feet: Number(r.lineal_feet),
            coats_front: Number(r.coats_front) as 1 | 2 | 3,
            coats_back: Number(r.coats_back) as 0 | 1 | 2,
            coating_product: product,
            labour_rate: { rate_per_lineal_ft_per_pass: Number(defaultLabour) },
          });
          return { row: r, result };
        } catch {
          return { row: r, result: null };
        }
      });
    }
    return shakeRows.map((r) => {
      const product = products.find((p) => p.id === r.coating_product_id);
      if (!product || r.number_of_bundles <= 0 || r.coats <= 0) return { row: r, result: null };
      try {
        const result = calculateShakeQuote({
          number_of_bundles: Number(r.number_of_bundles),
          coats: Number(r.coats),
          coating_product: product,
          shake_labour_rate: { labour_per_bundle_per_coat: Number(defaultShakeLabour) },
        });
        return { row: r, result };
      } catch {
        return { row: r, result: null };
      }
    });
  }, [tab, lumberRows, shakeRows, profiles, products, defaultLabour, defaultShakeLabour]);

  const totals = useMemo(() => {
    const t = { material: 0, labour: 0, total: 0 };
    priced.forEach((p: any) => {
      if (!p.result) return;
      t.material += p.result.material_cost;
      t.labour += p.result.labour_cost;
      t.total += p.result.total_cost;
    });
    return t;
  }, [priced]);

  const updateLumber = (id: string, patch: Partial<LumberRow>) =>
    setLumberRows((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const updateShake = (id: string, patch: Partial<ShakeRow>) =>
    setShakeRows((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const submit = async () => {
    if (!client) return toast.error("Account not ready. Try again.");
    if (!projectName.trim()) return toast.error("Project name is required.");

    const validRows = priced.filter((p: any) => p.result);
    if (validRows.length === 0) return toast.error("Add at least one complete line item.");

    setSubmitting(true);
    try {
      const { data: quote, error: qErr } = await supabase
        .from("quotes")
        .insert({
          client_id: client.id,
          quote_type: tab,
          status: "pending_review",
          submitted_at: new Date().toISOString(),
          client_notes: clientNotes ? `${projectName}\n\n${clientNotes}` : projectName,
          total_material_cost: totals.material,
          total_labour_cost: totals.labour,
          total_cost: totals.total,
        })
        .select()
        .single();
      if (qErr) throw qErr;

      if (tab === "lumber") {
        const items = validRows.map(({ row, result }: any) => ({
          quote_id: quote.id,
          species_id: row.species_id || null,
          profile_id: row.profile_id,
          coating_product_id: row.coating_product_id,
          lineal_feet: row.lineal_feet,
          coats_front: row.coats_front,
          coats_back: row.coats_back,
          total_passes: result.total_passes,
          front_sqft_per_pass: result.front_sqft_per_pass,
          edge_sqft_per_pass: result.edge_sqft_per_pass,
          back_sqft_per_coat: result.back_sqft_per_coat,
          total_material_sqft: result.total_sqft,
          gallons_required: result.gallons_required,
          material_cost: result.material_cost,
          labour_cost: result.labour_cost,
          total_cost: result.total_cost,
          notes: row.notes || null,
        }));
        const { error } = await supabase.from("quote_lumber_items").insert(items);
        if (error) throw error;
      } else {
        const items = validRows.map(({ row, result }: any) => ({
          quote_id: quote.id,
          coating_product_id: row.coating_product_id,
          number_of_bundles: row.number_of_bundles,
          coats: row.coats,
          material_cost_per_bundle_per_coat: result.sale_price_per_gallon,
          labour_cost_per_bundle_per_coat: defaultShakeLabour,
          total_material_cost: result.material_cost,
          total_labour_cost: result.labour_cost,
          total_cost: result.total_cost,
          notes: row.notes || null,
        }));
        const { error } = await supabase.from("quote_shake_items").insert(items);
        if (error) throw error;
      }

      // Notify staff (best-effort, non-blocking)
      supabase.functions.invoke("send-lumber-quote", {
        body: {
          project_name: projectName,
          contact_name: client.contact_name ?? client.email,
          contact_phone: client.phone ?? "",
          details: `Quote ${quote.quote_number} submitted via portal. Total: $${totals.total.toFixed(2)} (${validRows.length} line items, ${tab}).`,
        },
      }).catch(() => null);

      toast.success("Quote submitted for review.");
      navigate(`/client/quotes/${quote.id}`);
    } catch (e: any) {
      toast.error(e?.message ?? "Could not submit quote.");
    } finally {
      setSubmitting(false);
    }
  };

  if (clientLoading) return <LoadingBlock />;

  return (
    <div className="space-y-6 max-w-6xl">
      <PageHeader
        title="New Quote"
        description="Build your line items below. Pricing updates live; submit when ready for review."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Project</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="project_name">Project name *</Label>
            <Input id="project_name" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="e.g. Smith Cottage – T&G ceiling" />
          </div>
          <div className="space-y-2 sm:row-span-2">
            <Label htmlFor="notes">Notes to staff</Label>
            <Textarea id="notes" rows={4} value={clientNotes} onChange={(e) => setClientNotes(e.target.value)} placeholder="Timeline, delivery, finish preferences…" />
          </div>
        </CardContent>
      </Card>

      <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
        <TabsList>
          <TabsTrigger value="lumber">Lumber / MDF</TabsTrigger>
          <TabsTrigger value="cedar_shake">Cedar Shake</TabsTrigger>
        </TabsList>

        <TabsContent value="lumber" className="space-y-4 mt-4">
          {lumberRows.map((row, idx) => {
            const result = priced.find((p: any) => p.row.id === row.id)?.result;
            return (
              <Card key={row.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm">Item {idx + 1}</CardTitle>
                  {lumberRows.length > 1 && (
                    <Button size="sm" variant="ghost" onClick={() => setLumberRows((r) => r.filter((x) => x.id !== row.id))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-1">
                    <Label>Species</Label>
                    <Select value={row.species_id} onValueChange={(v) => updateLumber(row.id, { species_id: v })}>
                      <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                      <SelectContent>{species.map((s: any) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Profile *</Label>
                    <Select value={row.profile_id} onValueChange={(v) => updateLumber(row.id, { profile_id: v })}>
                      <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                      <SelectContent>{profiles.map((p: any) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Coating *</Label>
                    <Select value={row.coating_product_id} onValueChange={(v) => updateLumber(row.id, { coating_product_id: v })}>
                      <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                      <SelectContent>{products.map((p: any) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Lineal feet *</Label>
                    <Input type="number" min={0} value={row.lineal_feet || ""} onChange={(e) => updateLumber(row.id, { lineal_feet: Number(e.target.value) })} />
                  </div>
                  <div className="space-y-1">
                    <Label>Coats – front</Label>
                    <Select value={String(row.coats_front)} onValueChange={(v) => updateLumber(row.id, { coats_front: Number(v) as 1 | 2 | 3 })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{[1, 2, 3].map((n) => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Coats – back</Label>
                    <Select value={String(row.coats_back)} onValueChange={(v) => updateLumber(row.id, { coats_back: Number(v) as 0 | 1 | 2 })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{[0, 1, 2].map((n) => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-3 space-y-1">
                    <Label>Item notes</Label>
                    <Input value={row.notes} onChange={(e) => updateLumber(row.id, { notes: e.target.value })} />
                  </div>
                  {result && (
                    <div className="sm:col-span-3 rounded-md border bg-muted/40 p-3 text-xs grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div><div className="text-muted-foreground">Gallons</div><div className="font-medium">{result.gallons_required.toFixed(2)}</div></div>
                      <div><div className="text-muted-foreground">Material</div><div className="font-medium">${result.material_cost.toFixed(2)}</div></div>
                      <div><div className="text-muted-foreground">Labour</div><div className="font-medium">${result.labour_cost.toFixed(2)}</div></div>
                      <div><div className="text-muted-foreground">Line total</div><div className="font-semibold">${result.total_cost.toFixed(2)}</div></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
          <Button variant="outline" onClick={() => setLumberRows((r) => [...r, newLumberRow()])} className="gap-2">
            <Plus className="h-4 w-4" /> Add lumber item
          </Button>
        </TabsContent>

        <TabsContent value="cedar_shake" className="space-y-4 mt-4">
          {shakeRows.map((row, idx) => {
            const result = priced.find((p: any) => p.row.id === row.id)?.result;
            return (
              <Card key={row.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm">Bundle {idx + 1}</CardTitle>
                  {shakeRows.length > 1 && (
                    <Button size="sm" variant="ghost" onClick={() => setShakeRows((r) => r.filter((x) => x.id !== row.id))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-1 sm:col-span-3">
                    <Label>Coating *</Label>
                    <Select value={row.coating_product_id} onValueChange={(v) => updateShake(row.id, { coating_product_id: v })}>
                      <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                      <SelectContent>{products.map((p: any) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label># of bundles *</Label>
                    <Input type="number" min={0} value={row.number_of_bundles || ""} onChange={(e) => updateShake(row.id, { number_of_bundles: Number(e.target.value) })} />
                  </div>
                  <div className="space-y-1">
                    <Label>Coats *</Label>
                    <Input type="number" min={1} max={4} value={row.coats || ""} onChange={(e) => updateShake(row.id, { coats: Number(e.target.value) })} />
                  </div>
                  <div className="space-y-1 sm:col-span-3">
                    <Label>Notes</Label>
                    <Input value={row.notes} onChange={(e) => updateShake(row.id, { notes: e.target.value })} />
                  </div>
                  {result && (
                    <div className="sm:col-span-3 rounded-md border bg-muted/40 p-3 text-xs grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div><div className="text-muted-foreground">Gallons</div><div className="font-medium">{result.gallons_required.toFixed(2)}</div></div>
                      <div><div className="text-muted-foreground">Material</div><div className="font-medium">${result.material_cost.toFixed(2)}</div></div>
                      <div><div className="text-muted-foreground">Labour</div><div className="font-medium">${result.labour_cost.toFixed(2)}</div></div>
                      <div><div className="text-muted-foreground">Line total</div><div className="font-semibold">${result.total_cost.toFixed(2)}</div></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
          <Button variant="outline" onClick={() => setShakeRows((r) => [...r, newShakeRow()])} className="gap-2">
            <Plus className="h-4 w-4" /> Add shake item
          </Button>
        </TabsContent>
      </Tabs>

      <Card className="sticky bottom-2">
        <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
          <div className="flex gap-6 text-sm">
            <div><div className="text-muted-foreground text-xs">Material</div><div className="font-medium">${totals.material.toFixed(2)}</div></div>
            <div><div className="text-muted-foreground text-xs">Labour</div><div className="font-medium">${totals.labour.toFixed(2)}</div></div>
            <div><div className="text-muted-foreground text-xs">Estimated total</div><div className="font-serif text-xl font-semibold">${totals.total.toFixed(2)}</div></div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/client/dashboard")}>Cancel</Button>
            <Button onClick={submit} disabled={submitting}>{submitting ? "Submitting…" : "Submit for review"}</Button>
          </div>
        </CardContent>
      </Card>

      <CardDescription className="text-xs text-muted-foreground">
        Live totals are estimates based on current catalog pricing. Roll-On Painting will review and confirm before approval.
      </CardDescription>
    </div>
  );
}