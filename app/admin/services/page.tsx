"use client";

import { CheckCircle2, Save, Trash2, Wrench, Plus, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AdminImageUploader } from "@/components/admin-image-uploader";
import { useAdminStore, type AdminServiceItem } from "@/lib/admin-store";

export default function AdminServicesPage() {
  const { store, mounted, updateService } = useAdminStore();
  const [notification, setNotification] = useState<string | null>(null);

  if (!mounted) {
    return <div className="p-8 text-sm text-slate-500">Memuat data layanan…</div>;
  }

  function showNotice(msg: string) {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  }

  function handleSave(service: AdminServiceItem) {
    updateService(service);
    showNotice(`Layanan "${service.title}" berhasil diperbarui!`);
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Kelola Layanan Pengadaan (4 Pilar Layanan ASN)
          </h2>
          <p className="text-xs text-slate-500">
            Edit judul, deskripsi sektor, visual representatif WebP, dan rincian item consumable pengadaan.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {notification && (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600">
              <CheckCircle2 className="size-4" /> {notification}
            </span>
          )}
          <Link href="/solutions" target="_blank" className="button-secondary text-xs inline-flex items-center gap-1">
            Lihat Halaman Layanan <ExternalLink className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-8">
        {store.services.map((service, idx) => (
          <ServiceEditorCard key={service.id} service={service} index={idx + 1} onSave={handleSave} />
        ))}
      </div>
    </div>
  );
}

function ServiceEditorCard({
  service: initialService,
  index,
  onSave,
}: {
  service: AdminServiceItem;
  index: number;
  onSave: (service: AdminServiceItem) => void;
}) {
  const [service, setService] = useState<AdminServiceItem>(initialService);

  function addItem() {
    setService({
      ...service,
      items: [...service.items, { name: "Item Baru", detail: "Spesifikasi dan kegunaan item." }],
    });
  }

  function updateItem(itemIdx: number, field: "name" | "detail", val: string) {
    const nextItems = [...service.items];
    nextItems[itemIdx] = { ...nextItems[itemIdx], [field]: val };
    setService({ ...service, items: nextItems });
  }

  function removeItem(itemIdx: number) {
    setService({
      ...service,
      items: service.items.filter((_, i) => i !== itemIdx),
    });
  }

  return (
    <div className="surface-card space-y-5 p-6 sm:p-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">
            #{index}
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white">{service.title}</h3>
            <p className="text-xs text-slate-500">{service.subtitle}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onSave(service)}
          className="button-primary text-xs inline-flex items-center gap-1.5"
        >
          <Save className="size-4" /> Simpan Layanan #{index}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Judul Layanan
              </label>
              <input
                type="text"
                value={service.title}
                onChange={(e) => setService({ ...service, title: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Subjudul Teknis
              </label>
              <input
                type="text"
                value={service.subtitle}
                onChange={(e) => setService({ ...service, subtitle: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Deskripsi Cakupan Layanan
            </label>
            <textarea
              rows={3}
              value={service.description}
              onChange={(e) => setService({ ...service, description: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          {/* Items breakdown */}
          <div className="space-y-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Daftar Sub-Item / Consumable Pengadaan
              </label>
              <button
                type="button"
                onClick={addItem}
                className="text-[11px] font-bold text-cyan-600 hover:underline"
              >
                + Tambah Item
              </button>
            </div>
            <div className="space-y-2">
              {service.items.map((item, itemIdx) => (
                <div key={itemIdx} className="grid grid-cols-[1fr_2fr_auto] gap-2 items-center">
                  <input
                    type="text"
                    value={item.name}
                    placeholder="Nama Item"
                    onChange={(e) => updateItem(itemIdx, "name", e.target.value)}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs outline-none dark:border-slate-700 dark:bg-slate-800 font-bold"
                  />
                  <input
                    type="text"
                    value={item.detail}
                    placeholder="Keterangan Spesifikasi"
                    onChange={(e) => updateItem(itemIdx, "detail", e.target.value)}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(itemIdx)}
                    className="text-slate-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Representatif */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Visual Representatif Layanan (WebP)
          </label>
          <AdminImageUploader
            label=""
            aspectRatio="video"
            maxDimension={1200}
            currentImage={service.image}
            onImageUploaded={(webp) => setService({ ...service, image: webp || service.image })}
          />
          <div className="mt-3">
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
              Teks Tombol Aksi
            </label>
            <input
              type="text"
              value={service.cta}
              onChange={(e) => setService({ ...service, cta: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
