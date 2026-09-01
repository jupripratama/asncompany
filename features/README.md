# Feature modules

Folder ini menjadi batas logika bisnis agar UI tidak terikat langsung ke Supabase.

Rencana modul:

- `auth`: session, role, dan proteksi admin
- `content`: berita dan halaman dinamis
- `products`: katalog dan kategori
- `projects`: project/portfolio
- `gallery`: media dan album
- `career`: lowongan dan lamaran
- `rfq`: request for quotation dan status tindak lanjut

Setiap modul dapat memiliki `types.ts`, `schema.ts`, `repository.ts`, `queries.ts`, dan komponen khusus. Repository Supabase nantinya dapat diganti oleh REST API Elysia tanpa mengubah halaman.
