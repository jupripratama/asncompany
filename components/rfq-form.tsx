"use client";

import { Mail, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { categories } from "@/lib/products";
import { company, emailUrl, whatsappUrl } from "@/lib/company";

export function RfqForm() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
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
    const categoryLabel = categories.find((item) => item.id === form.category)?.label ?? form.category;
    return [
      `Halo ${company.legalName},`,
      "",
      "Saya ingin mengajukan Permintaan Penawaran Harga (RFQ):",
      `- PIC: ${form.name}`,
      `- Perusahaan/Site: ${form.companyName}`,
      `- Email: ${form.email}`,
      `- Telepon/WhatsApp: ${form.phone}`,
      `- Kategori: ${categoryLabel}`,
      `- Kebutuhan: ${form.items}`,
      "",
      "Mohon dapat ditindaklanjuti. Terima kasih.",
    ].join("\n");
  }, [form]);

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

  const inputClass = "mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus:bg-slate-900";

  return (
    <form ref={formRef} onSubmit={(event) => event.preventDefault()} className="surface-card p-6 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nama PIC<input required autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} className={inputClass} placeholder="Nama lengkap" /></label>
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Perusahaan / Site<input required autoComplete="organization" value={form.companyName} onChange={(event) => update("companyName", event.target.value)} className={inputClass} placeholder="Nama perusahaan atau proyek" /></label>
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email<input required type="email" autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} className={inputClass} placeholder="procurement@perusahaan.com" /></label>
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nomor WhatsApp / Telepon<input required type="tel" autoComplete="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} className={inputClass} placeholder="08xxxxxxxxxx" /></label>
      </div>
      <label className="mt-5 block text-xs font-bold text-slate-700 dark:text-slate-300">Kategori Kebutuhan<select value={form.category} onChange={(event) => update("category", event.target.value)} className={inputClass}>{categories.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}</select></label>
      <label className="mt-5 block text-xs font-bold text-slate-700 dark:text-slate-300">Item, spesifikasi, jumlah, dan target waktu<textarea required rows={6} value={form.items} onChange={(event) => update("items", event.target.value)} className={inputClass} placeholder="Contoh: Drill Bit T45 76 mm, 20 pcs, dibutuhkan Oktober 2026…" /></label>
      <p className="mt-5 text-xs leading-5 text-slate-500">Pilih kanal pengiriman. WhatsApp akan membuka chat ASN, sedangkan Email akan membuka aplikasi email Anda dengan isi RFQ yang sudah terisi.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={sendWhatsApp} className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"><MessageCircle className="size-4" />Kirim lewat WhatsApp</button>
        <button type="button" onClick={sendEmail} className="button-primary inline-flex"><Mail className="size-4" />Kirim lewat Email</button>
      </div>
    </form>
  );
}
