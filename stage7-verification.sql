-- CyberLab Stage 7: public certificate verification
-- Run this entire file once in Supabase SQL Editor.

alter table public.certificates
  add column if not exists student_name text,
  add column if not exists course_name text,
  add column if not exists quiz_score integer;

-- Store the information shown on the certificate so verification remains a
-- stable record even if the student's profile or course display changes later.
update public.certificates c
set
  student_name = coalesce(c.student_name, (select p.full_name from public.profiles p where p.id = c.user_id), 'CyberLab Student'),
  course_name = coalesce(c.course_name, (select co.name from public.courses co where co.id = c.course_id)),
  quiz_score = coalesce(c.quiz_score, (
    select qa.score
    from public.quiz_attempts qa
    where qa.user_id = c.user_id and qa.course_id = c.course_id
    order by qa.attempted_at desc
    limit 1
  ));

-- Public verification reads only certificate fields needed for verification.
-- It does not expose user_id, email, passwords, or private profile data.
create or replace function public.verify_certificate(p_certificate_id text)
returns table (
  certificate_id text,
  student_name text,
  course_name text,
  quiz_score integer,
  issued_at timestamptz,
  status text
)
language sql
security definer
set search_path = public
as $$
  select
    c.certificate_id,
    c.student_name,
    c.course_name,
    c.quiz_score,
    c.issued_at,
    'Valid'::text as status
  from public.certificates c
  where lower(trim(c.certificate_id)) = lower(trim(p_certificate_id))
  limit 1;
$$;

grant execute on function public.verify_certificate(text) to anon, authenticated;

-- Keep RLS enabled on certificates. The public verifier uses the restricted
-- security-definer function above rather than granting anonymous table access.
alter table public.certificates enable row level security;
