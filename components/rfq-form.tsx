"use client";

import { Mail, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { categories } from "@/lib/products";
import { company, emailUrl, whatsappUrl } from "@/lib/company";
import { useLanguage } from "@/lib/language-context";

export function RfqForm() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const { t, language } = useLanguage();

  const categoryLabels: Record<string, { id: string; en: string }> = {
    mining: { id: "Mining Tools & Pengeboran", en: "Mining Tools & Rock Drilling" },
    cctv: { id: "CCTV & Security Systems", en: "CCTV & Security Systems" },
    electrical: { id: "Electrical & Industrial Power", en: "Electrical & Industrial Power" },
    fasteners: { id: "Fasteners & Hardware", en: "Fasteners & Hardware" },
  };

  const initialCategory = searchParams.get("category") ?? "mining";
  const [form, setForm] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    category: categories.some((item) => item.id === initialCategory) ? initialCategory : "mining",
    items: searchParams.get("product") ? `${searchParams.get("product")} — ` : "",
  });

  const message = useMemo(() => {
    const selectedCategory = categoryLabels[form.category]?.[language] || form.category;
    if (language === "en") {
      return [
        `Hello ${company.legalName},`,
        "",
        "I would like to submit a formal Request for Quotation (RFQ):",
        `- PIC: ${form.name}`,
        `- Company/Site: ${form.companyName}`,
        `- Email: ${form.email}`,
        `- WhatsApp/Phone: ${form.phone}`,
        `- Category: ${selectedCategory}`,
        `- Requirements: ${form.items}`,
        "",
        "Please provide your best quotation and availability. Thank you.",
      ].join("\n");
    }

    return [
      `Halo ${company.legalName},`,
      "",
      "Saya ingin mengajukan Permintaan Penawaran Harga (RFQ):",
      `- PIC: ${form.name}`,
      `- Perusahaan/Site: ${form.companyName}`,
      `- Email: ${form.email}`,
      `- Telepon/WhatsApp: ${form.phone}`,
      `- Kategori: ${selectedCategory}`,
      `- Kebutuhan: ${form.items}`,
      "",
      "Mohon dapat ditindaklanjuti. Terima kasih.",
    ].join("\n");
  }, [form, language]);

  function validate() {
    return formRef.current?.reportValidity() ?? false;
  }

  function sendWhatsApp() {
    if (!validate()) return;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  function sendEmail() {
    if (!validate()) return;
    window.location.href = emailUrl(`RFQ — ${form.companyName || form.name}`, message);
  }

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus:bg-slate-900";

  return (
    <form ref={formRef} onSubmit={(event) => event.preventDefault()} className="surface-card p-6 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          {t("rfqNameLabel")}
          <input
            required
            autoComplete="name"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className={inputClass}
            placeholder={t("rfqNamePlaceholder")}
          />
        </label>
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          {t("rfqCompanyLabel")}
          <input
            required
            autoComplete="organization"
            value={form.companyName}
            onChange={(event) => update("companyName", event.target.value)}
            className={inputClass}
            placeholder={t("rfqCompanyPlaceholder")}
          />
        </label>
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          {t("rfqEmailLabel")}
          <input
            required
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            className={inputClass}
            placeholder={t("rfqEmailPlaceholder")}
          />
        </label>
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          {t("rfqPhoneLabel")}
          <input
            required
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={inputClass}
            placeholder={t("rfqPhonePlaceholder")}
          />
        </label>
      </div>

      <label className="mt-5 block text-xs font-bold text-slate-700 dark:text-slate-300">
        {t("rfqCategoryLabel")}
        <select
          value={form.category}
          onChange={(event) => update("category", event.target.value)}
          className={inputClass}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {categoryLabels[category.id]?.[language] || category.label}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-5 block text-xs font-bold text-slate-700 dark:text-slate-300">
        {t("rfqItemsLabel")}
        <textarea
          required
          rows={6}
          value={form.items}
          onChange={(event) => update("items", event.target.value)}
          className={inputClass}
          placeholder={t("rfqItemsPlaceholder")}
        />
      </label>

      <p className="mt-5 text-xs leading-5 text-slate-500">
        {t("rfqHelperText")}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={sendWhatsApp}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
        >
          <MessageCircle className="size-4" />
          {t("rfqSendWa")}
        </button>
        <button type="button" onClick={sendEmail} className="button-primary inline-flex">
          <Mail className="size-4" />
          {t("rfqSendEmail")}
        </button>
      </div>
    </form>
  );
}
