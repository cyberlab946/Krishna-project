-- CyberLab V2: secure automatic badge awarding
-- Run after stage10-badges.sql.

create or replace function public.award_eligible_badges()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then return; end if;

  -- First Step: at least one enrollment.
  insert into public.user_badges(user_id,badge_id)
  select uid,b.id from public.badges b
  where b.code='FIRST_STEP'
    and exists (select 1 from public.enrollments e where e.user_id=uid)
  on conflict (user_id,badge_id) do nothing;

  -- Quiz Master: at least one score of 90% or higher.
  insert into public.user_badges(user_id,badge_id)
  select uid,b.id from public.badges b
  where b.code='QUIZ_MASTER'
    and exists (select 1 from public.quiz_attempts q where q.user_id=uid and q.score >= 90)
  on conflict (user_id,badge_id) do nothing;

  -- Cyber Defender: all lessons completed for Cybersecurity Fundamentals.
  insert into public.user_badges(user_id,badge_id)
  select uid,b.id from public.badges b
  where b.code='CYBER_DEFENDER'
    and exists (
      select 1 from public.courses c
      where lower(c.name)='cybersecurity fundamentals'
        and (select count(*) from public.lesson_progress lp where lp.user_id=uid and lp.course_id=c.id) >= c.lesson_count
    )
  on conflict (user_id,badge_id) do nothing;

  -- CyberLab Graduate: completed all lessons and passed quiz (70%+) for any course.
  insert into public.user_badges(user_id,badge_id)
  select uid,b.id from public.badges b
  where b.code='CYBERLAB_GRADUATE'
    and exists (
      select 1 from public.courses c
      where (select count(*) from public.lesson_progress lp where lp.user_id=uid and lp.course_id=c.id) >= c.lesson_count
        and exists (select 1 from public.quiz_attempts q where q.user_id=uid and q.course_id=c.id and q.score >= 70)
    )
  on conflict (user_id,badge_id) do nothing;

  -- Dedicated Learner: three or more fully completed courses.
  insert into public.user_badges(user_id,badge_id)
  select uid,b.id from public.badges b
  where b.code='DEDICATED_LEARNER'
    and (
      select count(*) from public.courses c
      where (select count(*) from public.lesson_progress lp where lp.user_id=uid and lp.course_id=c.id) >= c.lesson_count
    ) >= 3
  on conflict (user_id,badge_id) do nothing;
end;
$$;

revoke all on function public.award_eligible_badges() from public;
grant execute on function public.award_eligible_badges() to authenticated;
