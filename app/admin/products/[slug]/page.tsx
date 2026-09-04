"use client";

import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Image as ImageIcon,
  Layers,
  Link as LinkIcon,
  Package,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminImageUploader } from "@/components/admin-image-uploader";
import { useAdminStore } from "@/lib/admin-store";
import { categories, type Product, type ProductCategory, type ProductVariant } from "@/lib/products";

export default function AdminProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { store, mounted, updateProduct } = useAdminStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Load product from store
  useEffect(() => {
    if (mounted) {
      const found = store.products.find((p) => p.slug === slug);
      if (found) {
        setProduct(JSON.parse(JSON.stringify(found))); // deep clone
      }
    }
  }, [slug, store.products, mounted]);

  if (!mounted || !product) {
    return (
      <div className="surface-card p-12 text-center text-sm text-slate-500">
        Memuat data produk... Jika tidak ditemukan,{" "}
        <Link href="/admin/products" className="text-cyan-600 font-bold">
          kembali ke daftar produk
        </Link>
        .
      </div>
    );
  }

  function showNotice(msg: string) {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  }

  function handleSave() {
    if (!product) return;
    updateProduct(product);
    showNotice(`Perubahan produk "${product.name}" berhasil disimpan!`);
  }

  // Highlights handlers
  function addHighlight() {
    if (!product) return;
    setProduct({ ...product, highlights: [...product.highlights, "Fitur Baru"] });
  }

  function updateHighlight(index: number, val: string) {
    if (!product) return;
    const next = [...product.highlights];
    next[index] = val;
    setProduct({ ...product, highlights: next });
  }

  function removeHighlight(index: number) {
    if (!product) return;
    setProduct({ ...product, highlights: product.highlights.filter((_, i) => i !== index) });
  }

  // Standards handlers
  function addStandard() {
    if (!product) return;
    setProduct({ ...product, standards: [...(product.standards || []), "Standar Baru"] });
  }

  function updateStandard(index: number, val: string) {
    if (!product) return;
    const next = [...(product.standards || [])];
    next[index] = val;
    setProduct({ ...product, standards: next });
  }

  function removeStandard(index: number) {
    if (!product) return;
    setProduct({
      ...product,
      standards: (product.standards || []).filter((_, i) => i !== index),
    });
  }

  // Variant handlers
  function addVariant() {
    if (!product) return;
    const newVariant: ProductVariant = {
      code: `PART-${Date.now().toString().slice(-4)}`,
      name: `Varian Tipe Baru ${product.name}`,
      categoryTag: product.categoryLabel,
      badge: "Standard",
      image: product.images[0]?.src || "/images/hero.jpg",
      description: "Deskripsi spesifikasi teknis varian produk ini.",
      features: ["Fitur spesifikasi 1", "Fitur spesifikasi 2", "Standar uji pabrik 3"],
    };
    setProduct({ ...product, variants: [...(product.variants || []), newVariant] });
  }

  function updateVariantField(index: number, field: keyof ProductVariant, val: any) {
    if (!product || !product.variants) return;
    const nextVariants = [...product.variants];
    nextVariants[index] = { ...nextVariants[index], [field]: val };
    setProduct({ ...product, variants: nextVariants });
  }

  function updateVariantFeature(variantIndex: number, featureIndex: number, val: string) {
    if (!product || !product.variants) return;
    const nextVariants = [...product.variants];
    const nextFeatures = [...nextVariants[variantIndex].features];
    nextFeatures[featureIndex] = val;
    nextVariants[variantIndex] = { ...nextVariants[variantIndex], features: nextFeatures };
    setProduct({ ...product, variants: nextVariants });
  }

  function addVariantFeature(variantIndex: number) {
    if (!product || !product.variants) return;
    const nextVariants = [...product.variants];
    nextVariants[variantIndex] = {
      ...nextVariants[variantIndex],
      features: [...nextVariants[variantIndex].features, "Poin spesifikasi teknis baru"],
    };
    setProduct({ ...product, variants: nextVariants });
  }

  function removeVariantFeature(variantIndex: number, featureIndex: number) {
    if (!product || !product.variants) return;
    const nextVariants = [...product.variants];
    nextVariants[variantIndex] = {
      ...nextVariants[variantIndex],
      features: nextVariants[variantIndex].features.filter((_, i) => i !== featureIndex),
    };
    setProduct({ ...product, variants: nextVariants });
  }

  function removeVariant(index: number) {
    if (!product || !product.variants) return;
    if (confirm("Hapus varian ini?")) {
      setProduct({
        ...product,
        variants: product.variants.filter((_, i) => i !== index),
      });
    }
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Top Breadcrumb & Save Action Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-cyan-600"
          >
            <ArrowLeft className="size-4" /> Kembali ke Daftar Produk
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-xs font-bold text-slate-900 dark:text-white">{product.name}</span>
        </div>

        <div className="flex items-center gap-3">
          {notification && (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600">
              <CheckCircle2 className="size-4" /> {notification}
            </span>
          )}
          <Link
            href={`/products/${product.slug}`}
            target="_blank"
            className="button-secondary text-xs inline-flex items-center gap-1"
          >
            Pratinjau di Web <ExternalLink className="size-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleSave}
            className="button-primary text-xs inline-flex items-center gap-1.5"
          >
            <Save className="size-4" /> Simpan Perubahan
          </button>
        </div>
      </div>

      {/* Section 1: Basic Product Information */}
      <div className="surface-card space-y-5 p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
          <span className="grid size-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">
            1
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              Informasi Pokok Produk
            </h3>
            <p className="text-xs text-slate-500">Nama, kategori industri, dan deskripsi fungsi produk.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Nama Produk
            </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none transition focus:border-cyan-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Kategori Pengadaan
            </label>
            <select
              value={product.category}
              onChange={(e) => {
                const cat = e.target.value as ProductCategory;
                const catObj = categories.find((c) => c.id === cat);
                setProduct({
                  ...product,
                  category: cat,
                  categoryLabel: catObj?.label || product.categoryLabel,
                });
              }}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none transition focus:border-cyan-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Deskripsi Lengkap Produk
          </label>
          <textarea
            rows={4}
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none transition focus:border-cyan-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800"
          />
        </div>

        {/* Highlights & Standards Management */}
        <div className="grid gap-6 sm:grid-cols-2 pt-2">
          {/* Highlights */}
          <div className="space-y-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Poin Keunggulan (Highlights)
              </label>
              <button
                type="button"
                onClick={addHighlight}
                className="text-[11px] font-bold text-cyan-600 hover:underline"
              >
                + Tambah
              </button>
            </div>
            <div className="space-y-2">
              {product.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={h}
                    onChange={(e) => updateHighlight(i, e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(i)}
                    className="text-slate-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Standards */}
          <div className="space-y-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Standar Teknik & Sertifikasi
              </label>
              <button
                type="button"
                onClick={addStandard}
                className="text-[11px] font-bold text-cyan-600 hover:underline"
              >
                + Tambah
              </button>
            </div>
            <div className="space-y-2">
              {(product.standards || []).map((std, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={std}
                    onChange={(e) => updateStandard(i, e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => removeStandard(i)}
                    className="text-slate-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Product Image & Gallery Management */}
      <div className="surface-card space-y-5 p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
          <span className="grid size-10 place-items-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
            2
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              Galeri Foto Produk Utama (Konversi WebP Otomatis)
            </h3>
            <p className="text-xs text-slate-500">
              Foto yang diunggah otomatis dioptimasi ke format WebP ringan untuk menghemat ukuran penyimpanan.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {product.images.map((img, i) => (
            <div
              key={i}
              className="space-y-2 rounded-2xl border border-slate-200 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40"
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span>Foto #{i + 1} {i === 0 && "(Utama)"}</span>
                {product.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setProduct({
                        ...product,
                        images: product.images.filter((_, idx) => idx !== i),
                      })
                    }
                    className="text-red-500 hover:underline text-[11px]"
                  >
                    Hapus
                  </button>
                )}
              </div>
              <AdminImageUploader
                label=""
                aspectRatio="video"
                maxDimension={1200}
                currentImage={img.src}
                onImageUploaded={(webp) => {
                  const nextImages = [...product.images];
                  nextImages[i] = { ...nextImages[i], src: webp };
                  setProduct({ ...product, images: nextImages });
                }}
              />
            </div>
          ))}

          {/* Add Image Card */}
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center dark:border-slate-800">
            <button
              type="button"
              onClick={() =>
                setProduct({
                  ...product,
                  images: [...product.images, { src: "/images/hero.jpg", alt: product.name }],
                })
              }
              className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20"
            >
              <Plus className="size-4" /> Tambah Slot Foto
            </button>
            <p className="mt-2 text-[11px] text-slate-400">Dukungan slider multi-foto otomatis</p>
          </div>
        </div>
      </div>

      {/* Section 3: Verified Model Variants Management */}
      <div className="surface-card space-y-6 p-6 sm:p-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
              3
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">
                Daftar Model / Varian Terverifikasi ({product.variants?.length || 0} Varian)
              </h3>
              <p className="text-xs text-slate-500">
                Spesifikasi tipe riil, foto varian, kode part number, dan fitur teknis.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={addVariant}
            className="button-primary text-xs inline-flex items-center gap-1.5"
          >
            <Plus className="size-4" /> Tambah Model / Tipe Baru
          </button>
        </div>

        <div className="space-y-6">
          {(product.variants || []).map((v, vIdx) => (
            <div
              key={vIdx}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#0d1a2c] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-700 dark:text-cyan-300">
                    #{vIdx + 1}
                  </span>
                  <span className="font-mono text-xs font-bold text-cyan-600">{v.code}</span>
                  <span className="text-xs text-slate-400">—</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{v.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeVariant(vIdx)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-red-500 hover:text-red-700"
                >
                  <Trash2 className="size-3.5" /> Hapus Tipe
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Kode Part / Standar
                  </label>
                  <input
                    type="text"
                    value={v.code}
                    onChange={(e) => updateVariantField(vIdx, "code", e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Nama Tipe / Varian
                  </label>
                  <input
                    type="text"
                    value={v.name}
                    onChange={(e) => updateVariantField(vIdx, "name", e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Brand (Jika Branded)
                  </label>
                  <select
                    value={v.brand || ""}
                    onChange={(e) => updateVariantField(vIdx, "brand", e.target.value || undefined)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="">Non-Brand (ASN Standard)</option>
                    <option value="Hikvision">Hikvision</option>
                    <option value="Dahua">Dahua</option>
                    <option value="Uniview">Uniview</option>
                    <option value="Axis">Axis</option>
                    <option value="Honeywell">Honeywell</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Deskripsi Singkat Varian
                </label>
                <textarea
                  rows={2}
                  value={v.description}
                  onChange={(e) => updateVariantField(vIdx, "description", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Foto Varian WebP */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Foto Spesifik Varian
                  </label>
                  <AdminImageUploader
                    label=""
                    aspectRatio="video"
                    maxDimension={900}
                    currentImage={v.image}
                    onImageUploaded={(webp) => updateVariantField(vIdx, "image", webp)}
                  />
                </div>

                {/* 4 Feature Bullets */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Spesifikasi Teknis (Poin Checkmark)
                    </label>
                    <button
                      type="button"
                      onClick={() => addVariantFeature(vIdx)}
                      className="text-[10px] font-bold text-cyan-600 hover:underline"
                    >
                      + Poin
                    </button>
                  </div>
                  {v.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={f}
                        onChange={(e) => updateVariantFeature(vIdx, fIdx, e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => removeVariantFeature(vIdx, fIdx)}
                        className="text-slate-400 hover:text-red-500 p-0.5"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                  ))}

                  <div className="pt-2">
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Link Datasheet Resmi Pabrikan (Opsional)
                    </label>
                    <input
                      type="url"
                      value={v.officialUrl || ""}
                      onChange={(e) => updateVariantField(vIdx, "officialUrl", e.target.value)}
                      placeholder="https://manufacturer.com/datasheet/..."
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="flex justify-end gap-3 pt-4">
        <Link href="/admin/products" className="button-secondary text-xs">
          Batal & Kembali
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
  );
}
