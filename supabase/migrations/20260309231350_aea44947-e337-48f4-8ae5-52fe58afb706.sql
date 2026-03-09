
-- 1. Make quote-attachments bucket private
UPDATE storage.buckets SET public = false WHERE id = 'quote-attachments';

-- 2. Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Anyone can view quote attachments" ON storage.objects;

-- 3. Keep INSERT policy for unauthenticated uploads (contact form needs this)
-- but the read policy is removed so files are only accessible via signed URLs
