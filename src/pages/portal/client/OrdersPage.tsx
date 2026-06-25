import { formatDateCA, formatDateTimeCA } from "@/lib/format";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCurrentClient } from "@/hooks/portal/useCurrentClient";
import { PageHeader, StatusBadge, LoadingBlock, EmptyState } from "@/components/portal/admin/AdminUI";
import { Card, CardContent } from "@/components/ui/card";

export default function ClientOrdersPage() {
  const { data: client } = useCurrentClient();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["client_orders_full", client?.id],
    enabled: !!client?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("client_id", client!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <div className="space-y-4 max-w-6xl">
      <PageHeader title="My Orders" description="Track production status across all your active jobs." />
      {isLoading ? <LoadingBlock /> : orders.length === 0 ? (
        <EmptyState label="No orders yet. Approved quotes appear here once converted." />
      ) : (
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y">
              {orders.map((o: any) => (
                <li key={o.id}>
                  <Link to={`/client/orders/${o.id}`} className="flex items-center justify-between p-4 hover:bg-muted/40 gap-4">
                    <div className="min-w-0">
                      <div className="font-medium truncate">{o.order_number}</div>
                      <div className="text-xs text-muted-foreground truncate">{o.job_number ?? "—"} · {new Date(o.created_at).toLocaleDateString()}</div>
                    </div>
                    <StatusBadge status={o.status} kind="order" />
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}