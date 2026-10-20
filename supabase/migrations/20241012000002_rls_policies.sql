-- =============================================================================
-- KHULA WEBSITE — Row Level Security Policies
-- Migration: 20241012000002_rls_policies
-- =============================================================================
--
-- Security model summary:
--
--   projects, services, packages, articles
--     SELECT  → anyone (anon + authenticated) for published rows only
--     INSERT  → blocked for anon/authenticated; service_role only via Worker
--     UPDATE  → blocked for anon/authenticated; service_role only
--     DELETE  → blocked for anon/authenticated; service_role only
--
--   enquiries
--     INSERT  → anon allowed (contact form) subject to rate-limit guard
--     SELECT  → blocked for anon; authenticated (admin) only
--     UPDATE  → authenticated (admin) only — to update status / notes
--     DELETE  → blocked entirely (archive via status instead)
--
-- service_role key bypasses RLS entirely — never expose it in frontend code.
-- =============================================================================


-- ---------------------------------------------------------------------------
-- Enable RLS on all tables
-- ---------------------------------------------------------------------------

alter table public.projects   enable row level security;
alter table public.services   enable row level security;
alter table public.packages   enable row level security;
alter table public.articles   enable row level security;
alter table public.enquiries  enable row level security;


-- ---------------------------------------------------------------------------
-- Helper: rate-limit guard for enquiry submissions
-- One submission per email address per hour from the same IP.
-- Returns true when the submission is allowed.
-- ---------------------------------------------------------------------------

create or replace function public.enquiry_rate_limit_ok(
  p_email      text,
  p_ip_address inet
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count int;
begin
  select count(*)
    into v_count
    from public.enquiries
   where submitted_at > now() - interval '1 hour'
     and (
           email      = p_email
        or ip_address = p_ip_address
       );

  return v_count = 0;
end;
$$;

comment on function public.enquiry_rate_limit_ok is
  'Rate-limit guard: blocks multiple enquiry submissions from the same email or IP within one hour.';


-- ===========================================================================
-- PROJECTS
-- ===========================================================================

-- Anyone can read published projects
create policy "projects: public read published"
  on public.projects
  for select
  using ( published = true );

-- No direct inserts from browser clients
create policy "projects: no anon insert"
  on public.projects
  for insert
  with check ( false );

-- No direct updates from browser clients
create policy "projects: no anon update"
  on public.projects
  for update
  using ( false );

-- No direct deletes from browser clients
create policy "projects: no anon delete"
  on public.projects
  for delete
  using ( false );


-- ===========================================================================
-- SERVICES
-- ===========================================================================

create policy "services: public read published"
  on public.services
  for select
  using ( published = true );

create policy "services: no anon insert"
  on public.services
  for insert
  with check ( false );

create policy "services: no anon update"
  on public.services
  for update
  using ( false );

create policy "services: no anon delete"
  on public.services
  for delete
  using ( false );


-- ===========================================================================
-- PACKAGES
-- ===========================================================================

create policy "packages: public read published"
  on public.packages
  for select
  using ( published = true );

create policy "packages: no anon insert"
  on public.packages
  for insert
  with check ( false );

create policy "packages: no anon update"
  on public.packages
  for update
  using ( false );

create policy "packages: no anon delete"
  on public.packages
  for delete
  using ( false );


-- ===========================================================================
-- ARTICLES
-- ===========================================================================

create policy "articles: public read published"
  on public.articles
  for select
  using ( published = true );

create policy "articles: no anon insert"
  on public.articles
  for insert
  with check ( false );

create policy "articles: no anon update"
  on public.articles
  for update
  using ( false );

create policy "articles: no anon delete"
  on public.articles
  for delete
  using ( false );


-- ===========================================================================
-- ENQUIRIES
-- ===========================================================================

-- Anon users can submit an enquiry IF the rate-limit guard passes.
-- They can NEVER read enquiries back — not even their own.
create policy "enquiries: anon insert with rate limit"
  on public.enquiries
  for insert
  to anon
  with check (
    public.enquiry_rate_limit_ok(email, ip_address)
  );

-- Authenticated users (admins via Supabase Auth) can read all enquiries.
create policy "enquiries: authenticated read all"
  on public.enquiries
  for select
  to authenticated
  using ( true );

-- Authenticated admins can update status and admin_notes only.
-- Enforced by restricting which columns can be changed via a separate
-- application-layer guard in the Worker; the policy permits the row.
create policy "enquiries: authenticated update status"
  on public.enquiries
  for update
  to authenticated
  using ( true )
  with check ( true );

-- Hard block on deletes — use status = 'archived' instead.
create policy "enquiries: no delete"
  on public.enquiries
  for delete
  using ( false );


-- ===========================================================================
-- Grant usage on schema to anon and authenticated roles
-- (Supabase does this by default but we make it explicit)
-- ===========================================================================

grant usage on schema public to anon, authenticated;

grant select on public.projects  to anon, authenticated;
grant select on public.services  to anon, authenticated;
grant select on public.packages  to anon, authenticated;
grant select on public.articles  to anon, authenticated;

-- anon can only insert enquiries; authenticated can also update them
grant insert           on public.enquiries to anon;
grant select, insert, update on public.enquiries to authenticated;
