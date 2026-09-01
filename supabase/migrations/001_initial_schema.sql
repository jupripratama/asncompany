create extension if not exists "pgcrypto";

create type public.app_role as enum ('admin', 'editor');
create type public.publish_status as enum ('draft', 'published', 'archived');
create type public.rfq_status as enum ('new', 'reviewing', 'quoted', 'closed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.app_role not null default 'editor',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text,
  cover_image text,
  status public.publish_status not null default 'draft',
  published_at timestamptz,
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  client_name text,
  location text,
  summary text,
  content text,
  cover_image text,
  completion_date date,
  status public.publish_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text not null,
  sort_order integer not null default 0,
  status public.publish_status not null default 'draft',
  created_at timestamptz not null default now()
);

create table public.careers (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  location text,
  employment_type text,
  description text,
  requirements text,
  closes_at timestamptz,
  status public.publish_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.rfqs (
  id uuid primary key default gen_random_uuid(),
  requester_name text not null,
  company_name text not null,
  email text not null,
  phone text not null,
  category text not null,
  items text not null,
  source text not null default 'website',
  status public.rfq_status not null default 'new',
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.projects enable row level security;
alter table public.gallery_items enable row level security;
alter table public.careers enable row level security;
alter table public.rfqs enable row level security;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

create policy "Published posts are public" on public.posts for select using (status = 'published');
create policy "Published projects are public" on public.projects for select using (status = 'published');
create policy "Published gallery is public" on public.gallery_items for select using (status = 'published');
create policy "Published careers are public" on public.careers for select using (status = 'published');
create policy "Staff manage posts" on public.posts for all using (public.is_staff()) with check (public.is_staff());
create policy "Staff manage projects" on public.projects for all using (public.is_staff()) with check (public.is_staff());
create policy "Staff manage gallery" on public.gallery_items for all using (public.is_staff()) with check (public.is_staff());
create policy "Staff manage careers" on public.careers for all using (public.is_staff()) with check (public.is_staff());
create policy "Staff view RFQs" on public.rfqs for select using (public.is_staff());
create policy "Staff update RFQs" on public.rfqs for update using (public.is_staff()) with check (public.is_staff());

-- RFQ publik sebaiknya dibuat melalui Next.js Route Handler dengan service-role,
-- validasi server, rate limiting, dan CAPTCHA; jangan membuka policy INSERT anonim.
