-- =============================================================================
-- KHULA WEBSITE — Initial Schema
-- Migration: 20241012000001_initial_schema
-- =============================================================================
-- Tables:
--   projects    — portfolio case studies
--   services    — service catalogue
--   packages    — pricing packages
--   articles    — insights / blog
--   enquiries   — contact form submissions
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------

create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm"; -- trigram search on text fields


-- ---------------------------------------------------------------------------
-- Custom enum types
-- ---------------------------------------------------------------------------

create type project_category as enum (
  'Product Design',
  'UX Research & Strategy',
  'Fintech',
  'PropTech',
  'Infrastructure Technology',
  'Brand Identity',
  'Creative Strategy'
);

create type project_maturity as enum (
  'Concept',
  'Prototype',
  'MVP',
  'Deployed'
);

create type service_category as enum (
  'Product & UX',
  'Web & Digital',
  'Brand & Creative',
  'Strategy & Growth',
  'Marketing & Performance'
);

create type billing_type as enum (
  'once-off',
  'monthly'
);

create type package_tier as enum (
  'start',
  'build',
  'grow',
  'retainer'
);

create type article_category as enum (
  'Product Design',
  'UX Research',
  'MVP & Strategy',
  'Brand',
  'Digital Marketing',
  'SA Digital'
);

create type enquiry_status as enum (
  'new',        -- just submitted
  'read',       -- seen by admin
  'replied',    -- response sent
  'archived'    -- closed / not relevant
);

create type budget_range as enum (
  'under-10k',
  '10k-25k',
  '25k-50k',
  '50k-100k',
  'over-100k',
  'retainer',
  'unsure'
);

create type timeframe as enum (
  'asap',
  '1-month',
  '1-3-months',
  '3-6-months',
  'flexible',
  'unsure'
);


-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------

