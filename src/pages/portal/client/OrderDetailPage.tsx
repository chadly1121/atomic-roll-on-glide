import { formatDateCA, formatDateTimeCA } from "@/lib/format";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, StatusBadge, LoadingBlock } from "@/components/portal/admin/AdminUI";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";

const STEPS = ["received", "in_queue", "in_progress", "quality_check", "complete", "shipped"] as const;

export default function ClientOrderDetailPage() {
  const { id } = useParams();

  const { data: order, isLoading } = useQuery({
    queryKey: ["client_order", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").eq("id", id!).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: history = [] } = useQuery({
    queryKey: ["client_order_history", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("order_status_history")
        .select("*")
        .eq("order_id", id!)
        .order("changed_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  if (isLoading) return <LoadingBlock />;
  if (!order) return <div>Order not found.</div>;

  const currentIdx = STEPS.indexOf(order.status as any);

  return (
    <div className="space-y-6 max-w-5xl">
      <Button asChild variant="ghost" size="sm" className="gap-2"><Link to="/client/orders"><ArrowLeft className="h-4 w-4" /> All orders</Link></Button>
      <PageHeader
        title={`Order ${order.order_number}`}
        description={order.job_number ? `Job #${order.job_number}` : undefined}
        actions={<StatusBadge status={order.status} kind="order" />}
      />

      <Card>
        <CardHeader><CardTitle className="text-base">Production status</CardTitle></CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {STEPS.map((step, idx) => {
              const done = idx <= currentIdx;
              return (
                <li key={step} className="flex items-center gap-3">
                  {done ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                  <span className={`capitalize text-sm ${done ? "font-medium" : "text-muted-foreground"}`}>{step.replace("_", " ")}</span>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Job details</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1.5">
            <Row label="End builder" value={order.end_builder_name} />
            <Row label="Site" value={[order.job_site_address, order.job_site_city].filter(Boolean).join(", ")} />
            <Row label="Wood supplied by" value={order.wood_supplied_by} />
            <Row label="Anticipated start" value={order.anticipated_start_date} />
            <Row label="Anticipated end" value={order.anticipated_end_date} />
            <Row label="Rush order" value={order.rush_order ? "Yes" : "No"} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">History</CardTitle></CardHeader>
          <CardContent>
            {history.length === 0 ? <div className="text-sm text-muted-foreground">No status changes yet.</div> : (
              <ul className="text-sm divide-y">
                {history.map((h: any) => (
                  <li key={h.id} className="py-2 flex justify-between gap-2">
                    <span className="capitalize">{h.from_status?.replace("_", " ") ?? "—"} → <strong>{h.to_status?.replace("_", " ")}</strong></span>
                    <span className="text-xs text-muted-foreground shrink-0">{formatDateTimeCA(h.changed_at)}</span>
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

function Row({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right">{value ?? "—"}</span>
    </div>
  );
}