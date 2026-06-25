import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, StatusBadge, LoadingBlock } from "@/components/portal/admin/AdminUI";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function ClientQuoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [acting, setActing] = useState(false);

  const { data: quote, isLoading } = useQuery({
    queryKey: ["client_quote", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase.from("quotes").select("*").eq("id", id!).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: lumberItems = [] } = useQuery({
    queryKey: ["client_quote_lumber", id],
    enabled: !!quote && quote.quote_type === "lumber",
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quote_lumber_items")
        .select("*, profile:profiles_lumber(name), species:species(name), product:coating_products(name)")
        .eq("quote_id", id!);
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: shakeItems = [] } = useQuery({
    queryKey: ["client_quote_shake", id],
    enabled: !!quote && quote.quote_type === "cedar_shake",
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quote_shake_items")
        .select("*, product:coating_products(name)")
        .eq("quote_id", id!);
      if (error) throw error;
      return data ?? [];
    },
  });

  if (isLoading) return <LoadingBlock />;
  if (!quote) return <div>Quote not found.</div>;

  const accept = async () => {
    setActing(true);
    const { error } = await supabase.from("quotes").update({ status: "converted_to_order" as any }).eq("id", quote.id);
    setActing(false);
    if (error) return toast.error(error.message);
    toast.success("Accepted. Roll-On Painting will be in touch to schedule.");
    qc.invalidateQueries({ queryKey: ["client_quote", id] });
    qc.invalidateQueries({ queryKey: ["client_quotes"] });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <Button asChild variant="ghost" size="sm" className="gap-2"><Link to="/client/quotes"><ArrowLeft className="h-4 w-4" /> All quotes</Link></Button>
      <PageHeader
        title={`Quote ${quote.quote_number}`}
        description={`Submitted ${new Date(quote.created_at).toLocaleString()}`}
        actions={<StatusBadge status={quote.status} kind="quote" />}
      />

      {quote.admin_notes && (
        <Card className="border-blue-300 bg-blue-50/60">
          <CardHeader><CardTitle className="text-sm">Notes from Roll-On Painting</CardTitle></CardHeader>
          <CardContent className="text-sm whitespace-pre-wrap">{quote.admin_notes}</CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle className="text-base">Project</CardTitle></CardHeader>
        <CardContent className="text-sm whitespace-pre-wrap text-muted-foreground">{quote.client_notes ?? "—"}</CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Line Items</CardTitle></CardHeader>
        <CardContent>
          {quote.quote_type === "lumber" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-muted-foreground border-b">
                  <tr><th className="text-left py-2">Profile</th><th>LF</th><th>Coats F/B</th><th>Gallons</th><th className="text-right">Total</th></tr>
                </thead>
                <tbody className="divide-y">
                  {lumberItems.map((i: any) => (
                    <tr key={i.id}>
                      <td className="py-2">{i.profile?.name ?? "—"} <span className="text-xs text-muted-foreground">{i.species?.name}</span></td>
                      <td className="text-center">{i.lineal_feet}</td>
                      <td className="text-center">{i.coats_front}/{i.coats_back}</td>
                      <td className="text-center">{Number(i.gallons_required ?? 0).toFixed(2)}</td>
                      <td className="text-right">${Number(i.total_cost ?? 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-muted-foreground border-b">
                  <tr><th className="text-left py-2">Coating</th><th>Bundles</th><th>Coats</th><th className="text-right">Total</th></tr>
                </thead>
                <tbody className="divide-y">
                  {shakeItems.map((i: any) => (
                    <tr key={i.id}>
                      <td className="py-2">{i.product?.name ?? "—"}</td>
                      <td className="text-center">{i.number_of_bundles}</td>
                      <td className="text-center">{i.coats}</td>
                      <td className="text-right">${Number(i.total_cost ?? 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
          <div className="flex gap-6 text-sm">
            <div><div className="text-xs text-muted-foreground">Material</div><div className="font-medium">${Number(quote.total_material_cost).toFixed(2)}</div></div>
            <div><div className="text-xs text-muted-foreground">Labour</div><div className="font-medium">${Number(quote.total_labour_cost).toFixed(2)}</div></div>
            <div><div className="text-xs text-muted-foreground">Total</div><div className="font-serif text-xl font-semibold">${Number(quote.total_cost).toFixed(2)}</div></div>
          </div>
          {quote.status === "approved" && (
            <Button onClick={accept} disabled={acting}>{acting ? "Accepting…" : "Accept & convert to order"}</Button>
          )}
          {quote.status === "converted_to_order" && (
            <Button asChild variant="outline" onClick={() => navigate("/client/orders")}><Link to="/client/orders">View orders</Link></Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}