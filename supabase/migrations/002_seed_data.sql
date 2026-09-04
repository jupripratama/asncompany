-- =====================================================================
-- 002_seed_data.sql: Migrasi Tabel Produk, Layanan, Profil, & Data Riil
-- =====================================================================

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  category_label text not null,
  description text not null,
  highlights jsonb not null default '[]'::jsonb,
  standards jsonb not null default '[]'::jsonb,
  brands jsonb not null default '[]'::jsonb,
  images jsonb not null default '[]'::jsonb,
  variants jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id text primary key,
  title text not null,
  subtitle text,
  description text not null,
  image_url text not null,
  items jsonb not null default '[]'::jsonb,
  cta text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.company_settings (
  id text primary key default 'main',
  legal_name text not null default 'CV Agape Sinar Nirwana',
  short_name text not null default 'ASN',
  tagline text not null default 'General Supplier & Mining Support Solutions',
  phone text not null default '085190546049',
  email text not null default 'agapesinarnirwana@gmail.com',
  address_street text not null default 'Perumahan Puri Mandastana No. 11',
  address_subdistrict text not null default 'RT. 02 Kel. Batu Ampar, Kec. Balikpapan Utara',
  address_city text not null default 'Kota Balikpapan, Kalimantan Timur',
  hero_image text not null default '/images/hero.jpg',
  updated_at timestamptz not null default now()
);

-- Row Level Security
alter table public.products enable row level security;
alter table public.services enable row level security;
alter table public.company_settings enable row level security;

create policy "Public read products" on public.products for select using (true);
create policy "Public read services" on public.services for select using (true);
create policy "Public read settings" on public.company_settings for select using (true);

-- Insert Default Company Settings
insert into public.company_settings (id, legal_name, short_name, tagline, phone, email, address_street, address_subdistrict, address_city)
values ('main', 'CV Agape Sinar Nirwana', 'ASN', 'General Supplier & Mining Support Solutions', '085190546049', 'agapesinarnirwana@gmail.com', 'Perumahan Puri Mandastana No. 11', 'RT. 02 Kel. Batu Ampar, Kec. Balikpapan Utara', 'Kota Balikpapan, Kalimantan Timur')
on conflict (id) do update set updated_at = now();

-- Sample RFQs
insert into public.rfqs (requester_name, company_name, email, phone, category, items, status)
values
  ('Budi Santoso', 'PT Kaltim Prima Coal Project', 'budi.santoso@kpc-supplier.co.id', '081234567890', 'Mining Tools', 'Drill Bit T45 76mm Button Bit 24 pcs', 'new'),
  ('Irfan Kurniawan', 'PT Berau Coal Energy', 'procurement@beraucoal.com', '081398765432', 'Fasteners', 'Stud Bolt ASTM A193 B7 3/4" x 120mm 150 sets', 'quoted'),
  ('Rendra Pratama', 'PT Petrosea Tbk Site Tabang', 'rendra.p@petrosea.com', '081122334455', 'CCTV & Security', '8 unit Kamera Hikvision ColorVu + 1 unit NVR 16 Channel', 'reviewing');
