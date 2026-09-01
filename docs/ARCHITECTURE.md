# ASN Website Architecture

## Stack tahap pertama

- Next.js App Router + TypeScript
- Tailwind CSS + komponen bergaya shadcn/ui
- Supabase PostgreSQL, Auth, dan Storage
- Vercel untuk deployment aplikasi
- Cloudflare untuk DNS, CDN, dan proteksi domain

ElysiaJS belum diperlukan pada tahap pertama. Integrasi eksternal harus masuk melalui service/repository di `features/*` atau Route Handler agar backend dapat dipisahkan kemudian tanpa mengubah komponen halaman.

## Batas modul

```text
app/                  Route, layout, metadata, dan Route Handler
components/           Komponen UI bersama
features/             Logika bisnis per modul
lib/                  Konfigurasi, helper, dan client infrastruktur
public/               Aset statis
supabase/migrations/  Skema database dan RLS
```

## Modul publik

- Company profile: home, about, solutions, products, contact
- Content: projects, gallery, news, career
- RFQ: WhatsApp, email, dan penyimpanan database pada tahap Supabase

## Modul admin

- Supabase Auth untuk autentikasi
- Role `admin` dan `editor`
- CRUD produk, project, gallery, berita, dan career
- Inbox RFQ dan perubahan status tindak lanjut
- Upload gambar/dokumen melalui Supabase Storage

## Tahapan implementasi

1. Fondasi dan halaman company profile
2. Supabase client, migration, dan seed
3. Login admin dan proteksi route
4. Dashboard serta CRUD CMS
5. Penyimpanan RFQ dan notifikasi
6. SEO, analytics, performance, dan deployment
