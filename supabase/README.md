# Supabase setup

## 1. Create a project

Create a project at [supabase.com](https://supabase.com) and copy the **Project URL** and **anon public** key.

## 2. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## 3. Run the migration

In the Supabase SQL editor, run the contents of:

- `migrations/001_admin_schema.sql`
- `migrations/002_job_applications.sql`

If resume uploads fail with an RLS or bucket error, also run `migrations/003_fix_resume_storage.sql` (safe to re-run).

For admin delete access on applications, run `migrations/004_admin_application_policies.sql`.

## 4. Create an admin user

In Supabase Dashboard → **Authentication** → **Users**, create a user with email + password. Use those credentials at `/admin/login`.

## 5. Admin routes

| Route | Description |
|-------|-------------|
| `/admin/login` | Sign in |
| `/admin` | Dashboard |
| `/admin/roles` | CRUD for careers open roles |
| `/admin/contact` | Edit email and booking URL |

Public pages read from `open_roles` and `contact_info` with fallbacks in `src/lib/constants.ts` when Supabase is not configured.
