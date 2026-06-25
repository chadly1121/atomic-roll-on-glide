import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({ label, value, hint, to, accent }: { label: string; value: React.ReactNode; hint?: string; to?: string; accent?: "default" | "warn" | "ok" | "info" }) {
  const accentCls =
    accent === "warn" ? "border-yellow-300 bg-yellow-50/60" :
    accent === "ok" ? "border-green-300 bg-green-50/60" :
    accent === "info" ? "border-blue-300 bg-blue-50/60" : "";
  const body = (
    <Card className={cn("transition-shadow", to && "hover:shadow-md cursor-pointer", accentCls)}>
      <CardContent className="p-4">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="font-serif text-3xl mt-1">{value}</div>
        {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
      </CardContent>
    </Card>
  );
  return to ? <Link to={to}>{body}</Link> : body;
}

const QUOTE_BADGE: Record<string, string> = {
  pending_review: "bg-yellow-100 text-yellow-900 border-yellow-300",
  approved: "bg-green-100 text-green-900 border-green-300",
  declined: "bg-red-100 text-red-900 border-red-300",
  converted_to_order: "bg-blue-100 text-blue-900 border-blue-300",
};
const ORDER_BADGE: Record<string, string> = {
  received: "bg-slate-100 text-slate-900 border-slate-300",
  in_queue: "bg-yellow-100 text-yellow-900 border-yellow-300",
  in_progress: "bg-blue-100 text-blue-900 border-blue-300",
  quality_check: "bg-purple-100 text-purple-900 border-purple-300",
  complete: "bg-green-100 text-green-900 border-green-300",
  shipped: "bg-emerald-200 text-emerald-900 border-emerald-400",
};

export function StatusBadge({ status, kind }: { status: string; kind: "quote" | "order" }) {
  const map = kind === "quote" ? QUOTE_BADGE : ORDER_BADGE;
  const cls = map[status] ?? "bg-muted text-foreground";
  return <Badge variant="outline" className={cn("capitalize border", cls)}>{status.replace(/_/g, " ")}</Badge>;
}

export function LoadingBlock({ label = "Loading…" }: { label?: string }) {
  return <div className="py-12 text-center text-sm text-muted-foreground">{label}</div>;
}

export function EmptyState({ label }: { label: string }) {
  return <div className="py-12 text-center text-sm text-muted-foreground border border-dashed rounded-md">{label}</div>;
}