"use client";

import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { RfqForm } from "@/components/rfq-form";
import { company as defaultCompany, whatsappUrl } from "@/lib/company";
import { useLanguage } from "@/lib/language-context";
import { useAdminStore } from "@/lib/admin-store";

export default function ContactPage() {
  const { t, language } = useLanguage();
  const { store } = useAdminStore();
  const currentCompany = store.company || defaultCompany;


  return (
    <>
      <PageHero
        eyebrow={t("contactHeroEyebrow")}
        title={t("contactHeroTitle")}
        description={t("contactHeroDesc")}
      />
      <section className="site-container grid gap-8 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:py-20">
        <aside className="space-y-5">
          <div className="surface-card p-7">
            <p className="eyebrow">{t("contactOfficialInfo")}</p>
            <h2 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">{currentCompany.legalName}</h2>
            <ul className="mt-7 space-y-5 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-cyan-500" />
                <span>
                  <strong className="block text-slate-900 dark:text-white">{t("contactOfficeAddress")}</strong>
                  <span className="block">{currentCompany.addressStreet}</span>
                  <span className="block">{currentCompany.addressSubdistrict}</span>
                  <span className="block">{currentCompany.addressCity}</span>
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-cyan-500" />
                <span>
                  <strong className="block text-slate-900 dark:text-white">{t("contactPhoneWa")}</strong>
                  <a href={`tel:+${currentCompany.phoneInternational}`} className="hover:text-cyan-600">
                    {currentCompany.phoneDisplay}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-cyan-500" />
                <span>
                  <strong className="block text-slate-900 dark:text-white">{t("contactEmail")}</strong>
                  <a href={`mailto:${currentCompany.email}`} className="break-all hover:text-cyan-600">
                    {currentCompany.email}
                  </a>
                </span>
              </li>
            </ul>
          </div>
          <a
            href={whatsappUrl(
              language === "en"
                ? "Hello ASN, I would like to consult regarding procurement services."
                : "Halo ASN, saya ingin berkonsultasi mengenai kebutuhan pengadaan."
            )}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-3xl bg-emerald-600 p-6 text-white transition hover:bg-emerald-700"
          >
            <MessageCircle className="size-7" />
            <span>
              <strong className="block">{t("contactChatWaButton")}</strong>
              <span className="text-sm text-emerald-100">{currentCompany.phoneDisplay}</span>
            </span>
          </a>
        </aside>
        <div>
          <h2 className="mb-5 text-2xl font-black text-slate-950 dark:text-white">
            {t("contactFormTitle")}
          </h2>
          <Suspense fallback={<div className="surface-card p-8 text-sm text-slate-500">{t("contactFormLoading")}</div>}>
            <RfqForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
