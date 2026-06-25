import { formatDateCA, formatDateTimeCA } from "@/lib/format";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCurrentClient } from "@/hooks/portal/useCurrentClient";
import { PageHeader, StatusBadge, LoadingBlock, EmptyState } from "@/components/portal/admin/AdminUI";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ClientQuotesPage() {
  const { data: client } = useCurrentClient();
  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ["client_quotes_full", client?.id],
    enabled: !!client?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quotes")
        .select("*")
        .eq("client_id", client!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <div className="space-y-4 max-w-6xl">
      <PageHeader
        title="My Quotes"
        actions={
          <Button asChild><Link to="/client/quote/new" className="gap-2"><Plus className="h-4 w-4" /> New Quote</Link></Button>
        }
      />
      {isLoading ? <LoadingBlock /> : quotes.length === 0 ? (
        <EmptyState label="No quotes yet. Click 'New Quote' to get started." />
      ) : (
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y">
              {quotes.map((q: any) => (
                <li key={q.id}>
                  <Link to={`/client/quotes/${q.id}`} className="flex items-center justify-between p-4 hover:bg-muted/40 gap-4">
                    <div className="min-w-0">
                      <div className="font-medium truncate">{q.quote_number} <span className="text-muted-foreground text-xs">· {formatDateCA(q.created_at)}</span></div>
                      <div className="text-xs text-muted-foreground capitalize truncate">{q.quote_type.replace("_", " ")} · {q.client_notes?.split("\n")[0] ?? "—"}</div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right text-sm"><div className="font-medium">${Number(q.total_cost).toFixed(2)}</div></div>
                      <StatusBadge status={q.status} kind="quote" />
                    </div>
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