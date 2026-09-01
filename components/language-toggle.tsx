"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-100/80 p-0.5 text-xs font-bold dark:border-slate-700 dark:bg-slate-800/90"
      role="group"
      aria-label="Pilih Bahasa / Choose Language"
    >
      <button
        type="button"
        onClick={() => setLanguage("id")}
        className={cn(
          "flex items-center gap-1 rounded-lg px-2.5 py-1.5 transition text-[11px]",
          language === "id"
            ? "bg-white text-cyan-800 shadow-sm dark:bg-slate-900 dark:text-cyan-300"
            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        )}
        aria-pressed={language === "id"}
      >
        <span>🇮🇩</span>
        <span>ID</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={cn(
          "flex items-center gap-1 rounded-lg px-2.5 py-1.5 transition text-[11px]",
          language === "en"
            ? "bg-white text-cyan-800 shadow-sm dark:bg-slate-900 dark:text-cyan-300"
            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        )}
        aria-pressed={language === "en"}
      >
        <span>🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  );
}