create table public.projects (
  id               uuid primary key default uuid_generate_v4(),
  slug             text not null unique,
  title            text not null,
  subtitle         text not null,
  categories       project_category[] not null default '{}',
  maturity         project_maturity not null,
  tagline          text not null,
  overview         text not null,
  problem          text not null,
  audience         text not null,
  strategy         text not null,
  design_approach  text not null,
  key_decisions    text[] not null default '{}',
  deliverables     text[] not null default '{}',
  role             text not null,
  limitations      text not null,
  next_steps       text not null,
  accent_color     text not null,     -- hex, e.g. '#3FAF72'
  cover_bg         text not null,     -- tailwind gradient class
  sort_order       int not null default 0,
  published        boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

comment on table public.projects is 'Portfolio case studies shown on the Work page.';
comment on column public.projects.categories     is 'Array of discipline tags for filtering.';
comment on column public.projects.key_decisions  is 'Ordered list of key UX/design decisions.';
comment on column public.projects.deliverables   is 'Ordered list of project deliverables.';
comment on column public.projects.accent_color   is 'Per-project brand accent hex colour.';
comment on column public.projects.cover_bg       is 'Tailwind bg-gradient-to-br class string for the cover panel.';
comment on column public.projects.sort_order     is 'Manual display order; lower = first.';
comment on column public.projects.published      is 'Unpublished projects are hidden from the public API.';

create index idx_projects_slug      on public.projects (slug);
create index idx_projects_published on public.projects (published) where published = true;
create index idx_projects_maturity  on public.projects (maturity);


-- ---------------------------------------------------------------------------
-- services
-- ---------------------------------------------------------------------------

create table public.services (
  id                   uuid primary key default uuid_generate_v4(),
  slug                 text not null unique,
  name                 text not null,
  category             service_category not null,
  billing_type         billing_type not null,
  starting_price       numeric(10, 2) not null check (starting_price >= 0),
  short_description    text not null,
  description          text not null,
  problems_solved      text[] not null default '{}',
  suitable_for         text[] not null default '{}',
  deliverables         text[] not null default '{}',
  process              text[] not null default '{}',
  -- FAQs stored as JSONB array: [{ "question": "...", "answer": "..." }]
  faqs                 jsonb not null default '[]'::jsonb,
  related_project_slugs text[] not null default '{}',
  sort_order           int not null default 0,
  published            boolean not null default true,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

comment on table public.services  is 'Service catalogue — design, marketing and strategy offerings.';
comment on column public.services.faqs is 'Array of {question, answer} objects.';
comment on column public.services.related_project_slugs is 'Cross-reference to projects.slug values.';

create index idx_services_slug      on public.services (slug);
create index idx_services_category  on public.services (category);
create index idx_services_published on public.services (published) where published = true;


-- ---------------------------------------------------------------------------
-- packages
-- ---------------------------------------------------------------------------

create table public.packages (
  id                uuid primary key default uuid_generate_v4(),
  slug              package_tier not null unique,
  name              text not null,
  tagline           text not null,
  starting_price    numeric(10, 2) not null check (starting_price >= 0),
  billing_type      billing_type not null,
  popular           boolean not null default false,
  inclusions        text[] not null default '{}',
  exclusions        text[] not null default '{}',
  scope_dependent   text[] not null default '{}',
  cta               text not null,
  sort_order        int not null default 0,
  published         boolean not null default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.packages is 'Pricing packages — Start, Build, Grow, Retainer.';
comment on column public.packages.popular is 'Highlights the recommended tier in the pricing UI.';

create index idx_packages_published on public.packages (published) where published = true;
create index idx_packages_sort      on public.packages (sort_order);


-- ---------------------------------------------------------------------------
-- articles
-- ---------------------------------------------------------------------------

create table public.articles (
  id            uuid primary key default uuid_generate_v4(),
  slug          text not null unique,
  title         text not null,
  intro         text not null,
  -- body stored as JSONB array of ArticleSection:
  -- [{ "heading": "...", "paragraphs": ["..."], "bullets": ["..."] }]
  body          jsonb not null default '[]'::jsonb,
  category      article_category not null,
  published_at  date not null,
  reading_time  int not null check (reading_time > 0),  -- minutes
  featured      boolean not null default false,
  published     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.articles  is 'Insights / blog articles.';
comment on column public.articles.body         is 'Array of {heading?, paragraphs, bullets?} sections.';
comment on column public.articles.reading_time is 'Estimated reading time in minutes.';
comment on column public.articles.featured     is 'Featured articles surface on the home page.';

create index idx_articles_slug        on public.articles (slug);
create index idx_articles_published   on public.articles (published) where published = true;
create index idx_articles_featured    on public.articles (featured) where featured = true;
create index idx_articles_published_at on public.articles (published_at desc);
create index idx_articles_category    on public.articles (category);

-- Full-text search index on title + intro
create index idx_articles_fts on public.articles
  using gin (to_tsvector('english', title || ' ' || intro));


-- ---------------------------------------------------------------------------
-- enquiries
-- ---------------------------------------------------------------------------

create table public.enquiries (
  id           uuid primary key default uuid_generate_v4(),
  full_name    text not null,
  business     text not null,
  email        text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone        text,
  service_slug text not null references public.services (slug) on delete restrict,
  budget_range budget_range not null,
  timeframe    timeframe not null,
  description  text not null check (char_length(description) between 10 and 5000),
  consent      boolean not null check (consent = true),  -- must be true to submit
  status       enquiry_status not null default 'new',
  admin_notes  text,
  ip_address   inet,             -- stored for basic spam detection
  user_agent   text,
  submitted_at timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.enquiries   is 'Contact/enquiry form submissions from the website.';
comment on column public.enquiries.consent      is 'User must have ticked the consent checkbox.';
comment on column public.enquiries.status       is 'Admin workflow status: new → read → replied | archived.';
comment on column public.enquiries.admin_notes  is 'Internal notes — never visible to the enquirer.';
comment on column public.enquiries.ip_address   is 'Stored for spam/abuse detection only.';

create index idx_enquiries_status       on public.enquiries (status);
create index idx_enquiries_submitted_at on public.enquiries (submitted_at desc);
create index idx_enquiries_email        on public.enquiries (email);
create index idx_enquiries_service_slug on public.enquiries (service_slug);


-- ---------------------------------------------------------------------------
-- updated_at auto-update trigger
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

create trigger trg_services_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

create trigger trg_packages_updated_at
  before update on public.packages
  for each row execute function public.set_updated_at();

create trigger trg_articles_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

create trigger trg_enquiries_updated_at
  before update on public.enquiries
  for each row execute function public.set_updated_at();
