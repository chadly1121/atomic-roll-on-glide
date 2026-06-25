import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCurrentClient } from "@/hooks/portal/useCurrentClient";
import { PageHeader, StatCard, StatusBadge, LoadingBlock, EmptyState } from "@/components/portal/admin/AdminUI";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Package, FileText } from "lucide-react";

export default function ClientDashboardPage() {
  const { data: client, isLoading } = useCurrentClient();

  const { data: quotes = [] } = useQuery({
    queryKey: ["client_quotes", client?.id],
    enabled: !!client?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quotes")
        .select("*")
        .eq("client_id", client!.id)
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["client_orders", client?.id],
    enabled: !!client?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("client_id", client!.id)
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data ?? [];
    },
  });

  if (isLoading) return <LoadingBlock />;

  const pending = quotes.filter((q: any) => q.status === "pending_review").length;
  const approved = quotes.filter((q: any) => q.status === "approved").length;
  const activeOrders = orders.filter((o: any) => !["complete", "shipped"].includes(o.status)).length;

  return (
    <div className="space-y-6 max-w-6xl">
      <PageHeader
        title={`Welcome${client?.contact_name ? `, ${client.contact_name}` : ""}`}
        description="Manage your prefinishing quotes and track production."
        actions={
          <Button asChild>
            <Link to="/client/quote/new" className="gap-2">
              <ClipboardList className="h-4 w-4" /> New Quote
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard label="Pending review" value={pending} accent={pending ? "warn" : "default"} to="/client/quotes" />
        <StatCard label="Approved quotes" value={approved} accent="ok" to="/client/quotes" />
        <StatCard label="Active orders" value={activeOrders} accent="info" to="/client/orders" />
        <StatCard label="Total orders" value={orders.length} to="/client/orders" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4" /> Recent Quotes</CardTitle>
            <Button asChild variant="ghost" size="sm"><Link to="/client/quotes">View all</Link></Button>
          </CardHeader>
          <CardContent>
            {quotes.length === 0 ? <EmptyState label="No quotes yet." /> : (
              <ul className="divide-y">
                {quotes.map((q: any) => (
                  <li key={q.id}>
                    <Link to={`/client/quotes/${q.id}`} className="flex items-center justify-between py-3 hover:bg-muted/50 rounded px-2 -mx-2">
                      <div>
                        <div className="font-medium text-sm">{q.quote_number}</div>
                        <div className="text-xs text-muted-foreground capitalize">{q.quote_type.replace("_", " ")} · ${Number(q.total_cost).toFixed(2)}</div>
                      </div>
                      <StatusBadge status={q.status} kind="quote" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2"><Package className="h-4 w-4" /> Recent Orders</CardTitle>
            <Button asChild variant="ghost" size="sm"><Link to="/client/orders">View all</Link></Button>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? <EmptyState label="No orders yet." /> : (
              <ul className="divide-y">
                {orders.map((o: any) => (
                  <li key={o.id}>
                    <Link to={`/client/orders/${o.id}`} className="flex items-center justify-between py-3 hover:bg-muted/50 rounded px-2 -mx-2">
                      <div>
                        <div className="font-medium text-sm">{o.order_number}</div>
                        <div className="text-xs text-muted-foreground">{o.job_number ?? "—"}</div>
                      </div>
                      <StatusBadge status={o.status} kind="order" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}