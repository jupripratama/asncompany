import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Eye } from "lucide-react";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: `Profil perusahaan, visi, misi, dan keunggulan ${company.legalName} (${company.shortName}) sebagai mitra pengadaan terpercaya industri dan pertambangan di Indonesia.`,
};

const missions = [
  {
    number: "1",
    title: "Menyediakan Produk Berkualitas",
    description:
      "Memastikan setiap produk dan suku cadang yang disuplai memenuhi standar teknik tinggi dan bergaransi resmi.",
  },
  {
    number: "2",
    title: "Layanan Cepat & Profesional",
    description:
      "Merespons setiap permintaan penawaran dan kebutuhan mendesak operasional site secara cepat dan akurat.",
  },
  {
    number: "3",
    title: "Solusi Efisien & Ekonomis",
    description:
      "Menawarkan struktur harga kompetitif yang menekan total cost of ownership tanpa kompromi kualitas.",
  },
  {
    number: "4",
    title: "Hubungan Jangka Panjang",
    description:
      "Membangun kemitraan strategis berlandaskan transparansi, integritas, dan konsistensi pelayanan.",
  },
];

const pillars = [
  {
    title: "Harga Kompetitif",
    description:
      "Harga langsung dari principal dan distributor resmi untuk efisiensi anggaran pengadaan belanja operasional Anda.",
  },
  {
    title: "Produk Berkualitas",
    description:
      "Standar uji mutu bersertifikasi, mill sheet material, dan garansi resmi pabrikan.",
  },
  {
    title: "Multi Brand Solution",
    description:
      "Keluasan memilih merek terkemuka dunia sesuai preferensi teknis dan anggaran proyek Anda.",
  },
  {
    title: "Pengiriman Tepat Waktu",
    description:
      "Koordinasi logistik darat, laut, dan udara untuk memastikan material tiba tepat waktu di remote site tambang.",
  },
  {
    title: "Dukungan Teknis Responsif",
    description:
      "Bantuan pencocokan part number, kalkulasi teknis, dan pemilihan alat oleh tim teknis berdedikasi.",
  },
  {
    title: "Fleksibel Sesuai Kebutuhan",
    description:
      "Menyesuaikan terms pengadaan dan jadwal pengiriman bertahap (staggered delivery) sesuai kondisi lapangan.",
  },
];

const promisePoints = [
  {
    label: "CEPAT",
    color: "text-[#00A3C4]",
    description: "Respons penawaran dalam 24 jam & logistik sigap.",
  },
  {
    label: "TEPAT",
    color: "text-slate-900 dark:text-white",
    description: "Kesesuaian part number dan spesifikasi teknis.",
  },
  {
    label: "BERNILAI TAMBAH",
    color: "text-emerald-500",
    description: "Efisiensi total biaya dan masa pakai alat maksimal.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Profil Perusahaan */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-24 dark:border-slate-800 dark:bg-[#0B192C]/40">
        <div className="site-container">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#00A3C4]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#00A3C4]">
                Profil Perusahaan
              </div>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                {company.legalName} ({company.shortName})
              </h1>
              <p className="text-lg font-semibold text-[#00A3C4]">{company.tagline}</p>
              <p className="pt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {company.legalName} ({company.shortName}) adalah perusahaan yang bergerak di bidang{" "}
                <strong className="font-semibold text-slate-900 dark:text-white">General Supplier</strong> dengan fokus pada
                penyediaan kebutuhan{" "}
                <strong className="font-semibold text-slate-900 dark:text-white">
                  industri, pertambangan, konstruksi, dan infrastruktur
                </strong>
                . Kami menyediakan produk berkualitas dengan harga kompetitif untuk mendukung kelancaran operasional
                pelanggan.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Link href="/contact" className="button-primary inline-flex">
                  <span>Konsultasi & RFQ</span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link href="/products" className="button-secondary inline-flex">
                  Lihat Katalog Produk
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
                <span className="text-xs font-bold uppercase tracking-widest text-[#00A3C4]">Visi Kami</span>
                <h2 className="mt-2 text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl">
                  Menjadi mitra pengadaan terpercaya bagi industri Indonesia.
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                Membangun rantai pasok material dan perlengkapan teknik yang terpercaya, berintegritas, dan mendukung kemajuan
                sektor industri nasional.
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#00A3C4]">Keunggulan Layanan</span>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">6 Pilar Keunggulan ASN</h2>
            <p className="mt-2 text-sm text-slate-400">
              Kekuatan kami dalam mendukung rantai pasok industri dan pertambangan.
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
            Komitmen Pelayanan
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
            Janji Layanan {company.legalName}
          </h2>
          <blockquote className="text-base font-medium italic leading-relaxed text-slate-700 sm:text-xl dark:text-slate-300">
            “ASN berkomitmen menjadi mitra terpercaya dalam pengadaan barang untuk industri dan pertambangan dengan
            memberikan solusi yang <strong className="not-italic text-[#00A3C4]">cepat, tepat, dan bernilai tambah</strong>{" "}
            bagi pelanggan.”
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
              <span>Konsultasi Kebutuhan Anda</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
