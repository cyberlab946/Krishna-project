-- CyberLab Stage 11: fix editable student profiles
-- Run this entire file once in Supabase SQL Editor.
-- Fixes: profile upsert blocked by RLS + ensures editable bio/avatar fields exist.

-- 1) Make sure the fields used by profile-v2.js exist.
alter table public.profiles
  add column if not exists bio text default '',
  add column if not exists avatar_emoji text default '🧑‍💻';

-- 2) Keep profile RLS enabled.
alter table public.profiles enable row level security;

-- 3) Students can read their own profile.
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles for select to authenticated
using (auth.uid() = id);

-- 4) IMPORTANT: upsert() needs INSERT permission/policy as well as UPDATE.
drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles for insert to authenticated
with check (auth.uid() = id);

-- 5) Students can edit only their own profile.
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles for update to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- 6) Keep admin access from Stage 8.
drop policy if exists "Admins can read all profiles" on public.profiles;
create policy "Admins can read all profiles"
on public.profiles for select to authenticated
using (public.is_cyberlab_admin());
