import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { ProductCatalog } from "@/components/product-catalog";

export const metadata: Metadata = { title: "Katalog Produk", description: "Katalog mining tools, CCTV, electrical industrial, dan fasteners ASN." };

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Katalog Produk" title="Temukan kebutuhan pengadaan Anda" description="Telusuri produk dari empat lini utama. Jika produk belum tercantum, kirim spesifikasi atau part number kepada tim ASN." />
      <section className="site-container py-16 sm:py-20"><Suspense fallback={<p className="text-sm text-slate-500">Memuat katalog…</p>}><ProductCatalog /></Suspense></section>
    </>
  );
}
