"use client";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { getAdminSession, loginAdminCredentials } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already logged in, redirect directly
  useEffect(() => {
    const session = getAdminSession();
    if (session) {
      window.location.assign("/admin");
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await loginAdminCredentials(identifier, password);
      if (res.success) {
        // Direct browser navigation ensures fresh cookies and storage without client router cache race
        window.location.assign("/admin");
      } else {
        setError(res.error || "Email/username atau kata sandi tidak cocok.");
        setSubmitting(false);
      }
    } catch (err: any) {
      setError(err?.message || "Terjadi kendala jaringan saat masuk.");
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-[#070E1A] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Bar */}
      <header className="w-full px-6 py-5 sm:px-10 flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 transition"
        >
          <ArrowLeft className="size-4" />
          <span>Kembali ke Website Utama</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Center Container */}
      <main className="w-full max-w-md mx-auto px-5 py-8 my-auto z-10">
        <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-8 sm:p-10 shadow-xl shadow-slate-200/50 backdrop-blur-xl dark:border-slate-800 dark:bg-[#0B1628]/95 dark:shadow-none">
          {/* Official Company Logo */}
          <div className="flex flex-col items-center text-center">
            <Link href="/" className="inline-block transition hover:opacity-90 mb-4">
              <Image
                src="/images/ASN-removebg-preview.png"
                alt="CV Agape Sinar Nirwana"
                width={200}
                height={85}
                className="h-12 sm:h-14 w-auto object-contain dark:hidden"
                priority
              />
              <Image
                src="/images/ASN-removebg-preview-dark.png"
                alt="CV Agape Sinar Nirwana"
                width={200}
                height={85}
                className="hidden h-12 sm:h-14 w-auto object-contain dark:block"
                priority
              />
            </Link>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Selamat Datang
            </h1>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Masuk ke akun Anda untuk mengelola layanan, produk, dan operasional pengadaan.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs font-medium text-red-600 dark:text-red-400 animate-in fade-in">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email atau Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  required
                  autoFocus
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin@asn.co.id"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-3 pl-10 pr-4 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-900 dark:focus:ring-cyan-400/10"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Kata Sandi
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-3 pl-10 pr-11 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-900 dark:focus:ring-cyan-400/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-3.5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-800"
                />
                <span>Ingat saya</span>
              </label>

              <a
                href="mailto:agapesinarnirwana@gmail.com?subject=Bantuan%20Akses%20Login%20ASN"
                className="text-cyan-600 hover:underline dark:text-cyan-400 font-medium"
              >
                Bantuan masuk?
              </a>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-600 py-3.5 px-4 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-500 active:scale-[0.99] transition duration-150 disabled:opacity-60 cursor-pointer"
            >
              {submitting ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Akun</span>
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="w-full py-6 text-center text-xs text-slate-400 dark:text-slate-500 z-10">
        <p>© 2026 CV Agape Sinar Nirwana • Balikpapan, Indonesia</p>
      </footer>
    </div>
  );
}