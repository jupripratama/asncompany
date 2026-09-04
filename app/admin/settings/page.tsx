"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Database,
  Download,
  FileCode,
  Layers,
  RefreshCcw,
  Save,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";
import { useAdminStore } from "@/lib/admin-store";

export default function AdminSettingsPage() {
  const { store, mounted, resetToDefault } = useAdminStore();
  const [notification, setNotification] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!mounted) {
    return <div className="p-8 text-sm text-slate-500">Memuat pengaturan…</div>;
  }

  function showNotice(msg: string) {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
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
    const sqlUrl = "/supabase/migrations/002_seed_data.sql";
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", sqlUrl);
    downloadAnchor.setAttribute("download", "asn-supabase-seed.sql");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotice("File skrip SQL Supabase berhasil diunduh!");
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
            Cadangkan data produk, ekspor skrip database SQL, pulihkan data, dan kelola optimasi media.
          </p>
        </div>
        {notification && (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600">
            <CheckCircle2 className="size-4" /> {notification}
          </span>
        )}
      </div>

      {/* 1. Status Optimasi WebP */}
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

      {/* 2. Backup & Export Database */}
      <div className="surface-card space-y-5 p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
          <span className="grid size-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <Database className="size-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              Cadangan (Backup) & Ekspor Database
            </h3>
            <p className="text-xs text-slate-500">
              Unduh seluruh data produk, layanan, profil perusahaan, dan RFQ dalam format JSON atau skrip migrasi SQL Supabase.
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
              Skrip SQL yang siap dieksekusi di Supabase SQL Editor untuk membuat tabel dan menanamkan data riil ke database cloud.
            </p>
            <button
              type="button"
              onClick={handleExportSql}
              className="button-secondary text-xs w-full"
            >
              Unduh Skrip SQL Supabase
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

      {/* 3. Reset ke Data Awal Bawaan */}
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
