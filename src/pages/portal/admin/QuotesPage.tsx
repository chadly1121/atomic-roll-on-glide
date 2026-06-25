import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useList } from "@/hooks/portal/usePortalData";
import { PageHeader, LoadingBlock, EmptyState, StatusBadge } from "@/components/portal/admin/AdminUI";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const STATUSES = ["all", "pending_review", "approved", "declined", "converted_to_order"] as const;

export default function QuotesPage() {
  const [params, setParams] = useSearchParams();
  const status = params.get("status") ?? "all";
  const clientFilter = params.get("client");

  const { data, isLoading } = useList<any>("quotes", { order: "created_at", ascending: false });
  const clients = useList<any>("clients");

  const rows = useMemo(() => {
    let r = data ?? [];
    if (status !== "all") r = r.filter((q: any) => q.status === status);
    if (clientFilter) r = r.filter((q: any) => q.client_id === clientFilter);
    return r;
  }, [data, status, clientFilter]);

  return (
    <div className="max-w-6xl">
      <PageHeader title="Quotes" description={`${rows.length} ${status === "all" ? "total" : status.replace(/_/g, " ")}`} actions={
        <Select value={status} onValueChange={(v) => { const p = new URLSearchParams(params); v === "all" ? p.delete("status") : p.set("status", v); setParams(p); }}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s} className="capitalize">{s.replace(/_/g, " ")}</SelectItem>)}</SelectContent>
        </Select>
      } />
      {isLoading ? <LoadingBlock /> : rows.length === 0 ? <EmptyState label="No quotes match this filter." /> : (
        <Card><CardContent className="p-0">
          <ul className="divide-y">
            {rows.map((q: any) => {
              const c = (clients.data ?? []).find((x: any) => x.id === q.client_id);
              return (
                <li key={q.id}>
                  <Link to={`/admin/quotes/${q.id}`} className="flex flex-col sm:flex-row sm:items-center gap-2 px-4 py-3 hover:bg-muted/40">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{q.quote_number} <span className="text-muted-foreground font-normal">· {c?.company_name ?? "—"}</span></div>
                      <div className="text-xs text-muted-foreground">{new Date(q.created_at).toLocaleDateString()} · {(q.quote_type ?? "").replace(/_/g, " ")}</div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <div className="text-sm font-medium">${Number(q.total_cost ?? 0).toFixed(2)}</div>
                      <StatusBadge status={q.status} kind="quote" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </CardContent></Card>
      )}
    </div>
  );
}