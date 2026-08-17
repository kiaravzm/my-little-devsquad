-- Local dev seed (runs on `supabase db reset`)
--
-- Admin user: create in Studio → Authentication → Add user
--   URL: http://127.0.0.1:54323
--   Use email/password, then sign in at /login

insert into public.applicants (
  name,
  github,
  area,
  experience_level,
  availability,
  current_skills,
  desired_skills,
  notes
)
values (
  'Ana Silva (seed)',
  'https://github.com/ana-silva',
  'frontend',
  'beginner',
  '1-5h',
  array['React', 'TypeScript'],
  array['Next.js'],
  'Sample applicant for local admin development'
);
