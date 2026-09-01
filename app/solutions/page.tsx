import type { Metadata } from "next";
import { Bolt, Drill, ShieldCheck, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Solusi Pengadaan Industri & Pertambangan - CV Agape Sinar Nirwana (ASN)" },
  description: "Solusi pengadaan komprehensif untuk efisiensi, keamanan, dan keandalan operasional di sektor pertambangan dan industri berat.",
};

const solutions = [
  { id: "mining", title: "Mining Tools & Drilling", icon: Drill, description: "Kebutuhan pengeboran untuk tambang, quarry, tunneling, dan konstruksi berat.", items: ["Drill bit dan drill rod", "Shank adapter dan coupling sleeve", "DTH hammer", "Reaming tools dan aksesori"] },
  { id: "cctv", title: "CCTV & Security Systems", icon: ShieldCheck, description: "Sistem keamanan untuk kantor, gudang, workshop, fasilitas, dan area operasional.", items: ["CCTV camera multi-brand", "NVR dan DVR", "Access control", "Remote monitoring"] },
  { id: "electrical", title: "Electrical & Industrial", icon: Bolt, description: "Perangkat daya dan pencahayaan untuk mendukung keselamatan serta kontinuitas operasional.", items: ["UPS dan battery backup", "Lampu tambang LED", "Flood light", "Explosion-proof lighting"] },
  { id: "fasteners", title: "Fasteners & Hardware", icon: Wrench, description: "Fasteners industri untuk mesin, struktur baja, perpipaan, dan konstruksi.", items: ["High-tensile hex bolt", "Anchor bolt", "Stud bolt ASTM", "Stainless nut dan washer"] },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-slate-800 bg-slate-950 text-white">
        <Image
          src="/images/hero.jpg"
          alt="Operasional pertambangan dan peralatan industri ASN"
          fill
          priority
          className="-z-20 object-cover object-center brightness-[0.35]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
        <div className="site-container py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Solusi Pengadaan untuk Setiap Kebutuhan Industri
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed font-normal text-slate-300 sm:text-lg md:text-xl">
              Solusi pengadaan komprehensif yang dirancang untuk menjamin efisiensi, keamanan, dan kehandalan operasional di sektor pertambangan dan industri berat.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/products" className="button-primary inline-flex">Buka katalog</Link>
              <Link href="/contact" className="button-secondary inline-flex !border-slate-500 !bg-slate-950/60 !text-white hover:!border-cyan-400 hover:!text-cyan-300">
                Konsultasikan kebutuhan
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="site-container space-y-6 py-20">
        {solutions.map((solution, index) => (
          <article id={solution.id} key={solution.id} className="surface-card scroll-mt-28 grid gap-8 p-7 md:grid-cols-[auto_1fr_auto] md:items-center sm:p-9">
            <span className="grid size-14 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-600"><solution.icon className="size-7" /></span>
            <div>
              <div className="flex items-center gap-3"><span className="text-xs font-black text-slate-400">0{index + 1}</span><h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">{solution.title}</h2></div>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{solution.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">{solution.items.map((item) => <li key={item} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{item}</li>)}</ul>
            </div>
            <Link href={`/contact?category=${solution.id}`} className="button-secondary inline-flex whitespace-nowrap">Minta penawaran</Link>
          </article>
        ))}
      </section>
    </>
  );
}
