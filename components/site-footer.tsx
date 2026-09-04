"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { company as defaultCompany } from "@/lib/company";
import { useLanguage } from "@/lib/language-context";
import { useAdminStore } from "@/lib/admin-store";

export function SiteFooter() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { store } = useAdminStore();
  const currentCompany = store.company || defaultCompany;

  if (pathname?.startsWith("/admin")) return null;

  const navItems = [
    { href: "/", label: t("navHome") },
    { href: "/solutions", label: t("navServices") },
    { href: "/products", label: t("navProducts") },
    { href: "/about", label: t("navAbout") },
    { href: "/contact", label: t("navContact") },
  ];

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="site-container grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4 lg:col-span-2">
          <BrandLogo />
          <p className="max-w-lg text-sm leading-6 text-slate-600 dark:text-slate-300">
            {t("footerTagline")}
          </p>
        </div>
        <div>
          <h2 className="footer-heading">{t("footerQuickLinksTitle")}</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-cyan-600 transition">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer-heading">{t("footerContactTitle")}</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-cyan-500" />
              <span>
                <span className="block">{currentCompany.addressStreet}</span>
                <span className="block">{currentCompany.addressSubdistrict}</span>
                <span className="block">{currentCompany.addressCity}</span>
              </span>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-cyan-500" />
              <a href={`mailto:${currentCompany.email}`} className="break-all hover:text-cyan-600 transition">
                {currentCompany.email}
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-cyan-500" />
              <a href={`tel:+${currentCompany.phoneInternational}`} className="hover:text-cyan-600 transition">
                {currentCompany.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="site-container flex flex-col gap-2 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {currentCompany.legalName}. {t("footerCopyright")}</p>
          <div className="flex items-center gap-4">
            <p>{currentCompany.tagline}</p>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <Link href="/admin" className="text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition inline-flex items-center gap-1 font-semibold">
              <Shield className="size-3" /> Panel Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
