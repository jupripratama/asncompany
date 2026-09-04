"use client";

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Cloud,
  Database,
  Download,
  FileCode,
  Key,
  Layers,
  Loader2,
  RefreshCcw,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAdminStore } from "@/lib/admin-store";
import {
  clearSupabaseConfig,
  fetchStoreFromSupabase,
  getSupabaseCredentials,
  isSupabaseConnected,
  saveSupabaseConfig,
  syncStoreToSupabase,
  testSupabaseConnection,
} from "@/lib/supabase";

export default function AdminSettingsPage() {
  const { store, mounted, resetToDefault } = useAdminStore();
  const [notification, setNotification] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Supabase states
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseKey, setSupabaseKey] = useState("");
  const [supabaseSource, setSupabaseSource] = useState<"env" | "storage" | "none">("none");
  const [isConnected, setIsConnected] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    tableExists?: boolean;
  } | null>(null);

  useEffect(() => {
    function loadCredentials() {
      const creds = getSupabaseCredentials();
      setSupabaseUrl(creds.url);
      setSupabaseKey(creds.key);
      setSupabaseSource(creds.source);
      setIsConnected(isSupabaseConnected());
    }

    loadCredentials();
    window.addEventListener("asn-supabase-config-updated", loadCredentials);
    return () => {
      window.removeEventListener("asn-supabase-config-updated", loadCredentials);
    };
  }, []);

  if (!mounted) {
    return <div className="p-8 text-sm text-slate-500">Memuat pengaturan…</div>;
  }

  function showNotice(msg: string) {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4500);
  }

  function handleSaveSupabase(e: React.FormEvent) {
    e.preventDefault();
    if (!supabaseUrl.trim() || !supabaseKey.trim()) {
      alert("Harap isi Supabase Project URL dan Anon Key.");
      return;
    }
    saveSupabaseConfig(supabaseUrl.trim(), supabaseKey.trim());
    showNotice("Pengaturan koneksi Supabase berhasil disimpan di browser!");
    setTestResult(null);
  }

  function handleClearSupabase() {
    if (confirm("Hapus pengaturan koneksi Supabase dari browser ini? Sistem akan kembali menggunakan penyimpanan LocalStorage.")) {
      clearSupabaseConfig();
      setSupabaseUrl("");
      setSupabaseKey("");
      setTestResult(null);
      showNotice("Kredensial Supabase berhasil dihapus.");
    }
  }

  async function handleTestSupabase() {
    setIsTesting(true);
    setTestResult(null);
    try {
      // If user typed values in the form that aren't saved yet, save them first
      if (supabaseUrl && supabaseKey) {
        saveSupabaseConfig(supabaseUrl, supabaseKey);
      }
      const res = await testSupabaseConnection();
      setTestResult(res);
      if (res.success) {
        showNotice("Koneksi ke Supabase berhasil!");
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err?.message || "Gagal menghubungi Supabase",
      });
    } finally {
      setIsTesting(false);
    }
  }

  async function handleSyncToSupabase() {
    if (!isConnected && (!supabaseUrl || !supabaseKey)) {
      alert("Harap masukkan dan simpan Supabase Project URL dan Anon Key terlebih dahulu.");
      return;
    }
    setIsSyncing(true);
    try {
      if (supabaseUrl && supabaseKey) {
        saveSupabaseConfig(supabaseUrl, supabaseKey);
      }
      const res = await syncStoreToSupabase(store);
      if (res.success) {
        showNotice(res.message);
      } else {
        alert(res.message);
      }
    } catch (err: any) {
      alert(`Terjadi kesalahan saat sinkronisasi: ${err?.message}`);
    } finally {
      setIsSyncing(false);
    }
  }

  async function handlePullFromSupabase() {
    if (!isConnected) {
      alert("Koneksi Supabase belum aktif.");
      return;
    }
    try {
      const remote = await fetchStoreFromSupabase();
      if (remote?.products && remote.products.length > 0) {
        const nextStore = { ...store, products: remote.products };
        localStorage.setItem("asn-admin-cms-store-v1", JSON.stringify(nextStore));
        window.dispatchEvent(new Event("asn-store-updated"));
        showNotice(`Berhasil menarik ${remote.products.length} data produk dari Supabase Cloud!`);
      } else {
        alert("Belum ada data produk di tabel Supabase.");
      }
    } catch (err: any) {
      alert(`Gagal mengambil data dari Supabase: ${err?.message}`);
    }
  }

  function handleExportJson() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `asn-database-backup-${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotice("File cadangan JSON database berhasil diunduh!");
  }

  function handleExportSql() {
    const esc = (s: string) => (s || "").replace(/'/g, "''");

    const sqlHeader = `-- =====================================================================
