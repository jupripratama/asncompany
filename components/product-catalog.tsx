"use client";

import { Cctv, Drill, Search, Wrench, Zap } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { categories, cctvBrands, products, type ProductCategory } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ProductImageSlider } from "@/components/product-image-slider";

type Filter = "all" | ProductCategory;

const categoryIcons = {
  mining: Drill,
  cctv: Cctv,
  electrical: Zap,
  fasteners: Wrench,
} as const;

export function ProductCatalog() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [category, setCategory] = useState<Filter>(categories.some((item) => item.id === initialCategory) ? (initialCategory as ProductCategory) : "all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("id");
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesQuery = !normalized || `${product.name} ${product.description} ${product.highlights.join(" ")} ${(product.brands ?? []).join(" ")}`.toLocaleLowerCase("id").includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-sm">
          <span className="sr-only">Cari produk</span>
          <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari produk, spesifikasi, atau kategori…" className="w-full rounded-full border border-slate-200 bg-white py-3 pr-4 pl-11 text-sm outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <div className="flex flex-wrap gap-2" aria-label="Filter kategori">
          {[{ id: "all", label: "Semua" }, ...categories].map((item) => {
            const count = item.id === "all" ? products.length : products.filter((product) => product.category === item.id).length;
            return <button key={item.id} type="button" onClick={() => setCategory(item.id as Filter)} aria-pressed={category === item.id} className={cn("rounded-full px-4 py-2 text-xs font-bold transition", category === item.id ? "bg-cyan-600 text-white" : "bg-slate-200/70 text-slate-600 hover:text-cyan-700 dark:bg-slate-800 dark:text-slate-300")}>{item.label} ({count})</button>;
          })}
        </div>
      </div>
      <p className="mt-5 text-sm text-slate-500" role="status">{filtered.length} produk ditemukan</p>

      {category === "cctv" && (
        <section className="surface-card mt-7 grid gap-6 p-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:p-8" aria-labelledby="cctv-brand-heading">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-300">
              <Cctv className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-black tracking-[0.18em] text-cyan-700 uppercase dark:text-cyan-300">Multi-brand CCTV</p>
              <h2 id="cctv-brand-heading" className="mt-1 text-xl font-black tracking-tight text-slate-950 dark:text-white">Pilihan brand sistem keamanan</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Pilihan brand mengikuti spesifikasi teknis, kebutuhan integrasi, dan anggaran proyek.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {cctvBrands.map((brand) => <BrandMark key={brand} brand={brand} />)}
          </div>
        </section>
      )}

      <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => {
          const CategoryIcon = categoryIcons[product.category];
          const brandLabel = product.brands?.length === 1 ? "Merek produk" : "Pilihan brand";
          const detailHref = product.slug === "hikvision-cctv-system" ? "/brands/hikvision" : `/products/${product.slug}`;
          return <article key={product.name} className="surface-card flex h-full flex-col overflow-hidden !p-0 transition hover:border-cyan-500/50 hover:shadow-lg">
            <ProductImageSlider images={product.images} productName={product.name} categoryLabel={product.categoryLabel} />
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
                    <CategoryIcon className="size-4" aria-hidden="true" />
                  </span>
                  <h2 className="pt-1 text-lg font-extrabold text-slate-950 dark:text-white">{product.name}</h2>
                </div>
                {product.variants && (
                  <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {product.variants.length} Tipe
                  </span>
                )}
              </div>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{product.description}</p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-500 dark:text-slate-300">{product.highlights.map((item) => <li key={item}>• {item}</li>)}</ul>
              
              {product.brands && product.brands.length > 0 && (
                <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
                  <p className="mb-2 text-[9px] font-black tracking-[0.16em] text-slate-400 uppercase">{brandLabel}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {product.brands.map((brand) => <BrandMark key={brand} brand={brand} compact />)}
                  </div>
                </div>
              )}

              {product.standards && product.standards.length > 0 && (
                <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
                  <p className="mb-2 text-[9px] font-black tracking-[0.16em] text-slate-400 uppercase">Standar Teknik</p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.standards.slice(0, 2).map((std) => (
                      <span key={std} className="rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {std}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 grid grid-cols-2 gap-2">
                <Link href={detailHref} className="button-secondary inline-flex px-3">Lihat detail</Link>
                <Link href={`/contact?product=${encodeURIComponent(product.name)}&category=${product.category}`} className="button-primary inline-flex px-3">Minta RFQ</Link>
              </div>
            </div>
          </article>;
        })}
      </div>
      {filtered.length === 0 && <div className="surface-card mt-7 p-10 text-center text-sm text-slate-500">Produk tidak ditemukan. Coba kata kunci atau kategori lain.</div>}
    </>
  );
}
