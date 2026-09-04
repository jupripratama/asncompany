"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, FileText, MessageCircle, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { whatsappUrl } from "@/lib/company";
import { hikvisionProducts } from "@/lib/hikvision-products";
import { useLanguage } from "@/lib/language-context";

const systemCategories = ["IP Camera", "NVR & DVR", "Access Control", "Video Intercom", "Monitoring System"];

export default function HikvisionBrandPage() {
  const { t, language } = useLanguage();

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-700 bg-[#07111f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(6,182,212,0.22),transparent_30%),linear-gradient(120deg,transparent_40%,rgba(15,23,42,0.5))]" />
        <div className="site-container relative py-10 sm:py-14 lg:py-18">
          <Link
            href="/products?category=cctv"
            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />{" "}
            {language === "en" ? "Back to CCTV & Security" : "Kembali ke produk CCTV"}
          </Link>
          <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-end">
            <div>
              <span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 text-[10px] font-black tracking-[0.16em] text-cyan-200 uppercase">
                {t("detailBrandAvailable")}
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-[-0.045em] sm:text-6xl">Hikvision</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
                {language === "en"
                  ? "Procurement selection of Hikvision surveillance equipment for industrial offices, warehouses, perimeters, and remote mining sites. ASN technical staff provides model matching, storage calculation, and VMS integration support."
                  : "Pilihan perangkat pengawasan Hikvision untuk kantor, gudang, workshop, perimeter, dan area operasional industri. Tim ASN membantu menyesuaikan model, penyimpanan, serta kebutuhan integrasinya."}
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white p-7 shadow-2xl shadow-black/25">
              <BrandMark brand="Hikvision" />
              <div className="mt-4 flex items-start gap-3 rounded-2xl bg-slate-100 p-4 text-slate-700">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-cyan-700" />
                <p className="text-xs leading-5">{t("detailGuaranteeText")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-b border-slate-200 bg-white py-7 dark:border-slate-700 dark:bg-[#0d1a2c]"
        aria-label="Kategori sistem Hikvision"
      >
        <div className="site-container flex flex-wrap gap-2">
          {systemCategories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="site-container py-14 sm:py-20" aria-labelledby="hikvision-models-heading">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">{t("detailVerifiedModels")}</p>
            <h2 id="hikvision-models-heading" className="section-title mt-2">
              {language === "en"
                ? "Verified Hikvision cameras for project requirements"
                : "Kamera Hikvision untuk kebutuhan proyek"}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              {t("detailModelsSubtitle")}
            </p>
          </div>
          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-xs font-black text-cyan-700 dark:text-cyan-300">
            {hikvisionProducts.length} {t("detailTypesCounter")}
          </span>
        </div>

        <div className="mt-9 grid gap-6 lg:grid-cols-3">
          {hikvisionProducts.map((product) => (
            <article
              key={product.model}
              className="surface-card flex h-full flex-col overflow-hidden !p-0 transition hover:border-cyan-500/50 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] border-b border-slate-200 bg-white p-5 dark:border-slate-700">
                <Image
                  src={product.image}
                  alt={`${product.name} ${product.model}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-contain p-5 transition duration-500 hover:scale-[1.025]"
                />
                <div className="absolute top-4 left-4 z-10">
                  <BrandMark
                    brand="Hikvision"
                    compact
                    className="!h-8 !min-h-0 px-3 shadow-md bg-white/95 backdrop-blur-sm border-slate-200"
                  />
                </div>
                <span className="absolute top-4 right-4 rounded-full bg-slate-950/85 px-3 py-1.5 text-[9px] font-black tracking-wide text-white uppercase">
                  {product.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-xs font-bold text-cyan-700 dark:text-cyan-300">{product.model}</p>
                <h3 className="mt-2 text-lg font-black leading-6 text-slate-950 dark:text-white">{product.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{product.description}</p>
                <ul className="mt-5 flex-1 space-y-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-xs leading-5 text-slate-600 dark:text-slate-300"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan-600 dark:text-cyan-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={product.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-300"
                >
                  {t("detailOfficialSpecs")} <ExternalLink className="size-3.5" />
                </a>
                <Link
                  href={`/contact?product=${encodeURIComponent(`${product.model} — ${product.name}`)}&category=cctv`}
                  className="button-primary mt-5 inline-flex"
                >
                  <FileText className="size-4" /> {t("btnRequestQuote")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14 dark:border-slate-700 dark:bg-[#0d1a2c]">
        <div className="site-container">
          <div className="rfq-panel rounded-[2rem] px-6 py-12 text-center text-white sm:px-10">
            <p className="eyebrow !text-cyan-300">
              {language === "en" ? "Custom model or complete project system" : "Model lain atau sistem lengkap"}
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl">
              {t("detailRfqBannerTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-200">
              {language === "en"
                ? "Send part numbers, camera count, target installation zones, and storage retention days. The ASN team will formulate a custom proposal."
                : "Kirim part number, jumlah titik kamera, area pemasangan, dan kebutuhan retensi rekaman. Tim ASN akan membantu menyiapkan opsi yang sesuai."}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappUrl(
                  language === "en"
                    ? "Hello ASN, I would like to inquire about Hikvision products. Here are my project requirements: "
                    : "Halo ASN, saya ingin konsultasi pengadaan produk Hikvision. Berikut model atau kebutuhan saya: "
                )}
                target="_blank"
                rel="noreferrer"
                className="button-primary inline-flex"
              >
                <MessageCircle className="size-4" /> {t("btnWhatsApp")}
              </a>
              <Link href="/products?category=cctv" className="button-secondary inline-flex">
                <ArrowRight className="size-4" />{" "}
                {language === "en" ? "View all CCTV products" : "Lihat semua CCTV"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
