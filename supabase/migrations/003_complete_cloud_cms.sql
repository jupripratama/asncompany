-- =====================================================================
-- 003_complete_cloud_cms.sql
-- Skrip Migrasi Lengkap Cloud CMS CV Agape Sinar Nirwana
-- Eksekusi skrip ini di: Supabase Dashboard > SQL Editor > New query > Run
-- =====================================================================

create extension if not exists "pgcrypto";

-- 1. TABEL PRODUK (KATALOG & VARIAN LENGKAP)
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

-- 2. TABEL LAYANAN PENGADAAN (4 PILAR)
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

-- 3. TABEL INFORMASI KANTOR RESMI
create table if not exists public.company_settings (
  id text primary key default 'main',
  legal_name text not null default 'CV Agape Sinar Nirwana',
  short_name text not null default 'ASN',
  tagline text not null default 'General Supplier & Mining Support Solutions',
  description text default 'Mitra pengadaan kebutuhan industri, pertambangan, konstruksi, dan infrastruktur dari Balikpapan, Kalimantan Timur.',
  email text not null default 'agapesinarnirwana@gmail.com',
  phone_display text not null default '+62 851-9094-6049',
  phone_international text not null default '6285190946049',
  location text not null default 'Balikpapan, Kalimantan Timur',
  address text not null default 'Jl. Taruna Sari RT 63 No 17, Gunung Sari Ilir 76121, Balikpapan, Kalimantan Timur',
  address_street text not null default 'Jl. Taruna Sari RT 63 No 17',
  address_subdistrict text not null default 'Gunung Sari Ilir 76121',
  address_city text not null default 'Balikpapan, Kalimantan Timur',
  business_hours text not null default 'Senin–Jumat, 08.00–17.00 WITA',
  updated_at timestamptz not null default now()
);

-- 4. TABEL PENGATURAN HERO BANNER
create table if not exists public.hero_settings (
  id text primary key default 'main',
  home_hero_image text not null default '/images/hero.jpg',
  product_hero_image text not null default '/images/hero.jpg',
  home_title text not null default 'Mitra Pengadaan Terpercaya untuk Industri Indonesia',
  home_subtitle text not null default 'Solusi pengadaan kebutuhan pertambangan dan industri dari Balikpapan, dengan pilihan produk fleksibel serta dukungan yang responsif.',
  updated_at timestamptz not null default now()
);

