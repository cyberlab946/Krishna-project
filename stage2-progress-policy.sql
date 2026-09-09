-- Run this once in Supabase SQL Editor after the main schema.
drop policy if exists "Users can update own lesson progress" on public.lesson_progress;
create policy "Users can update own lesson progress"
on public.lesson_progress
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
