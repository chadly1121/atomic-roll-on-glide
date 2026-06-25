import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Table =
  | "coating_products"
  | "profiles_lumber"
  | "species"
  | "labour_rates"
  | "cedar_shake_pricing"
  | "clients"
  | "quotes"
  | "orders"
  | "quote_lumber_items"
  | "quote_shake_items"
  | "labour_rate_history"
  | "cedar_shake_pricing_history"
  | "order_status_history";

export function useList<T = any>(table: Table, opts?: { order?: string; ascending?: boolean; filter?: (q: any) => any }) {
  return useQuery({
    queryKey: [table, opts?.order, opts?.ascending, !!opts?.filter],
    queryFn: async () => {
      let q: any = (supabase as any).from(table).select("*");
      if (opts?.filter) q = opts.filter(q);
      if (opts?.order) q = q.order(opts.order, { ascending: opts.ascending ?? true });
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as T[];
    },
  });
}

export function useRow<T = any>(table: Table, id: string | undefined) {
  return useQuery({
    queryKey: [table, "one", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await (supabase as any).from(table).select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data as T | null;
    },
  });
}

export function useUpsert(table: Table, opts?: { invalidate?: Table[]; successMsg?: string }) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (row: any) => {
      const { data, error } = await (supabase as any).from(table).upsert(row).select().maybeSingle();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      [table, ...(opts?.invalidate ?? [])].forEach((t) => qc.invalidateQueries({ queryKey: [t] }));
      toast.success(opts?.successMsg ?? "Saved");
    },
    onError: (e: any) => toast.error(e?.message ?? "Save failed"),
  });
}

export function useUpdate(table: Table, opts?: { invalidate?: Table[]; successMsg?: string }) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Record<string, any> }) => {
      const { data, error } = await (supabase as any).from(table).update(patch).eq("id", id).select().maybeSingle();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      [table, ...(opts?.invalidate ?? [])].forEach((t) => qc.invalidateQueries({ queryKey: [t] }));
      toast.success(opts?.successMsg ?? "Updated");
    },
    onError: (e: any) => toast.error(e?.message ?? "Update failed"),
  });
}

export function useInsert(table: Table, opts?: { invalidate?: Table[]; successMsg?: string }) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (row: any) => {
      const { data, error } = await (supabase as any).from(table).insert(row).select().maybeSingle();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      [table, ...(opts?.invalidate ?? [])].forEach((t) => qc.invalidateQueries({ queryKey: [t] }));
      toast.success(opts?.successMsg ?? "Created");
    },
    onError: (e: any) => toast.error(e?.message ?? "Create failed"),
  });
}

export function useDelete(table: Table, opts?: { invalidate?: Table[] }) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      [table, ...(opts?.invalidate ?? [])].forEach((t) => qc.invalidateQueries({ queryKey: [t] }));
      toast.success("Deleted");
    },
    onError: (e: any) => toast.error(e?.message ?? "Delete failed"),
  });
}