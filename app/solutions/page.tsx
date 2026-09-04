"use client";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  CircuitBoard,
  Cctv,
  Factory,
  Fuel,
  HardHat,
  Landmark,
  Nut,
  Pickaxe,
  Warehouse,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { whatsappUrl } from "@/lib/company";
import { useLanguage } from "@/lib/language-context";

export default function SolutionsPage() {
  const { t, language } = useLanguage();

  const services = [
    {
      id: "mining",
      title: language === "en" ? "Mining Tools & Drilling" : "Mining Tools & Drilling",
      subtitle: language === "en" ? "Hard rock drilling consumables" : "Peralatan pemboran batuan keras",
      image: "/images/services/mining-tools.png",
      imageAlt: "Rig pengeboran pada area pertambangan terbuka",
      icon: Pickaxe,
      accent: "bg-cyan-600",
      iconClass: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
      description:
        language === "en"
          ? "Procurement of high-durability rock drilling tools for open pit mining, quarries, tunneling, and exploration with customized specifications matching your drill rig and geology."
          : "Pengadaan perlengkapan pengeboran untuk tambang, quarry, tunneling, eksplorasi, dan konstruksi berat dengan spesifikasi yang disesuaikan terhadap rig serta kondisi lapangan.",
      items: [
        {
          name: "Drill Bit",
          detail:
            language === "en"
              ? "Button bit, retrac bit, and cross bit for high-speed rock penetration."
              : "Button bit, retrac bit, dan cross bit untuk penetrasi batuan.",
        },
        {
          name: "Drill Rod",
          detail:
            language === "en"
              ? "MF speed rod, extension rod in round and hexagonal profiles."
              : "MF rod, speed rod, serta extension rod dalam berbagai ukuran.",
        },
        {
          name: "Shank & Coupling",
          detail:
            language === "en"
              ? "Shank adapters and coupling sleeves for optimal energy transfer."
              : "Shank adapter dan coupling sleeve untuk transmisi energi optimal.",
        },
        {
          name: "DTH & Reaming",
          detail:
            language === "en"
              ? "DTH hammers, reaming tools, and heavy-duty drilling accessories."
              : "DTH hammer, reaming tools, dan aksesori drilling equipment.",
        },
      ],
      cta: language === "en" ? "Request Mining Tools Quote" : "Minta penawaran Mining Tools",
    },
    {
      id: "cctv",
      title: language === "en" ? "CCTV & Security Systems" : "CCTV & Security Systems",
      subtitle: language === "en" ? "Industrial multi-brand security systems" : "Sistem keamanan industri multi-brand",
      image: "/images/services/cctv-security.png",
      imageAlt: "Kamera CCTV yang memantau gerbang fasilitas pertambangan",
      icon: Cctv,
      accent: "bg-blue-600",
      iconClass: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
      description:
        language === "en"
          ? "Procurement of integrated surveillance systems for mining offices, warehouses, haulage roads, and processing plants with enterprise VMS and AI analytics."
          : "Penyediaan perangkat keamanan untuk kantor, gudang, workshop, fasilitas produksi, dan area operasional dengan pilihan sistem yang dapat diintegrasikan.",
      items: [
        {
          name: language === "en" ? "Multi-Brand CCTV" : "CCTV Multi-Brand",
          detail: "Hikvision, Dahua, Uniview, Axis, and Honeywell.",
        },
        {
          name: "NVR & DVR",
          detail:
            language === "en"
              ? "Centralized video recording with flexible channel and RAID storage."
              : "Perekaman terpusat dengan pilihan channel dan kapasitas penyimpanan.",
        },
        {
          name: "Access Control",
          detail:
            language === "en"
              ? "Biometric face recognition readers, controllers, and turnstiles."
              : "Reader, controller, credential, dan pengelolaan akses fasilitas.",
        },
        {
          name: "Monitoring System",
          detail:
            language === "en"
              ? "Industrial 24/7 displays and control room video wall decoders."
              : "Pemantauan lokal maupun jarak jauh untuk area operasional.",
        },
      ],
      cta: language === "en" ? "Request CCTV Quote" : "Minta penawaran CCTV & Security",
    },
    {
      id: "electrical",
      title: language === "en" ? "Electrical & Industrial" : "Electrical & Industrial",
      subtitle: language === "en" ? "Power backup, lighting, and networking" : "Power backup, lighting, dan networking",
      image: "/images/services/electrical-industrial.png",
      imageAlt: "Panel distribusi listrik dan perangkat UPS industri",
      icon: CircuitBoard,
      accent: "bg-amber-500",
      iconClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
      description:
        language === "en"
          ? "Uninterruptible power supplies, hazardous area ATEX lighting, and industrial networking hardware to preserve site continuity and personnel safety."
          : "Perangkat daya, pencahayaan, panel, dan konektivitas untuk membantu menjaga keselamatan serta kontinuitas operasional fasilitas industri.",
      items: [
        {
          name: "UPS & Battery Backup",
          detail:
            language === "en"
              ? "Online double conversion UPS 1-phase & 3-phase for mission-critical loads."
              : "Pilihan kapasitas dan runtime untuk perangkat kritis.",
        },
        {
          name: language === "en" ? "Industrial Lighting" : "Lampu Tambang LED",
          detail:
            language === "en"
              ? "High-bay LED, high-mast floodlights, and ATEX explosion-proof fixtures."
              : "Lampu tambang LED, flood light, dan explosion-proof lighting.",
        },
        {
          name: "Panel Electrical",
          detail:
            language === "en"
              ? "Main distribution panels (MDB), motor starters (MCC), and enclosures."
              : "Panel distribusi, enclosure, proteksi, dan aksesori pendukung.",
        },
        {
          name: "Networking Equipment",
          detail:
            language === "en"
              ? "Hardened DIN-rail Ethernet switches and long-range wireless bridges."
              : "Switch, router, wireless, dan pilihan jaringan industri.",
        },
      ],
      cta: language === "en" ? "Request Electrical Quote" : "Minta penawaran Electrical",
    },
    {
      id: "fasteners",
      title: language === "en" ? "Fasteners & Hardware" : "Fasteners & Hardware",
      subtitle: language === "en" ? "High-tensile bolting and foundation anchors" : "Baut mutu tinggi dan angkur fondasi",
      image: "/images/services/fasteners-hardware.png",
      imageAlt: "Fastener industri pada sambungan mesin dan struktur baja",
      icon: Nut,
      accent: "bg-emerald-600",
      iconClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      description:
        language === "en"
          ? "Mechanical connections for heavy machinery, steel frames, piping flanges, and vibrating foundations with full mill test certificates (MTR)."
          : "Pengadaan sambungan mekanis untuk mesin, struktur baja, perpipaan, fondasi, serta pekerjaan konstruksi dengan pilihan material dan grade yang fleksibel.",
      items: [
        {
          name: "Hex & High Tensile Bolt",
          detail:
            language === "en"
              ? "DIN 931/933 Grade 8.8, 10.9, 12.9 with zinc and HDG coating."
              : "Pilihan grade 8.8, 10.9, 12.9, ukuran, dan finishing.",
        },
        {
          name: "Anchor Bolt",
          detail:
            language === "en"
              ? "ASTM F1554 L-type and heavy anchor plates for machinery foundations."
              : "Tipe L dan J untuk fondasi struktur maupun mesin.",
        },
        {
          name: "Stud Bolt",
          detail:
            language === "en"
              ? "ASTM A193 B7 stud bolts + A194 2H nuts with PTFE/Xylan coating."
              : "Pilihan spesifikasi ASTM untuk flange dan perpipaan.",
        },
        {
          name: "Stainless, Nut & Washer",
          detail:
            language === "en"
              ? "SUS 304/316 fasteners, heavy hex nuts, and Nord-Lock washers."
              : "SUS 304/316 serta berbagai tipe mur dan washer.",
        },
      ],
      cta: language === "en" ? "Request Fasteners Quote" : "Minta penawaran Fasteners",
    },
  ];

  const sectors = [
    {
      title: language === "en" ? "Mining & Quarrying" : "Pertambangan",
      description: language === "en" ? "Coal, mineral, quarry, and remote site operations." : "Batubara, mineral, quarry, dan operasional site.",
      icon: Pickaxe,
    },
    {
      title: language === "en" ? "Manufacturing" : "Manufaktur",
      description: language === "en" ? "Workshops, assembly plants, and processing units." : "Workshop, assembly, dan fasilitas pemrosesan.",
      icon: Factory,
    },
    {
      title: language === "en" ? "Construction & EPC" : "Konstruksi",
      description: language === "en" ? "Steel structures, foundation anchors, and civil works." : "Struktur baja, fondasi, dan pekerjaan sipil.",
      icon: HardHat,
    },
    {
      title: language === "en" ? "Infrastructure & Ports" : "Infrastruktur",
      description: language === "en" ? "Bridges, haulage roads, and coal terminals." : "Jalan, jembatan, pelabuhan, dan fasilitas publik.",
      icon: Landmark,
    },
    {
      title: language === "en" ? "Oil & Gas" : "Minyak & Gas",
      description: language === "en" ? "Piping, high-pressure flanges, and hazardous areas." : "Perpipaan, kelistrikan, dan area operasional.",
      icon: Fuel,
    },
    {
      title: language === "en" ? "Power & Energy" : "Energi",
      description: language === "en" ? "Power plants, electrical substations, and utilities." : "Pembangkit, distribusi, dan fasilitas pendukung.",
      icon: Zap,
    },
    {
      title: language === "en" ? "Warehousing & Logistics" : "Pergudangan",
      description: language === "en" ? "Security surveillance, LED lighting, and facilities." : "Keamanan, pencahayaan, dan konektivitas.",
      icon: Warehouse,
    },
    {
      title: language === "en" ? "Commercial Facilities" : "Komersial",
      description: language === "en" ? "Head offices, campuses, and multi-story buildings." : "Gedung, institusi, dan fasilitas perusahaan.",
      icon: Building2,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden border-b border-slate-800 bg-slate-950 text-white">
        <Image
          src="/images/hero.jpg"
          alt="Operasional pertambangan dan industri"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center brightness-[0.35]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
        <div className="site-container py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow !text-cyan-300">{t("solutionsHeroEyebrow")}</p>
            <h1 className="mt-4 text-3xl leading-tight font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              {t("solutionsHeroTitle")}
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              {t("solutionsHeroDesc")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/products" className="button-primary inline-flex">
                {language === "en" ? "Browse Catalog" : "Buka katalog"} <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="button-secondary inline-flex !border-slate-500 !bg-slate-950/60 !text-white"
              >
                {t("btnConsultationRfq")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="site-container py-16 sm:py-24">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="eyebrow">
            {language === "en" ? "ASN Service Lines" : "Lini Layanan ASN"}
          </p>
          <h2 className="section-title mt-3">
            {language === "en"
              ? "Procurement Support for Continuous Field Operations"
              : "Dukungan pengadaan untuk operasional yang terus berjalan"}
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {language === "en"
              ? "Every category can be customized based on technical specifications, quantity, preferred brands, budget, and delivery milestones."
              : "Setiap kategori dapat disesuaikan berdasarkan spesifikasi teknis, jumlah, merek, anggaran, dan target pengiriman."}
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-2">
          {services.map((service) => (
            <article
              id={service.id}
              key={service.id}
              className="surface-card group flex h-full scroll-mt-28 flex-col overflow-hidden !border-2 !p-0 transition hover:!border-cyan-500 hover:shadow-xl"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-1.5 text-[10px] font-black tracking-[0.13em] text-white uppercase ${service.accent}`}
                  >
                    {service.title}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-300">
                    {language === "en" ? "Representative Visual" : "Visual representatif"}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${service.iconClass}`}>
                    <service.icon className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl dark:text-white">
                      {service.title}
                    </h2>
                    <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-300">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {service.description}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {service.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-start gap-3 text-sm leading-5 text-slate-600 dark:text-slate-300"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan-600" aria-hidden="true" />
                      <span>
                        <strong className="text-slate-900 dark:text-white">{item.name}:</strong> {item.detail}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?category=${service.id}`}
                  className="button-primary mt-7 inline-flex w-full"
                >
                  {service.cta} <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Sectors Served */}
      <section className="border-y border-slate-200 bg-slate-100/70 py-16 sm:py-24 dark:border-slate-700 dark:bg-[#0d1a2c]">
        <div className="site-container">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="eyebrow">
              {language === "en" ? "Industries Served" : "Cakupan Industri"}
            </p>
            <h2 className="section-title mt-3">
              {language === "en" ? "Industry Sectors We Supply" : "Sektor industri yang kami layani"}
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {language === "en"
                ? "Customizable procurement supply contracts designed for diverse operating environments and demanding site requirements."
                : "Layanan pengadaan yang dapat disesuaikan untuk berbagai lingkungan kerja dan kebutuhan proyek."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {sectors.map((sector) => (
              <article
                key={sector.title}
                className="surface-card group p-4 transition hover:border-cyan-500 hover:shadow-md sm:p-5"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-cyan-500/10 text-cyan-700 transition group-hover:bg-cyan-600 group-hover:text-white dark:text-cyan-300">
                  <sector.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-sm font-black text-slate-950 sm:text-base dark:text-white">
                  {sector.title}
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-slate-500 dark:text-slate-300">
                  {sector.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom RFQ Section */}
      <section className="site-container py-16 sm:py-20">
        <div className="rfq-panel rounded-[2rem] px-6 py-12 text-center text-white sm:px-12">
          <p className="eyebrow !text-cyan-300">
            {t("contactHeroEyebrow")}
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-2xl font-black tracking-tight sm:text-4xl">
            {language === "en"
              ? "Ready to Discuss Your Project Procurement Requirements?"
              : "Siap membahas kebutuhan pengadaan proyek Anda?"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            {language === "en"
              ? "Send your technical specifications, part numbers, required quantities, or preferred brands. The ASN team will prepare a competitive quote."
              : "Kirim spesifikasi, jumlah, merek pilihan, atau part number. Tim ASN akan membantu menyiapkan penawaran yang sesuai."}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="button-primary inline-flex">
              {t("btnRequestQuote")} <ArrowRight className="size-4" />
            </Link>
            <a
              href={whatsappUrl(
                language === "en"
                  ? "Hello ASN, I would like to consult regarding procurement services."
                  : "Halo ASN, saya ingin berkonsultasi mengenai layanan pengadaan."
              )}
              target="_blank"
              rel="noreferrer"
              className="button-secondary inline-flex !border-emerald-500/40 !bg-emerald-500/10 !text-emerald-300"
            >
              {t("btnWhatsApp")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