-- CV Agape Sinar Nirwana (ASN) - Supabase Database Schema & Seed Data
-- Generated: ${new Date().toISOString()}
-- =====================================================================

create extension if not exists "pgcrypto";

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
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.services enable row level security;
alter table public.company_settings enable row level security;
alter table public.rfqs enable row level security;

create policy if not exists "Public read products" on public.products for select using (true);
create policy if not exists "Public read services" on public.services for select using (true);
create policy if not exists "Public read settings" on public.company_settings for select using (true);
create policy if not exists "Public read rfqs" on public.rfqs for select using (true);

create policy if not exists "Allow insert products" on public.products for insert with check (true);
create policy if not exists "Allow update products" on public.products for update using (true);
create policy if not exists "Allow delete products" on public.products for delete using (true);

create policy if not exists "Allow insert services" on public.services for insert with check (true);
create policy if not exists "Allow update services" on public.services for update using (true);
create policy if not exists "Allow delete services" on public.services for delete using (true);

create policy if not exists "Allow insert settings" on public.company_settings for insert with check (true);
create policy if not exists "Allow update settings" on public.company_settings for update using (true);

create policy if not exists "Allow insert rfqs" on public.rfqs for insert with check (true);
create policy if not exists "Allow update rfqs" on public.rfqs for update using (true);
`;

    const productInserts = store.products
      .map(
        (p) => `insert into public.products (slug, name, category, category_label, description, highlights, standards, brands, images, variants)
