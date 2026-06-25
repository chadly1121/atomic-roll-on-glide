import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useList } from "@/hooks/portal/usePortalData";
import { PageHeader, LoadingBlock, EmptyState, StatusBadge } from "@/components/portal/admin/AdminUI";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const STATUSES = ["all", "received", "in_queue", "in_progress", "quality_check", "complete", "shipped"] as const;

export default function OrdersPage() {
  const [params, setParams] = useSearchParams();
  const status = params.get("status") ?? "all";
  const clientFilter = params.get("client");

  const { data, isLoading } = useList<any>("orders", { order: "created_at", ascending: false });
  const clients = useList<any>("clients");

  const rows = useMemo(() => {
    let r = data ?? [];
    if (status !== "all") r = r.filter((o: any) => o.status === status);
    if (clientFilter) r = r.filter((o: any) => o.client_id === clientFilter);
    return r;
  }, [data, status, clientFilter]);

  return (
    <div className="max-w-6xl">
      <PageHeader title="Orders" description={`${rows.length} ${status === "all" ? "total" : status.replace(/_/g, " ")}`} actions={
        <Select value={status} onValueChange={(v) => { const p = new URLSearchParams(params); v === "all" ? p.delete("status") : p.set("status", v); setParams(p); }}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s} className="capitalize">{s.replace(/_/g, " ")}</SelectItem>)}</SelectContent>
        </Select>
      } />
      {isLoading ? <LoadingBlock /> : rows.length === 0 ? <EmptyState label="No orders match this filter." /> : (
        <Card><CardContent className="p-0">
          <ul className="divide-y">
            {rows.map((o: any) => {
              const c = (clients.data ?? []).find((x: any) => x.id === o.client_id);
              return (
                <li key={o.id}>
                  <Link to={`/admin/orders/${o.id}`} className="flex flex-col sm:flex-row sm:items-center gap-2 px-4 py-3 hover:bg-muted/40">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{o.order_number} <span className="text-muted-foreground font-normal">· {c?.company_name ?? "—"}</span></div>
                      <div className="text-xs text-muted-foreground">Job {o.job_number ?? "—"} · PO {o.purchase_order_number ?? "—"}</div>
                    </div>
                    <StatusBadge status={o.status} kind="order" />
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