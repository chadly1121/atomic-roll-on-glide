ALTER TABLE public.quote_requests
  ADD COLUMN owns_cottage text,
  ADD COLUMN cottage_location text,
  ADD COLUMN property_type text,
  ADD COLUMN property_value_range text,
  ADD COLUMN lead_tags text[] DEFAULT '{}',
  ADD COLUMN internal_notes text;