-- ============================================================
-- KHULA by NKM — Supabase database setup
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. Enquiries table
create table if not exists public.enquiries (
    id uuid primary key default gen_random_uuid (),
    created_at timestamptz not null default now(),
    full_name text not null,
    business text not null,
    email text not null,
    phone text,
    service_slug text not null,
    budget_range text not null,
    timeframe text not null,
    description text not null,
    status text not null default 'new' check (
        status in (
            'new',
            'reviewed',
            'replied',
            'archived'
        )
    )
);

-- 2. Enable Row Level Security
alter table public.enquiries enable row level security;

-- 3. Allow anyone to INSERT (submit an enquiry)
--    The anon key can only insert — it cannot read, update or delete.
create policy "Allow public enquiry submissions" on public.enquiries for
insert
    to anon
with
    check (true);

-- 4. Authenticated users (you, logged in via Supabase dashboard) can read all
create policy "Allow authenticated read" on public.enquiries for
select to authenticated using (true);

-- 5. Authenticated users can update status (mark reviewed, replied, etc.)
create policy "Allow authenticated update" on public.enquiries for
update to authenticated using (true);

-- ============================================================
-- To view your enquiries after submission:
-- Supabase Dashboard → Table Editor → enquiries
-- ============================================================