"use client";

import { CheckCircle2, Image as ImageIcon, Loader2, RefreshCw, Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { formatBytes, optimizeImageToWebp, type OptimizedImageResult } from "@/lib/image-optimizer";

type AdminImageUploaderProps = {
  currentImage?: string;
  onImageUploaded: (webpDataUrl: string) => void;
  label?: string;
  aspectRatio?: "video" | "square" | "wide";
  maxDimension?: number;
};

export function AdminImageUploader({
  currentImage,
  onImageUploaded,
  label = "Upload Gambar",
  aspectRatio = "wide",
  maxDimension = 1400,
}: AdminImageUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(currentImage);
  const [stats, setStats] = useState<OptimizedImageResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Hanya file gambar (JPG, PNG, WebP) yang didukung.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Auto convert and compress to WebP format
      const result = await optimizeImageToWebp(file, maxDimension, 0.82);
      setPreview(result.dataUrl);
      setStats(result);
      onImageUploaded(result.dataUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengompresi gambar";
      setError(msg);
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleRemove() {
    setPreview(undefined);
    setStats(null);
    onImageUploaded("");
  }

  const aspectClass =
    aspectRatio === "video"
      ? "aspect-[16/9]"
      : aspectRatio === "square"
      ? "aspect-square"
      : "aspect-[21/9]";

  return (
    <div className="space-y-3">
      {label && <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">{label}</label>}

      <div
        className={`relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-cyan-500 dark:border-slate-700 dark:bg-slate-900/60 ${aspectClass}`}
      >
        {preview ? (
          <div className="relative h-full w-full">
            <Image
              src={preview}
              alt="Pratinjau Gambar"
              fill
              unoptimized={preview.startsWith("data:")}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 transition hover:opacity-100 flex items-center justify-center gap-3 p-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/90 px-3 py-2 text-xs font-bold text-slate-900 shadow-lg backdrop-blur hover:bg-white"
              >
                <RefreshCw className="size-3.5" /> Ganti
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-1.5 rounded-xl bg-red-600/90 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur hover:bg-red-600"
              >
                <Trash2 className="size-3.5" /> Hapus
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="flex h-full w-full flex-col items-center justify-center p-6 text-center"
          >
            {loading ? (
              <div className="flex flex-col items-center gap-2 text-cyan-600 dark:text-cyan-400">
                <Loader2 className="size-8 animate-spin" />
                <span className="text-xs font-bold">Mengonversi ke WebP ringan…</span>
              </div>
            ) : (
              <>
                <div className="grid size-12 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <UploadCloud className="size-6" />
                </div>
                <p className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                  Pilih atau seret gambar ke sini
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Format apa saja (JPG, PNG) • Otomatis dikompresi ke <strong>WebP ultra-ringan</strong>
                </p>
              </>
            )}
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Optimization details badge */}
      {stats && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 p-3 text-xs text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>
            Telah dioptimasi ke <strong>WebP</strong>: Ukuran dari{" "}
            <del>{formatBytes(stats.originalSize)}</del> menjadi{" "}
            <strong>{formatBytes(stats.compressedSize)}</strong> ({stats.reductionPercentage}% lebih hemat & cepat dimuat).
          </span>
        </div>
      )}

      {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
    </div>
  );
}
