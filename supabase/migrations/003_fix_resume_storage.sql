-- Run this if applications fail with "Failed to upload resume" or table-not-found errors.
-- Safe to re-run: drops and recreates policies, upserts the storage bucket.

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  role_id text,
  role_title text not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  linkedin text,
  resume_path text not null,
  resume_filename text not null,
  created_at timestamptz not null default now()
);

alter table public.job_applications enable row level security;

drop policy if exists "Anyone can submit applications" on public.job_applications;
drop policy if exists "Admins read applications" on public.job_applications;

create policy "Anyone can submit applications"
  on public.job_applications for insert
  to public
  with check (true);

create policy "Admins read applications"
  on public.job_applications for select
  to authenticated
  using (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('resumes', 'resumes', false, 5242880, null)
on conflict (id) do update set
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can upload resumes" on storage.objects;
drop policy if exists "Admins can read resumes" on storage.objects;

create policy "Anyone can upload resumes"
  on storage.objects for insert
  to public
  with check (bucket_id = 'resumes');

create policy "Admins can read resumes"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'resumes');
