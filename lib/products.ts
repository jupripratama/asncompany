export type ProductCategory = "mining" | "cctv" | "electrical" | "fasteners";

export type Product = {
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  highlights: string[];
};

export const categories = [
  { id: "mining", label: "Mining Tools" },
  { id: "cctv", label: "CCTV & Security" },
  { id: "electrical", label: "Electrical" },
  { id: "fasteners", label: "Fasteners" },
] as const;

export const products: Product[] = [
  {
    name: "Drill Bit",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Mata bor batuan keras dengan tungsten carbide inserts untuk penetrasi cepat dan usia pakai optimal.",
    highlights: ["Button, Retrac, dan Cross Bit", "Diameter M38 hingga T51+"],
  },
  {
    name: "Drill Rod",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Batang bor berkekuatan tinggi untuk aplikasi drifting, tunneling, dan bench drilling.",
    highlights: ["Pilihan panjang dan thread", "Material tahan beban kerja berat"],
  },
  {
    name: "Shank Adapter",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Penghubung rock drill dan drill string yang dirancang untuk transfer energi optimal.",
    highlights: ["Kompatibel multi-brand", "Heat treatment presisi"],
  },
  {
    name: "Coupling Sleeve",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Sambungan drill rod dengan toleransi thread presisi untuk menjaga kestabilan rangkaian bor.",
    highlights: ["Standard dan crossover", "Tahan aus dan benturan"],
  },
  {
    name: "DTH Hammer",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Down-the-hole hammer untuk pengeboran produksi dengan performa konsisten pada batuan keras.",
    highlights: ["Efisiensi udara optimal", "Pilihan ukuran sesuai rig"],
  },
  {
    name: "Reaming Tools & Accessories",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Peralatan reaming dan aksesori untuk memperbesar serta menyelesaikan lubang bor.",
    highlights: ["Pilot adapter dan reaming bit", "Konfigurasi sesuai kebutuhan lapangan"],
  },
  {
    name: "CCTV Camera Multi-Brand",
    category: "cctv",
    categoryLabel: "CCTV & Security",
    description: "Kamera pengawas untuk area kantor, gudang, workshop, dan operasional site.",
    highlights: ["IP camera dan analog HD", "Indoor, outdoor, dan low-light"],
  },
  {
    name: "NVR & DVR System",
    category: "cctv",
    categoryLabel: "CCTV & Security",
    description: "Sistem perekaman video terpusat dengan kapasitas yang dapat disesuaikan.",
    highlights: ["Remote monitoring", "Storage scalable"],
  },
  {
    name: "Access Control & Monitoring",
    category: "cctv",
    categoryLabel: "CCTV & Security",
    description: "Kontrol akses dan pemantauan untuk meningkatkan keamanan fasilitas perusahaan.",
    highlights: ["Multi-door controller", "Integrasi sistem keamanan"],
  },
  {
    name: "UPS & Battery Backup",
    category: "electrical",
    categoryLabel: "Electrical & Industrial",
    description: "Perlindungan daya untuk perangkat kritis dan sistem operasional perusahaan.",
    highlights: ["Online double conversion", "Kapasitas dan runtime fleksibel"],
  },
  {
    name: "Lampu Tambang LED & Flood Light",
    category: "electrical",
    categoryLabel: "Electrical & Industrial",
    description: "Pencahayaan hemat energi untuk area kerja, workshop, stockpile, dan jalan tambang.",
    highlights: ["High lumen output", "Tahan cuaca dan debu"],
  },
  {
    name: "Explosion Proof Lighting",
    category: "electrical",
    categoryLabel: "Electrical & Industrial",
    description: "Pencahayaan khusus untuk area berisiko dengan kebutuhan proteksi tambahan.",
    highlights: ["Housing industrial grade", "Pilihan rating sesuai aplikasi"],
  },
  {
    name: "Hex Bolt & High Tensile",
    category: "fasteners",
    categoryLabel: "Fasteners & Hardware",
    description: "Baut hexagonal berkekuatan tinggi untuk konstruksi dan mesin industri.",
    highlights: ["Grade 8.8, 10.9, dan 12.9", "Beragam finishing dan ukuran"],
  },
  {
    name: "Anchor Bolt (L & J Type)",
    category: "fasteners",
    categoryLabel: "Fasteners & Hardware",
    description: "Anchor bolt untuk fondasi struktur baja, mesin, dan infrastruktur.",
    highlights: ["L-type dan J-type", "Custom diameter dan panjang"],
  },
  {
    name: "Stud Bolt ASTM B7 / 2H",
    category: "fasteners",
    categoryLabel: "Fasteners & Hardware",
    description: "Stud bolt dan heavy hex nut untuk flange, piping, dan aplikasi tekanan tinggi.",
    highlights: ["ASTM A193 B7 / A194 2H", "Coating sesuai kebutuhan"],
  },
  {
    name: "Stainless Fasteners & Washer",
    category: "fasteners",
    categoryLabel: "Fasteners & Hardware",
    description: "Baut, mur, dan washer stainless steel untuk lingkungan korosif.",
    highlights: ["SUS 304 dan SUS 316", "Tahan area tambang dan pesisir"],
  },
];
