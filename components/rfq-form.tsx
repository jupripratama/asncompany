"use client";

import { Mail, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { categories } from "@/lib/products";
import { company, emailUrl, whatsappUrl } from "@/lib/company";
import { useLanguage } from "@/lib/language-context";
import { useAdminStore } from "@/lib/admin-store";

export function RfqForm() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const { t, language } = useLanguage();
  const { addRfq, store } = useAdminStore();


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

  const selectedCategoryLabel = useMemo(() => {
    return categoryLabels[form.category]?.[language] || form.category;
  }, [form.category, language]);

  const emailSubject = useMemo(() => {
    const sender = form.companyName ? `${form.companyName} (${form.name})` : form.name;
    return language === "en"
      ? `[RFQ] Request for Quotation - ${sender || "CV Agape Sinar Nirwana"} (${selectedCategoryLabel})`
      : `[RFQ] Permintaan Penawaran Harga - ${sender || "CV Agape Sinar Nirwana"} (${selectedCategoryLabel})`;
  }, [form.companyName, form.name, selectedCategoryLabel, language]);

  const emailBody = useMemo(() => {
    if (language === "en") {
      return [
        `Dear Sales & Commercial Team,`,
        `CV Agape Sinar Nirwana`,
        `Balikpapan, East Kalimantan`,
        "",
        `Dear Sir/Madam,`,
        "",
        `In relation to our operational requirements, we would like to submit a formal Request for Quotation (RFQ) with the following details:`,
        "",
        `REQUESTER INFORMATION:`,
        `• PIC Name            : ${form.name}`,
        `• Company / Site      : ${form.companyName || "-"}`,
        `• Email Address       : ${form.email}`,
        `• WhatsApp / Phone    : ${form.phone}`,
        `• Product Category    : ${selectedCategoryLabel}`,
        "",
        `REQUIREMENTS & SPECIFICATIONS:`,
        form.items,
        "",
        `KINDLY PROVIDE QUOTATION INCLUDING:`,
        `1. Official commercial quotation (unit price & total)`,
        `2. Stock availability & delivery lead time`,
        `3. Shipping terms & estimated delivery to our site`,
        `4. Payment terms & proposal validity period`,
        "",
        `Thank you for your assistance and prompt cooperation. We look forward to receiving your quotation.`,
        "",
        `Best regards,`,
        form.name,
        form.companyName || "",
      ].filter(Boolean).join("\n");
    }

    return [
      `Yth. Tim Komersial & Pengadaan (Sales & Procurement)`,
      `CV Agape Sinar Nirwana`,
      `Balikpapan, Kalimantan Timur`,
      "",
      `Dengan hormat,`,
      "",
      `Sehubungan dengan kebutuhan operasional perusahaan kami, bersama ini kami mengajukan Permintaan Penawaran Harga (Request for Quotation - RFQ) resmi dengan rincian sebagai berikut:`,
      "",
      `INFORMASI PEMOHON:`,
      `• Nama PIC / Kontak    : ${form.name}`,
      `• Perusahaan / Site    : ${form.companyName || "-"}`,
      `• Email Resmi          : ${form.email}`,
      `• No. WhatsApp/Telepon : ${form.phone}`,
      `• Kategori Produk      : ${selectedCategoryLabel}`,
      "",
      `RINCIAN KEBUTUHAN & SPESIFIKASI BARANG:`,
      form.items,
      "",
      `MOHON INFORMASI PENAWARAN MENCAKUP:`,
      `1. Surat Penawaran Resmi (Formal Quotation)`,
      `2. Ketersediaan stok (Ready Stock / Indent Lead Time)`,
      `3. Syarat & estimasi waktu pengiriman ke lokasi site kami`,
      `4. Ketentuan pembayaran (Terms of Payment) dan masa berlaku penawaran`,
      "",
      `Demikian permohonan ini kami sampaikan. Kami menantikan penawaran terbaik dari CV Agape Sinar Nirwana.`,
      `Atas perhatian, respons cepat, dan kerja sama yang baik, kami ucapkan terima kasih.`,
      "",
      `Hormat kami,`,
      form.name,
      form.companyName || "",
    ].filter(Boolean).join("\n");
  }, [form, selectedCategoryLabel, language]);

  const whatsappMessage = useMemo(() => {
    if (language === "en") {
      return [
        `*REQUEST FOR QUOTATION (RFQ)*`,
        `*CV AGAPE SINAR NIRWANA*`,
        `─────────────────────────`,
        `Hello ASN Sales Team, I would like to submit a request for quotation with the following details:`,
        "",
        `*Requester Information:*`,
        `• PIC Name: ${form.name}`,
        `• Company/Site: ${form.companyName || "-"}`,
        `• Email: ${form.email}`,
        `• Phone/WA: ${form.phone}`,
        `• Category: ${selectedCategoryLabel}`,
        "",
        `*Requirements & Specifications:*`,
        form.items,
        "",
        `─────────────────────────`,
        `Please provide your official quotation and stock availability. Thank you.`,
      ].join("\n");
    }

    return [
      `*PERMINTAAN PENAWARAN HARGA (RFQ)*`,
      `*CV AGAPE SINAR NIRWANA*`,
      `─────────────────────────`,
      `Halo Tim Sales ASN, saya ingin mengajukan permohonan penawaran harga resmi dengan rincian berikut:`,
      "",
      `*Data Pemohon:*`,
      `• Nama PIC: ${form.name}`,
      `• Perusahaan/Site: ${form.companyName || "-"}`,
      `• Email: ${form.email}`,
      `• No. Telp/WA: ${form.phone}`,
      `• Kategori: ${selectedCategoryLabel}`,
      "",
      `*Rincian Kebutuhan & Spesifikasi:*`,
      form.items,
      "",
      `─────────────────────────`,
      `Mohon dapat dikirimkan surat penawaran harga resmi (Quotation) dan informasi ketersediaan stoknya. Terima kasih.`,
    ].join("\n");
  }, [form, selectedCategoryLabel, language]);

  function validate() {
    return formRef.current?.reportValidity() ?? false;
  }

  function sendWhatsApp() {
    if (!validate()) return;
    try {
      addRfq({
        requesterName: form.name,
        companyName: form.companyName || "-",
        email: form.email,
        phone: form.phone,
        category: form.category,
        items: form.items || "Permintaan informasi umum",
        status: "new",
      });
    } catch (_) {}
    window.open(whatsappUrl(whatsappMessage, store.company?.phoneInternational), "_blank", "noopener,noreferrer");
  }

  function sendEmail() {
    if (!validate()) return;
    try {
      addRfq({
        requesterName: form.name,
        companyName: form.companyName || "-",
        email: form.email,
        phone: form.phone,
        category: form.category,
        items: form.items || "Permintaan informasi umum",
        status: "new",
      });
    } catch (_) {}
    window.location.href = emailUrl(emailSubject, emailBody, store.company?.email);
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
