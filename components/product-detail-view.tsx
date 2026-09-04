"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, CircuitBoard, Cctv, Drill, ExternalLink, FileCheck, FileText, MessageCircle, Nut, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { whatsappUrl } from "@/lib/company";
import { useLanguage } from "@/lib/language-context";
import { useAdminStore } from "@/lib/admin-store";
import type { Product, ProductCategory } from "@/lib/products";

const categoryIcons: Record<ProductCategory, typeof Drill> = {
  mining: Drill,
  cctv: Cctv,
  electrical: CircuitBoard,
  fasteners: Nut,
};

export function ProductDetailView({ product: initialProduct }: { product: Product }) {
  const { t, language } = useLanguage();
  const { store } = useAdminStore();
  const product = store.products?.find((p) => p.slug === initialProduct.slug) || initialProduct;
  const heroImage = store.hero?.productHeroImage || "/images/hero.jpg";

  const categoryBackLinks: Record<ProductCategory, { href: string; label: string }> = {
    mining: {
      href: "/products?category=mining",
      label: language === "en" ? "Back to Mining Tools" : "Kembali ke produk Mining Tools",
    },
    cctv: {
      href: "/products?category=cctv",
      label: language === "en" ? "Back to CCTV & Security" : "Kembali ke produk CCTV & Security",
    },
    electrical: {
      href: "/products?category=electrical",
      label: language === "en" ? "Back to Electrical" : "Kembali ke produk Electrical",
    },
    fasteners: {
      href: "/products?category=fasteners",
      label: language === "en" ? "Back to Fasteners" : "Kembali ke produk Fasteners",
    },
  };

  const backLink = categoryBackLinks[product.category];
  const CategoryIcon = categoryIcons[product.category];
  const variants = product.variants && product.variants.length > 0 ? product.variants : [
    {
      code: product.name,
      name: product.name,
      categoryTag: product.categoryLabel,
      badge: "Standard",
      image: product.images[0]?.src,
      description: product.description,
      features: product.highlights,
    },
  ];

  const brandLabel =
    product.brands?.length === 1
      ? t("detailBrandAvailable")
      : product.brands && product.brands.length > 1
      ? t("detailMultiBrand")
      : t("detailAsnStandard");

  return (
    <main>
      {/* 1. Hero Dark Gradient */}
      <section className="relative overflow-hidden border-b border-slate-700 bg-[#07111f] text-white">
        <Image
          src={heroImage}
          alt="Hero Background"
          fill
          priority
          unoptimized={heroImage.startsWith("data:")}
          className="-z-20 object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(6,182,212,0.22),transparent_30%),linear-gradient(120deg,transparent_40%,rgba(15,23,42,0.5))]" />
        <div className="site-container relative py-10 sm:py-14 lg:py-18">
          <Link
            href={backLink.href}
            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 transition hover:text-white"
          >
            <ArrowLeft className="size-4" /> {backLink.label}
          </Link>
          <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
            <div>
              <span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 text-[10px] font-black tracking-[0.16em] text-cyan-200 uppercase">
                {brandLabel}
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-[-0.045em] sm:text-6xl">{product.name}</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
                {product.description}
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white p-6 shadow-2xl shadow-black/25">
              {product.brands && product.brands.length === 1 ? (
                <BrandMark brand={product.brands[0]} />
              ) : product.brands && product.brands.length > 1 ? (
                <div>
                  <p className="mb-2 text-[10px] font-black tracking-wider text-slate-500 uppercase">
                    {language === "en" ? "Official Brand Selection" : "Pilihan Brand Resmi"}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {product.brands.map((brand) => (
                      <BrandMark key={brand} brand={brand} compact />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-700">
                    <CategoryIcon className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm font-black uppercase text-slate-900">{product.name}</p>
                    <p className="text-xs font-semibold text-slate-500">{product.categoryLabel}</p>
                  </div>
                </div>
              )}
              <div className="mt-4 flex items-start gap-3 rounded-2xl bg-slate-100 p-3.5 text-slate-700">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-cyan-700" />
                <p className="text-xs leading-5">{t("detailGuaranteeText")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sub-Category / Tags Pill Bar */}
      <section
        className="border-b border-slate-200 bg-white py-6 dark:border-slate-700 dark:bg-[#0d1a2c]"
        aria-label="Kategori dan standar sistem"
      >
        <div className="site-container flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            {t("detailSelectedTypes")}
          </span>
          {product.highlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-bold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            >
              {highlight}
            </span>
          ))}
          {product.standards?.map((std) => (
            <span
              key={std}
              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-bold text-cyan-800 dark:border-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300"
            >
              <FileCheck className="size-3.5" />
              {std}
            </span>
          ))}
        </div>
      </section>

      {/* 3. Verified Models Grid */}
      <section className="site-container py-14 sm:py-20" aria-labelledby="models-heading">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">{t("detailVerifiedModels")}</p>
            <h2 id="models-heading" className="section-title mt-2">
              {language === "en"
                ? `Verified ${product.name} options for your project`
                : `Pilihan ${product.name} untuk kebutuhan proyek`}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              {t("detailModelsSubtitle")}
            </p>
          </div>
          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-xs font-black text-cyan-700 dark:text-cyan-300">
            {variants.length} {t("detailTypesCounter")}
          </span>
        </div>

        <div className="mt-9 grid gap-6 lg:grid-cols-3">
          {variants.map((variant, idx) => {
            const variantImg =
              variant.image || product.images[idx % product.images.length]?.src || product.images[0]?.src;
            return (
              <article
                key={variant.code}
                className="surface-card flex h-full flex-col overflow-hidden !p-0 transition hover:border-cyan-500/50 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] border-b border-slate-200 bg-white p-5 dark:border-slate-700">
                  <Image
                    src={variantImg}
                    alt={`${variant.name} ${variant.code}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-contain p-5 transition duration-500 hover:scale-[1.025]"
                  />
                  {variant.brand ? (
                    <div className="absolute top-4 left-4 z-10">
                      <BrandMark
                        brand={variant.brand}
                        compact
                        className="!h-8 !min-h-0 px-3 shadow-md bg-white/95 backdrop-blur-sm border-slate-200"
                      />
                    </div>
                  ) : (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white/95 px-2.5 py-1 text-[10px] font-black uppercase text-slate-700 shadow-sm backdrop-blur-sm">
                        <CategoryIcon className="size-3.5 text-cyan-600" />
                        ASN Standard
                      </span>
                    </div>
                  )}
                  <span className="absolute top-4 right-4 rounded-full bg-slate-950/85 px-3 py-1.5 text-[9px] font-black tracking-wide text-white uppercase">
                    {variant.categoryTag || variant.badge || product.categoryLabel}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-xs font-bold text-cyan-700 dark:text-cyan-300">{variant.code}</p>
                  <h3 className="mt-2 text-lg font-black leading-6 text-slate-950 dark:text-white">{variant.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{variant.description}</p>
                  <ul className="mt-5 flex-1 space-y-2">
                    {variant.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-xs leading-5 text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan-600 dark:text-cyan-300" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {variant.officialUrl && (
                    <a
                      href={variant.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-300"
                    >
                      {t("detailOfficialSpecs")} <ExternalLink className="size-3.5" />
                    </a>
                  )}
                  <Link
                    href={`/contact?product=${encodeURIComponent(`${variant.code} — ${variant.name}`)}&category=${product.category}`}
                    className="button-primary mt-5 inline-flex"
                  >
                    <FileText className="size-4" /> {t("btnRequestQuote")}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. Bottom RFQ Panel */}
      <section className="border-y border-slate-200 bg-white py-14 dark:border-slate-700 dark:bg-[#0d1a2c]">
        <div className="site-container">
          <div className="rfq-panel rounded-[2rem] px-6 py-12 text-center text-white sm:px-10">
            <p className="eyebrow !text-cyan-300">
              {language === "en" ? "Custom type or specific size" : "Tipe lain atau ukuran spesifik"}
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl">
              {t("detailRfqBannerTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-200">
              {t("detailRfqBannerDesc")}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappUrl(
                  language === "en"
                    ? `Hello ASN, I would like to inquire regarding procurement of ${product.name}. Here are my project specifications: `
                    : `Halo ASN, saya ingin konsultasi pengadaan ${product.name}. Berikut kebutuhan spesifikasi proyek saya: `
                )}
                target="_blank"
                rel="noreferrer"
                className="button-primary inline-flex"
              >
                <MessageCircle className="size-4" /> {t("btnWhatsApp")}
              </a>
              <Link href={backLink.href} className="button-secondary inline-flex">
                <ArrowRight className="size-4" /> {backLink.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
