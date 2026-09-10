-- CyberLab V2 Stage 9: Student Profiles
-- Run once in Supabase SQL Editor.

alter table public.profiles
  add column if not exists bio text,
  add column if not exists avatar_emoji text not null default '🧑‍💻';

update public.profiles
set bio = coalesce(bio, 'CyberLab student')
where bio is null;

alter table public.profiles drop constraint if exists profiles_bio_length;
alter table public.profiles
  add constraint profiles_bio_length check (char_length(coalesce(bio, '')) <= 300);

alter table public.profiles drop constraint if exists profiles_avatar_emoji_length;
alter table public.profiles
  add constraint profiles_avatar_emoji_length check (char_length(avatar_emoji) <= 8);

-- Students may only read/update their own profile.
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles for select
using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);