values (
  '${esc(p.slug)}',
  '${esc(p.name)}',
  '${esc(p.category)}',
  '${esc(p.categoryLabel)}',
  '${esc(p.description)}',
  '${esc(JSON.stringify(p.highlights || []))}'::jsonb,
  '${esc(JSON.stringify(p.standards || []))}'::jsonb,
  '${esc(JSON.stringify(p.brands || []))}'::jsonb,
  '${esc(JSON.stringify(p.images || []))}'::jsonb,
  '${esc(JSON.stringify(p.variants || []))}'::jsonb
) on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  category_label = excluded.category_label,
  description = excluded.description,
  highlights = excluded.highlights,
  standards = excluded.standards,
  brands = excluded.brands,
  images = excluded.images,
  variants = excluded.variants,
  updated_at = now();`
      )
      .join("\n\n");

    const fullSql = `${sqlHeader}\n\n-- Products Seed (${store.products.length} items)\n${productInserts}\n`;
    const blob = new Blob([fullSql], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", url);
    downloadAnchor.setAttribute("download", `asn-supabase-seed-${new Date().toISOString().split("T")[0]}.sql`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    URL.revokeObjectURL(url);
    showNotice("File skrip SQL Supabase berhasil diunduh dengan data produk riil ASN!");
  }

  function handleImportJson(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.products && json.services) {
          localStorage.setItem("asn-admin-cms-store-v1", JSON.stringify(json));
          window.dispatchEvent(new Event("asn-store-updated"));
          showNotice("Database berhasil dipulihkan dari file JSON cadangan!");
        } else {
          alert("Format file JSON tidak valid.");
        }
      } catch (err) {
        alert("Gagal membaca file cadangan.");
      }
    };
    reader.readAsText(file);
  }

  function handleReset() {
    if (
      confirm(
        "PERINGATAN: Apakah Anda yakin ingin mereset seluruh data kembali ke data riil bawaan ASN? Perubahan yang belum dicadangkan akan kembali ke kondisi awal."
      )
    ) {
      resetToDefault();
      showNotice("Data telah berhasil direset ke kondisi riil awal.");
    }
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Pengaturan Sistem & Cadangan Database
          </h2>
          <p className="text-xs text-slate-500">
            Hubungkan database Supabase Cloud, ekspor skrip SQL, unduh cadangan JSON, dan kelola sinkronisasi media WebP.
          </p>
        </div>
        {notification && (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600">
            <CheckCircle2 className="size-4" /> {notification}
          </span>
        )}
      </div>

      {/* 1. Koneksi Supabase Cloud Database */}
      <div className="surface-card space-y-5 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Cloud className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">
                Koneksi Database Supabase Cloud
              </h3>
              <p className="text-xs text-slate-500">
                Penyimpanan cloud terpusat agar perubahan katalog di panel admin langsung terlihat di seluruh perangkat pengunjung.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isConnected ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Terhubung ke Supabase
                {supabaseSource === "env" ? " (.env / Vercel)" : " (Browser)"}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600">
                <span className="size-2 rounded-full bg-amber-500" />
                Mode Browser (LocalStorage)
              </span>
            )}
          </div>
        </div>

        {/* Petunjuk Ringkas */}
        <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/70 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400 space-y-2">
          <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-cyan-600" /> Panduan Menghubungkan Database Supabase:
          </p>
          <ol className="list-decimal pl-4 space-y-1 leading-relaxed">
            <li>
              Buka project Supabase Anda di <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-cyan-600 underline font-semibold">supabase.com</a>.
            </li>
            <li>
              Buka menu <strong>SQL Editor</strong> di Supabase, lalu klik tombol <strong>"Unduh Skrip SQL Supabase"</strong> di bawah dan jalankan skrip tersebut untuk membuat tabel dan menanamkan data awal.
            </li>
            <li>
              Buka <strong>Project Settings &gt; API</strong> di Supabase, lalu salin <strong>Project URL</strong> dan <strong>anon / public key</strong> ke form di bawah, lalu klik <strong>"Simpan &amp; Tes Koneksi"</strong>.
            </li>
          </ol>
        </div>

        {/* Form Supabase */}
        <form onSubmit={handleSaveSupabase} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Supabase Project URL
              </label>
              <input
                type="text"
                placeholder="https://xyzabcdefghijklm.supabase.co"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-cyan-500 dark:border-slate-800 dark:bg-slate-900"
              />
              <p className="mt-1 text-[11px] text-slate-400">Ditemukan di Supabase: Settings &gt; API &gt; Project URL</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Supabase Anon / Public API Key
              </label>
              <input
                type="password"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-cyan-500 dark:border-slate-800 dark:bg-slate-900 font-mono"
              />
              <p className="mt-1 text-[11px] text-slate-400">Ditemukan di Supabase: Settings &gt; API &gt; Project API Keys &gt; anon public</p>
            </div>
          </div>

          {/* Test Result Message */}
          {testResult && (
            <div
              className={`rounded-xl p-3 text-xs flex items-start gap-2 ${
                testResult.success
                  ? testResult.tableExists === false
                    ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                    : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20"
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="size-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
              )}
              <div className="leading-relaxed">{testResult.message}</div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="button-primary text-xs inline-flex items-center gap-1.5"
            >
              <Save className="size-3.5" /> Simpan Pengaturan
            </button>

            <button
              type="button"
              onClick={handleTestSupabase}
              disabled={isTesting}
              className="button-secondary text-xs inline-flex items-center gap-1.5"
            >
              {isTesting ? <Loader2 className="size-3.5 animate-spin" /> : <RefreshCcw className="size-3.5" />}
              {isTesting ? "Sedang Menguji…" : "Tes Koneksi"}
            </button>

            <button
              type="button"
              onClick={handleSyncToSupabase}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 rounded-full bg-cyan-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-cyan-700 disabled:opacity-50"
            >
              {isSyncing ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
              {isSyncing ? "Sedang Mengunggah…" : "🚀 Unggah Semua Data Lokal ke Supabase"}
            </button>

            <button
              type="button"
              onClick={handlePullFromSupabase}
              className="button-secondary text-xs inline-flex items-center gap-1.5"
            >
              <Download className="size-3.5" /> Tarik Data dari Supabase
            </button>

            {supabaseSource === "storage" && (
              <button
                type="button"
                onClick={handleClearSupabase}
                className="text-xs text-red-500 hover:text-red-700 inline-flex items-center gap-1 ml-auto"
              >
                <Trash2 className="size-3.5" /> Hapus Kredensial
              </button>
            )}
          </div>
        </form>
      </div>

      {/* 2. Status Optimasi WebP */}
      <div className="surface-card space-y-4 p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="size-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              Status Optimasi Kompresi WebP Otomatis
            </h3>
            <p className="text-xs text-slate-500">
              Semua gambar yang diunggah otomatis diubah ke format WebP ringan langsung di browser.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40">
            <p className="text-xs font-bold text-slate-500">Format Target</p>
            <p className="mt-1 text-lg font-black text-slate-900 dark:text-white">image/webp</p>
            <p className="text-[11px] text-emerald-600">Standar modern web paling efisien</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40">
            <p className="text-xs font-bold text-slate-500">Kualitas Kompresi</p>
            <p className="mt-1 text-lg font-black text-slate-900 dark:text-white">82% Visual High</p>
            <p className="text-[11px] text-emerald-600">Menjaga ketajaman & warna tajam</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40">
            <p className="text-xs font-bold text-slate-500">Penghematan Ukuran</p>
            <p className="mt-1 text-lg font-black text-emerald-600 dark:text-emerald-400">75% – 85%</p>
            <p className="text-[11px] text-slate-500">Dari ~5MB menjadi ~80KB saja</p>
          </div>
        </div>
      </div>

      {/* 3. Backup & Export Database */}
      <div className="surface-card space-y-5 p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
          <span className="grid size-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <Database className="size-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              Cadangan (Backup) &amp; Ekspor Database
            </h3>
            <p className="text-xs text-slate-500">
              Unduh seluruh data 24 produk, layanan, profil perusahaan, dan RFQ dalam format JSON atau skrip migrasi SQL Supabase.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-slate-200 p-5 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
              <Download className="size-4 text-cyan-600" />
              <span>Ekspor File Cadangan JSON</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Menyimpan seluruh katalog 24 produk, varian, teks tentang kami, kontak, dan pesan RFQ ke file JSON yang dapat dipulihkan kapan saja.
            </p>
            <button
              type="button"
              onClick={handleExportJson}
              className="button-primary text-xs w-full"
            >
              Unduh File Backup JSON
            </button>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-200 p-5 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
              <FileCode className="size-4 text-cyan-600" />
              <span>Ekspor Skrip Migrasi SQL (Supabase)</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Skrip SQL dinamis yang berisi struktur tabel dan seluruh data 24 produk riil ASN yang siap dieksekusi di Supabase SQL Editor.
            </p>
            <button
              type="button"
              onClick={handleExportSql}
              className="button-secondary text-xs w-full"
            >
              Unduh Skrip SQL Supabase (Lengkap 24 Produk)
            </button>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            Pulihkan Database dari File Cadangan (Import JSON)
          </label>
          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportJson}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="button-secondary text-xs inline-flex items-center gap-1.5"
            >
              <Upload className="size-3.5" /> Pilih File Cadangan (.json)
            </button>
            <span className="text-xs text-slate-400">Pilih file JSON cadangan yang pernah diunduh sebelumnya.</span>
          </div>
        </div>
      </div>

      {/* 4. Reset ke Data Awal Bawaan */}
      <div className="surface-card space-y-4 p-6 sm:p-8 border-red-200 dark:border-red-900/40">
        <div className="flex items-center gap-3 border-b border-red-100 pb-4 dark:border-red-900/30">
          <span className="grid size-10 place-items-center rounded-xl bg-red-500/10 text-red-600">
            <AlertTriangle className="size-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              Reset ke Data Standar Riil ASN
            </h3>
            <p className="text-xs text-slate-500">
              Jika Anda ingin membatalkan semua perubahan dan mengembalikan katalog 24 produk ke data riil bawaan.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
            Tindakan ini akan mereset data produk, layanan, kontak, dan tentang kami kembali ke data awal yang telah kami siapkan. Disarankan untuk mengekspor cadangan JSON terlebih dahulu sebelum melakukan reset.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-full border border-red-300 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-100 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400"
          >
            <RefreshCcw className="size-3.5" /> Reset ke Data Awal
          </button>
        </div>
      </div>
    </div>
  );
}

