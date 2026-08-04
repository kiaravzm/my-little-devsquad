-- applicants: public registration form
-- RLS:
--   anon + authenticated → INSERT only (anyone can apply)
--   authenticated        → SELECT (admin later; no public listing)
-- App inserts WITHOUT .select() so anon does not need SELECT.

create type public.applicant_area as enum (
  'frontend', 'backend', 'fullstack', 'ux', 'other'
);

create type public.experience_level as enum (
  'beginner', 'intermediate', 'advanced'
);

create type public.availability_band as enum (
  '1-5h', '5-10h', '10h+'
);

create table public.applicants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  github text not null,
  area public.applicant_area not null,
  experience_level public.experience_level not null,
  availability public.availability_band not null,
  current_skills text[] not null default '{}',
  desired_skills text[] not null default '{}',
  notes text,
  created_at timestamptz not null default now()
);

alter table public.applicants enable row level security;

create policy "anon_can_insert_applicants"
  on public.applicants
  for insert
  to anon, authenticated
  with check (true);

create policy "authenticated_can_select_applicants"
  on public.applicants
  for select
  to authenticated
  using (true);