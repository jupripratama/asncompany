"use client";

import { CheckCircle2, Eye, Image as ImageIcon, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AdminImageUploader } from "@/components/admin-image-uploader";
import { useAdminStore } from "@/lib/admin-store";

export default function AdminHeroPage() {
  const { store, mounted, updateHero } = useAdminStore();
  const [homeHeroImage, setHomeHeroImage] = useState(store.hero.homeHeroImage);
  const [productHeroImage, setProductHeroImage] = useState(store.hero.productHeroImage);
  const [homeTitle, setHomeTitle] = useState(store.hero.homeTitle);
  const [homeSubtitle, setHomeSubtitle] = useState(store.hero.homeSubtitle);
  const [savedMessage, setSavedMessage] = useState(false);

  if (!mounted) {
    return <div className="p-8 text-sm text-slate-500">Memuat data hero…</div>;
  }

  function handleSave() {
    updateHero({
      homeHeroImage,
      productHeroImage,
      homeTitle,
      homeSubtitle,
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Pengaturan Gambar Hero Website
          </h2>
          <p className="text-xs text-slate-500">
            Ubah gambar latar belakang banner utama pada halaman beranda dan detail produk. Gambar yang diunggah otomatis dikonversi ke format <strong>WebP ultra-ringan</strong>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {savedMessage && (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600">
              <CheckCircle2 className="size-4" /> Berhasil Disimpan!
            </span>
          )}
          <button type="button" onClick={handleSave} className="button-primary text-xs">
            Simpan Perubahan
          </button>
        </div>
      </div>

      {/* Grid: Home Hero & Product Hero */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* 1. Home Page Hero */}
        <div className="surface-card space-y-5 p-6 sm:p-8">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
            <span className="grid size-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <ImageIcon className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">
                Gambar Hero Beranda (Home Page)
              </h3>
              <p className="text-xs text-slate-500">Banner pembuka utama saat pengunjung pertama kali datang.</p>
            </div>
          </div>

          <AdminImageUploader
            label="Unggah / Ganti Gambar Hero Beranda"
            aspectRatio="video"
            maxDimension={1920}
            currentImage={homeHeroImage}
            onImageUploaded={(webp) => setHomeHeroImage(webp || "/images/hero.jpg")}
          />

          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Judul Banner Beranda
              </label>
              <input
                type="text"
                value={homeTitle}
                onChange={(e) => setHomeTitle(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Subjudul Deskripsi Singkat
              </label>
              <textarea
                rows={3}
                value={homeSubtitle}
                onChange={(e) => setHomeSubtitle(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>
        </div>

        {/* 2. Product Detail Hero */}
        <div className="surface-card space-y-5 p-6 sm:p-8">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
            <span className="grid size-10 place-items-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <ImageIcon className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">
                Gambar Hero Halaman Produk
              </h3>
              <p className="text-xs text-slate-500">Banner latar pada header katalog produk dan detail produk.</p>
            </div>
          </div>

          <AdminImageUploader
            label="Unggah / Ganti Gambar Hero Produk"
            aspectRatio="video"
            maxDimension={1920}
            currentImage={productHeroImage}
            onImageUploaded={(webp) => setProductHeroImage(webp || "/images/hero.jpg")}
          />

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
            <p className="font-bold text-slate-900 dark:text-white">💡 Tips Pemilihan Gambar:</p>
            <p className="mt-1">
              Gunakan foto bertema operasional tambang, rig pengeboran, workshop industri, atau alat berat. Sistem akan otomatis menerapkan gradien gelap elegan di atasnya agar teks judul tetap mudah dibaca dengan kontras tinggi.
            </p>
          </div>
        </div>
      </div>

      {/* Live Preview Simulation Card */}
      <div className="surface-card overflow-hidden !p-0">
        <div className="border-b border-slate-200 p-4 sm:p-6 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-950 dark:text-white">
              Pratinjau Tampilan Hero Beranda
            </h3>
            <p className="text-xs text-slate-500">Simulasi tampilan langsung di website</p>
          </div>
          <Link href="/" target="_blank" className="button-secondary text-xs inline-flex items-center gap-1.5">
            <Eye className="size-3.5" /> Buka Live Website
          </Link>
        </div>

        <div className="relative isolate min-h-[300px] overflow-hidden bg-slate-950 p-8 text-white sm:p-12">
          <Image
            src={homeHeroImage}
            alt="Hero Preview"
            fill
            unoptimized={homeHeroImage.startsWith("data:")}
            className="-z-20 object-cover opacity-35"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/90 to-cyan-950/35" />
          <div className="max-w-2xl">
            <p className="text-[10px] font-black tracking-widest text-cyan-300 uppercase">
              GENERAL SUPPLIER & MINING SUPPORT SOLUTIONS
            </p>
            <h2 className="mt-3 text-2xl font-black sm:text-4xl">
              {homeTitle}
            </h2>
            <p className="mt-3 text-xs leading-5 text-slate-300 sm:text-sm">
              {homeSubtitle}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="button-primary text-xs">Lihat Produk →</span>
              <span className="button-secondary text-xs !border-slate-600 !bg-slate-900/80 !text-white">Konsultasi WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
