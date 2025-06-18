
-- Enable Row Level Security on quote_requests table
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert quote requests (public contact form)
CREATE POLICY "Allow public quote request submissions" 
ON public.quote_requests 
FOR INSERT 
WITH CHECK (true);

-- Create policy to prevent public reading of quote requests
-- Only authenticated users with admin role could read (if you implement admin auth later)
CREATE POLICY "Restrict quote request access" 
ON public.quote_requests 
FOR SELECT 
USING (false);

-- Create policy to prevent updates and deletes from public users
CREATE POLICY "Prevent quote request modifications" 
ON public.quote_requests 
FOR UPDATE 
USING (false);

CREATE POLICY "Prevent quote request deletions" 
ON public.quote_requests 
FOR DELETE 
USING (false);
