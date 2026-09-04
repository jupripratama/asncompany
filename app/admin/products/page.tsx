"use client";

import {
  Boxes,
  CheckCircle2,
  ExternalLink,
  Eye,
  Filter,
  Image as ImageIcon,
  Layers,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AdminImageUploader } from "@/components/admin-image-uploader";
import { useAdminStore } from "@/lib/admin-store";
import { categories, productSlug, type Product, type ProductCategory } from "@/lib/products";

export default function AdminProductsPage() {
  const { store, mounted, deleteProduct, addProduct, updateProduct } = useAdminStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [quickImageProduct, setQuickImageProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // New product form state
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: "mining",
    description: "",
    highlights: [],
    standards: [],
    brands: [],
    images: [{ src: "/images/hero.jpg", alt: "Foto Produk" }],
    variants: [],
  });

  const [highlightsInput, setHighlightsInput] = useState("");
  const [standardsInput, setStandardsInput] = useState("");

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return store.products.filter((p) => {
      const matchCat = selectedCategory === "all" || p.category === selectedCategory;
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.variants?.some((v) => v.code.toLowerCase().includes(q) || v.name.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [store.products, selectedCategory, searchQuery]);

  if (!mounted) {
    return <div className="p-8 text-sm text-slate-500">Memuat katalog produk…</div>;
  }

  function showNotice(msg: string) {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  }

  function handleDelete(slug: string, name: string) {
    if (confirm(`Apakah Anda yakin ingin menghapus produk "${name}"?`)) {
      deleteProduct(slug);
      showNotice(`Produk "${name}" berhasil dihapus.`);
    }
  }

  function handleSaveQuickImage(webpUrl: string) {
    if (!quickImageProduct) return;
    const updated: Product = {
      ...quickImageProduct,
      images: [{ src: webpUrl, alt: quickImageProduct.name }, ...quickImageProduct.images.slice(1)],
    };
    updateProduct(updated);
    setQuickImageProduct(null);
    showNotice(`Foto utama produk "${quickImageProduct.name}" berhasil diperbarui ke WebP.`);
  }

  function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!newProduct.name || !newProduct.description) {
      alert("Mohon lengkapi Nama Produk dan Deskripsi.");
      return;
    }

    const slug = productSlug(newProduct.name);
    const categoryItem = categories.find((c) => c.id === newProduct.category);

    const created: Product = {
      slug,
      name: newProduct.name,
      category: (newProduct.category as ProductCategory) || "mining",
      categoryLabel: categoryItem?.label || "Mining Tools",
      description: newProduct.description,
      highlights: highlightsInput
        ? highlightsInput.split(",").map((s) => s.trim()).filter(Boolean)
        : ["Standar Industri", "Kualitas Teruji"],
      standards: standardsInput
        ? standardsInput.split(",").map((s) => s.trim()).filter(Boolean)
        : ["ISO Standard"],
      images: newProduct.images || [{ src: "/images/hero.jpg", alt: newProduct.name }],
      variants: [
        {
          code: `${newProduct.name.substring(0, 4).toUpperCase()}-01`,
          name: `${newProduct.name} Tipe Standar`,
          categoryTag: categoryItem?.label || "Standard",
          badge: "New Item",
          image: newProduct.images?.[0]?.src || "/images/hero.jpg",
          description: newProduct.description,
          features: ["Material baja mutu tinggi", "Sertifikasi uji pabrik", "Garansi resmi distributor"],
        },
      ],
    };

    addProduct(created);
    setIsAddModalOpen(false);
    showNotice(`Produk "${created.name}" berhasil ditambahkan!`);
    setNewProduct({
      name: "",
      category: "mining",
      description: "",
      highlights: [],
      standards: [],
      brands: [],
      images: [{ src: "/images/hero.jpg", alt: "Foto Produk" }],
    });
    setHighlightsInput("");
    setStandardsInput("");
  }

  return (
    <div className="space-y-6">
      {/* Header & Title */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Katalog & Manajemen Produk ({store.products.length} Produk Riil)
          </h2>
          <p className="text-xs text-slate-500">
            Seluruh produk eksisting telah dimigrasikan. Anda dapat langsung mengedit spesifikasi, mengunggah foto WebP, atau menambah produk baru.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {notification && (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600">
              <CheckCircle2 className="size-4" /> {notification}
            </span>
          )}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="button-primary text-xs inline-flex items-center gap-1.5"
          >
            <Plus className="size-4" /> Tambah Produk Baru
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama produk, spesifikasi, atau kode part…"
            className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-xs outline-none transition focus:border-cyan-500 dark:border-slate-800 dark:bg-[#0b1628]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {[{ id: "all", label: "Semua Kategori" }, ...categories].map((cat) => {
            const count =
              cat.id === "all"
                ? store.products.length
                : store.products.filter((p) => p.category === cat.id).length;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                  active
                    ? "bg-cyan-600 text-white shadow-sm dark:bg-cyan-500 dark:text-slate-950"
                    : "bg-white text-slate-600 hover:bg-slate-50 dark:bg-[#0b1628] dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid Cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => {
          const mainImg = product.images[0]?.src || "/images/hero.jpg";
          const variantCount = product.variants?.length || 0;

          return (
            <div
              key={product.slug}
              className="surface-card group flex flex-col justify-between overflow-hidden !p-0 transition hover:border-cyan-500/50 hover:shadow-lg"
            >
              <div>
                {/* Product Image Thumbnail */}
                <div className="relative aspect-[16/10] border-b border-slate-200 bg-white p-4 dark:border-slate-800">
                  <Image
                    src={mainImg}
                    alt={product.name}
                    fill
                    unoptimized={mainImg.startsWith("data:")}
                    className="object-contain p-3 transition duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-lg bg-slate-950/80 px-2.5 py-1 text-[10px] font-black uppercase text-white backdrop-blur">
                      {product.categoryLabel}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      type="button"
                      title="Ganti Foto Utama"
                      onClick={() => setQuickImageProduct(product)}
                      className="inline-flex items-center gap-1 rounded-lg bg-white/95 px-2 py-1 text-[10px] font-bold text-slate-800 shadow-sm backdrop-blur hover:bg-cyan-50 hover:text-cyan-700 dark:bg-slate-900/90 dark:text-slate-200"
                    >
                      <ImageIcon className="size-3" /> Foto WebP
                    </button>
                  </div>
                </div>

                {/* Product Content Body */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-black text-slate-950 dark:text-white">
                      {product.name}
                    </h3>
                    <span className="shrink-0 rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-black text-cyan-700 dark:text-cyan-300">
                      {variantCount} Varian
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {product.description}
                  </p>

                  {/* Highlights pills */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {product.highlights.slice(0, 3).map((h) => (
                      <span
                        key={h}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="border-t border-slate-100 p-4 dark:border-slate-800/80 flex items-center justify-between gap-2">
                <Link
                  href={`/admin/products/${product.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-cyan-700 dark:bg-cyan-500 dark:text-slate-950"
                >
                  <Pencil className="size-3.5" /> Edit Lengkap & Varian
                </Link>

                <div className="flex items-center gap-1">
                  <Link
                    href={`/products/${product.slug}`}
                    target="_blank"
                    title="Lihat Halaman Publik"
                    className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:hover:bg-slate-800"
                  >
                    <ExternalLink className="size-3.5" />
                  </Link>
                  <button
                    type="button"
                    title="Hapus Produk"
                    onClick={() => handleDelete(product.slug, product.name)}
                    className="rounded-xl border border-red-200 p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600 dark:border-red-900/40 dark:hover:bg-red-950/30"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="surface-card p-12 text-center text-sm text-slate-500">
          Tidak ada produk yang cocok dengan kriteria pencarian Anda.
        </div>
      )}

      {/* Quick Image Update Modal */}
      {quickImageProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="surface-card w-full max-w-lg space-y-4 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-950 dark:text-white">
                  Ganti Foto Utama: {quickImageProduct.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Foto yang diupload otomatis dikonversi ke format <strong>WebP ringan</strong>.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setQuickImageProduct(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="size-5" />
              </button>
            </div>

            <AdminImageUploader
              label="Pilih Foto Baru"
              aspectRatio="video"
              maxDimension={1200}
              currentImage={quickImageProduct.images[0]?.src}
              onImageUploaded={handleSaveQuickImage}
            />

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setQuickImageProduct(null)}
                className="button-secondary text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm overflow-y-auto">
          <form
            onSubmit={handleCreateProduct}
            className="surface-card my-8 w-full max-w-2xl space-y-5 p-6 sm:p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                  Tambah Produk Baru ke Katalog
                </h3>
                <p className="text-xs text-slate-500">
                  Data produk dan varian akan langsung tampil di website setelah disimpan.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Nama Produk *
                </label>
                <input
                  required
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Contoh: Rock Drill Steel Rod"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none transition focus:border-cyan-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Kategori *
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value as ProductCategory })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none transition focus:border-cyan-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800"
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
                Deskripsi Singkat Produk *
              </label>
              <textarea
                required
                rows={3}
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                placeholder="Jelaskan spesifikasi fungsi dan peruntukan operasional di industri atau site tambang…"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none transition focus:border-cyan-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Fitur / Highlights (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={highlightsInput}
                  onChange={(e) => setHighlightsInput(e.target.value)}
                  placeholder="Contoh: Baja Karburisasi, Ulir T38, Tahan Aus"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none transition focus:border-cyan-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Standar Teknik / Sertifikasi (Pisahkan koma)
                </label>
                <input
                  type="text"
                  value={standardsInput}
                  onChange={(e) => setStandardsInput(e.target.value)}
                  placeholder="Contoh: ISO 10208, Mill Test 3.1, DIN 933"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none transition focus:border-cyan-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            </div>

            <AdminImageUploader
              label="Unggah Foto Produk (Otomatis WebP)"
              aspectRatio="video"
              maxDimension={1200}
              onImageUploaded={(webp) =>
                setNewProduct({
                  ...newProduct,
                  images: [{ src: webp || "/images/hero.jpg", alt: newProduct.name || "Foto" }],
                })
              }
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="button-secondary text-xs"
              >
                Batal
              </button>
              <button type="submit" className="button-primary text-xs">
                Simpan & Tambahkan Produk
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
