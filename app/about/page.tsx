"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Eye } from "lucide-react";
import { company } from "@/lib/company";
import { useLanguage } from "@/lib/language-context";
import { useAdminStore } from "@/lib/admin-store";

export default function AboutPage() {
  const { t, language } = useLanguage();
  const { store } = useAdminStore();

  const currentLegalName = store.company?.legalName || company.legalName;
  const currentShortName = store.company?.shortName || company.shortName;
  const currentTagline = store.company?.tagline || company.tagline;

  const profileP1 = (language === "id" && store.about?.profileP1) ? store.about.profileP1 : t("aboutProfileP1");
  const profileP2 = (language === "id" && store.about?.profileP2) ? store.about.profileP2 : t("aboutProfileP2");
  const visionTitle = (language === "id" && store.about?.visionTitle) ? store.about.visionTitle : t("aboutVisionTitle");
  const visionText = (language === "id" && store.about?.visionText) ? store.about.visionText : t("aboutVisionText");

  const missions = (store.about?.missions && store.about.missions.length > 0 && language === "id")
    ? store.about.missions
    : [
        {
          number: "1",
          title: t("aboutMission1Title"),
          description: t("aboutMission1Desc"),
        },
        {
          number: "2",
          title: t("aboutMission2Title"),
          description: t("aboutMission2Desc"),
        },
        {
          number: "3",
          title: t("aboutMission3Title"),
          description: t("aboutMission3Desc"),
        },
        {
          number: "4",
          title: t("aboutMission4Title"),
          description: t("aboutMission4Desc"),
        },
      ];

  const pillars = (store.about?.pillars && store.about.pillars.length > 0 && language === "id")
    ? store.about.pillars
    : [
        {
          title: t("aboutPillar1Title"),
          description: t("aboutPillar1Desc"),
        },
        {
          title: t("aboutPillar2Title"),
          description: t("aboutPillar2Desc"),
        },
        {
          title: t("aboutPillar3Title"),
          description: t("aboutPillar3Desc"),
        },
        {
          title: t("aboutPillar4Title"),
          description: t("aboutPillar4Desc"),
        },
        {
          title: t("aboutPillar5Title"),
          description: t("aboutPillar5Desc"),
        },
        {
          title: t("aboutPillar6Title"),
          description: t("aboutPillar6Desc"),
        },
      ];

  const promisePoints = (store.about?.promises && store.about.promises.length > 0 && language === "id")
    ? store.about.promises.map((p, idx) => ({
        label: p.label,
        description: p.description,
        color: idx === 0 ? "text-[#00A3C4]" : idx === 1 ? "text-slate-900 dark:text-white" : "text-emerald-500",
      }))
    : [
        {
          label: t("aboutPromise1Label"),
          color: "text-[#00A3C4]",
          description: t("aboutPromise1Desc"),
        },
        {
          label: t("aboutPromise2Label"),
          color: "text-slate-900 dark:text-white",
          description: t("aboutPromise2Desc"),
        },
        {
          label: t("aboutPromise3Label"),
          color: "text-emerald-500",
          description: t("aboutPromise3Desc"),
        },
      ];

  return (
    <>
      {/* 1. Profil Perusahaan */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-24 dark:border-slate-800 dark:bg-[#0B192C]/40">
        <div className="site-container">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#00A3C4]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#00A3C4]">
                {t("aboutProfileEyebrow")}
              </div>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                {currentLegalName} ({currentShortName})
              </h1>
              <p className="text-lg font-semibold text-[#00A3C4]">{currentTagline}</p>
              <p className="pt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {profileP1}
              </p>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {profileP2}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Link href="/contact" className="button-primary inline-flex">
                  <span>{t("btnConsultationRfq")}</span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link href="/products" className="button-secondary inline-flex">
                  {t("btnAllProducts")}
                </Link>
              </div>
            </div>

            {/* Logo Perusahaan */}
            <div className="flex items-center justify-center lg:col-span-5">
              <div className="relative flex w-full max-w-md items-center justify-center rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-8 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:from-[#0B192C] dark:to-[#070E1A] dark:shadow-none sm:p-10">
                <div className="relative flex h-36 w-full items-center justify-center sm:h-44">
                  <Image
                    src="/images/ASN-removebg-preview.png"
                    alt="CV Agape Sinar Nirwana"
                    width={340}
                    height={166}
                    className="max-h-full w-auto object-contain dark:hidden"
                    priority
                  />
                  <Image
                    src="/images/ASN-removebg-preview-dark.png"
                    alt="CV Agape Sinar Nirwana"
                    width={340}
                    height={166}
                    className="hidden max-h-full w-auto object-contain dark:block"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visi & Misi */}
      <section className="site-container py-16 sm:py-24">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Visi Card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-[#0B192C] via-[#070E1A] to-slate-900 p-8 text-white shadow-xl sm:p-10 lg:col-span-5">
            <div className="relative z-10 space-y-5">
              <div className="flex size-12 items-center justify-center rounded-2xl border border-[#00A3C4]/40 bg-[#00A3C4]/20 text-[#00A3C4]">
                <Eye className="size-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#00A3C4]">{t("aboutVisionLabel")}</span>
                <h2 className="mt-2 text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl">
                  {t("aboutVisionTitle")}
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">
                {t("aboutVisionText")}
              </p>
            </div>
          </div>

          {/* 4 Misi Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {missions.map((mission) => (
              <div
                key={mission.number}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0B192C]"
              >
                <div>
                  <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-[#00A3C4]/10 text-sm font-bold text-[#00A3C4]">
                    {mission.number}
                  </div>
                  <h3 className="mb-1 text-base font-bold text-slate-900 dark:text-white">{mission.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{mission.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Enam Keunggulan ASN pada Background Gelap */}
      <section className="border-y border-slate-800 bg-[#0B192C] py-16 text-white sm:py-24">
        <div className="site-container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00A3C4]">{t("aboutPillarsEyebrow")}</span>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">{t("aboutPillarsTitle")}</h2>
            <p className="mt-2 text-sm text-slate-400">
              {t("aboutPillarsSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-slate-700/70 bg-[#1E293B]/80 p-6 transition-all hover:border-[#00A3C4]"
              >
                <div className="mb-2 flex items-center gap-2 text-base font-bold text-emerald-400">
                  <Check className="size-4 shrink-0 stroke-[3]" />
                  <h3 className="text-white">{pillar.title}</h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Janji Layanan: Cepat, Tepat, Bernilai Tambah */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-20 dark:border-slate-800 dark:bg-[#070E1A]">
        <div className="site-container mx-auto max-w-4xl space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#00A3C4]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#00A3C4]">
            {t("aboutPromiseEyebrow")}
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
            {t("aboutPromiseTitle")}
          </h2>
          <blockquote className="text-base font-medium italic leading-relaxed text-slate-700 sm:text-xl dark:text-slate-300">
            {language === "en" ? (
              <>“ASN is dedicated to being a premier procurement partner by delivering solutions that are <strong className="not-italic text-[#00A3C4]">fast, accurate, and value-added</strong> for our clients.”</>
            ) : (
              <>“ASN berkomitmen menjadi mitra terpercaya dalam pengadaan barang untuk industri dan pertambangan dengan memberikan solusi yang <strong className="not-italic text-[#00A3C4]">cepat, tepat, dan bernilai tambah</strong> bagi pelanggan.”</>
            )}
          </blockquote>

          <div className="mx-auto grid max-w-xl grid-cols-1 gap-4 pt-6 text-left sm:grid-cols-3">
            {promisePoints.map((point) => (
              <div
                key={point.label}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-[#0B192C]"
              >
                <div className={`text-base font-bold ${point.color}`}>{point.label}</div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{point.description}</p>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <Link href="/contact" className="button-primary inline-flex">
              <span>{t("btnConsultationRfq")}</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
