import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useCurrentClient() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["clients", "me", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("auth_user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      // Self-heal: ensure a client row exists for this user
      if (!data) {
        const { data: created, error: insErr } = await supabase
          .from("clients")
          .insert({ auth_user_id: user!.id, email: user!.email, contact_name: user!.email })
          .select()
          .maybeSingle();
        if (insErr) throw insErr;
        return created;
      }
      return data;
    },
  });
}