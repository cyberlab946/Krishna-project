-- CyberLab V2 Stage 1: secure admin role and dashboard access
-- Run this entire file in Supabase SQL Editor.
-- This version checks auth.users directly so admin access does not depend on a stale JWT.

-- 1) Give the chosen account an admin role in app_metadata.
-- app_metadata is not writable by normal browser clients.
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('role', 'admin')
where lower(email) = lower('cyberlabkrishna@gmail.com');

-- 2) Helper used by RLS policies.
-- SECURITY DEFINER lets the helper read auth.users safely without exposing auth.users to the browser.
create or replace function public.is_cyberlab_admin()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select coalesce(
    (select (raw_app_meta_data ->> 'role') = 'admin'
     from auth.users
     where id = auth.uid()),
    false
  );
$$;

revoke all on function public.is_cyberlab_admin() from public;
grant execute on function public.is_cyberlab_admin() to authenticated;

-- 3) Admin read access. Students keep their existing own-record policies.
drop policy if exists "Admins can read all profiles" on public.profiles;
create policy "Admins can read all profiles"
on public.profiles for select to authenticated
using (public.is_cyberlab_admin());

drop policy if exists "Admins can read all enrollments" on public.enrollments;
create policy "Admins can read all enrollments"
on public.enrollments for select to authenticated
using (public.is_cyberlab_admin());

drop policy if exists "Admins can read all lesson progress" on public.lesson_progress;
create policy "Admins can read all lesson progress"
on public.lesson_progress for select to authenticated
using (public.is_cyberlab_admin());

drop policy if exists "Admins can read all quiz attempts" on public.quiz_attempts;
create policy "Admins can read all quiz attempts"
on public.quiz_attempts for select to authenticated
using (public.is_cyberlab_admin());

drop policy if exists "Admins can read all certificates" on public.certificates;
create policy "Admins can read all certificates"
on public.certificates for select to authenticated
using (public.is_cyberlab_admin());

-- 4) Admin course management.
drop policy if exists "Admins can insert courses" on public.courses;
create policy "Admins can insert courses"
on public.courses for insert to authenticated
with check (public.is_cyberlab_admin());

drop policy if exists "Admins can update courses" on public.courses;
create policy "Admins can update courses"
on public.courses for update to authenticated
using (public.is_cyberlab_admin())
with check (public.is_cyberlab_admin());

drop policy if exists "Admins can delete courses" on public.courses;
create policy "Admins can delete courses"
on public.courses for delete to authenticated
using (public.is_cyberlab_admin());

-- 5) Keep RLS enabled.
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.certificates enable row level security;
