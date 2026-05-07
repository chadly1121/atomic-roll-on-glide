
-- 1) quote_requests: lock down SELECT (no client reads; edge functions use service role and bypass RLS)
DROP POLICY IF EXISTS "Only authenticated users can view quote requests" ON public.quote_requests;
CREATE POLICY "Block all client reads of quote requests"
ON public.quote_requests
FOR SELECT
TO public
USING (false);

-- 2) teams: scope INSERT to authenticated role only
DROP POLICY IF EXISTS "Users can create teams" ON public.teams;
CREATE POLICY "Authenticated users can create teams"
ON public.teams
FOR INSERT
TO authenticated
WITH CHECK (owner_id = auth.uid());

-- 3) team_members: prevent privilege escalation
-- Replace permissive ALL policy with scoped policies
DROP POLICY IF EXISTS "Team owners and admins can manage members" ON public.team_members;

-- Helper: is the caller the real team owner (per teams.owner_id)?
CREATE OR REPLACE FUNCTION public.is_team_owner(_user_id uuid, _team_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  select exists (
    select 1 from public.teams
    where id = _team_id and owner_id = _user_id
  )
$$;

-- Only the real team owner can grant the 'owner' role; admins/owners can add non-owner members
CREATE POLICY "Owners and admins can add non-owner members"
ON public.team_members
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_team_owner_or_admin(auth.uid(), team_id)
  AND role <> 'owner'
);

CREATE POLICY "Real team owners can add owner members"
ON public.team_members
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_team_owner(auth.uid(), team_id)
);

-- Only the real team owner can change roles; admins/owners can update non-owner rows but cannot escalate to owner or modify an existing owner row
CREATE POLICY "Owners and admins can update non-owner members"
ON public.team_members
FOR UPDATE
TO authenticated
USING (
  public.is_team_owner_or_admin(auth.uid(), team_id)
  AND role <> 'owner'
)
WITH CHECK (
  public.is_team_owner_or_admin(auth.uid(), team_id)
  AND role <> 'owner'
);

CREATE POLICY "Real team owners can update any member"
ON public.team_members
FOR UPDATE
TO authenticated
USING (public.is_team_owner(auth.uid(), team_id))
WITH CHECK (public.is_team_owner(auth.uid(), team_id));

-- Deletes: admins/owners can remove non-owner members; only the real owner can remove an owner row
CREATE POLICY "Owners and admins can delete non-owner members"
ON public.team_members
FOR DELETE
TO authenticated
USING (
  public.is_team_owner_or_admin(auth.uid(), team_id)
  AND role <> 'owner'
);

CREATE POLICY "Real team owners can delete any member"
ON public.team_members
FOR DELETE
TO authenticated
USING (public.is_team_owner(auth.uid(), team_id));

-- 4) Storage policies: add SELECT for hyphen bucket; explicit deny on UPDATE/DELETE for both buckets
CREATE POLICY "Block client reads of hyphen quote attachments"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'quote-attachments' AND false
);

CREATE POLICY "Block client updates of quote attachments"
ON storage.objects
FOR UPDATE
TO public
USING (
  bucket_id IN ('quote_attachments', 'quote-attachments') AND false
);

CREATE POLICY "Block client deletes of quote attachments"
ON storage.objects
FOR DELETE
TO public
USING (
  bucket_id IN ('quote_attachments', 'quote-attachments') AND false
);
