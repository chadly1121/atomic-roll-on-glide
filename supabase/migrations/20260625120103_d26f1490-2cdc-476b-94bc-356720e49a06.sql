
-- =========================================================================
-- ENUMS
-- =========================================================================
CREATE TYPE public.material_type AS ENUM ('wood', 'mdf');
CREATE TYPE public.profile_type AS ENUM ('tongue_groove', 'shiplap', 'bevel', 'board_batten', 'dimensional', 'other');
CREATE TYPE public.surface_type AS ENUM ('smooth', 'rough', 'mdf_preprimed', 'mdf_raw');
CREATE TYPE public.quote_type AS ENUM ('lumber', 'cedar_shake');
CREATE TYPE public.quote_status AS ENUM ('pending_review', 'approved', 'declined', 'converted_to_order');
CREATE TYPE public.wood_supplier AS ENUM ('client', 'roll_on');
CREATE TYPE public.delivery_method AS ENUM ('client_delivers', 'roll_on_picks_up', 'third_party');
CREATE TYPE public.order_status AS ENUM ('received', 'in_queue', 'in_progress', 'quality_check', 'complete', 'shipped');
CREATE TYPE public.payment_status AS ENUM ('unpaid', 'invoiced', 'partial', 'paid');

-- =========================================================================
-- HELPER: is_admin (uses existing has_role)
-- =========================================================================
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(_user_id, 'admin'::public.app_role);
$$;

