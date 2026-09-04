"use client";

import { Building, CheckCircle2, Eye, Flame, Save, ShieldCheck, Trash2, Plus, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAdminStore } from "@/lib/admin-store";

export default function AdminAboutPage() {
  const { store, mounted, updateAbout } = useAdminStore();
  const [about, setAbout] = useState(store.about);
  const [notification, setNotification] = useState<string | null>(null);

  if (!mounted) {
    return <div className="p-8 text-sm text-slate-500">Memuat data tentang kami…</div>;
  }

  function showNotice(msg: string) {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  }

  function handleSave() {
    updateAbout(about);
    showNotice("Data Tentang Kami, Visi Misi, dan Keunggulan berhasil disimpan!");
  }

  function updateMission(idx: number, field: "title" | "description", val: string) {
    const nextMissions = [...about.missions];
    nextMissions[idx] = { ...nextMissions[idx], [field]: val };
    setAbout({ ...about, missions: nextMissions });
  }

  function updatePillar(idx: number, field: "title" | "description", val: string) {
    const nextPillars = [...about.pillars];
    nextPillars[idx] = { ...nextPillars[idx], [field]: val };
    setAbout({ ...about, pillars: nextPillars });
  }

  function updatePromise(idx: number, field: "label" | "description", val: string) {
    const nextPromises = [...about.promises];
    nextPromises[idx] = { ...nextPromises[idx], [field]: val };
    setAbout({ ...about, promises: nextPromises });
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Kelola Halaman Tentang Kami
          </h2>
          <p className="text-xs text-slate-500">
            Perbarui narasi profil perusahaan, visi, misi, 6 pilar keunggulan, dan komitmen janji layanan.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {notification && (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600">
              <CheckCircle2 className="size-4" /> {notification}
            </span>
          )}
          <Link href="/about" target="_blank" className="button-secondary text-xs inline-flex items-center gap-1">
            Lihat di Web <ExternalLink className="size-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleSave}
            className="button-primary text-xs inline-flex items-center gap-1.5"
          >
            <Save className="size-4" /> Simpan Semua Perubahan
          </button>
        </div>
      </div>

      {/* 1. Profil Perusahaan */}
      <div className="surface-card space-y-5 p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
          <span className="grid size-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <Building className="size-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              1. Profil & Ringkasan Perusahaan
            </h3>
            <p className="text-xs text-slate-500">Narasi resmi pembuka di halaman Tentang Kami.</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Tagline Perusahaan
          </label>
          <input
            type="text"
            value={about.tagline}
            onChange={(e) => setAbout({ ...about, tagline: e.target.value })}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Paragraf Profil 1 (Fokus Usaha & Layanan)
          </label>
          <textarea
            rows={3}
            value={about.profileP1}
            onChange={(e) => setAbout({ ...about, profileP1: e.target.value })}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Paragraf Profil 2 (Posisi Strategis Balikpapan & Keunggulan Logistik)
          </label>
          <textarea
            rows={3}
            value={about.profileP2}
            onChange={(e) => setAbout({ ...about, profileP2: e.target.value })}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
      </div>

      {/* 2. Visi & Misi */}
      <div className="surface-card space-y-5 p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
          <span className="grid size-10 place-items-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Eye className="size-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              2. Visi & Misi Perusahaan
            </h3>
            <p className="text-xs text-slate-500">Pernyataan visi utama dan 4 komitmen misi.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Judul Visi
            </label>
            <input
              type="text"
              value={about.visionTitle}
              onChange={(e) => setAbout({ ...about, visionTitle: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Narasi Visi Utama
            </label>
            <textarea
              rows={2}
              value={about.visionText}
              onChange={(e) => setAbout({ ...about, visionText: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
        </div>

        {/* 4 Missions */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">
            4 Misi Perusahaan
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            {about.missions.map((m, mIdx) => (
              <div
                key={mIdx}
                className="space-y-2 rounded-2xl border border-slate-200 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40"
              >
                <div className="flex items-center gap-2">
                  <span className="grid size-6 place-items-center rounded bg-cyan-500/10 text-xs font-black text-cyan-600">
                    {m.number}
                  </span>
                  <input
                    type="text"
                    value={m.title}
                    onChange={(e) => updateMission(mIdx, "title", e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold outline-none dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <textarea
                  rows={2}
                  value={m.description}
                  onChange={(e) => updateMission(mIdx, "description", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. 6 Pilar Keunggulan ASN */}
      <div className="surface-card space-y-5 p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="size-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              3. Enam Pilar Keunggulan ASN
            </h3>
            <p className="text-xs text-slate-500">Nilai tambah operasional yang ditampilkan di section gelap.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {about.pillars.map((pillar, pIdx) => (
            <div
              key={pIdx}
              className="space-y-2 rounded-2xl border border-slate-200 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40"
            >
              <input
                type="text"
                value={pillar.title}
                onChange={(e) => updatePillar(pIdx, "title", e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 outline-none dark:border-slate-700 dark:bg-slate-800"
              />
              <textarea
                rows={3}
                value={pillar.description}
                onChange={(e) => updatePillar(pIdx, "description", e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. 3 Janji Layanan */}
      <div className="surface-card space-y-5 p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
          <span className="grid size-10 place-items-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Flame className="size-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              4. Janji Layanan Pelanggan (3 Landasan Layanan)
            </h3>
            <p className="text-xs text-slate-500">Pilar Cepat, Tepat, dan Bernilai Tambah.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {about.promises.map((pr, prIdx) => (
            <div
              key={prIdx}
              className="space-y-2 rounded-2xl border border-slate-200 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40"
            >
              <input
                type="text"
                value={pr.label}
                onChange={(e) => updatePromise(prIdx, "label", e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-black text-cyan-600 dark:text-cyan-400 outline-none dark:border-slate-700 dark:bg-slate-800"
              />
              <textarea
                rows={2}
                value={pr.description}
                onChange={(e) => updatePromise(prIdx, "description", e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
