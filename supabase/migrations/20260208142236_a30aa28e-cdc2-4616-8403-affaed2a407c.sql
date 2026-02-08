-- First drop existing bucket and recreate as public
DELETE FROM storage.objects WHERE bucket_id = 'Quote Request Attachments';
DELETE FROM storage.buckets WHERE id = 'Quote Request Attachments';

-- Create quote-attachments bucket (using hyphen for cleaner URLs)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'quote-attachments', 
  'quote-attachments', 
  true,
  52428800, -- 50MB max file size
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- Allow anyone to upload files to quote-attachments bucket
CREATE POLICY "Anyone can upload quote attachments"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'quote-attachments');

-- Allow anyone to read quote attachments (needed for email links)
CREATE POLICY "Anyone can view quote attachments"
ON storage.objects FOR SELECT
USING (bucket_id = 'quote-attachments');