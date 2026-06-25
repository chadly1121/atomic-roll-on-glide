
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email))
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'client')
  ON CONFLICT (user_id, role) DO NOTHING;

  INSERT INTO public.clients (auth_user_id, email, contact_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email))
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$;

-- Backfill: create client rows for existing client users that don't have one yet
INSERT INTO public.clients (auth_user_id, email, contact_name)
SELECT ur.user_id, p.email, COALESCE(p.full_name, p.email)
FROM public.user_roles ur
JOIN public.profiles p ON p.id = ur.user_id
WHERE ur.role = 'client'
  AND NOT EXISTS (SELECT 1 FROM public.clients c WHERE c.auth_user_id = ur.user_id);

-- Ensure trigger exists on auth.users
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;
