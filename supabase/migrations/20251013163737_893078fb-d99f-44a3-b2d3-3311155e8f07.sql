-- Update handle_new_user trigger to use new admin email
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Check if this is the admin user
  if new.email = 'leonardo@roll-onpainting.com' then
    -- Insert profile with approved status
    insert into public.profiles (id, email, full_name, approval_status)
    values (
      new.id,
      new.email,
      coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
      'approved'
    );
    
    -- Assign admin role
    insert into public.user_roles (user_id, role)
    values (new.id, 'admin');
  else
    -- Insert profile with pending status for other users
    insert into public.profiles (id, email, full_name, approval_status)
    values (
      new.id,
      new.email,
      coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
      'pending'
    );
    
    -- Assign user role
    insert into public.user_roles (user_id, role)
    values (new.id, 'user');
  end if;
  
  return new;
end;
$$;