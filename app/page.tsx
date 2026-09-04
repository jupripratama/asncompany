"use client";

import { ArrowRight, CheckCircle2, Cog, FlaskConical, Video, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { company, whatsappUrl } from "@/lib/company";
import { useLanguage } from "@/lib/language-context";
import { useAdminStore } from "@/lib/admin-store";

const supportedBrands = [
  { name: "Hikvision", logo: "/images/brands/hikvision.svg" },
  { name: "Dahua", logo: "/images/brands/dahua.svg" },
  { name: "Uniview", logo: "/images/brands/uniview.png" },
  { name: "Axis", logo: "/images/brands/axis.svg" },
  { name: "Honeywell", logo: "/images/brands/honeywell.svg" },
];

export default function HomePage() {
  const { t, language } = useLanguage();
  const { store } = useAdminStore();
  const heroImage = store.hero?.homeHeroImage || "/images/hero.jpg";
  const currentCompany = store.company || company;

  const services = [
    {
      title: "Mining Tools",
      description:
        language === "en"
          ? "Top hammer drill bits, drill rods, shank adapters, coupling sleeves, DTH hammers, and drilling consumables."
          : "Drill Bit, Drill Rod, Shank Adapter, Coupling Sleeve, DTH Hammer, dan Aksesoris Drilling.",
      icon: FlaskConical,
      iconClass: "bg-cyan-500/15 text-cyan-600",
      href: "/solutions#mining",
    },
    {
      title: "CCTV & Security",
      description:
        language === "en"
          ? "Multi-brand IP cameras (Hikvision, Dahua, Axis, Honeywell), NVR, AI access control, and monitoring displays."
          : "Multi-brand CCTV (Hikvision, Dahua, Axis, Honeywell), NVR, Access Control & Monitoring.",
      icon: Video,
      iconClass: "bg-blue-500/15 text-blue-500",
      href: "/solutions#cctv",
    },
    {
      title: "Electrical & Industrial",
      description:
        language === "en"
          ? "Online UPS backup power, industrial LED high bay, high mast floodlights, ATEX explosion-proof lighting, and panels."
          : "UPS & Battery Backup, Lampu Tambang LED, Flood Light, Explosion Proof, Panel & Networking.",
      icon: Zap,
      iconClass: "bg-amber-500/15 text-amber-500",
      href: "/solutions#electrical",
    },
    {
      title: "Fasteners & Hardware",
      description:
        language === "en"
          ? "High-tensile hex bolts, foundation anchor bolts, ASTM A193 B7 stud bolts, stainless fasteners, and heavy hex nuts."
          : "Hex Bolt, Anchor Bolt, Stud Bolt ASTM B7, Stainless Fasteners, Nut & Washer, High Tensile.",
      icon: Cog,
      iconClass: "bg-emerald-500/15 text-emerald-500",
      href: "/solutions#fasteners",
    },
  ];

  const advantages = [
    t("homeAdvantage1"),
    t("homeAdvantage2"),
    t("homeAdvantage3"),
    t("homeAdvantage4"),
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <Image
          src={heroImage}
          alt="Peralatan industri dan pertambangan"
          fill
          priority
          unoptimized={heroImage.startsWith("data:")}
          className="-z-20 object-cover opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/90 to-cyan-950/35" />
        <div className="site-container flex min-h-[640px] items-center py-20">
          <div className="max-w-4xl">
            <p className="eyebrow !text-cyan-300">{t("homeHeroEyebrow")}</p>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              {t("homeHeroTitlePrefix")}{" "}
              <span className="text-cyan-300">{t("homeHeroTitleHighlight")}</span>{" "}
              {t("homeHeroTitleSuffix")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              {t("homeHeroDescription")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/products" className="button-primary inline-flex">
                {t("homeHeroCtaProducts")} <ArrowRight className="size-4" />
              </Link>
              <a
                href={whatsappUrl(
                  language === "en"
                    ? "Hello ASN, I would like to consult regarding procurement requirements for my project."
                    : "Halo ASN, saya ingin berkonsultasi mengenai kebutuhan pengadaan.",
                  currentCompany.phoneInternational
                )}
                target="_blank"
                rel="noreferrer"
                className="button-secondary inline-flex !border-slate-600 !bg-slate-900/70 !text-white"
              >
                {t("homeHeroCtaWhatsapp")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Brand Trust Strip */}
      <section className="border-b border-slate-200 bg-white py-6 dark:border-slate-700 dark:bg-[#0b1628]">
        <div className="site-container">
          <p className="mb-4 text-center text-xs font-semibold tracking-widest text-slate-400 uppercase dark:text-slate-300">
            {t("homeBrandTrustTitle")}
          </p>
          <div className="grid grid-cols-2 items-center justify-center gap-4 sm:grid-cols-3 lg:mx-auto lg:max-w-5xl lg:grid-cols-5 lg:gap-5">
            {supportedBrands.map((brand) => (
              <div
                key={brand.name}
                className="flex min-h-16 min-w-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm dark:border-slate-600 dark:shadow-black/25"
              >
                <Image
                  src={brand.logo}
                  alt={`Logo ${brand.name}`}
                  width={200}
                  height={64}
                  className="max-h-8 w-full max-w-[150px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Pillars of Services */}
      <section className="site-container py-16 sm:py-24">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold tracking-wider text-cyan-600 uppercase dark:text-cyan-400">
              {t("homeServicesEyebrow")}
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              {t("homeServicesTitle")}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {t("homeServicesSubtitle")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="surface-card group relative flex flex-col justify-between p-6 transition duration-200 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-lg dark:hover:border-cyan-400/40"
              >
                <div>
                  <div className={`grid size-12 place-items-center rounded-xl ${item.iconClass}`}>
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-950 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 transition group-hover:text-cyan-700 dark:text-cyan-400 dark:group-hover:text-cyan-300"
                  >
                    <span>{t("homeServiceLearnMore")}</span>
                    <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="site-container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold tracking-wider text-cyan-600 uppercase dark:text-cyan-400">
              {t("homeWhyUsEyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              {t("homeWhyUsTitle")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {t("homeWhyUsDesc")}
            </p>
            <div className="mt-8">
              <h3 className="text-sm font-bold tracking-wide text-slate-900 uppercase dark:text-slate-200">
                {t("homeWhyUsPointTitle")}
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {advantages.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-cyan-600 dark:text-cyan-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/about" className="button-secondary inline-flex">
                {t("homeCtaProfile")}
              </Link>
              <Link href="/contact" className="button-primary inline-flex">
                {t("btnConsultationRfq")}
              </Link>
            </div>
          </div>
          <div className="surface-card relative overflow-hidden p-8 sm:p-10 border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-850">
            <h3 className="text-xl font-bold text-slate-950 dark:text-white">
              {currentCompany.legalName} ({currentCompany.shortName})
            </h3>
            <p className="mt-1 text-xs font-bold tracking-widest text-cyan-600 uppercase dark:text-cyan-400">
              {currentCompany.tagline}
            </p>
            <div className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
                <span className="w-28 shrink-0 font-bold text-slate-900 dark:text-slate-100">
                  {language === "en" ? "Headquarters" : "Kantor Utama"}
                </span>
                <span>{currentCompany.addressCity}</span>
              </div>
              <div className="flex gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
                <span className="w-28 shrink-0 font-bold text-slate-900 dark:text-slate-100">
                  {language === "en" ? "Service Area" : "Cakupan Wilayah"}
                </span>
                <span>
                  {language === "en"
                    ? "Kalimantan, Sulawesi, and across Indonesia"
                    : "Kalimantan, Sulawesi, dan seluruh Indonesia"}
                </span>
              </div>
              <div className="flex gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
                <span className="w-28 shrink-0 font-bold text-slate-900 dark:text-slate-100">
                  {language === "en" ? "Core Capabilities" : "Fokus Sektor"}
                </span>
                <span>
                  {language === "en"
                    ? "Mining Consumables, CCTV Security, Industrial Electrical, High-Tensile Fasteners"
                    : "Mining Tools, CCTV Security, Electrical Industri, Fasteners Struktural"}
                </span>
              </div>
              <div className="flex gap-4">
                <span className="w-28 shrink-0 font-bold text-slate-900 dark:text-slate-100">
                  {language === "en" ? "Contact Support" : "Kontak Resmi"}
                </span>
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                  {currentCompany.phoneDisplay}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-gradient-to-br from-[#0B192C] via-[#070E1A] to-slate-900 py-16 text-white sm:py-20">
        <div className="site-container text-center">
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-black tracking-wider text-cyan-300 uppercase">
            {t("homeServicesEyebrow")}
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-black tracking-tight sm:text-4xl">
            {t("homeCtaTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            {t("homeCtaDesc")}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={whatsappUrl(
                language === "en"
                  ? "Hello ASN, I would like to consult regarding procurement requirements for my project."
                  : "Halo ASN, saya ingin berkonsultasi mengenai kebutuhan pengadaan.",
                currentCompany.phoneInternational
              )}
              target="_blank"
              rel="noreferrer"
              className="button-primary inline-flex"
            >
              {t("homeHeroCtaWhatsapp")}
            </a>
            <Link
              href="/contact"
              className="button-secondary inline-flex !border-slate-600 !bg-slate-800/80 !text-white hover:!bg-slate-700"
            >
              {t("btnConsultationRfq")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
