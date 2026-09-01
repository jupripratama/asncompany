import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CheckCircle2, CircuitBoard, Cctv, Drill, ExternalLink, FileCheck, FileText, Layers, MessageCircle, Nut, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { ProductDetailGallery } from "@/components/product-detail-gallery";
import { whatsappUrl } from "@/lib/company";
import { getProductBySlug, products, type Product, type ProductCategory } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const categoryDetails: Record<ProductCategory, {
  icon: typeof Drill;
  applications: string[];
  specificationRows: (product: Product) => { label: string; value: string }[];
  rfqNote: string;
}> = {
  mining: {
    icon: Drill,
    applications: [
      "Pertambangan terbuka (Open Pit Coal & Mineral)",
      "Quarry batuan keras (Andesit, Granit, Limestone)",
      "Drifting, tunneling, dan tambang bawah tanah",
      "Pengeboran eksplorasi geologi dan konstruksi fondasi",
    ],
    specificationRows: (product) => [
      { label: "Varian produk", value: product.highlights.join(" • ") },
      { label: "Standar sistem ulir", value: product.standards?.join(", ") || "Standar Pengeboran Batuan Global (R25, R32, T38, T45, T51, GT60)" },
      { label: "Kompatibilitas rig", value: "Kompatibel rig Epiroc/Atlas Copco, Sandvik, Furukawa, Montabert, Ingersoll Rand, JunJin." },
      { label: "Kondisi kerja", value: "Disesuaikan dengan tingkat abrasif batuan (F1-F16), tekanan kerja udara (10-30 Bar), dan torsi rig." },
      { label: "Dokumen pengadaan", value: "Dilengkapi Certificate of Conformity (COC), Heat Treatment Report, dan garansi manufaktur." },
      { label: "Data untuk RFQ", value: "Sertakan tipe rig, drifter model, jenis ulir/shank, diameter bit, formasi batuan, dan jumlah kebutuhan." },
    ],
    rfqNote: "Kesesuaian komponen drilling (ulir, diameter, dan shank drifter) perlu dikonfirmasi berdasarkan model rig yang beroperasi di site.",
  },
  cctv: {
    icon: Cctv,
    applications: [
      "Fasilitas industri, workshop alat berat, dan gudang logistik",
      "Perimeter keamanan site, pos sekuriti, dan gerbang akses utama",
      "Pemantauan area terbuka open pit, stockpile, dan dermaga jetty",
      "Ruang server data center, kantor manajemen, dan area berisiko tinggi",
    ],
    specificationRows: (product) => [
      { label: "Sistem & fitur", value: product.highlights.join(" • ") },
      { label: "Merek resmi", value: product.brands?.join(", ") || "Hikvision, Dahua, Uniview, Axis, Honeywell" },
      { label: "Resolusi & optik", value: "Pilihan 2 MP, 4 MP, 5 MP, hingga 4K 8 MP dengan lensa Fixed, Motorized Zoom, atau Pan-Tilt-Zoom (PTZ)." },
      { label: "Sertifikasi & proteksi", value: "IP66 / IP67 (Tahan air & debu tambang), IK10 (Vandal Proof), NDAA Compliant (seri tertentu)." },
      { label: "Integrasi sistem", value: "Kompatibel protokol ONVIF Profile S/G/T, RTSP, VMS Enterprise, dan integrasi Access Control." },
      { label: "Data untuk RFQ", value: "Sertakan jumlah titik kamera, jarak jangkauan, kebutuhan penyimpanan (hari rekaman), dan brand pilihan." },
    ],
    rfqNote: "Survei denah atau informasi jarak pantau membantu kami menentukan lensa, kapasitas storage HDD NVR, dan switch PoE yang paling efisien.",
  },
  electrical: {
    icon: CircuitBoard,
    applications: [
      "Fasilitas pengolahan tambang, crushing plant, dan workshop maintenance",
      "Area berbahaya (Hazardous Area Zone 1 & Zone 2) tangki bahan bakar dan silo",
      "Pencahayaan tiang tinggi (High Mast) stockpile, yard, dan jalan tambang",
      "Infrastruktur ruang server, telemetri nirkabel pit, dan pusat kendali SCADA",
    ],
    specificationRows: (product) => [
      { label: "Lini produk", value: product.highlights.join(" • ") },
      { label: "Standar & sertifikasi", value: product.standards?.join(", ") || "IEC 60598, IEC 61439, ATEX / IECEx, PUIL 2020" },
      { label: "Peringkat daya & voltase", value: "Tersedia 1-Phase 220V dan 3-Phase 380V/400V, kapasitas 1 kVA hingga 1600A+." },
      { label: "Ketahanan lingkungan", value: "Rating IP55, IP65, IP66, IK08, proteksi petir/surge arrester 10kV-20kA, dan tahan korosi." },
      { label: "Garansi & pengujian", value: "Garansi resmi pabrikan, Factory Acceptance Test (FAT) report, dan Certificate of Origin." },
      { label: "Data untuk RFQ", value: "Sertakan daya/wattage, tegangan kerja, Single Line Diagram (SLD) panel, atau zona bahaya (Ex zone)." },
    ],
    rfqNote: "Rating daya, sertifikasi zona bahaya (Ex-Proof), dan proteksi lonjakan tegangan harus disesuaikan dengan kondisi instalasi di lapangan.",
  },
  fasteners: {
    icon: Nut,
    applications: [
      "Sambungan flange perpipaan tekanan tinggi minyak, gas, kimia, dan slurry tambang",
      "Struktur baja gedung pabrik, jembatan timbang, tower transmisi, dan conveyor",
      "Fondasi beton angkur mesin vibrasi (crusher, screen, genset, ball mill)",
      "Perakitan sasis alat berat, komponen hidrolik, dan pemeliharaan mekanikal",
    ],
    specificationRows: (product) => [
      { label: "Varian & standar", value: product.highlights.join(" • ") },
      { label: "Standar internasional", value: product.standards?.join(", ") || "ASTM A193, ASTM A194, ASTM F1554, DIN 931/933, ISO 4014/4017" },
      { label: "Grade material", value: "Grade 8.8, 10.9, 12.9, ASTM A193 B7, ASTM A320 L7, Stainless Steel SUS 304 / 316." },
      { label: "Pilihan pelapisan (coating)", value: "Plain Oiled, Black Oxide, Zinc Plated (Cr3+), Hot-Dip Galvanized (ASTM A153), PTFE / Xylan 1424 Coated." },
      { label: "Jaminan mutu (QA/QC)", value: "Disertai Mill Test Certificate (MTR) 3.1, uji tarik (Tensile Test), uji impak, dan uji semprot garam." },
      { label: "Data untuk RFQ", value: "Sertakan standar/grade, diameter nominal x panjang, jenis ulir (Pitch/UNC/8-UN), jenis coating, dan jumlah pcs." },
    ],
    rfqNote: "Sertakan standar ASTM/DIN serta jenis finishing anti-karat agar penawaran akurat sesuai tuntutan beban dan lingkungan sambungan.",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produk tidak ditemukan" };

  return {
    title: `${product.name} — Spesifikasi & Penawaran | ASN`,
    description: `${product.description} Pilihan model terverifikasi dan standar pengadaan resmi CV Agape Sinar Nirwana (ASN).`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const detail = categoryDetails[product.category];
  const CategoryIcon = detail.icon;
  const specifications = detail.specificationRows(product);
  const relatedProducts = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 3);
  const whatsappMessage = `Halo ASN, saya ingin meminta penawaran untuk ${product.name}. Mohon informasi pilihan spesifikasi, ketersediaan, dan estimasi waktu pengadaan.`;

  return (
    <main>
      {/* Breadcrumb Header */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-[#0b1628]">
        <div className="site-container py-5">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-300" aria-label="Breadcrumb">
            <Link href="/products" className="transition hover:text-cyan-600 dark:hover:text-cyan-300">Produk</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/products?category=${product.category}`} className="transition hover:text-cyan-600 dark:hover:text-cyan-300">{product.categoryLabel}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900 dark:text-white">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Main Product Showcase Section */}
      <section className="site-container py-10 sm:py-14">
        <Link href={`/products?category=${product.category}`} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-cyan-700 transition hover:text-cyan-900 dark:text-cyan-300 dark:hover:text-cyan-100">
          <ArrowLeft className="size-4" /> Kembali ke katalog
        </Link>

        <div className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <ProductDetailGallery images={product.images} productName={product.name} />

          <div className="lg:sticky lg:top-28">
            <div className="flex flex-wrap items-center gap-2">
              <span className="grid size-10 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
                <CategoryIcon className="size-5" aria-hidden="true" />
              </span>
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] font-black tracking-[0.13em] text-cyan-700 uppercase dark:text-cyan-300">
                {product.categoryLabel}
              </span>
              {product.variants && product.variants.length > 0 && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {product.variants.length} Tipe / Seri Pilihan
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl dark:text-white">{product.name}</h1>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{product.description}</p>

            <ul className="mt-6 space-y-2.5">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-cyan-600 dark:text-cyan-300" aria-hidden="true" />
                  {highlight}
                </li>
              ))}
            </ul>

            {/* Brands Showcase (For Branded Products) */}
            {product.brands && product.brands.length > 0 && (
              <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-700">
                <p className="mb-2.5 text-[10px] font-black tracking-[0.16em] text-slate-500 uppercase dark:text-slate-300">
                  {product.brands.length === 1 ? "Merek Resmi" : "Pilihan Principal Brand"}
                </p>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {product.brands.map((brand) => <BrandMark key={brand} brand={brand} />)}
                </div>
              </div>
            )}

            {/* Standards Showcase (For Standardized Engineering Products) */}
            {product.standards && product.standards.length > 0 && (
              <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-700">
                <p className="mb-2.5 text-[10px] font-black tracking-[0.16em] text-slate-500 uppercase dark:text-slate-300">
                  Standar Mutu & Spesifikasi Teknik
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.standards.map((standard) => (
                    <span key={standard} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
                      <FileCheck className="size-3.5 text-cyan-600 dark:text-cyan-400" />
                      {standard}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a href={whatsappUrl(whatsappMessage)} target="_blank" rel="noreferrer" className="button-primary inline-flex">
                <MessageCircle className="size-4" /> Tanya via WhatsApp
              </a>
              <Link href={`/contact?product=${encodeURIComponent(product.name)}&category=${product.category}`} className="button-secondary inline-flex">
                <FileText className="size-4" /> Minta Penawaran (RFQ)
              </Link>
            </div>
            <p className="mt-3.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Harga, spesifikasi teknis, dan lead time disesuaikan dengan volume pengadaan serta lokasi pengiriman site.
            </p>
          </div>
        </div>
      </section>

      {/* Model & Specification Matrix Section (Inspired by Hikvision Page) */}
      {product.variants && product.variants.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50/75 py-14 sm:py-20 dark:border-slate-700 dark:bg-[#081220]" aria-labelledby="model-matrix-heading">
          <div className="site-container">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Spesifikasi & Pilihan Terverifikasi</p>
                <h2 id="model-matrix-heading" className="section-title mt-2">Pilihan Model & Standar Spesifikasi</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Berikut adalah model atau standar teknis riil yang siap diadakan oleh ASN. Setiap item dapat dipesan secara satuan maupun pengadaan paket site.
                </p>
              </div>
              <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-xs font-black text-cyan-700 dark:text-cyan-300">
                {product.variants.length} Seri / Standar Terdata
              </span>
            </div>

            <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {product.variants.map((variant) => {
                const variantRfqProduct = `${product.name} — ${variant.code}`;
                const variantWaMessage = `Halo ASN, saya ingin meminta penawaran untuk model/varian: ${product.name} (${variant.code}). Mohon info harga dan ketersediaannya.`;

                return (
                  <article key={variant.code} className="surface-card flex h-full flex-col overflow-hidden !p-0 transition hover:border-cyan-500/60 hover:shadow-xl">
                    <div className="border-b border-slate-200 bg-slate-100/70 p-5 dark:border-slate-700 dark:bg-slate-900/60">
                      <div className="flex items-center justify-between gap-2">
                        {variant.badge && (
                          <span className="inline-flex rounded-full bg-cyan-500/10 px-2.5 py-1 text-[10px] font-black tracking-wide text-cyan-700 uppercase dark:text-cyan-300">
                            {variant.badge}
                          </span>
                        )}
                        {variant.categoryTag && (
                          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            {variant.categoryTag}
                          </span>
                        )}
                      </div>
                      <p className="mt-3 font-mono text-xs font-black text-cyan-700 dark:text-cyan-300">{variant.code}</p>
                      <h3 className="mt-1 text-base font-black leading-snug text-slate-950 dark:text-white">{variant.name}</h3>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">{variant.description}</p>

                      <div className="mt-5 flex-1">
                        <p className="text-[10px] font-black tracking-wider text-slate-400 uppercase">Spesifikasi Kunci:</p>
                        <ul className="mt-2.5 space-y-2">
                          {variant.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2.5 text-xs leading-5 text-slate-700 dark:text-slate-200">
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan-600 dark:text-cyan-400" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {variant.officialUrl && (
                        <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-800">
                          <a href={variant.officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 transition hover:text-cyan-900 dark:text-cyan-400 dark:hover:text-cyan-200">
                            Datasheet / Spesifikasi Pabrikan <ExternalLink className="size-3.5" />
                          </a>
                        </div>
                      )}

                      <div className="mt-6 grid grid-cols-2 gap-2">
                        <a href={whatsappUrl(variantWaMessage)} target="_blank" rel="noreferrer" className="button-secondary inline-flex px-3 !text-xs">
                          <MessageCircle className="size-3.5" /> Chat WA
                        </a>
                        <Link href={`/contact?product=${encodeURIComponent(variantRfqProduct)}&category=${product.category}`} className="button-primary inline-flex px-3 !text-xs">
                          <FileText className="size-3.5" /> Minta RFQ
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Procurement Details & Specifications */}
      <section className="border-y border-slate-200 bg-white py-14 dark:border-slate-700 dark:bg-[#0d1a2c]">
        <div className="site-container grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <section className="surface-card overflow-hidden" aria-labelledby="specification-heading">
            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-700">
              <p className="eyebrow">Parameter Pengadaan</p>
              <h2 id="specification-heading" className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">Panduan Spesifikasi Tender & Pembelian</h2>
            </div>
            <dl className="divide-y divide-slate-200 dark:divide-slate-700">
              {specifications.map((row) => (
                <div key={row.label} className="grid gap-2 px-6 py-5 sm:grid-cols-[10.5rem_1fr] sm:gap-6">
                  <dt className="text-sm font-black text-slate-900 dark:text-white">{row.label}</dt>
                  <dd className="text-sm leading-6 text-slate-600 dark:text-slate-300">{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <aside className="space-y-6">
            <section className="surface-card p-6">
              <p className="eyebrow">Aplikasi Lapangan</p>
              <h2 className="mt-2 text-xl font-black text-slate-950 dark:text-white">Penggunaan Umum</h2>
              <ul className="mt-5 space-y-3">
                {detail.applications.map((application) => (
                  <li key={application} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan-600 dark:text-cyan-300" />
                    <span>{application}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-amber-300/60 bg-amber-50 p-6 dark:border-amber-400/25 dark:bg-amber-400/10">
              <div className="flex items-center gap-2 text-amber-950 dark:text-amber-100">
                <ShieldCheck className="size-5 text-amber-600 dark:text-amber-300" />
                <h2 className="text-sm font-black">Catatan Verifikasi Spesifikasi</h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-amber-900/85 dark:text-amber-100/85">{detail.rfqNote}</p>
            </section>
          </aside>
        </div>
      </section>

      {/* Custom Model / Missing Part Number Banner */}
      <section className="bg-gradient-to-br from-[#0B192C] via-[#070E1A] to-slate-900 py-14 text-white sm:py-18">
        <div className="site-container text-center">
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-black tracking-wider text-cyan-300 uppercase">
            Custom Part Number & Sourcing
          </span>
          <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-black tracking-tight sm:text-4xl">
            Membutuhkan Part Number atau Spesifikasi Khusus untuk {product.name}?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Jika kode barang, merek tertentu, atau dimensi proyek Anda belum tercantum di atas, kirimkan lembar data teknis atau kode part kepada kami. Tim pengadaan ASN siap mencarikan dan memberikan penawaran resmi.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={whatsappUrl(`Halo ASN, saya mencari spesifikasi/part number khusus untuk ${product.name}: `)} target="_blank" rel="noreferrer" className="button-primary inline-flex">
              <MessageCircle className="size-4" /> Konsultasi Part Number WhatsApp
            </a>
            <Link href={`/contact?product=${encodeURIComponent(product.name + " (Custom Specification)")}&category=${product.category}`} className="button-secondary inline-flex !border-slate-600 !bg-slate-800/80 !text-white hover:!bg-slate-700">
              <FileText className="size-4" /> Formulir Permintaan Khusus
            </Link>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="site-container py-14 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Produk Terkait</p>
              <h2 className="section-title mt-2">Pilihan Lain dalam {product.categoryLabel}</h2>
            </div>
            <Link href={`/products?category=${product.category}`} className="inline-flex items-center gap-2 text-sm font-bold text-cyan-700 dark:text-cyan-300">
              Lihat semua <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {relatedProducts.map((related) => {
              const image = related.images[0];
              const fullBleed = Boolean(image.placeholder || image.representative);
              return (
                <Link key={related.slug} href={`/products/${related.slug}`} className="surface-card group overflow-hidden !p-0 transition hover:border-cyan-500 hover:shadow-lg">
                  <div className={cn("relative aspect-[16/9] border-b border-slate-200 dark:border-slate-700", fullBleed ? "bg-slate-100 dark:bg-slate-900" : "bg-white dark:bg-white")}>
                    <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className={cn("transition duration-500 group-hover:scale-[1.025]", fullBleed ? "object-cover" : "object-contain")} />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-black tracking-wider text-cyan-700 uppercase dark:text-cyan-300">{related.categoryLabel}</p>
                    <h3 className="mt-2 text-lg font-black text-slate-950 dark:text-white">{related.name}</h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-700 dark:text-cyan-300">
                      Lihat detail <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
