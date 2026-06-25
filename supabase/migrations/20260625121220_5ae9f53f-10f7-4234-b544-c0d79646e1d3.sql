
-- Labour rate history
CREATE TABLE public.labour_rate_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES public.profiles_lumber(id) ON DELETE CASCADE,
  rate_per_lineal_ft_per_pass numeric NOT NULL,
  effective_date date NOT NULL DEFAULT CURRENT_DATE,
  changed_by uuid REFERENCES auth.users(id),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.labour_rate_history TO authenticated;
GRANT ALL ON public.labour_rate_history TO service_role;
ALTER TABLE public.labour_rate_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read labour history" ON public.labour_rate_history FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins write labour history" ON public.labour_rate_history FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));

-- Shake pricing history
CREATE TABLE public.cedar_shake_pricing_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  labour_per_bundle_per_coat numeric NOT NULL,
  changed_by uuid REFERENCES auth.users(id),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.cedar_shake_pricing_history TO authenticated;
GRANT ALL ON public.cedar_shake_pricing_history TO service_role;
ALTER TABLE public.cedar_shake_pricing_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read shake history" ON public.cedar_shake_pricing_history FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins write shake history" ON public.cedar_shake_pricing_history FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));

-- Order status history (lightweight stepper log)
CREATE TABLE public.order_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status public.order_status NOT NULL,
  changed_by uuid REFERENCES auth.users(id),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.order_status_history TO authenticated;
GRANT ALL ON public.order_status_history TO service_role;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read order history" ON public.order_status_history FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Clients read own order history" ON public.order_status_history FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.orders o JOIN public.clients c ON c.id=o.client_id WHERE o.id=order_status_history.order_id AND c.auth_user_id=auth.uid()));
CREATE POLICY "Admins write order history" ON public.order_status_history FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
