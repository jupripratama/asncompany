"use client";

import {
  BarChart3,
  Boxes,
  Building,
  ChevronRight,
  ExternalLink,
  Flame,
  Image as ImageIcon,
  Layers,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Package,
  Settings,
  ShieldCheck,
  Wrench,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { company } from "@/lib/company";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/lib/admin-auth";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Produk & Varian", icon: Package },
  { href: "/admin/hero", label: "Gambar Hero", icon: ImageIcon },
  { href: "/admin/services", label: "Layanan Pengadaan", icon: Wrench },
  { href: "/admin/about", label: "Tentang Kami", icon: Building },
  { href: "/admin/contact", label: "Kontak & RFQ", icon: Mail },
  { href: "/admin/settings", label: "Pengaturan & Backup", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated, isLoading, logout } = useAdminAuth();

  // If on login page, render children directly without admin layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== "/admin/login") {
      window.location.href = "/admin/login";
    }
  }, [isAuthenticated, isLoading, pathname]);

  if (!isAuthenticated && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-100 dark:bg-[#070e1a]">
        <div className="flex flex-col items-center gap-3 text-sm text-slate-500">
          <div className="size-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
          <p className="font-semibold text-xs text-slate-600 dark:text-slate-400">
            Memverifikasi akses admin…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-[#070e1a] text-slate-900 dark:text-slate-100">

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0 dark:border-slate-800 dark:bg-[#0b1628]",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6 dark:border-slate-800">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-black text-base">
              ASN
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white">CV Agape Sinar Nirwana</p>
              <p className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                Portal Manajemen
              </p>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Sidebar Menu Links */}
        <nav className="flex-1 space-y-1.5 p-4 overflow-y-auto">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Menu Manajemen
          </p>
          {adminNav.map((item) => {
            const active =
              item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition",
                  active
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20 dark:bg-cyan-500 dark:text-slate-950"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white"
                )}
              >
                <Icon className="size-4.5 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight className="size-4" />}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-200 p-4 space-y-3 dark:border-slate-800">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <span>Lihat Website Publik</span>
            <ExternalLink className="size-3.5 text-slate-400" />
          </Link>

          <div className="flex items-center justify-between rounded-xl bg-slate-100 p-2.5 text-xs dark:bg-slate-800/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="relative flex size-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
              </span>
              <div className="truncate">
                <p className="font-bold text-slate-900 dark:text-white truncate">
                  {user?.email || "Admin ASN"}
                </p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Sesi Terhubung</p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/60 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            <LogOut className="size-3.5" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/85 px-4 backdrop-blur-md sm:px-8 dark:border-slate-800 dark:bg-[#0b1628]/85">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-700 lg:hidden dark:border-slate-700 dark:text-slate-200"
            >
              <Menu className="size-5" />
            </button>
            <div>
              <h1 className="text-lg font-black text-slate-950 sm:text-xl dark:text-white">
                Dashboard Manajemen ASN
              </h1>
              <p className="text-xs text-slate-500">
                Kelola konten, foto produk, spesifikasi, dan formulir penawaran secara instan.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex button-secondary text-xs"
            >
              Pratinjau Live Website <ExternalLink className="size-3.5" />
            </Link>

            <button
              type="button"
              onClick={logout}
              title="Keluar dari panel admin"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition"
            >
              <LogOut className="size-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
