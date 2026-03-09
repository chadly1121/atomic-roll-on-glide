CREATE TABLE IF NOT EXISTS public.edge_function_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  function_name text NOT NULL,
  attempted_at timestamptz NOT NULL DEFAULT now()
);

-- Index for fast lookups
CREATE INDEX idx_rate_limits_ip_fn_time ON public.edge_function_rate_limits (ip_address, function_name, attempted_at DESC);

-- Enable RLS and deny all client access (only service role uses this)
ALTER TABLE public.edge_function_rate_limits ENABLE ROW LEVEL SECURITY;

-- Cleanup function to purge old entries (> 1 hour)
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  DELETE FROM public.edge_function_rate_limits WHERE attempted_at < now() - interval '1 hour';
$$;