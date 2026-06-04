-- Allow authenticated admins to delete applications and resume files

drop policy if exists "Admins delete applications" on public.job_applications;
create policy "Admins delete applications"
  on public.job_applications for delete
  to authenticated
  using (true);

drop policy if exists "Admins delete resumes" on storage.objects;
create policy "Admins delete resumes"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'resumes');
