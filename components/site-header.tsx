"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { company } from "@/lib/company";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { href: "/", label: t("navHome") },
    { href: "/solutions", label: t("navServices") },
    { href: "/products", label: t("navProducts") },
    { href: "/about", label: t("navAbout") },
    { href: "/contact", label: t("navContact") },
  ];

  return (
    <>
      {/* Top Notification Bar */}
      <div className="hidden border-b border-slate-800 bg-slate-950 text-[11px] text-slate-300 sm:block">
        <div className="site-container flex min-h-9 items-center justify-between gap-4">
          <span>{t("topbarTagline")}</span>
          <div className="flex items-center gap-5">
            <span>{t("businessHours")}</span>
            <a href={`mailto:${company.email}`} className="transition hover:text-cyan-400">
              {company.email}
            </a>
            <a href={`tel:+${company.phoneInternational}`} className="font-semibold text-emerald-400">
              {company.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
        <div className="site-container flex h-18 items-center justify-between gap-4 sm:h-20">
          <BrandLogo />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigasi utama">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium text-slate-600 transition hover:text-cyan-600 dark:text-slate-200 dark:hover:text-cyan-300",
                    active && "font-bold text-cyan-600 dark:text-cyan-400",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <LanguageToggle />
            <ThemeToggle />
            <Link href="/contact" className="button-primary hidden sm:inline-flex">
              {t("btnConsultationRfq")}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-700 lg:hidden dark:border-slate-700 dark:text-white"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <nav
            id="mobile-navigation"
            className="site-container space-y-1 border-t border-slate-200 py-4 lg:hidden dark:border-slate-800"
            aria-label="Navigasi mobile"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="button-primary mt-3 flex w-full"
            >
              {t("btnRequestQuote")}
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
