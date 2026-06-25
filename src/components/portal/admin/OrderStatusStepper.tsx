import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const ORDER_STEPS = [
  { key: "received", label: "Received" },
  { key: "in_queue", label: "In Queue" },
  { key: "in_progress", label: "In Progress" },
  { key: "quality_check", label: "Quality Check" },
  { key: "complete", label: "Complete" },
  { key: "shipped", label: "Shipped" },
] as const;

export type OrderStatus = typeof ORDER_STEPS[number]["key"];

export function OrderStatusStepper({ status, onChange, disabled }: { status: OrderStatus; onChange: (s: OrderStatus) => void; disabled?: boolean }) {
  const currentIdx = ORDER_STEPS.findIndex((s) => s.key === status);

  return (
    <div className="space-y-3">
      {/* Mobile-first: large tap targets, vertical list with active highlighted */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {ORDER_STEPS.map((s, i) => {
          const done = i < currentIdx;
          const active = i === currentIdx;
          return (
            <Button
              key={s.key}
              type="button"
              variant={active ? "default" : done ? "secondary" : "outline"}
              disabled={disabled}
              onClick={() => onChange(s.key)}
              className={cn(
                "h-14 sm:h-12 text-sm justify-start gap-2 px-3 font-medium",
                active && "ring-2 ring-primary ring-offset-1"
              )}
            >
              <span className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0",
                active ? "bg-primary-foreground text-primary" :
                done ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"
              )}>
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className="truncate">{s.label}</span>
            </Button>
          );
        })}
      </div>
      {currentIdx < ORDER_STEPS.length - 1 && (
        <Button
          type="button"
          size="lg"
          className="w-full h-14 text-base"
          disabled={disabled}
          onClick={() => onChange(ORDER_STEPS[currentIdx + 1].key)}
        >
          Advance to {ORDER_STEPS[currentIdx + 1].label} →
        </Button>
      )}
    </div>
  );
}