"use client";

import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  Shield,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { loginAdminCredentials, useAdminAuth } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAdminAuth();

  const [identifier, setIdentifier] = useState("admin@asn.co.id");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await loginAdminCredentials(identifier, password);
      if (res.success) {
        router.replace("/admin");
      } else {
        setError(res.error || "Username atau password salah.");
      }
    } catch (err: any) {
      setError(err?.message || "Terjadi kesalahan saat masuk.");
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-100 dark:bg-[#070E1A]">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <div className="size-4 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
          <span>Memeriksa sesi login...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 dark:from-[#070e1a] dark:via-[#0b1628] dark:to-[#070e1a]">
      <div className="fixed top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 transition"
        >
          <ArrowLeft className="size-3.5" /> Kembali ke Website Publik
        </Link>

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-2xl shadow-cyan-950/5 backdrop-blur-xl dark:border-slate-800 dark:bg-[#0b1628]/90 sm:p-10">
          <div className="absolute -right-20 -top-20 size-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="text-center space-y-3">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30">
              <ShieldCheck className="size-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                Panel Admin CMS
              </h1>
              <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mt-0.5">
                CV Agape Sinar Nirwana
              </p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Masuk untuk mengelola katalog produk, harga, foto, layanan, dan pesan RFQ.
            </p>
          </div>

          {error && (
            <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs font-semibold text-red-600 dark:text-red-400">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Email atau Username Admin
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  required
                  autoFocus
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin@asn.co.id atau admin"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-3.5 text-xs font-medium text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-cyan-400 dark:focus:bg-slate-900"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Kata Sandi
                </label>
                <span className="text-[11px] text-slate-400">Proyek ASN</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-10 text-xs font-medium text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-cyan-400 dark:focus:bg-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-400 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-3.5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                />
                <span>Ingat saya di perangkat ini</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full button-primary justify-center text-xs py-3 font-bold shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <KeyRound className="size-4" />
                  <span>Masuk ke Panel Admin</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
            <p className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-cyan-500" /> Kredensial Akses CMS:
            </p>
            <div className="space-y-0.5 text-[11px] leading-relaxed">
              <p>- <strong>Username:</strong> <code className="rounded bg-slate-200/60 px-1 py-0.5 dark:bg-slate-800">admin@asn.co.id</code> atau <code className="rounded bg-slate-200/60 px-1 py-0.5 dark:bg-slate-800">admin</code></p>
              <p>- <strong>Password:</strong> <code className="rounded bg-slate-200/60 px-1 py-0.5 dark:bg-slate-800">adminadmin</code></p>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <Shield className="size-3.5 text-emerald-500" /> Dilindungi autentikasi sesi internal & enkripsi Supabase
        </p>
      </div>
    </div>
  );
}