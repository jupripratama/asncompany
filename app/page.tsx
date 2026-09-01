import { ArrowRight, CheckCircle2, Cog, FlaskConical, Video, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { company, whatsappUrl } from "@/lib/company";

const services = [
  {
    title: "Mining Tools",
    description: "Drill Bit, Drill Rod, Shank Adapter, Coupling Sleeve, DTH Hammer, dan Aksesoris Drilling.",
    icon: FlaskConical,
    iconClass: "bg-cyan-500/15 text-cyan-600",
    href: "/solutions#mining",
  },
  {
    title: "CCTV & Security",
    description: "Multi-brand CCTV (Hikvision, Dahua, Axis, Honeywell), NVR, Access Control & Monitoring.",
    icon: Video,
    iconClass: "bg-blue-500/15 text-blue-500",
    href: "/solutions#cctv",
  },
  {
    title: "Electrical & Industrial",
    description: "UPS & Battery Backup, Lampu Tambang LED, Flood Light, Explosion Proof, Panel & Networking.",
    icon: Zap,
    iconClass: "bg-amber-500/15 text-amber-500",
    href: "/solutions#electrical",
  },
  {
    title: "Fasteners & Hardware",
    description: "Hex Bolt, Anchor Bolt, Stud Bolt ASTM B7, Stainless Fasteners, Nut & Washer, High Tensile.",
    icon: Cog,
    iconClass: "bg-emerald-500/15 text-emerald-500",
    href: "/solutions#fasteners",
  },
];

const supportedBrands = [
  { name: "Hikvision", logo: "/images/brands/hikvision.svg" },
  { name: "Dahua", logo: "/images/brands/dahua.svg" },
  { name: "Uniview", logo: "/images/brands/uniview.png" },
  { name: "Axis", logo: "/images/brands/axis.svg" },
  { name: "Honeywell", logo: "/images/brands/honeywell.svg" },
];

const advantages = ["Produk dan brand fleksibel", "Harga kompetitif", "Dukungan teknis responsif", "Pengiriman tepat waktu"];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <Image src="/images/hero.jpg" alt="Peralatan industri dan pertambangan" fill priority className="-z-20 object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/90 to-cyan-950/35" />
        <div className="site-container flex min-h-[640px] items-center py-20">
          <div className="max-w-4xl">
            <p className="eyebrow !text-cyan-300">{company.tagline}</p>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Mitra Pengadaan Terpercaya untuk <span className="text-cyan-300">Industri Indonesia</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Solusi pengadaan kebutuhan pertambangan dan industri dari Balikpapan, dengan pilihan produk fleksibel serta dukungan yang responsif.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/products" className="button-primary inline-flex">Lihat Produk <ArrowRight className="size-4" /></Link>
              <a href={whatsappUrl("Halo ASN, saya ingin berkonsultasi mengenai kebutuhan pengadaan.")} target="_blank" rel="noreferrer" className="button-secondary inline-flex !border-slate-600 !bg-slate-900/70 !text-white">Konsultasi WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-6 dark:border-slate-700 dark:bg-[#0b1628]">
        <div className="site-container">
          <p className="mb-4 text-center text-xs font-semibold tracking-widest text-slate-400 uppercase dark:text-slate-300">
            Dukungan Multi-Brand Terkemuka untuk Sistem Keamanan & Industri
          </p>
          <div className="grid grid-cols-2 items-center justify-center gap-4 sm:grid-cols-3 lg:mx-auto lg:max-w-5xl lg:grid-cols-5 lg:gap-5">
            {supportedBrands.map((brand) => (
              <div key={brand.name} className="flex min-h-16 min-w-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm dark:border-slate-600 dark:shadow-black/25">
                <Image
                  src={brand.logo}
                  alt={`Logo ${brand.name}`}
                  width={200}
                  height={64}
                  className="max-h-8 w-full max-w-[150px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container py-16 sm:py-24">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold tracking-wider text-cyan-600 uppercase dark:text-cyan-400">
              Solusi & Produk
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              4 Pilar Layanan Pengadaan ASN
            </h2>
          </div>
          <Link href="/solutions" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700">
            Lihat Rincian Semua Solusi <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article key={service.title} className="surface-card group flex min-h-60 flex-col justify-between p-6 transition hover:border-cyan-500 hover:shadow-lg">
              <div>
                <span className={`grid size-12 place-items-center rounded-xl transition group-hover:scale-110 ${service.iconClass}`}>
                  <service.icon className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">{service.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-300">{service.description}</p>
              </div>
              <Link href={service.href} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 hover:underline">
                Pelajari Selengkapnya →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-20 dark:border-slate-700 dark:bg-[#0d1a2c]">
        <div className="site-container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Mengapa ASN</p>
            <h2 className="section-title mt-3">Pengadaan yang praktis, profesional, dan sesuai kebutuhan</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">Kami membantu tim procurement menemukan produk yang sesuai spesifikasi, anggaran, serta jadwal operasional tanpa membatasi kebutuhan pada satu brand.</p>
            <Link href="/about" className="button-secondary mt-7 inline-flex">Tentang perusahaan <ArrowRight className="size-4" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {advantages.map((item) => (
              <div key={item} className="surface-card flex items-center gap-3 p-5 text-sm font-bold text-slate-800 dark:text-slate-100">
                <CheckCircle2 className="size-5 shrink-0 text-cyan-500" />{item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container py-20">
        <div className="rfq-panel rounded-[2rem] px-6 py-12 text-center text-white sm:px-12">
          <p className="eyebrow !text-cyan-300">Request for Quotation</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">Sampaikan kebutuhan Anda, kami bantu menyiapkan penawarannya.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300">Kirim RFQ melalui WhatsApp atau email dengan spesifikasi, jumlah, dan target waktu pengadaan.</p>
          <Link href="/contact" className="button-primary mt-7 inline-flex">Buat RFQ <ArrowRight className="size-4" /></Link>
        </div>
      </section>
    </>
  );
}
