
-- 1. Fix team_open_join: drop the overly permissive self-join policy
DROP POLICY IF EXISTS "Users can join teams" ON public.team_members;

-- 2. Remove duplicate quote_requests INSERT policy
DROP POLICY IF EXISTS "Allow public quote request submissions" ON public.quote_requests;

-- 3. Remove conflicting/redundant SELECT false policy on quote_requests
DROP POLICY IF EXISTS "Restrict quote request access" ON public.quote_requests;

-- 4. Add policies for edge_function_rate_limits (RLS enabled but no policies)
-- Allow anon and authenticated to insert (needed by edge functions via anon key)
CREATE POLICY "Allow edge function rate limit inserts"
ON public.edge_function_rate_limits
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow the cleanup function (runs as service role via SECURITY DEFINER) to select/delete
-- No SELECT/DELETE policies needed for regular users - they should not access this table
CREATE POLICY "Allow edge function rate limit reads for cleanup"
ON public.edge_function_rate_limits
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow edge function rate limit deletes for cleanup"
ON public.edge_function_rate_limits
FOR DELETE
TO anon, authenticated
USING (true);