-- =========================================================================
-- SPECIES
-- =========================================================================
CREATE TABLE public.species (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  is_active boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.species TO authenticated;
GRANT ALL ON public.species TO service_role;
ALTER TABLE public.species ENABLE ROW LEVEL SECURITY;
CREATE POLICY "species read auth" ON public.species FOR SELECT TO authenticated USING (true);
CREATE POLICY "species admin write" ON public.species FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

INSERT INTO public.species (name) VALUES
  ('Douglas Fir'), ('Red Cedar'), ('Yellow Cedar'), ('Pine'), ('Spruce');

-- =========================================================================
-- PROFILES_LUMBER (named profiles_lumber to avoid clash with user profiles)
-- =========================================================================
CREATE TABLE public.profiles_lumber (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  material_type public.material_type NOT NULL,
  profile_type public.profile_type NOT NULL,
  nominal_width_inches numeric NOT NULL,
  nominal_thickness_inches numeric NOT NULL,
  actual_width_inches numeric NOT NULL,
  actual_thickness_inches numeric NOT NULL,
  surface_type public.surface_type NOT NULL,
  total_sqft_per_lineal_ft numeric NOT NULL,
  back_face_sqft_per_lineal_ft numeric NOT NULL,
  edge_sqft_per_lineal_ft numeric NOT NULL,
  front_face_sqft_per_lineal_ft numeric NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.profiles_lumber TO authenticated;
GRANT ALL ON public.profiles_lumber TO service_role;
ALTER TABLE public.profiles_lumber ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_lumber read auth" ON public.profiles_lumber FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_lumber admin write" ON public.profiles_lumber FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- Helper insert function for profile rows (computes sqft fields)
-- Conventions: actual dims passed; for T&G adds tongue (0.25") + 2 groove walls (0.25" each) to back surface area.
-- All sqft/lin-ft = inches / 12.
-- Coverage assumptions:
--   front_face = actual_width / 12
--   back_face  = actual_width / 12  (+ tongue 0.25/12 for T&G + 2 * groove wall 0.25/12 for T&G)
--   edges      = 2 * actual_thickness / 12
--   total      = front + back + edges
-- For board & batten 1x8 + 1x2 batten: treat as 1x8 face + add batten exposed surfaces
--   (batten front 1.5/12, batten 2 edges 2*0.75/12) added to front_face; back stays 1x8 back.

-- WOOD T&G
INSERT INTO public.profiles_lumber
  (name, material_type, profile_type, nominal_width_inches, nominal_thickness_inches,
   actual_width_inches, actual_thickness_inches, surface_type,
   front_face_sqft_per_lineal_ft, back_face_sqft_per_lineal_ft,
   edge_sqft_per_lineal_ft, total_sqft_per_lineal_ft)
VALUES
  -- T&G 1x4 (actual 3.5 x 0.75); T&G extras = 0.25 tongue + 2*0.25 groove walls = 0.75"
  ('T&G 1x4 Smooth','wood','tongue_groove',4,1,3.5,0.75,'smooth', 3.5/12, (3.5+0.75)/12, 2*0.75/12, (3.5 + 3.5+0.75 + 2*0.75)/12),
  ('T&G 1x4 Rough','wood','tongue_groove',4,1,3.5,0.75,'rough',  3.5/12, (3.5+0.75)/12, 2*0.75/12, (3.5 + 3.5+0.75 + 2*0.75)/12),
  ('T&G 1x6 Smooth','wood','tongue_groove',6,1,5.5,0.75,'smooth', 5.5/12, (5.5+0.75)/12, 2*0.75/12, (5.5 + 5.5+0.75 + 2*0.75)/12),
  ('T&G 1x6 Rough','wood','tongue_groove',6,1,5.5,0.75,'rough',  5.5/12, (5.5+0.75)/12, 2*0.75/12, (5.5 + 5.5+0.75 + 2*0.75)/12),
  ('T&G 1x8 Smooth','wood','tongue_groove',8,1,7.25,0.75,'smooth',7.25/12,(7.25+0.75)/12,2*0.75/12,(7.25 + 7.25+0.75 + 2*0.75)/12),
  ('T&G 1x8 Rough','wood','tongue_groove',8,1,7.25,0.75,'rough', 7.25/12,(7.25+0.75)/12,2*0.75/12,(7.25 + 7.25+0.75 + 2*0.75)/12),
  -- Shiplap (no T&G extras)
  ('Shiplap 1x6 Smooth','wood','shiplap',6,1,5.5,0.75,'smooth',5.5/12,5.5/12,2*0.75/12,(2*5.5 + 2*0.75)/12),
  ('Shiplap 1x6 Rough','wood','shiplap',6,1,5.5,0.75,'rough', 5.5/12,5.5/12,2*0.75/12,(2*5.5 + 2*0.75)/12),
  ('Shiplap 1x8 Smooth','wood','shiplap',8,1,7.25,0.75,'smooth',7.25/12,7.25/12,2*0.75/12,(2*7.25 + 2*0.75)/12),
  ('Shiplap 1x8 Rough','wood','shiplap',8,1,7.25,0.75,'rough', 7.25/12,7.25/12,2*0.75/12,(2*7.25 + 2*0.75)/12),
  -- Bevel
  ('Bevel 1x6 Smooth','wood','bevel',6,1,5.5,0.75,'smooth',5.5/12,5.5/12,2*0.75/12,(2*5.5 + 2*0.75)/12),
  ('Bevel 1x6 Rough','wood','bevel',6,1,5.5,0.75,'rough', 5.5/12,5.5/12,2*0.75/12,(2*5.5 + 2*0.75)/12),
  ('Bevel 1x8 Smooth','wood','bevel',8,1,7.25,0.75,'smooth',7.25/12,7.25/12,2*0.75/12,(2*7.25 + 2*0.75)/12),
  ('Bevel 1x8 Rough','wood','bevel',8,1,7.25,0.75,'rough', 7.25/12,7.25/12,2*0.75/12,(2*7.25 + 2*0.75)/12),
  -- Board & Batten 1x8 + 1x2 batten: front = 1x8 face (7.25) + batten front (1.5) + batten 2 edges (2*0.75)
  ('Board & Batten 1x8 with 1x2 batten Smooth','wood','board_batten',8,1,7.25,0.75,'smooth',
    (7.25 + 1.5 + 2*0.75)/12, 7.25/12, 2*0.75/12,
    ((7.25 + 1.5 + 2*0.75) + 7.25 + 2*0.75)/12),
  ('Board & Batten 1x8 with 1x2 batten Rough','wood','board_batten',8,1,7.25,0.75,'rough',
    (7.25 + 1.5 + 2*0.75)/12, 7.25/12, 2*0.75/12,
    ((7.25 + 1.5 + 2*0.75) + 7.25 + 2*0.75)/12),
  -- Dimensional
  ('Dimensional 1x6 Smooth','wood','dimensional',6,1,5.5,0.75,'smooth',5.5/12,5.5/12,2*0.75/12,(2*5.5+2*0.75)/12),
  ('Dimensional 1x6 Rough','wood','dimensional',6,1,5.5,0.75,'rough', 5.5/12,5.5/12,2*0.75/12,(2*5.5+2*0.75)/12),
  ('Dimensional 1x8 Smooth','wood','dimensional',8,1,7.25,0.75,'smooth',7.25/12,7.25/12,2*0.75/12,(2*7.25+2*0.75)/12),
  ('Dimensional 1x8 Rough','wood','dimensional',8,1,7.25,0.75,'rough', 7.25/12,7.25/12,2*0.75/12,(2*7.25+2*0.75)/12),
  ('Dimensional 2x6 Smooth','wood','dimensional',6,2,5.5,1.5,'smooth',5.5/12,5.5/12,2*1.5/12,(2*5.5+2*1.5)/12),
  ('Dimensional 2x6 Rough','wood','dimensional',6,2,5.5,1.5,'rough', 5.5/12,5.5/12,2*1.5/12,(2*5.5+2*1.5)/12),
  -- MDF T&G
  ('MDF T&G 1x4 Preprimed','mdf','tongue_groove',4,1,3.5,0.75,'mdf_preprimed',3.5/12,(3.5+0.75)/12,2*0.75/12,(3.5+3.5+0.75+2*0.75)/12),
  ('MDF T&G 1x4 Raw','mdf','tongue_groove',4,1,3.5,0.75,'mdf_raw',       3.5/12,(3.5+0.75)/12,2*0.75/12,(3.5+3.5+0.75+2*0.75)/12),
  ('MDF T&G 1x6 Preprimed','mdf','tongue_groove',6,1,5.5,0.75,'mdf_preprimed',5.5/12,(5.5+0.75)/12,2*0.75/12,(5.5+5.5+0.75+2*0.75)/12),
  ('MDF T&G 1x6 Raw','mdf','tongue_groove',6,1,5.5,0.75,'mdf_raw',       5.5/12,(5.5+0.75)/12,2*0.75/12,(5.5+5.5+0.75+2*0.75)/12),
  ('MDF T&G 1x8 Preprimed','mdf','tongue_groove',8,1,7.25,0.75,'mdf_preprimed',7.25/12,(7.25+0.75)/12,2*0.75/12,(7.25+7.25+0.75+2*0.75)/12),
  ('MDF T&G 1x8 Raw','mdf','tongue_groove',8,1,7.25,0.75,'mdf_raw',       7.25/12,(7.25+0.75)/12,2*0.75/12,(7.25+7.25+0.75+2*0.75)/12),
  -- MDF Shiplap
  ('MDF Shiplap 1x6 Preprimed','mdf','shiplap',6,1,5.5,0.75,'mdf_preprimed',5.5/12,5.5/12,2*0.75/12,(2*5.5+2*0.75)/12),
  ('MDF Shiplap 1x6 Raw','mdf','shiplap',6,1,5.5,0.75,'mdf_raw',           5.5/12,5.5/12,2*0.75/12,(2*5.5+2*0.75)/12),
  ('MDF Shiplap 1x8 Preprimed','mdf','shiplap',8,1,7.25,0.75,'mdf_preprimed',7.25/12,7.25/12,2*0.75/12,(2*7.25+2*0.75)/12),
  ('MDF Shiplap 1x8 Raw','mdf','shiplap',8,1,7.25,0.75,'mdf_raw',           7.25/12,7.25/12,2*0.75/12,(2*7.25+2*0.75)/12),
  -- MDF Dimensional
  ('MDF 1x4 Preprimed','mdf','dimensional',4,1,3.5,0.75,'mdf_preprimed',3.5/12,3.5/12,2*0.75/12,(2*3.5+2*0.75)/12),
  ('MDF 1x4 Raw','mdf','dimensional',4,1,3.5,0.75,'mdf_raw',           3.5/12,3.5/12,2*0.75/12,(2*3.5+2*0.75)/12),
  ('MDF 1x6 Preprimed','mdf','dimensional',6,1,5.5,0.75,'mdf_preprimed',5.5/12,5.5/12,2*0.75/12,(2*5.5+2*0.75)/12),
  ('MDF 1x6 Raw','mdf','dimensional',6,1,5.5,0.75,'mdf_raw',           5.5/12,5.5/12,2*0.75/12,(2*5.5+2*0.75)/12),
  ('MDF 1x8 Preprimed','mdf','dimensional',8,1,7.25,0.75,'mdf_preprimed',7.25/12,7.25/12,2*0.75/12,(2*7.25+2*0.75)/12),
  ('MDF 1x8 Raw','mdf','dimensional',8,1,7.25,0.75,'mdf_raw',           7.25/12,7.25/12,2*0.75/12,(2*7.25+2*0.75)/12);

-- =========================================================================
-- COATING_PRODUCTS
-- =========================================================================
CREATE TABLE public.coating_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  manufacturer text,
  cost_per_gallon numeric NOT NULL,
  sale_price_per_gallon numeric GENERATED ALWAYS AS (cost_per_gallon / 0.60) STORED,
  coverage_smooth_sqft_per_gallon numeric NOT NULL DEFAULT 300,
  coverage_rough_sqft_per_gallon numeric NOT NULL DEFAULT 250,
  coverage_mdf_preprimed_sqft_per_gallon numeric NOT NULL DEFAULT 300,
  coverage_mdf_raw_first_coat_sqft_per_gallon numeric NOT NULL DEFAULT 200,
  coverage_mdf_raw_subsequent_sqft_per_gallon numeric NOT NULL DEFAULT 300,
  is_active boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.coating_products TO authenticated;
GRANT ALL ON public.coating_products TO service_role;
ALTER TABLE public.coating_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coatings read auth" ON public.coating_products FOR SELECT TO authenticated USING (true);
CREATE POLICY "coatings admin write" ON public.coating_products FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- =========================================================================
-- LABOUR_RATES
-- =========================================================================
CREATE TABLE public.labour_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES public.profiles_lumber(id) ON DELETE CASCADE,
  rate_per_lineal_ft_per_pass numeric NOT NULL,
  effective_date date NOT NULL DEFAULT CURRENT_DATE,
  is_active boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.labour_rates TO authenticated;
GRANT ALL ON public.labour_rates TO service_role;
ALTER TABLE public.labour_rates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "labour read auth" ON public.labour_rates FOR SELECT TO authenticated USING (true);
CREATE POLICY "labour admin write" ON public.labour_rates FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- =========================================================================
-- CEDAR_SHAKE_PRICING
-- =========================================================================
CREATE TABLE public.cedar_shake_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  labour_per_bundle_per_coat numeric NOT NULL DEFAULT 125.00,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.cedar_shake_pricing TO authenticated;
GRANT ALL ON public.cedar_shake_pricing TO service_role;
ALTER TABLE public.cedar_shake_pricing ENABLE ROW LEVEL SECURITY;
CREATE POLICY "shake read auth" ON public.cedar_shake_pricing FOR SELECT TO authenticated USING (true);
CREATE POLICY "shake admin write" ON public.cedar_shake_pricing FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

INSERT INTO public.cedar_shake_pricing (labour_per_bundle_per_coat) VALUES (125.00);

-- =========================================================================
-- CLIENTS
-- =========================================================================
CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  company_name text,
  contact_name text,
  email text,
  phone text,
  address text,
  city text,
  province text,
  postal_code text,
  is_active boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.clients TO authenticated;
GRANT ALL ON public.clients TO service_role;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clients self select" ON public.clients FOR SELECT TO authenticated
  USING (auth_user_id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "clients self insert" ON public.clients FOR INSERT TO authenticated
  WITH CHECK (auth_user_id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "clients self update" ON public.clients FOR UPDATE TO authenticated
  USING (auth_user_id = auth.uid() OR public.is_admin(auth.uid()))
  WITH CHECK (auth_user_id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "clients admin delete" ON public.clients FOR DELETE TO authenticated
  USING (public.is_admin(auth.uid()));

-- Helper: does the current user own this client_id?
CREATE OR REPLACE FUNCTION public.owns_client(_user_id uuid, _client_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.clients WHERE id = _client_id AND auth_user_id = _user_id);
$$;

-- =========================================================================
-- QUOTES
-- =========================================================================
CREATE SEQUENCE public.quote_number_seq START 1000;
CREATE SEQUENCE public.order_number_seq START 1000;

CREATE TABLE public.quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_number text NOT NULL UNIQUE DEFAULT ('Q-' || nextval('public.quote_number_seq')),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  quote_type public.quote_type NOT NULL,
  status public.quote_status NOT NULL DEFAULT 'pending_review',
  submitted_at timestamptz,
  reviewed_at timestamptz,
  approved_at timestamptz,
  admin_notes text,
  client_notes text,
  total_material_cost numeric NOT NULL DEFAULT 0,
  total_labour_cost numeric NOT NULL DEFAULT 0,
  total_cost numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quotes TO authenticated;
GRANT ALL ON public.quotes TO service_role;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "quotes select" ON public.quotes FOR SELECT TO authenticated
  USING (public.owns_client(auth.uid(), client_id) OR public.is_admin(auth.uid()));
CREATE POLICY "quotes insert" ON public.quotes FOR INSERT TO authenticated
  WITH CHECK (public.owns_client(auth.uid(), client_id) OR public.is_admin(auth.uid()));
CREATE POLICY "quotes update" ON public.quotes FOR UPDATE TO authenticated
  USING (public.owns_client(auth.uid(), client_id) OR public.is_admin(auth.uid()))
  WITH CHECK (public.owns_client(auth.uid(), client_id) OR public.is_admin(auth.uid()));
CREATE POLICY "quotes delete admin" ON public.quotes FOR DELETE TO authenticated
  USING (public.is_admin(auth.uid()));

-- Helper: does the current user own the quote (via client)?
CREATE OR REPLACE FUNCTION public.owns_quote(_user_id uuid, _quote_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.quotes q
    JOIN public.clients c ON c.id = q.client_id
    WHERE q.id = _quote_id AND c.auth_user_id = _user_id
  );
$$;

-- =========================================================================
-- QUOTE_LUMBER_ITEMS
-- =========================================================================
CREATE TABLE public.quote_lumber_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id uuid NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  species_id uuid REFERENCES public.species(id),
  profile_id uuid REFERENCES public.profiles_lumber(id),
  coating_product_id uuid REFERENCES public.coating_products(id),
  lineal_feet numeric NOT NULL,
  coats_front integer NOT NULL CHECK (coats_front BETWEEN 1 AND 3),
  coats_back integer NOT NULL DEFAULT 0 CHECK (coats_back BETWEEN 0 AND 2),
  total_passes integer NOT NULL,
  front_sqft_per_pass numeric,
  edge_sqft_per_pass numeric,
  back_sqft_per_coat numeric,
  total_material_sqft numeric,
  gallons_required numeric,
  material_cost numeric,
  labour_cost numeric,
  total_cost numeric,
  notes text
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quote_lumber_items TO authenticated;
GRANT ALL ON public.quote_lumber_items TO service_role;
ALTER TABLE public.quote_lumber_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "qli select" ON public.quote_lumber_items FOR SELECT TO authenticated
  USING (public.owns_quote(auth.uid(), quote_id) OR public.is_admin(auth.uid()));
CREATE POLICY "qli insert" ON public.quote_lumber_items FOR INSERT TO authenticated
  WITH CHECK (public.owns_quote(auth.uid(), quote_id) OR public.is_admin(auth.uid()));
CREATE POLICY "qli update" ON public.quote_lumber_items FOR UPDATE TO authenticated
  USING (public.owns_quote(auth.uid(), quote_id) OR public.is_admin(auth.uid()))
  WITH CHECK (public.owns_quote(auth.uid(), quote_id) OR public.is_admin(auth.uid()));
CREATE POLICY "qli delete" ON public.quote_lumber_items FOR DELETE TO authenticated
  USING (public.owns_quote(auth.uid(), quote_id) OR public.is_admin(auth.uid()));

-- =========================================================================
-- QUOTE_SHAKE_ITEMS
-- =========================================================================
CREATE TABLE public.quote_shake_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id uuid NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  coating_product_id uuid REFERENCES public.coating_products(id),
  number_of_bundles integer NOT NULL,
  coats integer NOT NULL,
  material_cost_per_bundle_per_coat numeric,
  labour_cost_per_bundle_per_coat numeric NOT NULL DEFAULT 125.00,
  total_material_cost numeric,
  total_labour_cost numeric,
  total_cost numeric,
  notes text
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quote_shake_items TO authenticated;
GRANT ALL ON public.quote_shake_items TO service_role;
ALTER TABLE public.quote_shake_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "qsi select" ON public.quote_shake_items FOR SELECT TO authenticated
  USING (public.owns_quote(auth.uid(), quote_id) OR public.is_admin(auth.uid()));
CREATE POLICY "qsi insert" ON public.quote_shake_items FOR INSERT TO authenticated
  WITH CHECK (public.owns_quote(auth.uid(), quote_id) OR public.is_admin(auth.uid()));
CREATE POLICY "qsi update" ON public.quote_shake_items FOR UPDATE TO authenticated
  USING (public.owns_quote(auth.uid(), quote_id) OR public.is_admin(auth.uid()))
  WITH CHECK (public.owns_quote(auth.uid(), quote_id) OR public.is_admin(auth.uid()));
CREATE POLICY "qsi delete" ON public.quote_shake_items FOR DELETE TO authenticated
  USING (public.owns_quote(auth.uid(), quote_id) OR public.is_admin(auth.uid()));

-- =========================================================================
-- ORDERS
-- =========================================================================
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE DEFAULT ('O-' || nextval('public.order_number_seq')),
  quote_id uuid REFERENCES public.quotes(id) ON DELETE SET NULL,
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  purchase_order_number text,
  job_number text,
  end_builder_name text,
  end_builder_company text,
  end_builder_phone text,
  end_builder_email text,
  job_site_address text,
  job_site_city text,
  job_site_province text,
  job_site_postal text,
  wood_supplied_by public.wood_supplier,
  anticipated_start_date date,
  anticipated_end_date date,
  actual_start_date date,
  actual_end_date date,
  bundle_lot_numbers text,
  moisture_content text,
  wood_grade text,
  primer_required boolean DEFAULT false,
  end_sealing_required boolean DEFAULT false,
  rush_order boolean NOT NULL DEFAULT false,
  delivery_method public.delivery_method,
  return_delivery_required boolean DEFAULT false,
  coating_brand_specified text,
  architect_designer text,
  photo_documentation_requested boolean DEFAULT false,
  status public.order_status NOT NULL DEFAULT 'received',
  assigned_staff text,
  invoice_number text,
  payment_status public.payment_status NOT NULL DEFAULT 'unpaid',
  special_instructions text,
  internal_notes text,
  warranty_registered boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders select" ON public.orders FOR SELECT TO authenticated
  USING (public.owns_client(auth.uid(), client_id) OR public.is_admin(auth.uid()));
CREATE POLICY "orders insert admin" ON public.orders FOR INSERT TO authenticated
  WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "orders update" ON public.orders FOR UPDATE TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "orders delete admin" ON public.orders FOR DELETE TO authenticated
  USING (public.is_admin(auth.uid()));
