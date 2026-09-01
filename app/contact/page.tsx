import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { RfqForm } from "@/components/rfq-form";
import { company, whatsappUrl } from "@/lib/company";

export const metadata: Metadata = { title: "Kontak & RFQ", description: `Hubungi ${company.legalName} melalui WhatsApp atau email untuk meminta penawaran.` };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Kontak & RFQ" title="Sampaikan kebutuhan pengadaan Anda" description="Isi satu formulir, lalu pilih pengiriman melalui WhatsApp atau email. Tim ASN akan meninjau spesifikasi dan menindaklanjuti permintaan Anda." />
      <section className="site-container grid gap-8 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:py-20">
        <aside className="space-y-5">
          <div className="surface-card p-7">
            <p className="eyebrow">Informasi Resmi</p>
            <h2 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">{company.legalName}</h2>
            <ul className="mt-7 space-y-5 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-cyan-500" />
                <span>
                  <strong className="block text-slate-900 dark:text-white">Alamat Kantor</strong>
                  <span className="block">{company.addressStreet}</span>
                  <span className="block">{company.addressSubdistrict}</span>
                  <span className="block">{company.addressCity}</span>
                </span>
              </li>
              <li className="flex gap-3"><Phone className="mt-0.5 size-5 shrink-0 text-cyan-500" /><span><strong className="block text-slate-900 dark:text-white">Telepon / WhatsApp</strong><a href={`tel:+${company.phoneInternational}`} className="hover:text-cyan-600">{company.phoneDisplay}</a></span></li>
              <li className="flex gap-3"><Mail className="mt-0.5 size-5 shrink-0 text-cyan-500" /><span><strong className="block text-slate-900 dark:text-white">Email</strong><a href={`mailto:${company.email}`} className="break-all hover:text-cyan-600">{company.email}</a></span></li>
            </ul>
          </div>
          <a href={whatsappUrl("Halo ASN, saya ingin berkonsultasi mengenai kebutuhan pengadaan.")} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-3xl bg-emerald-600 p-6 text-white transition hover:bg-emerald-700"><MessageCircle className="size-7" /><span><strong className="block">Chat langsung via WhatsApp</strong><span className="text-sm text-emerald-100">{company.phoneDisplay}</span></span></a>
        </aside>
        <div>
          <h2 className="mb-5 text-2xl font-black text-slate-950 dark:text-white">Formulir Permintaan Penawaran</h2>
          <Suspense fallback={<div className="surface-card p-8 text-sm text-slate-500">Memuat formulir…</div>}><RfqForm /></Suspense>
        </div>
      </section>
    </>
  );
}