-- 5. TABEL TENTANG KAMI (PROFIL, VISI, MISI, PILAR)
create table if not exists public.about_settings (
  id text primary key default 'main',
  tagline text not null default 'General Supplier & Mining Support Solutions',
  profile_p1 text not null default 'CV Agape Sinar Nirwana (ASN) adalah perusahaan yang bergerak di bidang General Supplier dengan fokus pada penyediaan kebutuhan industri, pertambangan, konstruksi, dan infrastruktur.',
  profile_p2 text not null default 'Berdomisili di Balikpapan, Kalimantan Timur—sebagai pusat logistik dan gerbang pertambangan energi terkemuka Indonesia—ASN memiliki posisi strategis untuk memenuhi kebutuhan operasional tambang dan industri di Kalimantan, Sulawesi, hingga seluruh pelosok Indonesia secara cepat dan tanggap.',
  vision_title text not null default 'Menjadi mitra pengadaan terpercaya bagi industri Indonesia.',
  vision_text text not null default 'Membangun rantai pasok material dan perlengkapan teknik yang terpercaya, berintegritas, dan mendukung kemajuan sektor industri nasional.',
  missions jsonb not null default '[]'::jsonb,
  pillars jsonb not null default '[]'::jsonb,
  promises jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- 6. TABEL INBOX PERMINTAAN PENAWARAN (RFQ)
create table if not exists public.rfqs (
  id uuid primary key default gen_random_uuid(),
  requester_name text not null,
  company_name text not null,
  email text not null,
  phone text not null,
  category text not null,
  items text not null,
  source text not null default 'website',
  status text not null default 'new',
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =====================================================================
-- HAK AKSES REAL-TIME (ROW LEVEL SECURITY POLICIES)
-- Memastikan Form Publik & Admin CMS dapat Membaca/Menyimpan Tanpa Error
-- =====================================================================

alter table public.products enable row level security;
alter table public.services enable row level security;
alter table public.company_settings enable row level security;
alter table public.hero_settings enable row level security;
alter table public.about_settings enable row level security;
alter table public.rfqs enable row level security;

-- Products Policies
drop policy if exists "Allow select products" on public.products;
drop policy if exists "Allow insert products" on public.products;
drop policy if exists "Allow update products" on public.products;
drop policy if exists "Allow delete products" on public.products;
create policy "Allow select products" on public.products for select using (true);
create policy "Allow insert products" on public.products for insert with check (true);
create policy "Allow update products" on public.products for update using (true);
create policy "Allow delete products" on public.products for delete using (true);

-- Services Policies
drop policy if exists "Allow select services" on public.services;
drop policy if exists "Allow insert services" on public.services;
drop policy if exists "Allow update services" on public.services;
drop policy if exists "Allow delete services" on public.services;
create policy "Allow select services" on public.services for select using (true);
create policy "Allow insert services" on public.services for insert with check (true);
create policy "Allow update services" on public.services for update using (true);
create policy "Allow delete services" on public.services for delete using (true);

-- Company Settings Policies
drop policy if exists "Allow select company_settings" on public.company_settings;
drop policy if exists "Allow insert company_settings" on public.company_settings;
drop policy if exists "Allow update company_settings" on public.company_settings;
drop policy if exists "Allow delete company_settings" on public.company_settings;
create policy "Allow select company_settings" on public.company_settings for select using (true);
create policy "Allow insert company_settings" on public.company_settings for insert with check (true);
create policy "Allow update company_settings" on public.company_settings for update using (true);
create policy "Allow delete company_settings" on public.company_settings for delete using (true);

-- Hero Settings Policies
drop policy if exists "Allow select hero_settings" on public.hero_settings;
drop policy if exists "Allow insert hero_settings" on public.hero_settings;
drop policy if exists "Allow update hero_settings" on public.hero_settings;
drop policy if exists "Allow delete hero_settings" on public.hero_settings;
create policy "Allow select hero_settings" on public.hero_settings for select using (true);
create policy "Allow insert hero_settings" on public.hero_settings for insert with check (true);
create policy "Allow update hero_settings" on public.hero_settings for update using (true);
create policy "Allow delete hero_settings" on public.hero_settings for delete using (true);

-- About Settings Policies
drop policy if exists "Allow select about_settings" on public.about_settings;
drop policy if exists "Allow insert about_settings" on public.about_settings;
drop policy if exists "Allow update about_settings" on public.about_settings;
drop policy if exists "Allow delete about_settings" on public.about_settings;
create policy "Allow select about_settings" on public.about_settings for select using (true);
create policy "Allow insert about_settings" on public.about_settings for insert with check (true);
create policy "Allow update about_settings" on public.about_settings for update using (true);
create policy "Allow delete about_settings" on public.about_settings for delete using (true);

-- RFQ Policies
drop policy if exists "Staff view RFQs" on public.rfqs;
drop policy if exists "Staff update RFQs" on public.rfqs;
drop policy if exists "Allow insert rfqs" on public.rfqs;
drop policy if exists "Allow select rfqs" on public.rfqs;
drop policy if exists "Allow update rfqs" on public.rfqs;
drop policy if exists "Allow delete rfqs" on public.rfqs;
create policy "Allow insert rfqs" on public.rfqs for insert with check (true);
create policy "Allow select rfqs" on public.rfqs for select using (true);
create policy "Allow update rfqs" on public.rfqs for update using (true);
create policy "Allow delete rfqs" on public.rfqs for delete using (true);

-- Inisialisasi Record Default Singletons
insert into public.company_settings (id, legal_name, short_name, tagline, email, phone_display, phone_international, address_street, address_subdistrict, address_city)
values ('main', 'CV Agape Sinar Nirwana', 'ASN', 'General Supplier & Mining Support Solutions', 'agapesinarnirwana@gmail.com', '+62 851-9094-6049', '6285190946049', 'Jl. Taruna Sari RT 63 No 17', 'Gunung Sari Ilir 76121', 'Balikpapan, Kalimantan Timur')
on conflict (id) do update set updated_at = now();

insert into public.hero_settings (id, home_title, home_subtitle, home_hero_image, product_hero_image)
values ('main', 'Mitra Pengadaan Terpercaya untuk Industri Indonesia', 'Solusi pengadaan kebutuhan pertambangan dan industri dari Balikpapan, dengan pilihan produk fleksibel serta dukungan yang responsif.', '/images/hero.jpg', '/images/hero.jpg')
on conflict (id) do update set updated_at = now();

insert into public.about_settings (id, tagline, profile_p1, profile_p2, vision_title, vision_text, missions, pillars, promises)
values (
  'main',
  'General Supplier & Mining Support Solutions',
  'CV Agape Sinar Nirwana (ASN) adalah perusahaan yang bergerak di bidang General Supplier dengan fokus pada penyediaan kebutuhan industri, pertambangan, konstruksi, dan infrastruktur. Kami menyediakan produk berkualitas dengan harga kompetitif untuk mendukung kelancaran operasional pelanggan.',
  'Berdomisili di Balikpapan, Kalimantan Timur—sebagai pusat logistik dan gerbang pertambangan energi terkemuka Indonesia—ASN memiliki posisi strategis untuk memenuhi kebutuhan operasional tambang dan industri di Kalimantan, Sulawesi, hingga seluruh pelosok Indonesia secara cepat dan tanggap.',
  'Menjadi mitra pengadaan terpercaya bagi industri Indonesia.',
  'Membangun rantai pasok material dan perlengkapan teknik yang terpercaya, berintegritas, dan mendukung kemajuan sektor industri nasional.',
  '[{"number":"1","title":"Menyediakan Produk Berkualitas","description":"Memastikan setiap produk dan suku cadang yang disuplai memenuhi standar teknik tinggi dan bergaransi resmi."},{"number":"2","title":"Layanan Cepat & Profesional","description":"Merespons setiap permintaan penawaran dan kebutuhan mendesak operasional site secara cepat dan akurat."},{"number":"3","title":"Solusi Efisien & Ekonomis","description":"Menawarkan struktur harga kompetitif yang menekan total cost of ownership tanpa kompromi kualitas."},{"number":"4","title":"Hubungan Jangka Panjang","description":"Membangun kemitraan strategis berlandaskan transparansi, integritas, dan konsistensi pelayanan."}]'::jsonb,
  '[{"title":"Harga Kompetitif","description":"Harga langsung dari principal dan distributor resmi untuk efisiensi anggaran pengadaan belanja operasional Anda."},{"title":"Produk Berkualitas","description":"Standar uji mutu bersertifikasi, mill sheet material, dan garansi resmi pabrikan."},{"title":"Multi Brand Solution","description":"Keluasan memilih merek terkemuka dunia sesuai preferensi teknis dan anggaran proyek Anda."},{"title":"Pengiriman Tepat Waktu","description":"Koordinasi logistik darat, laut, dan udara untuk memastikan material tiba tepat waktu di remote site tambang."},{"title":"Dukungan Teknis Responsif","description":"Bantuan pencocokan part number, kalkulasi teknis, dan pemilihan alat oleh tim teknis berdedikasi."},{"title":"Fleksibel Sesuai Kebutuhan","description":"Menyesuaikan terms pengadaan dan jadwal pengiriman bertahap (staggered delivery) sesuai kondisi lapangan."}]'::jsonb,
  '[{"label":"CEPAT","description":"Respons penawaran dalam 24 jam & logistik sigap."},{"label":"TEPAT","description":"Kesesuaian part number dan spesifikasi teknis."},{"label":"BERNILAI TAMBAH","description":"Efisiensi total biaya dan masa pakai alat maksimal."}]'::jsonb
)
on conflict (id) do update set updated_at = now();