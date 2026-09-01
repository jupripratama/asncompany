"use client";

import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { categories, products, type ProductCategory } from "@/lib/products";
import { cn } from "@/lib/utils";

type Filter = "all" | ProductCategory;

export function ProductCatalog() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [category, setCategory] = useState<Filter>(categories.some((item) => item.id === initialCategory) ? (initialCategory as ProductCategory) : "all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("id");
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesQuery = !normalized || `${product.name} ${product.description} ${product.highlights.join(" ")}`.toLocaleLowerCase("id").includes(normalized);
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
          {[{ id: "all", label: `Semua (${products.length})` }, ...categories].map((item) => (
            <button key={item.id} type="button" onClick={() => setCategory(item.id as Filter)} aria-pressed={category === item.id} className={cn("rounded-full px-4 py-2 text-xs font-bold transition", category === item.id ? "bg-cyan-600 text-white" : "bg-slate-200/70 text-slate-600 hover:text-cyan-700 dark:bg-slate-800 dark:text-slate-300")}>{item.label}</button>
          ))}
        </div>
      </div>
      <p className="mt-5 text-sm text-slate-500" role="status">{filtered.length} produk ditemukan</p>
      <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <article key={product.name} className="surface-card flex flex-col p-6">
            <span className="w-fit rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] font-black tracking-wide text-cyan-700 uppercase dark:text-cyan-300">{product.categoryLabel}</span>
            <h2 className="mt-4 text-lg font-extrabold text-slate-950 dark:text-white">{product.name}</h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{product.description}</p>
            <ul className="mt-5 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">{product.highlights.map((item) => <li key={item}>• {item}</li>)}</ul>
            <a href={`/contact?product=${encodeURIComponent(product.name)}&category=${product.category}`} className="button-secondary mt-6 inline-flex w-full">Minta penawaran</a>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <div className="surface-card mt-7 p-10 text-center text-sm text-slate-500">Produk tidak ditemukan. Coba kata kunci atau kategori lain.</div>}
    </>
  );
}
