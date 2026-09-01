"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { translations, type Language, type TranslationKey } from "./translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("asn-lang") as Language | null;
      if (saved === "id" || saved === "en") {
        setLanguageState(saved);
      }
    } catch (_) {}
  }, []);

  function setLanguage(lang: Language) {
    setLanguageState(lang);
    try {
      localStorage.setItem("asn-lang", lang);
      document.documentElement.lang = lang;
    } catch (_) {}
  }

  function toggleLanguage() {
    setLanguage(language === "id" ? "en" : "id");
  }

  function t(key: TranslationKey): string {
    return translations[language][key] || translations.id[key] || key;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback safe defaults for static render
    return {
      language: "id" as Language,
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (key: TranslationKey) => translations.id[key] || key,
    };
  }
  return context;
}
