-- Open roles (careers page)
create table if not exists public.open_roles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  role_type text not null default 'Full time · Remote',
  description text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Singleton contact settings
create table if not exists public.contact_info (
  id int primary key default 1 check (id = 1),
  email text not null,
  booking_url text not null,
  updated_at timestamptz not null default now()
);

insert into public.contact_info (id, email, booking_url)
values (1, 'hello@tamadevlabs.com', 'https://cal.com/tamadevlabs/discovery')
on conflict (id) do nothing;

-- Seed sample roles
insert into public.open_roles (title, role_type, description, sort_order)
values
  (
    'Senior Full Stack Engineer',
    'Full time · Remote',
    'Build Next.js and Node.js applications end to end. 5+ years experience, strong TypeScript, and SaaS delivery background.',
    0
  ),
  (
    'AI / ML Engineer',
    'Full time · Remote',
    'Design RAG systems, agents, and LLM integrations. Experience with OpenAI, LangChain, and production AI deployments.',
    1
  ),
  (
    'Frontend Engineer',
    'Contract · Remote',
    'Craft polished React interfaces and design systems. Strong eye for UX and performance on modern web apps.',
    2
  );

alter table public.open_roles enable row level security;
alter table public.contact_info enable row level security;

-- Public read: published roles
create policy "Public can read published roles"
  on public.open_roles for select
  using (published = true);

-- Public read: contact info
create policy "Public can read contact info"
  on public.contact_info for select
  using (true);

-- Authenticated admins: full access
create policy "Admins manage roles"
  on public.open_roles for all
  to authenticated
  using (true)
  with check (true);

create policy "Admins manage contact info"
  on public.contact_info for all
  to authenticated
  using (true)
  with check (true);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger open_roles_updated_at
  before update on public.open_roles
  for each row execute function public.set_updated_at();

create trigger contact_info_updated_at
  before update on public.contact_info
  for each row execute function public.set_updated_at();
