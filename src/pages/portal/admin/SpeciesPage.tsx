import { useState } from "react";
import { useList, useInsert, useUpdate } from "@/hooks/portal/usePortalData";
import { PageHeader, LoadingBlock, EmptyState } from "@/components/portal/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function SpeciesPage() {
  const { data, isLoading } = useList<any>("species", { order: "name" });
  const insert = useInsert("species");
  const update = useUpdate("species");
  const [name, setName] = useState("");
  const list = data ?? [];

  const add = async () => {
    if (!name.trim()) return;
    await insert.mutateAsync({ name: name.trim(), is_active: true });
    setName("");
  };

  return (
    <div className="max-w-3xl">
      <PageHeader title="Wood Species" description={`${list.length} species`} />
      <Card className="mb-4">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-2">
          <Input placeholder="New species name…" value={name} onChange={(e) => setName(e.target.value)} className="flex-1" />
          <Button onClick={add} disabled={insert.isPending}><Plus className="h-4 w-4 mr-1" /> Add</Button>
        </CardContent>
      </Card>
      {isLoading ? <LoadingBlock /> : list.length === 0 ? <EmptyState label="No species." /> : (
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y">
              {list.map((s: any) => (
                <li key={s.id} className="flex items-center justify-between px-4 py-3">
                  <span className={!s.is_active ? "opacity-50" : ""}>{s.name}</span>
                  <Switch checked={!!s.is_active} onCheckedChange={(v) => update.mutate({ id: s.id, patch: { is_active: v } })} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}