import { useState } from "react";
import { useList, useInsert, useUpdate } from "@/hooks/portal/usePortalData";
import { PageHeader, LoadingBlock, EmptyState } from "@/components/portal/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const MATERIALS = ["wood", "mdf"] as const;
const PROFILE_TYPES = ["tongue_groove", "shiplap", "bevel", "board_batten", "dimensional", "other"] as const;
const SURFACES = ["smooth", "rough", "mdf_preprimed", "mdf_raw"] as const;

const empty: any = {
  name: "", material_type: "wood", profile_type: "tongue_groove",
  nominal_width_inches: 6, nominal_thickness_inches: 1,
  actual_width_inches: 5.25, actual_thickness_inches: 0.75,
  surface_type: "smooth",
  front_face_sqft_per_lineal_ft: 0,
  back_face_sqft_per_lineal_ft: 0,
  edge_sqft_per_lineal_ft: 0,
  total_sqft_per_lineal_ft: 0,
  is_active: true, notes: "",
};

export default function ProfilesPage() {
  const { data, isLoading } = useList<any>("profiles_lumber", { order: "name" });
  const insert = useInsert("profiles_lumber");
  const update = useUpdate("profiles_lumber");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [draft, setDraft] = useState<any>(empty);

  const profiles = data ?? [];
  const startNew = () => { setEditing(null); setDraft(empty); setOpen(true); };
  const startEdit = (p: any) => { setEditing(p); setDraft(p); setOpen(true); };
  const save = async () => {
    const { id, created_at, ...patch } = draft;
    if (editing) await update.mutateAsync({ id: editing.id, patch });
    else await insert.mutateAsync(patch);
    setOpen(false);
  };

  const F = (k: string, label: string, type = "number", step = "0.01") => (
    <div className="space-y-1">
      <Label className="text-xs">{label}</Label>
      <Input type={type} step={step} value={draft[k] ?? ""} onChange={(e) => setDraft({ ...draft, [k]: type === "number" ? Number(e.target.value) : e.target.value })} />
    </div>
  );

  const S = (k: string, label: string, options: readonly string[]) => (
    <div className="space-y-1">
      <Label className="text-xs">{label}</Label>
      <Select value={draft[k]} onValueChange={(v) => setDraft({ ...draft, [k]: v })}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>{options.map(o => <SelectItem key={o} value={o}>{o.replace(/_/g, " ")}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="Lumber & MDF Profiles"
        description={`${profiles.length} profiles`}
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button onClick={startNew}><Plus className="h-4 w-4 mr-1" /> Add profile</Button></DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{editing ? "Edit profile" : "New profile"}</DialogTitle></DialogHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2"><Label className="text-xs">Name</Label><Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></div>
                {S("material_type", "Material", MATERIALS)}
                {S("profile_type", "Profile type", PROFILE_TYPES)}
                {S("surface_type", "Surface", SURFACES)}
                {F("nominal_width_inches", "Nominal width (in)")}
                {F("nominal_thickness_inches", "Nominal thickness (in)")}
                {F("actual_width_inches", "Actual width (in)")}
                {F("actual_thickness_inches", "Actual thickness (in)")}
                {F("front_face_sqft_per_lineal_ft", "Front face sqft/LF")}
                {F("back_face_sqft_per_lineal_ft", "Back face sqft/LF")}
                {F("edge_sqft_per_lineal_ft", "Edge sqft/LF")}
                {F("total_sqft_per_lineal_ft", "Total sqft/LF")}
                <div className="sm:col-span-2"><Label className="text-xs">Notes</Label><Textarea rows={2} value={draft.notes ?? ""} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} /></div>
                <div className="flex items-center gap-2">
                  <Switch checked={!!draft.is_active} onCheckedChange={(v) => setDraft({ ...draft, is_active: v })} />
                  <Label className="text-sm">Active</Label>
                </div>
              </div>
              <DialogFooter><Button onClick={save} disabled={insert.isPending || update.isPending}>Save</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      {isLoading ? <LoadingBlock /> : profiles.length === 0 ? <EmptyState label="No profiles yet." /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {profiles.map((p: any) => (
            <Card key={p.id} className={!p.is_active ? "opacity-60" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{p.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{p.material_type} · {(p.profile_type ?? "").replace(/_/g, " ")} · {(p.surface_type ?? "").replace(/_/g, " ")}</div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => startEdit(p)}><Pencil className="h-4 w-4" /></Button>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                  <div><div className="text-muted-foreground">Total/LF</div>{Number(p.total_sqft_per_lineal_ft).toFixed(3)}</div>
                  <div><div className="text-muted-foreground">Back</div>{Number(p.back_face_sqft_per_lineal_ft).toFixed(3)}</div>
                  <div><div className="text-muted-foreground">Edges</div>{Number(p.edge_sqft_per_lineal_ft).toFixed(3)}</div>
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