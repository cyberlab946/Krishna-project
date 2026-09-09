-- CyberLab Stage 3 migration: certificate RLS policies
-- Run this once in Supabase SQL Editor after supabase-schema.sql.

drop policy if exists "Users can create own certificates" on public.certificates;
create policy "Users can create own certificates"
on public.certificates for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own certificates" on public.certificates;
create policy "Users can update own certificates"
on public.certificates for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
