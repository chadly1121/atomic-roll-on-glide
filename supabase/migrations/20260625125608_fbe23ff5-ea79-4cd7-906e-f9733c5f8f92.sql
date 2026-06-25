
CREATE OR REPLACE FUNCTION public.generate_quote_number() RETURNS text
LANGUAGE sql VOLATILE SET search_path = public AS $$
  SELECT 'ROP-' || to_char(now() AT TIME ZONE 'America/Toronto', 'YYYY') || '-' || lpad(nextval('public.quote_number_seq')::text, 4, '0')
$$;

CREATE OR REPLACE FUNCTION public.generate_order_number() RETURNS text
LANGUAGE sql VOLATILE SET search_path = public AS $$
  SELECT 'ROO-' || to_char(now() AT TIME ZONE 'America/Toronto', 'YYYY') || '-' || lpad(nextval('public.order_number_seq')::text, 4, '0')
$$;

ALTER TABLE public.quotes ALTER COLUMN quote_number SET DEFAULT public.generate_quote_number();
ALTER TABLE public.orders ALTER COLUMN order_number SET DEFAULT public.generate_order_number();
