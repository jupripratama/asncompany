"use client";

import {
  ArrowRight,
  Boxes,
  Building,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  FileText,
  Image as ImageIcon,
  Mail,
  MessageCircle,
  Package,
  Plus,
  ShieldAlert,
  Sparkles,
  Trash2,
  TrendingUp,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAdminStore } from "@/lib/admin-store";

function formatWaNumber(phone: string): string {
  let digits = phone.replace(/[^0-9]/g, "");
  if (digits.startsWith("0")) digits = "62" + digits.slice(1);
  if (!digits.startsWith("62")) digits = "62" + digits;
  return digits;
}

export default function AdminDashboardPage() {
  const { store, mounted, updateRfqStatus, deleteRfq } = useAdminStore();
  const [notice, setNotice] = useState<string | null>(null);

  function showNotice(msg: string) {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  }

  if (!mounted) {
    return <div className="p-8 text-sm text-slate-500">Memuat data admin…</div>;
  }

  const totalVariants = store.products.reduce((acc, p) => acc + (p.variants?.length || 0), 0);
  const newRfqs = store.rfqs.filter((r) => r.status === "new");

  const statCards = [
    {
      title: "Total Produk",
      value: store.products.length,
      subtitle: "4 Kategori industri aktif",
      icon: Package,
      href: "/admin/products",
      color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    },
    {
      title: "Model & Varian Terdaftar",
      value: totalVariants,
      subtitle: "Dengan foto & spesifikasi resmi",
      icon: Boxes,
      href: "/admin/products",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Pilar Layanan Pengadaan",
      value: store.services.length,
      subtitle: "Mining, CCTV, Electrical, Fasteners",
      icon: Wrench,
      href: "/admin/services",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      title: "Permintaan RFQ Masuk",
      value: store.rfqs.length,
      subtitle: `${newRfqs.length} baru perlu ditindaklanjuti`,
      icon: Mail,
      href: "/admin/contact",
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
  ];

  const quickActions = [
    {
      title: "Ganti Gambar Hero Website",
      desc: "Perbarui visual banner utama beranda dan halaman produk dengan konversi WebP otomatis.",
      icon: ImageIcon,
      href: "/admin/hero",
      cta: "Kelola Hero",
    },
    {
      title: "Edit Katalog & Tambah Produk",
      desc: "Ubah nama, deskripsi teknis, upload foto produk, atau tambahkan varian baru.",
      icon: Package,
      href: "/admin/products",
      cta: "Buka Produk",
    },
    {
      title: "Perbarui Visi, Misi & Profil",
      desc: "Sesuaikan profil legalitas ASN, 6 keunggulan kompetitif, dan janji layanan pelanggan.",
      icon: Building,
      href: "/admin/about",
      cta: "Edit Tentang Kami",
    },
    {
      title: "Kelola Data Kontak & RFQ",
      desc: "Update nomor WhatsApp, alamat operasional, dan tindak lanjuti permintaan penawaran harga.",
      icon: Mail,
      href: "/admin/contact",
      cta: "Buka Inbox RFQ",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#07111f] via-[#0b1b33] to-[#0e2a47] p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/20 px-3 py-1 text-xs font-bold text-cyan-300">
            <Sparkles className="size-3.5" /> Sistem Siap Pakai & Tersinkronisasi
          </span>
          <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-4xl">
            Selamat Datang di CV Agape Sinar Nirwana
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
            Seluruh data riil (24 produk, varian spesifikasi teknis, 4 layanan, profil perusahaan, dan foto) telah
            dimigrasikan ke sistem. Anda dapat langsung mengedit data tanpa perlu membuat dari awal.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/admin/products" className="button-primary inline-flex text-xs">
              <Package className="size-4" /> Kelola Produk & Varian
            </Link>
            <Link
              href="/admin/hero"
              className="button-secondary inline-flex text-xs !border-slate-600 !bg-slate-900/80 !text-white"
            >
              <ImageIcon className="size-4" /> Ubah Gambar Hero
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="surface-card flex flex-col justify-between p-6 transition duration-200 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.title}</span>
                <div className={`grid size-10 place-items-center rounded-xl ${stat.color}`}>
                  <Icon className="size-5" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-black text-slate-950 dark:text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-500">{stat.subtitle}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-black text-slate-950 dark:text-white">Pintasan Pengelolaan Halaman</h3>
        <p className="mt-1 text-xs text-slate-500">Pilih modul yang ingin Anda sesuaikan datanya:</p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.title}
                className="surface-card flex flex-col justify-between p-6 transition hover:border-cyan-500/40"
              >
                <div>
                  <div className="grid size-11 place-items-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <Icon className="size-5" />
                  </div>
                  <h4 className="mt-4 text-base font-bold text-slate-950 dark:text-white">{action.title}</h4>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{action.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    href={action.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400"
                  >
                    <span>{action.cta}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notification Toast */}
      {notice && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-xl">
          <CheckCircle2 className="size-4" />
          <span>{notice}</span>
        </div>
      )}

      {/* Recent RFQ Inbox Table */}
      <div className="surface-card overflow-hidden !p-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 p-6 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              Permintaan Penawaran Harga Terkini (RFQ)
            </h3>
            <p className="text-xs text-slate-500">
              Formulir penawaran yang diajukan oleh calon klien atau pelanggan operasional site.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {store.rfqs.some((r) => r.status === "closed") && (
              <button
                type="button"
                onClick={() => {
                  const closed = store.rfqs.filter((r) => r.status === "closed");
                  if (confirm(`Hapus seluruh ${closed.length} permintaan RFQ yang berstatus Selesai?`)) {
                    closed.forEach((r) => deleteRfq(r.id));
                    showNotice(`${closed.length} permintaan RFQ berstatus Selesai berhasil dibersihkan.`);
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-400"
              >
                <Trash2 className="size-3.5" /> Bersihkan Selesai ({store.rfqs.filter((r) => r.status === "closed").length})
              </button>
            )}
            <Link href="/admin/contact" className="button-secondary text-xs">
              Buka Semua ({store.rfqs.length})
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-900/50">
              <tr>
                <th className="p-4 font-bold">PIC & Perusahaan</th>
                <th className="p-4 font-bold">Kategori</th>
                <th className="p-4 font-bold">Item Kebutuhan</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {store.rfqs.slice(0, 8).map((rfq) => {
                const statusColors = {
                  new: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800",
                  reviewing: "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800",
                  quoted: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800",
                  closed: "bg-slate-200 text-slate-600 border-slate-300 dark:border-slate-700",
                };

                const waFollowUpMsg = encodeURIComponent(
                  `Halo Bapak/Ibu ${rfq.requesterName} (${rfq.companyName}), kami dari CV Agape Sinar Nirwana ingin menindaklanjuti permintaan penawaran harga Anda mengenai "${rfq.items}". Apakah ada spesifikasi teknis tambahan yang dapat kami bantu?`
                );
                const waUrl = `https://wa.me/${formatWaNumber(rfq.phone)}?text=${waFollowUpMsg}`;

                const emailSubject = encodeURIComponent(
                  `Tindak Lanjut Penawaran Harga ASN — ${rfq.companyName}`
                );
                const emailBody = encodeURIComponent(
                  `Halo Bapak/Ibu ${rfq.requesterName},\n\nTerima kasih atas kepercayaan Anda kepada CV Agape Sinar Nirwana.\n\nMenindaklanjuti permohonan penawaran harga Anda untuk kategori ${rfq.category}:\n"${rfq.items}"\n\nApakah ada spesifikasi atau kebutuhan pengiriman spesifik yang perlu kami sesuaikan?\n\nSalam hormat,\nTim Komersial & Sales CV Agape Sinar Nirwana\nBalikpapan, Kalimantan Timur`
                );
                const mailtoUrl = `mailto:${rfq.email}?subject=${emailSubject}&body=${emailBody}`;

                return (
                  <tr key={rfq.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-4">
                      <p className="font-bold text-slate-900 dark:text-white">{rfq.requesterName}</p>
                      <p className="text-[11px] text-slate-500">{rfq.companyName}</p>
                      <p className="text-[10px] text-cyan-600 font-mono">{rfq.phone}</p>
                    </td>
                    <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">
                      {rfq.category}
                    </td>
                    <td className="p-4 max-w-xs truncate text-slate-600 dark:text-slate-400">
                      {rfq.items}
                    </td>
                    <td className="p-4">
                      <select
                        value={rfq.status}
                        onChange={(e) =>
                          updateRfqStatus(rfq.id, e.target.value as typeof rfq.status)
                        }
                        className={`rounded-lg border px-2 py-1 text-[11px] font-bold outline-none cursor-pointer ${statusColors[rfq.status]}`}
                      >
                        <option value="new">Baru</option>
                        <option value="reviewing">Sedang Ditinjau</option>
                        <option value="quoted">Penawaran Dikirim</option>
                        <option value="closed">Selesai</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="Follow-up via WhatsApp"
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-emerald-700"
                        >
                          <MessageCircle className="size-3" /> WA
                        </a>
                        {rfq.email && rfq.email !== "-" && (
                          <a
                            href={mailtoUrl}
                            title="Follow-up via Email"
                            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
                          >
                            <Mail className="size-3" /> Email
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              confirm(
                                `Hapus permintaan RFQ dari ${rfq.requesterName} (${rfq.companyName})?`
                              )
                            ) {
                              deleteRfq(rfq.id);
                              showNotice(`Permintaan RFQ dari ${rfq.requesterName} berhasil dihapus.`);
                            }
                          }}
                          title="Hapus RFQ"
                          className="rounded-lg p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
