-- Create security definer function to check if user is team owner or admin
create or replace function public.is_team_owner_or_admin(_user_id uuid, _team_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.team_members
    where user_id = _user_id
      and team_id = _team_id
      and role in ('owner', 'admin')
  )
$$;

-- Create security definer function to check if user belongs to team
create or replace function public.is_team_member(_user_id uuid, _team_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.team_members
    where user_id = _user_id
      and team_id = _team_id
  )
$$;

-- Drop existing problematic policies
drop policy if exists "Team owners and admins can manage members" on public.team_members;
drop policy if exists "Users can view team members of teams they belong to" on public.team_members;

-- Create new policies using security definer functions
create policy "Team owners and admins can manage members"
on public.team_members
for all
using (public.is_team_owner_or_admin(auth.uid(), team_id));

create policy "Users can view team members of teams they belong to"
on public.team_members
for select
using (public.is_team_member(auth.uid(), team_id));