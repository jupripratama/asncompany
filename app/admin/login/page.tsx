"use client";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Database,
  Eye,
  EyeOff,
  Layers,
  Lock,
  Mail,
  Shield,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { loginAdminCredentials, useAdminAuth } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const { isAuthenticated, isLoading } = useAdminAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect straight to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      window.location.href = "/admin";
    }
  }, [isAuthenticated, isLoading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await loginAdminCredentials(identifier, password);
      if (res.success) {
        // Direct browser navigation for rock-solid session load without router cache race
        window.location.href = "/admin";
      } else {
        setError(res.error || "Username atau kata sandi salah. Silakan periksa kembali.");
        setSubmitting(false);
      }
    } catch (err: any) {
      setError(err?.message || "Terjadi kendala saat proses masuk. Silakan coba lagi.");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:grid lg:grid-cols-12 overflow-hidden">
      {/* 1. Left Branding Hero (Desktop & Tablet) */}
      <div className="relative hidden lg:flex lg:col-span-6 xl:col-span-7 flex-col justify-between p-12 xl:p-16 overflow-hidden">
        {/* Background Image with Dark Vignette */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#050b14] via-[#071324]/90 to-[#0b1d3a]/80" />
        <div className="absolute -left-20 -top-20 size-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 size-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

        {/* Top Brand Tag */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-cyan-500/20 border border-cyan-400/30 backdrop-blur-md">
            <ShieldCheck className="size-6 text-cyan-400" />
          </div>
          <div>
            <p className="text-xs font-black tracking-widest text-cyan-400 uppercase">
              PORTAL CMS ENTERPRISE
            </p>
            <p className="text-sm font-bold text-white">CV Agape Sinar Nirwana</p>
          </div>
        </div>

        {/* Middle Value Proposition */}
        <div className="relative z-10 max-w-xl space-y-6 my-auto py-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-bold text-cyan-300 backdrop-blur-md">
            <Sparkles className="size-3.5 text-cyan-400" />
            <span>Sistem Administrasi Mandiri Terpusat</span>
          </div>

          <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-black leading-tight tracking-tight text-white">
            Kelola Pengadaan Industri &amp; Pertambangan Lebih Cepat.
          </h2>

          <p className="text-sm xl:text-base leading-relaxed text-slate-300">
            Akses satu pintu untuk memperbarui 24 katalog produk, spesifikasi teknis, varian model, foto WebP ringan, dan memproses permintaan penawaran harga (RFQ) secara realtime.
          </p>

          <div className="grid gap-3 sm:grid-cols-2 pt-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <Database className="size-4" />
                <span>Supabase Cloud</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Sinkronisasi data terpusat ke cloud database PostgreSQL.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <Shield className="size-4" />
                <span>Keamanan Terproteksi</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Otentikasi sesi terenkripsi dengan proteksi route guard.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-slate-400">
          <p>Kantor Operasional: Balikpapan, Kalimantan Timur</p>
          <p className="font-semibold text-slate-300">v2.4 Production</p>
        </div>
      </div>

      {/* 2. Right Login Form */}
      <div className="relative flex-1 lg:col-span-6 xl:col-span-5 flex flex-col justify-between bg-slate-900/95 lg:bg-[#070e1a] px-6 py-10 sm:px-12 xl:px-16 overflow-y-auto">
        {/* Top Nav Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition"
          >
            <ArrowLeft className="size-4" />
            <span>Kembali ke Website</span>
          </Link>

          <ThemeToggle />
        </div>

        {/* Form Container */}
        <div className="my-auto py-8 max-w-md w-full mx-auto space-y-7">
          {/* Logo & Heading */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-400">
              <Lock className="size-3" /> Area Khusus Manajemen
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Masuk ke Panel Admin
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Silakan masukkan kredensial akun Anda untuk mengelola konten dan katalog CV Agape Sinar Nirwana.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs font-semibold text-red-300 animate-in fade-in">
              <AlertCircle className="size-4 shrink-0 mt-0.5 text-red-400" />
              <div className="leading-relaxed">{error}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                Email atau Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                <input
                  type="text"
                  required
                  autoFocus
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Masukkan email atau username"
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-800/60 py-3 pl-10 pr-4 text-xs sm:text-sm font-medium text-white placeholder-slate-500 outline-none transition focus:border-cyan-500 focus:bg-slate-800 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-300">
                  Kata Sandi
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-800/60 py-3 pl-10 pr-11 text-xs sm:text-sm font-medium text-white placeholder-slate-500 outline-none transition focus:border-cyan-500 focus:bg-slate-800 focus:ring-2 focus:ring-cyan-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition p-1"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-3.5 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/40"
                />
                <span>Ingat sesi masuk</span>
              </label>

              <span className="text-[11px] text-slate-500">Sesi terproteksi SSL</span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 px-4 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 active:scale-[0.99] transition disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Memverifikasi Akses...</span>
                </>
              ) : (
                <span>Masuk ke Dashboard</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-slate-500 space-y-1 pt-6 border-t border-slate-800/80">
          <p>&copy; {new Date().getFullYear()} CV Agape Sinar Nirwana. All rights reserved.</p>
          <p>
            Kendala teknis? Hubungi IT Support di{" "}
            <a href="mailto:agapesinarnirwana@gmail.com" className="text-cyan-400 hover:underline">
              agapesinarnirwana@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}