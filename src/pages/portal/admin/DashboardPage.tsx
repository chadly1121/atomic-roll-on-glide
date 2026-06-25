import { formatDateCA, formatDateTimeCA } from "@/lib/format";
import { useList } from "@/hooks/portal/usePortalData";
import { PageHeader, StatCard, LoadingBlock } from "@/components/portal/admin/AdminUI";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/portal/admin/AdminUI";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const quotes = useList<any>("quotes", { order: "created_at", ascending: false });
  const orders = useList<any>("orders", { order: "created_at", ascending: false });

  const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0,0,0,0);

  const pending = (quotes.data ?? []).filter(q => q.status === "pending_review").length;
  const activeOrders = (orders.data ?? []).filter(o => !["complete","shipped"].includes(o.status)).length;
  const inProgress = (orders.data ?? []).filter(o => o.status === "in_progress").length;
  const completedMonth = (orders.data ?? []).filter(o => ["complete","shipped"].includes(o.status) && o.actual_end_date && new Date(o.actual_end_date) >= monthStart).length;

  const activity = [
    ...(quotes.data ?? []).slice(0,5).map((q:any) => ({ kind:"quote", id:q.id, label:`Quote ${q.quote_number}`, status:q.status, at:q.created_at })),
    ...(orders.data ?? []).slice(0,5).map((o:any) => ({ kind:"order", id:o.id, label:`Order ${o.order_number}`, status:o.status, at:o.created_at })),
  ].sort((a,b) => new Date(b.at).getTime() - new Date(a.at).getTime()).slice(0,10);

  return (
    <div className="max-w-6xl">
      <PageHeader title="Dashboard" description="Overview of quotes and production" />
      {(quotes.isLoading || orders.isLoading) ? <LoadingBlock /> : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <StatCard label="Pending quotes" value={pending} accent="warn" to="/admin/quotes?status=pending_review" />
            <StatCard label="Active orders" value={activeOrders} accent="info" to="/admin/orders" />
            <StatCard label="In progress" value={inProgress} to="/admin/orders?status=in_progress" />
            <StatCard label="Completed this month" value={completedMonth} accent="ok" />
          </div>
          <Card>
            <CardHeader><CardTitle className="text-base">Recent activity</CardTitle></CardHeader>
            <CardContent className="p-0">
              {activity.length === 0 ? (
                <div className="p-6 text-sm text-muted-foreground">Nothing yet.</div>
              ) : (
                <ul className="divide-y">
                  {activity.map(a => (
                    <li key={`${a.kind}-${a.id}`} className="flex items-center justify-between px-4 py-3 gap-3">
                      <Link to={`/admin/${a.kind === "quote" ? "quotes" : "orders"}/${a.id}`} className="text-sm hover:underline truncate">
                        {a.label}
                      </Link>
                      <div className="flex items-center gap-2 shrink-0">
                        <StatusBadge status={a.status} kind={a.kind as any} />
                        <span className="text-xs text-muted-foreground hidden sm:inline">{new Date(a.at).toLocaleDateString()}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}