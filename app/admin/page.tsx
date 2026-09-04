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
  Package,
  Plus,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAdminStore } from "@/lib/admin-store";

export default function AdminDashboardPage() {
  const { store, mounted, updateRfqStatus } = useAdminStore();

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

      {/* Recent RFQ Inbox Table */}
      <div className="surface-card overflow-hidden !p-0">
        <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              Permintaan Penawaran Harga Terkini (RFQ)
            </h3>
            <p className="text-xs text-slate-500">
              Formulir penawaran yang diajukan oleh calon klien atau pelanggan operasional site.
            </p>
          </div>
          <Link href="/admin/contact" className="button-secondary text-xs">
            Buka Semua ({store.rfqs.length})
          </Link>
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
              {store.rfqs.slice(0, 5).map((rfq) => {
                const statusColors = {
                  new: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800",
                  reviewing: "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800",
                  quoted: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800",
                  closed: "bg-slate-200 text-slate-600 border-slate-300 dark:border-slate-700",
                };

                const statusLabels = {
                  new: "Baru",
                  reviewing: "Sedang Ditinjau",
                  quoted: "Penawaran Dikirim",
                  closed: "Selesai",
                };

                return (
                  <tr key={rfq.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-4">
                      <p className="font-bold text-slate-900 dark:text-white">{rfq.requesterName}</p>
                      <p className="text-[11px] text-slate-500">{rfq.companyName}</p>
                      <p className="text-[10px] text-cyan-600">{rfq.phone}</p>
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
                      <a
                        href={`https://wa.me/${rfq.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-emerald-700"
                      >
                        Follow-up WA
                      </a>
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
