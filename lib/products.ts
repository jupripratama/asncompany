export type ProductCategory = "mining" | "cctv" | "electrical" | "fasteners";

export type ProductImage = {
  src: string;
  alt: string;
  placeholder?: boolean;
  representative?: boolean;
};

export type ProductVariant = {
  code: string;
  name: string;
  categoryTag?: string;
  badge?: string;
  description: string;
  features: string[];
  officialUrl?: string;
};

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  highlights: string[];
  images: ProductImage[];
  brands?: string[];
  standards?: string[];
  variants?: ProductVariant[];
};

type ProductInput = Omit<Product, "slug">;

export const categories = [
  { id: "mining", label: "Mining Tools" },
  { id: "cctv", label: "CCTV & Security" },
  { id: "electrical", label: "Electrical" },
  { id: "fasteners", label: "Fasteners" },
] as const;

export const cctvBrands = ["Hikvision", "Dahua", "Uniview", "Axis", "Honeywell"] as const;

function representativeVisual(category: ProductCategory, filename: string, productName: string): ProductImage[] {
  return [
    {
      src: `/images/products/${category}/${filename}`,
      alt: `Visual representatif ${productName}`,
      representative: true,
    },
  ];
}

const productEntries: ProductInput[] = [
  // ==================== 1. MINING TOOLS ====================
  {
    name: "Drill Bit",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Mata bor batuan keras dengan tungsten carbide inserts untuk penetrasi cepat, stabilitas lubang, dan usia pakai optimal pada berbagai formasi geologi.",
    highlights: ["Button, Retrac, dan Cross Bit", "Diameter T38 (64mm) hingga GT60 (127mm+)", "Tungsten Carbide Grade Premium", "Tersedia TCI & Steel Tooth Rotary Bit"],
    standards: ["Standard Rock Drilling Systems", "ISO 9001 Metallurgy", "TCI & Mill Tooth Standards"],
    images: [
      { src: "/images/products/mining/drill-bit-01.jpeg", alt: "Roller cone drill bit untuk pengeboran batuan" },
      { src: "/images/products/mining/drill-bit-02.jpeg", alt: "Tampilan depan roller cone drill bit" },
      { src: "/images/products/mining/drill-bit-03.jpeg", alt: "Tampilan samping roller cone drill bit" },
      { src: "/images/products/mining/drill-bit-04.jpeg", alt: "Pilihan ukuran roller cone drill bit" },
      { src: "/images/products/mining/drill-bit-05.jpeg", alt: "Drag bit dengan carbide picks" },
      { src: "/images/products/mining/drill-bit-06.jpeg", alt: "Carbide mining pick untuk drilling tool" },
    ],
    variants: [
      {
        code: "T38 / T45 Button Bit (64mm - 89mm)",
        name: "Top Hammer Threaded Button Bit T38 & T45",
        categoryTag: "Top Hammer • Bench Drilling",
        badge: "Ulir T38 / T45",
        description: "Mata bor tombol karbida untuk pengeboran blast hole dan quarry dengan penetrasi tinggi dan umur pakai panjang.",
        features: [
          "Ulir T38 (dia. 64mm, 76mm) & T45 (dia. 76mm, 89mm)",
          "Desain Face: Flat Face & Drop Center untuk kelurusan lubang",
          "Tungsten Carbide Inserts: Spherical & Ballistic buttons",
          "Bodi baja paduan karburisasi tahan beban impak berat",
        ],
      },
      {
        code: "T51 / GT60 Heavy Production Bit (89mm - 127mm)",
        name: "Heavy-Duty Top Hammer Bit T51 & GT60",
        categoryTag: "Production Drilling • Heavy Rig",
        badge: "Ulir T51 / GT60",
        description: "Mata bor tugas berat untuk rig pengeboran hidrolik kapasitas besar pada tambang batubara dan mineral batuan keras.",
        features: [
          "Ulir T51 (89mm - 115mm) & GT60 (102mm - 127mm)",
          "Desain Retrac untuk memudahkan penarikan batang di batuan rekah",
          "Transmisi energi impak optimal mereduksi konsumsi bahan bakar rig",
          "Kompatibel dengan rig Epiroc SmartROC, Sandvik Pantera & Furukawa",
        ],
      },
      {
        code: 'Roller Cone Tricone Bit (6-3/4" - 12-1/4")',
        name: "Rotary Tricone Bit (TCI & Steel Tooth)",
        categoryTag: "Rotary Drilling • Large Hole",
        badge: "Rotary Standard",
        description: "Mata bor putar tricone untuk rig pengeboran tambang terbuka berdiameter besar dengan pelumasan bearing presisi.",
        features: [
          'Ukuran 6-3/4 inch hingga 12-1/4 inch (IADC Code 417 - 737)',
          "Pilihan TCI (Tungsten Carbide Inserts) dan Milled Steel Tooth",
          "Sealed Journal Bearing dengan pelumasan gemuk sintetis",
          "Perlindungan hardfacing pada shirttail untuk anti-erosi",
        ],
      },
    ],
  },
  {
    name: "Drill Rod",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Batang bor berkekuatan fatik tinggi untuk aplikasi drifting, tunneling, dan bench drilling dengan transfer energi kinetik optimal.",
    highlights: ["Pilihan profil Round dan Hexagonal", "Sistem ulir T38, T45, T51, GT60", "Tipe Male-Female (MF) & Extension Rod", "Perlakuan panas karburisasi anti-fatik"],
    standards: ["Standard Rock Drilling Rods", "Carburized Alloy Steel", "ISO 10208"],
    images: [{ src: "/images/products/mining/drill-rod-01.jpeg", alt: "Pilihan drill rod berulir untuk aplikasi pertambangan" }],
    variants: [
      {
        code: "T38 / T45 Round MF Rod (3050mm - 3660mm)",
        name: "Male-Female (MF) Speed Rod T38 & T45",
        categoryTag: "Drifting & Bench Drilling",
        badge: "Sistem MF",
        description: "Batang bor tipe MF yang mengintegrasikan coupling sleeve langsung pada ujung rod untuk sambungan lebih rigid dan minim deviasi.",
        features: [
          "Ukuran Round 39 (T38) & Round 46 (T45)",
          "Panjang standar: 3050mm (10ft) & 3660mm (12ft)",
          "Ulir Male-Female meniadakan kebutuhan kopling terpisah",
          "Deep-hole carburization treatment untuk ketahanan lelah superior",
        ],
      },
      {
        code: "T51 / GT60 Extension Production Rod (3660mm - 4270mm)",
        name: "Heavy-Duty Extension Drill Rod T51 & GT60",
        categoryTag: "Surface Mining • Blast Hole",
        badge: "Ulir T51 / GT60",
        description: "Batang bor ekstensi diameter besar untuk rig tambang terbuka dengan torsi tinggi dan kedalaman pengeboran ekstrem.",
        features: [
          "Ukuran Round 52 (T51) & Round 60 (GT60)",
          "Panjang: 3660mm (12ft) & 4270mm (14ft)",
          "Mereduksi pembelokan lubang bor pada kedalaman lebih dari 20 meter",
          "Alloy steel kelas premium dengan toleransi pelurusan presisi tinggi",
        ],
      },
    ],
  },
  {
    name: "Shank Adapter",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Penghubung drifter hydraulic rock drill dan drill string yang dirancang dengan perlakuan panas presisi untuk transfer torsi serta impak tanpa aus berlebih.",
    highlights: ["Kompatibel Epiroc, Sandvik, Furukawa, Montabert", "Pilihan ulir T38, T45, T51, GT60", "Forged alloy steel dengan case hardening", "Toleransi splines presisi tinggi"],
    standards: ["OEM Rig Compatible", "Hardened Alloy Forging", "ISO 10208"],
    images: [{ src: "/images/products/mining/coupling-adapter-01.jpeg", alt: "Pilihan coupling dan adapter untuk rangkaian drill string" }],
    variants: [
      {
        code: "Shank Adapter Epiroc / Atlas Copco COP Series",
        name: "Shank Adapter Compatible COP 1238 / 1838 / 2238 / 4050",
        categoryTag: "Epiroc / Atlas Copco Rig",
        badge: "COP 1838 Series",
        description: "Adaptor shank presisi untuk rock drill hidrolik Epiroc seri COP dengan transmisi energi impak maksimum.",
        features: [
          "Kompatibel drifter COP 1238, COP 1838 ME/HE, COP 2238, COP 4050",
          "Pilihan ulir: T38, T45, T51, GT60",
          "Baja tempa paduan khusus dengan case-hardening pada bagian spline & striker face",
          "Tersedia opsi internal flushing & separate flushing",
        ],
      },
      {
        code: "Shank Adapter Sandvik HLX / Tamrock Series",
        name: "Shank Adapter Compatible Sandvik HLX5 / HL700 / HL1000",
        categoryTag: "Sandvik / Tamrock Rig",
        badge: "Sandvik HLX Series",
        description: "Adaptor shank untuk drifter hidrolik Sandvik Tamrock dengan ketahanan fatik tinggi pada beban siklik ekstrem.",
        features: [
          "Kompatibel drifter Sandvik HLX5, HL500, HL600, HL710, HL1000",
          "Pilihan ulir: T38, T45, T51, GT60",
          "Proses heat treatment presisi mencegah retak mikro pada leher spline",
          "Toleransi clearance pelumasan optimal menjaga keawetan bushing drifter",
        ],
      },
      {
        code: "Shank Adapter Furukawa HD Series",
        name: "Shank Adapter Compatible Furukawa HD709 / HD712 / HD715",
        categoryTag: "Furukawa Rig",
        badge: "Furukawa HD Series",
        description: "Adaptor shank untuk crawler drill hidrolik Furukawa seri HD dengan efisiensi transfer energi tinggi.",
        features: [
          "Kompatibel rig Furukawa HD709, HD712, HD715, HCR1200, HCR1500",
          "Pilihan ulir: T45 & T51",
          "Ketahanan abrasi tinggi pada area seal dan seal ring grooves",
          "Kesesuaian direct replacement OEM tanpa modifikasi",
        ],
      },
    ],
  },
  {
    name: "Coupling Sleeve",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Sambungan batang bor dengan toleransi ulir presisi dan jembatan tengah (bridge) untuk menjaga kestabilan serta kelurusan rangkaian drill string.",
    highlights: ["Tipe Semi-Bridge dan Full-Bridge", "Ukuran T38, T45, T51, GT60", "Tersedia Crossover Adapter", "Tahan beban puntir dan benturan berulang"],
    standards: ["Standard Rock Drilling Couplings", "Heat-Treated Alloy", "ISO 10208"],
    images: [{ src: "/images/products/mining/coupling-adapter-01.jpeg", alt: "Pilihan coupling sleeve dan adapter berulir" }],
    variants: [
      {
        code: "Semi-Bridge & Full-Bridge Coupling (T38 / T45 / T51)",
        name: "Standard Threaded Coupling Sleeve T38, T45, T51",
        categoryTag: "Standard Drill String Connection",
        badge: "Semi & Full Bridge",
        description: "Kopling penyambung batang bor standar industri dengan perlakuan karburisasi untuk mencegah macetnya ulir (thread seizure).",
        features: [
          "T38 (OD 55mm), T45 (OD 63mm), T51 (OD 71mm)",
          "Desain Semi-Bridge mencegah rod saling mengunci berlebih",
          "Full-Bridge untuk transfer energi aksial lebih stabil pada batuan masif",
          "Material paduan baja dengan perlakuan panas karburisasi menyeluruh",
        ],
      },
      {
        code: "Crossover Transition Coupling Sleeve",
        name: "Crossover Adapter Coupling (T38-T45 / T45-T51)",
        categoryTag: "Transition System",
        badge: "Crossover Adapter",
        description: "Kopling transisi antar ukuran ulir yang berbeda untuk memudahkan integrasi rod dan shank lintas ukuran.",
        features: [
          "Konfigurasi ulir: T38 ke T45, T45 ke T51, T51 ke GT60",
          "Mengizinkan perubahan diameter rangkaian tanpa mengganti drifter shank",
          "Baja paduan berkekuatan tarik tinggi mereduksi stres konsentrasi",
          "Presisi ulir CNC menjaga kelurusan sumbu pengeboran",
        ],
      },
    ],
  },
  {
    name: "DTH Hammer",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Down-The-Hole hammer performa tinggi untuk pengeboran lubang ledak dan konstruksi fondasi dengan konsumsi udara efisien pada batuan keras.",
    highlights: ["Pilihan seri DHD 3.5, QL 40/50/60, Mission 50/60, SD 5/6", "Tekanan kerja 10 hingga 30 Bar", "Tersedia valve & valveless design", "Dinding luar tebal tahan abrasi"],
    standards: ["DTH Drilling Standards", "High Pressure Air Systems", "ISO Metallurgy"],
    images: representativeVisual("mining", "dth-hammer.png", "DTH Hammer"),
    variants: [
      {
        code: 'DTH Hammer Seri DHD 3.5 & DHD 340 (3.5" - 4")',
        name: "Medium Pressure DTH Hammer DHD Series",
        categoryTag: "Medium Blast Hole • Exploration",
        badge: "DHD Series",
        description: "DTH hammer lincah dan hemat udara untuk pengeboran eksplorasi, sumur air, dan blast hole tambang diameter 90mm s/d 115mm.",
        features: [
          "Shank DHD 3.5 & DHD 340, Diameter bit 90mm - 115mm",
          "Tekanan udara operasional: 10 - 22 Bar (150 - 320 PSI)",
          "Konsumsi udara rendah cocok untuk kompresor portabel site",
          "Piston berbahan alloy khusus dengan respons impak frekuensi tinggi",
        ],
      },
      {
        code: 'DTH Hammer Seri QL 50 & QL 60 (5" - 6")',
        name: "High-Pressure Valveless DTH Hammer QL Series",
        categoryTag: "Heavy Mining • Large Blast Hole",
        badge: "QL 50 / QL 60",
        description: "DTH hammer tugas berat tanpa foot valve (valveless) untuk penetrasi tercepat pada batuan keras granit dan andesit.",
        features: [
          "Shank QL 50 (bit 130-152mm) & QL 60 (bit 152-203mm)",
          "Tekanan operasional tinggi: 14 - 30 Bar (200 - 435 PSI)",
          "Desain tanpa katup kaki (foot-valveless) menghilangkan risiko patah valve",
          "Silinder luar berdinding tebal dengan perlakuan pengerasan khusus",
        ],
      },
      {
        code: 'DTH Hammer Seri Mission 50 & Mission 60 (5" - 6")',
        name: "Standard Heavy Duty DTH Hammer Mission Series",
        categoryTag: "Surface Mining & Quarry",
        badge: "Mission Series",
        description: "DTH hammer standar industri yang andal dengan perawatan mudah dan toleransi kerja tinggi pada kondisi udara berdebu.",
        features: [
          "Shank Mission 50 & Mission 60, Diameter bit 135mm - 203mm",
          "Tekanan operasional: 10 - 25 Bar",
          "Komponen internal modular memudahkan overhaul dan penggantian part di site",
          "Kinerja stabil pada formasi batuan bervariasi",
        ],
      },
    ],
  },
  {
    name: "Reaming Tools",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Peralatan reaming dan pilot adapter untuk memperbesar diameter lubang bor secara presisi pada pekerjaan cut hole tunneling dan konstruksi.",
    highlights: ["Reaming bit diameter 102mm s/d 152mm+", "Pilot adapter ulir R32, T38, T45", "Tombol tungsten carbide padat", "Flushing terarah untuk evakuasi debu bor"],
    standards: ["Standard Rock Drilling Reamers", "ISO 10208"],
    images: representativeVisual("mining", "reaming-tools.png", "Reaming Tools"),
    variants: [
      {
        code: "Reaming Button Bit (102mm - 152mm)",
        name: "Heavy-Duty Reaming Button Bit",
        categoryTag: "Tunneling & Cut Hole Expansion",
        badge: "Reaming Bit",
        description: "Mata bor reamer berkancing karbida untuk memperbesar lubang pilot pada bukaan terowongan tambang bawah tanah dan fondasi.",
        features: [
          'Diameter lubang hasil: 102mm (4"), 127mm (5"), 152mm (6")',
          "Tungsten carbide inserts berbentuk dome/spherical berdaya tahan tinggi",
          "Saluran flushing ganda untuk pembuangan serbuk batu secara cepat",
          "Koneksi ulir female presisi untuk pemasangan ke pilot adapter",
        ],
      },
      {
        code: "Reaming Pilot Adapter (R32 / T38 / T45)",
        name: "Precision Reaming Pilot Adapter Rod",
        categoryTag: "Guidance & Alignment",
        badge: "Pilot Adapter",
        description: "Batang pemandu yang masuk ke dalam lubang pilot untuk menjaga arah pembesaran lubang tetap konsisten dan bebas vibrasi berlebih.",
        features: [
          "Ulir koneksi rig: R32, T38, T45",
          "Panjang dan diameter pilot disesuaikan dengan lubang awal (pilot hole)",
          "Material baja paduan heat-treated anti-tekuk",
          "Mengurangi risiko getaran lateral pada boom rig pengeboran",
        ],
      },
    ],
  },
  {
    name: "Aksesoris Drilling Equipment",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Komponen pendukung esensial untuk menjaga kesiapan rangkaian pengeboran, pelumasan ulir ekstrem, dan penanganan kondisi darurat lubang bor.",
    highlights: ["High-Temp Thread Grease (Anti-Seize)", "Fishing Tools (Spears & Taps)", "Bit Retainer Ring & Basket", "Subs & Thread Adapters"],
    standards: ["Mining Support Accessories", "Anti-Seize High Temp Standards"],
    images: representativeVisual("mining", "drilling-accessories.png", "Aksesoris Drilling Equipment"),
    variants: [
      {
        code: "High-Performance Copper Thread Grease (15kg / 18kg)",
        name: "Drill String Copper Thread Anti-Seize Compound",
        categoryTag: "Lubrication & Protection",
        badge: "Anti-Seize Grease",
        description: "Pelumas ulir berbasis tembaga murni untuk mencegah macet dan keausan ulir drill rod pada tekanan dan temperatur ekstrem hingga 1100°C.",
        features: [
          "Mengandung bubuk tembaga murni dan grafit mikron",
          "Tahan panas ekstrem hingga 1100°C (2000°F) & water-resistant",
          "Mencegah ulir galling, locking, dan keausan dini",
          "Kemasan pail 15 kg dan 18 kg siap pakai di workshop site",
        ],
      },
      {
        code: "Drilling Recovery Fishing Tools (Taper Spear & Tap)",
        name: "Emergency Fishing Tool Set for Drill String Recovery",
        categoryTag: "Emergency Retrieval",
        badge: "Fishing Tools",
        description: "Perangkat pengambil darurat untuk mengangkat batang bor, bit, atau adaptor yang patah/tertinggal di dalam lubang bor.",
        features: [
          "Tipe Taper Spear (internal grip) dan Box Tap / Overshot (external grip)",
          "Baja paduan kekuatan tarik tinggi dengan ulir pengunci satu arah",
          "Ukuran sesuai diameter pipa dan lubang bor",
          "Solusi cepat mencegah kerugian akibat lubang bor tertutup",
        ],
      },
    ],
  },

  // ==================== 2. CCTV & SECURITY ====================
  {
    name: "Hikvision CCTV System",
    category: "cctv",
    categoryLabel: "CCTV & Security",
    description: "Sistem kamera dan pengawasan terintegrasi Hikvision untuk fasilitas industri, workshop alat berat, gudang logistik, dan perimeter site.",
    highlights: ["Smart Hybrid Light & ColorVu 24/7", "Resolusi 4 MP hingga 4K Ultra HD", "AcuSense AI Klasifikasi Manusia & Kendaraan", "Proteksi IP67 Tahan Cuaca Ekstrem"],
    brands: ["Hikvision"],
    images: representativeVisual("cctv", "hikvision-system.png", "Hikvision CCTV System"),
    variants: [
      {
        code: "DS-2CD1043G2-LIU(F)",
        name: "4 MP Smart Hybrid Light Fixed Bullet Network Camera",
        categoryTag: "IP Camera • Fixed Bullet",
        badge: "Hikvision Value",
        description: "Kamera bullet 4 MP dengan pencahayaan adaptif Smart Hybrid Light dan mikrofon internal untuk pengawasan luar/dalam ruangan.",
        features: [
          "Resolusi 4 MP (2560 × 1440 @ 25fps)",
          "Smart Hybrid Light (IR + White Light) jangkauan hingga 30m",
          "Deteksi manusia dan kendaraan cerdas AcuSense Lite",
          "Kompresi efisien H.265+ dan sertifikasi IP67",
        ],
        officialUrl: "https://pro-av.hikvision.com/mena-en/products/IP-Products/Network-Cameras/value-series/ds-2cd1043g2-liu-f-/",
      },
      {
        code: "DS-2CD2387G2P-LSU/SL",
        name: "8 MP Panoramic ColorVu Fixed Turret Network Camera",
        categoryTag: "IP Camera • Panoramic Turret",
        badge: "Hikvision Pro",
        description: "Kamera turret panoramik 8 MP sudut lebar 180° dengan gambar berwarna 24/7, lampu strobo, dan sirene alarm aktif.",
        features: [
          "Resolusi 8 MP Panoramik 180° lensa ganda seamless",
          "Teknologi ColorVu F1.0 untuk visual warna terang dalam gelap",
          "Active Deterrence: Sirene suara & lampu strobo peringatan",
          "True WDR 130 dB dan audio dua arah dua mikrofon",
        ],
        officialUrl: "https://www.hikvision.com/en/products/IP-Products/Network-Cameras/Pro-Series-EasyIP-/ds-2cd2387g2p-lsu-sl/",
      },
      {
        code: "DS-2CD2087G2H-LIU",
        name: "8 MP Smart Hybrid Light with ColorVu Fixed Mini Bullet",
        categoryTag: "IP Camera • Mini Bullet 4K",
        badge: "Hikvision 4K",
        description: "Kamera mini bullet 4K 8 MP dengan kombinasi ColorVu dan Smart Hybrid Light untuk identifikasi detail objek terjauh.",
        features: [
          "Resolusi 8 MP 4K (3840 × 2160)",
          "Smart Hybrid Light jangkauan hingga 40 meter",
          "Klasifikasi target manusia & kendaraan berbasis Deep Learning",
          "Housing logam kokoh dengan sertifikasi proteksi IP67",
        ],
        officialUrl: "https://pro-av.hikvision.com/mena-en/products/IP-Products/Network-Cameras/Pro-Series-EasyIP-/ds-2cd2087g2h-li-u-/",
      },
      {
        code: "DS-7616NXI-K2",
        name: "16-Channel 4K AcuSense 1U Network Video Recorder",
        categoryTag: "NVR • 16 Channel 4K",
        badge: "Hikvision NVR",
        description: "Perekam jaringan 16 channel dengan analitik AI AcuSense terintegrasi, output 4K HDMI, dan kapasitas hingga 2x HDD 10TB.",
        features: [
          "16-ch IP camera inputs hingga resolusi 12 MP",
          "Decoding capability: 2-ch @ 12 MP / 4-ch @ 8 MP / 8-ch @ 4 MP",
          "2 antarmuka SATA untuk kapasitas penyimpanan hingga 20TB",
          "AI Analytics: Deteksi perimeter, pencarian target cepat, pengenalan wajah",
        ],
      },
    ],
  },
  {
    name: "Dahua CCTV System",
    category: "cctv",
    categoryLabel: "CCTV & Security",
    description: "Sistem kamera pengawasan Dahua Technology dengan teknologi WizSense AI, Full-Color, dan Active Deterrence untuk keamanan perimeter industri.",
    highlights: ["WizSense AI & SMD Plus (Smart Motion Detection)", "TiOC (Three-in-One Camera) Aktif Alarm", "Starlight Low-Light Technology", "Pilihan IP Camera, HDCVI, dan PTZ"],
    brands: ["Dahua"],
    images: representativeVisual("cctv", "dahua-system.png", "Dahua CCTV System"),
    variants: [
      {
        code: "DH-IPC-HFW2431T-ZS-S2",
        name: "4 MP WDR IR Vari-focal Bullet Network Camera",
        categoryTag: "IP Camera • Motorized Bullet",
        badge: "Dahua WizSense",
        description: "Kamera bullet 4 MP dengan lensa motorized zoom 2.7mm - 13.5mm dan Starlight technology untuk gambar jernih di kondisi minim cahaya.",
        features: [
          "Resolusi 4 MP (2688 × 1520 @ 25/30 fps)",
          "Lensa Motorized Vari-focal 2.7mm - 13.5mm optical zoom",
          "Teknologi Starlight & Smart IR hingga jarak 60 meter",
          "WDR 120 dB, Micro SD card slot hingga 256GB, IP67",
        ],
      },
      {
        code: "DH-IPC-HDW3849H-AS-PV",
        name: "8 MP Full-Color Active Deterrence Fixed Turret (TiOC)",
        categoryTag: "IP Camera • TiOC Turret 4K",
        badge: "Dahua TiOC",
        description: "Kamera turret 8 MP TiOC dengan Full-Color 24/7, sirene alarm aktif, lampu merah-biru peringatan, dan analitik AI cerdas.",
        features: [
          "Resolusi 8 MP 4K (3840 × 2160 @ 20 fps)",
          "Active Deterrence: Sirene suara & lampu flash merah-biru",
          "Full-Color gambar berwarna 24/7 dengan warm LED 30m",
          "SMD Plus (Smart Motion Detection) menyaring alarm palsu daun/hewan",
        ],
      },
      {
        code: "DH-SD49425XB-HNR",
        name: "4 MP 25x Starlight IR PTZ Network Camera",
        categoryTag: "Speed Dome PTZ Camera",
        badge: "Dahua PTZ",
        description: "Kamera PTZ 4 MP dengan 25x optical zoom untuk pemantauan area luas tambang, jalan haulage, stockpile, dan yard.",
        features: [
          "Resolusi 4 MP dengan 25x Optical Zoom (4.8mm - 120mm)",
          "Teknologi Starlight & IR jarak jauh hingga 100 meter",
          "Auto-tracking dan proteksi perimeter berbasis AI WizSense",
          "Kecepatan putar pan 240°/s, tilt 200°/s, sertifikasi IP66",
        ],
      },
      {
        code: "DHI-NVR4216-4KS2/I",
        name: "16-Channel 1U 2HDDs WizSense Network Video Recorder",
        categoryTag: "NVR • 16 Channel AI",
        badge: "Dahua NVR",
        description: "Perekam jaringan 16 channel dengan kapabilitas AI by NVR untuk pengenalan wajah dan pencegahan intrusi perimeter.",
        features: [
          "Mendukung 16 channel kamera IP hingga resolusi 16 MP",
          "Bandwidth masuk maksimum 256 Mbps",
          "Output video HDMI 4K ganda dan VGA simultan",
          "Kapasitas 2 slot HDD SATA hingga 10TB per disk",
        ],
      },
    ],
  },
  {
    name: "Uniview CCTV System",
    category: "cctv",
    categoryLabel: "CCTV & Security",
    description: "Kamera dan perangkat surveillance Uniview (UNV) dengan teknologi LightHunter dan ColorHunter untuk pengawasan terpusat di lingkungan industri.",
    highlights: ["LightHunter & ColorHunter Sensor", "Tri-Guard Active Deterrence", "Kompresi Ultra 265 Hemat Bandwidth 75%", "Desain Logam Tahan Cuaca Tambang IP67"],
    brands: ["Uniview"],
    images: representativeVisual("cctv", "uniview-system.png", "Uniview CCTV System"),
    variants: [
      {
        code: "IPC2324SB-DZK-I0",
        name: "4 MP LightHunter Motorized Varifocal Bullet Camera",
        categoryTag: "IP Camera • Prime Series",
        badge: "UNV LightHunter",
        description: "Kamera bullet 4 MP dengan sensor LightHunter F1.2 dan lensa motorized 2.8mm - 12mm untuk hasil gambar tajam di malam hari.",
        features: [
          "Resolusi 4 MP (2688 × 1520 @ 30fps)",
          "Lensa Motorized Zoom 2.8mm - 12mm dengan autofokus cepat",
          "Smart IR jangkauan hingga 50 meter & 120dB WDR",
          "Ultra 265, Micro SD hingga 256GB, sertifikasi IP67 & IK10",
        ],
      },
      {
        code: "IPC3618SB-ADF28KM-I0",
        name: "8 MP Tri-Guard Active Deterrence Fixed Turret Camera",
        categoryTag: "IP Camera • Tri-Guard 4K",
        badge: "UNV Tri-Guard",
        description: "Kamera turret 4K dengan integrasi Tri-Guard: Smart Intrusion Prevention, ColorHunter 24/7, dan Active Deterrence audio-visual.",
        features: [
          "Resolusi 8 MP 4K (3840 × 2160 @ 20fps)",
          "ColorHunter gambar penuh warna 24/7 dengan aperture F1.0",
          "Sirene terintegrasi & lampu strobo peringatan penyusup",
          "Mikrofon & speaker terpasang (Two-way audio) dan IP67",
        ],
      },
      {
        code: "NVR302-16S-P16",
        name: "16-Channel 2-SATA 16-PoE 4K Network Video Recorder",
        categoryTag: "NVR • Built-in 16 PoE",
        badge: "UNV NVR",
        description: "Perekam video 16 channel dengan 16 port PoE built-in independen untuk kemudahan instalasi plug & play di lokasi site.",
        features: [
          "16 port PoE terintegrasi (Long Range PoE up to 250m)",
          "Mendukung input kamera hingga resolusi 4K / 8 MP",
          "2 Slot HDD SATA kapasitas total hingga 16TB",
          "Output independen 4K HDMI dan VGA 1080p",
        ],
      },
    ],
  },
  {
    name: "Axis CCTV System",
    category: "cctv",
    categoryLabel: "CCTV & Security",
    description: "Solusi network video premium Axis Communications untuk pengawasan area kritis dengan standar keamanan siber enterprise dan ketahanan ekstrem.",
    highlights: ["Lightfinder 2.0 & Forensic WDR", "OptimizedIR & Zipstream Technology", "Standar Keamanan Siber Axis Edge Vault", "Sertifikasi Vandal Proof IK10+ & NEMA 4X"],
    brands: ["Axis"],
    images: representativeVisual("cctv", "axis-system.png", "Axis CCTV System"),
    variants: [
      {
        code: "AXIS P1468-LE",
        name: "4K / 8 MP Heavy-Duty Bullet Network Camera",
        categoryTag: "Enterprise IP Camera • Bullet",
        badge: "Axis P-Series",
        description: "Kamera bullet 4K tugas berat dengan deep learning processing unit (DLPU) dan analitik AXIS Object Analytics terpasang.",
        features: [
          "Resolusi 4K Ultra HD @ 60 fps",
          "Lightfinder 2.0, Forensic WDR, dan OptimizedIR hingga 40m",
          "AXIS Object Analytics untuk klasifikasi presisi manusia & kendaraan",
          "Proteksi IP66/67, NEMA 4X, dan IK10 tahan benturan",
        ],
      },
      {
        code: "AXIS M3088-V",
        name: "8 MP Compact Fixed Mini Dome Network Camera",
        categoryTag: "Indoor Mini Dome • 4K",
        badge: "Axis M-Series",
        description: "Kamera dome kompak 8 MP untuk pengawasan ruangan kantor, pos kontrol, dan koridor fasilitas dengan sudut pandang luas.",
        features: [
          "Resolusi 8 MP 4K @ 30 fps dalam bodi sangat kompak",
          "Forensic WDR dan Axis Zipstream H.264/H.265",
          "Desain tahan benturan IK08 dan housing ramah lingkungan",
          "Dukungan edge storage dan enkripsi hardware Edge Vault",
        ],
      },
      {
        code: "AXIS Q3538-LVE",
        name: "4K Vandal-Resistant Dome with Deep Learning",
        categoryTag: "Critical Infrastructure Dome",
        badge: "Axis Q-Series",
        description: "Kamera dome kelas tertinggi untuk infrastruktur vital dan area industri ekstrem dengan pelindung cuaca dan kubah tahan sabotase.",
        features: [
          "Sensor gambar 4K premium dengan aperture F1.4",
          "OptimizedIR jarak jauh, Forensic WDR, dan Electronic Image Stabilization",
          "Suhu operasional ekstrem -50°C hingga +60°C",
          "Sertifikasi IK10+ (50 Joule impact resistance) & IP66/IP6K9K",
        ],
      },
    ],
  },
  {
    name: "Honeywell Security System",
    category: "cctv",
    categoryLabel: "CCTV & Security",
    description: "Perangkat keamanan dan kamera pengawasan Honeywell untuk mendukung kontrol fasilitas, integrasi sistem keselamatan, dan kepatuhan industri.",
    highlights: ["Honeywell 30 Series IP Cameras", "True WDR & Motorized Zoom", "Kepatuhan NDAA Compliant", "Integrasi Kontrol Akses & VMS Enterprise"],
    brands: ["Honeywell"],
    images: representativeVisual("cctv", "honeywell-system.png", "Honeywell Security System"),
    variants: [
      {
        code: "HC30WB4R2",
        name: "Honeywell 30 Series 4 MP WDR IR Rugged Bullet",
        categoryTag: "Industrial Rugged Bullet",
        badge: "Honeywell 30 Series",
        description: "Kamera bullet tangguh 4 MP dengan lensa motorized zoom dan enkripsi data aman untuk fasilitas tambang dan komersial.",
        features: [
          "Resolusi 4 MP (2560 × 1440 @ 30fps)",
          "Lensa Motorized Focus/Zoom 2.8mm - 12mm",
          "Smart IR LED jarak 50m dan True WDR 120 dB",
          "NDAA Section 889 Compliant dengan proteksi IP66/IK10",
        ],
      },
      {
        code: "HEN16104",
        name: "Honeywell 30 Series 16-Channel 4K Embedded NVR",
        categoryTag: "Enterprise NVR • 16-Channel",
        badge: "Honeywell NVR",
        description: "Perekam jaringan 16 channel berstandar enterprise dengan kapasitas penyimpanan tinggi dan proteksi siber terverifikasi.",
        features: [
          "16-Channel IP video input dengan throughput hingga 160 Mbps",
          "Output video 4K HDMI dan VGA simultan",
          "2 Slot HDD SATA hingga 20TB kapasitas total",
          "Mendukung integrasi protokol ONVIF Profile S/G/Q/T",
        ],
      },
    ],
  },
  {
    name: "NVR System",
    category: "cctv",
    categoryLabel: "CCTV & Security",
    description: "Network Video Recorder berkapasitas tinggi untuk perekaman terpusat kamera IP dari berbagai brand dengan opsi RAID dan redundansi power.",
    highlights: ["Pilihan 16, 32, hingga 64 Channel 4K", "Dukungan RAID 0/1/5/10 untuk keamanan data", "Dual Gigabit LAN Redundancy", "Kompresi H.265+ & Ultra 265"],
    brands: [...cctvBrands],
    images: representativeVisual("cctv", "nvr-system.png", "NVR System"),
    variants: [
      {
        code: "NVR Enterprise 16-Channel 4K PoE",
        name: "16-Channel 4K PoE Standalone Network Video Recorder",
        categoryTag: "Mid-Scale Site NVR",
        badge: "16-Ch PoE NVR",
        description: "NVR 16 channel dengan 16 port PoE plug-and-play untuk instalasi terpadu di kantor site, pos keamanan, dan workshop.",
        features: [
          "16 Channel input kamera IP hingga resolusi 12 MP",
          "16 Port PoE internal dengan alokasi daya hingga 200W",
          "2 Slot SATA HDD (mendukung hingga 2x 10TB)",
          "Dukungan remote access via mobile apps & browser client",
        ],
      },
      {
        code: "NVR Enterprise 32/64-Channel Rackmount RAID",
        name: "32/64-Channel 4K Enterprise Storage NVR with RAID",
        categoryTag: "Central Control Room NVR",
        badge: "RAID Enterprise NVR",
        description: "NVR rackmount 2U/4U dengan kapasitas 4 hingga 8 slot HDD untuk pusat pemantauan (control room) utama tambang.",
        features: [
          "Mendukung 32 atau 64 channel kamera 4K simultan",
          "4 hingga 8 Slot Hot-Swap SATA HDD dengan hardware RAID 0/1/5/6/10",
          "Dual Gigabit Ethernet LAN untuk failover & load balancing",
          "Redundant Power Supply (RPS) untuk operasional non-stop 24/7",
        ],
      },
    ],
  },
  {
    name: "DVR System",
    category: "cctv",
    categoryLabel: "CCTV & Security",
    description: "Digital Video Recorder hybrid untuk integrasi kamera analog HD (HD-TVI, HDCVI, AHD) dan upgrade bertahap ke IP camera tanpa bongkar kabel.",
    highlights: ["8, 16, dan 32 Channel Hybrid HD", "Mendukung resolusi kamera analog hingga 4K/5MP", "Kompresi H.265 Pro+", "Analitik AcuSense pada saluran analog"],
    brands: ["Hikvision", "Dahua", "Honeywell"],
    images: representativeVisual("cctv", "dvr-system.png", "DVR System"),
    variants: [
      {
        code: "Hybrid DVR 16-Channel 5MP / 4K",
        name: "16-Channel 5MP/4K AcuSense Hybrid Digital Video Recorder",
        categoryTag: "Hybrid DVR • 16 Channel",
        badge: "Hybrid 5MP/4K",
        description: "DVR hybrid 16 saluran yang mendukung 5 format sinyal (HDTVI/AHD/CVI/CVBS/IP) untuk modernisasi sistem CCTV eksisting.",
        features: [
          "16 saluran input analog coaxial BNC (5MP/4K) + opsi saluran IP ekstra",
          "Kompresi video H.265 Pro+ menghemat ruang hard disk hingga 75%",
          "Analitik deteksi manusia dan kendaraan pada semua saluran analog",
          "2 Slot SATA HDD hingga 10TB per disk",
        ],
      },
    ],
  },
  {
    name: "Access Control System",
    category: "cctv",
    categoryLabel: "CCTV & Security",
    description: "Sistem kontrol akses pintu dan gerbang otomatis dengan autentikasi biometrik wajah AI, sidik jari, kartu RFID, dan kunci elektromagnetik.",
    highlights: ["Biometric Face Recognition AI (Anti-Spoofing)", "Fingerprint & RFID Smart Card Reader", "Heavy-Duty Magnetic Lock 600/1200 lbs", "Integrasi Time Attendance & CCTV"],
    brands: [...cctvBrands],
    images: representativeVisual("cctv", "access-control.png", "Access Control System"),
    variants: [
      {
        code: "AI Biometric Face & Fingerprint Terminal",
        name: "Standalone Facial Recognition & Fingerprint Access Terminal",
        categoryTag: "Biometric Access Terminal",
        badge: "AI Face Terminal",
        description: "Terminal kontrol akses biometrik berlayar sentuh dengan kecepatan verifikasi wajah <0.2 detik dan proteksi masker/anti-foto.",
        features: [
          "Kapasitas: 3.000 - 10.000 wajah & 5.000 sidik jari",
          "Kamera ganda 2 MP WDR dengan inframerah untuk kondisi gelap",
          "Tingkat akurasi pengenalan wajah >99% dengan anti-spoofing",
          "Komunikasi TCP/IP, Wi-Fi, RS-485, dan Wiegand output",
        ],
      },
      {
        code: "Heavy-Duty Magnetic Lock (600 / 1200 lbs)",
        name: "Electromagnetic Lock Set with Bracket & Emergency Button",
        categoryTag: "Door Locking Hardware",
        badge: "Magnetic Lock 1200 lbs",
        description: "Kunci magnetik elektrik tugas berat untuk pintu kayu, kaca, dan pintu darurat baja fasilitas industri.",
        features: [
          "Daya tahan holding force: 600 lbs (280 kg) & 1200 lbs (500 kg)",
          "Dilengkapi LED status indicator dan sensor feedback pintu (dry contact)",
          "Paket lengkap bracket ZL/L untuk berbagai tipe kusen pintu",
          "Failsafe operation: Pintu otomatis terbuka saat listrik padam demi keselamatan kerja",
        ],
      },
    ],
  },
  {
    name: "Monitoring System",
    category: "cctv",
    categoryLabel: "CCTV & Security",
    description: "Perangkat tampilan visual dan workstation manajemen video (VMS) untuk ruang kontrol (Control Room & Security Operation Center 24/7).",
    highlights: ['Monitor CCTV Industrial Grade 24/7 (32" - 55")', "Video Wall Controller & Decoder", "VMS Client & Storage Server", "Panel IPS Anti-Glare Bezel Tipis"],
    brands: [...cctvBrands],
    images: representativeVisual("cctv", "monitoring-system.png", "Monitoring System"),
    variants: [
      {
        code: 'Industrial Security Monitor 32" / 43" / 55" (24/7)',
        name: "24/7 Continuous Operation Commercial Security Display",
        categoryTag: "Control Room Display",
        badge: "Industrial 24/7 Display",
        description: "Layar monitor industri khusus pemantauan CCTV non-stop 24 jam dengan panel IPS, pendinginan pasif logam, dan perlindungan anti-burn-in.",
        features: [
          "Ukuran layar: 32 inch, 43 inch, dan 55 inch 4K Ultra HD",
          "Dirancang untuk operasional berkelanjutan 24 jam x 7 hari non-stop",
          "Input lengkap: HDMI, DisplayPort, VGA, dan BNC Loop-through",
          "Bezel ultra-tipis untuk pemasangan multi-screen video wall",
        ],
      },
      {
        code: "Video Wall Decoder & VMS Workstation Server",
        name: "High-Performance Video Wall Matrix Controller",
        categoryTag: "Video Wall & Matrix System",
        badge: "Matrix Controller",
        description: "Perangkat decoder dan workstation VMS untuk membagi dan menampilkan ratusan feed kamera secara fleksibel pada video wall display.",
        features: [
          "Decoding real-time hingga 16x 4K atau 64x 1080p channel simultan",
          "Mendukung split screen, PIP (Picture in Picture), dan tour display",
          "Kompatibilitas multi-brand via protokol ONVIF & RTSP",
          "Chassis rackmount 19 inch dengan redundansi power supply",
        ],
      },
    ],
  },

  // ==================== 3. ELECTRICAL & INDUSTRIAL ====================
  {
    name: "UPS & Battery Backup",
    category: "electrical",
    categoryLabel: "Electrical & Industrial",
    description: "Sistem proteksi daya darurat (Uninterruptible Power Supply) untuk server, sistem SCADA, radio komunikasi, dan instrumen tambang kritis.",
    highlights: ["Online Double Conversion (Zero Transfer Time)", "Pure Sine Wave Output (Daya Bersih)", "Pilihan 1 kVA hingga 40 kVA 3-Phase", "Dukungan Hot-Swappable Battery & SNMP Card"],
    brands: ["APC by Schneider", "Eaton", "Schneider Electric"],
    standards: ["IEC 62040 UPS Standards", "CE / RoHS Compliant"],
    images: representativeVisual("electrical", "ups-battery-backup.png", "UPS & Battery Backup"),
    variants: [
      {
        code: "APC Smart-UPS On-Line SRT 3000VA (SRT3000XLI)",
        name: "APC Smart-UPS SRT 3kVA / 2700W Online Double Conversion",
        categoryTag: "Critical Server & Network Power",
        badge: "APC by Schneider",
        description: "UPS Online Double Conversion 3kVA dengan zero transfer time untuk perlindungan server site, SCADA, dan perangkat jaringan utama.",
        features: [
          "Kapasitas daya: 3000VA / 2700 Watt (Power Factor 0.9)",
          "Teknologi Online Double Conversion dengan output Pure Sine Wave",
          "Format fleksibel Rackmount (2U) / Tower convertible",
          "Dukungan kartu manajemen jaringan SNMP dan slot baterai eksternal",
        ],
      },
      {
        code: "Eaton 9PX 3000VA RT2U (9PX3000IRT2U)",
        name: "Eaton 9PX 3kVA / 3000W Online Double Conversion UPS",
        categoryTag: "Industrial Grade UPS (PF 1.0)",
        badge: "Eaton 9PX",
        description: "UPS online berefisiensi energi tinggi dengan Unity Power Factor (3000W) dan layar LCD grafis interaktif.",
        features: [
          "Kapasitas penuh: 3000VA / 3000 Watt (Unity Power Factor 1.0)",
          "Efisiensi energi hingga 94% dalam mode online (Energy Star certified)",
          "Layar LCD grafis multibahasa untuk monitoring beban dan runtime",
          "Fitur segmentasi stopkontak (load shedding) untuk memprioritaskan beban kritis",
        ],
      },
      {
        code: "Schneider Easy UPS 3S (10kVA - 40kVA 3-Phase)",
        name: "Schneider Electric Easy UPS 3S 3-Phase Industrial UPS",
        categoryTag: "Heavy Industrial & Plant Power",
        badge: "Schneider 3-Phase",
        description: "UPS 3-Phase tangguh untuk fasilitas pemrosesan tambang, ruang server data center site, dan gedung perkantoran utama.",
        features: [
          "Pilihan kapasitas: 10 kVA, 20 kVA, 30 kVA, hingga 40 kVA 3-Phase (400V)",
          "Desain kokoh tahan debu dengan conformal coated boards",
          "Kemudahan instalasi dan pemeliharaan dari panel depan",
          "Opsi baterai internal maupun bank baterai eksternal runtime panjang",
        ],
      },
    ],
  },
  {
    name: "Lampu Tambang LED",
    category: "electrical",
    categoryLabel: "Electrical & Industrial",
    description: "Lampu sorot dan highbay LED tugas berat untuk area kerja tambang, bengkel alat berat (workshop), jalan tambang, dan fasilitas site.",
    highlights: ["High Lumen Output 130 - 150 lm/W", "Proteksi IP66 & IK08 Tahan Getaran", "Die-Cast Aluminium Housing", "Surge Protection 10kV / 15kV"],
    brands: ["Philips", "Signify", "Industrial Standard"],
    standards: ["IEC 60598 Luminaire Standards", "IP66 / IK08", "CE / SNI"],
    images: representativeVisual("electrical", "mining-led.png", "Lampu Tambang LED"),
    variants: [
      {
        code: "Philips Tango G4 LED Floodlight (BVP432 / BVP433)",
        name: "Philips Tango G4 Industrial LED Floodlight (200W - 400W)",
        categoryTag: "Heavy-Duty Mining Floodlight",
        badge: "Philips Tango G4",
        description: "Lampu sorot LED industri premium dengan efisiensi tinggi, distribusi optik presisi, dan ketahanan korosi bodi aluminium die-cast.",
        features: [
          "Pilihan daya: 200W (28.000 lm), 300W (42.000 lm), 400W (56.000 lm)",
          "Efikasi sistem tinggi hingga 140 lm/Watt, CCT 5700K Daylight",
          "Proteksi cuaca IP66, ketahanan benturan mekanik IK08",
          "Pelindung lonjakan tegangan (Surge Protection) 10kV terintegrasi",
        ],
      },
      {
        code: "Heavy-Duty Mining Highbay LED (150W / 200W / 250W)",
        name: "Industrial Mining Workshop Highbay LED Luminaire",
        categoryTag: "Workshop & Warehouse Lighting",
        badge: "Highbay LED IP66",
        description: "Lampu gantung highbay untuk bengkel servis alat berat (Haul Truck & Excavator workshop) dengan pendinginan sirip aluminium masif.",
        features: [
          "Pilihan daya: 150W (21.000 lm), 200W (28.000 lm), 250W (35.000 lm)",
          "Driver Mean Well / Philips dengan proteksi getaran konstan",
          "Rating proteksi IP66 kedap debu silika dan semprotan air cuci unit",
          "Rentang tegangan input lebar: 100 - 277V AC tahan fluktuasi genset site",
        ],
      },
    ],
  },
  {
    name: "Flood Light",
    category: "electrical",
    categoryLabel: "Electrical & Industrial",
    description: "Lampu sorot berkekuatan tinggi untuk pencahayaan area luas seperti stockpile batubara, pelabuhan jetty, lapangan penumpukan, dan perimeter site.",
    highlights: ["Pilihan 400W hingga 1000W / 1200W", "Lensa Optik Asimetris & Simetris", "Daya Sorot Jarak Jauh >200 Meter", "IP66 Housing Aluminium Anti-Karat"],
    standards: ["High Mast Area Lighting", "IP66 / IK09 Heavy Duty"],
    images: representativeVisual("electrical", "flood-light.png", "Flood Light"),
    variants: [
      {
        code: "High Mast Stadium & Stockpile Floodlight 500W / 1000W",
        name: "High Mast High-Power LED Floodlight Luminaire",
        categoryTag: "Stockpile & Jetty Lighting",
        badge: "High Mast 1000W",
        description: "Lampu sorot tiang tinggi (high mast tower) untuk menyinari area penumpukan material, pelabuhan tambang, dan open pit pit-wall.",
        features: [
          "Kapasitas daya: 500 Watt (75.000 lm) dan 1000 Watt (150.000 lm)",
          "Pilihan sudut optik sempit (15°/30°) untuk sorot jauh dan lebar (60°/90°)",
          "Driver eksternal tahan petir dengan surge protection 15kV / 20kA",
          "Braket baja stainless steel 304 dengan penyesuaian sudut 360°",
        ],
      },
    ],
  },
  {
    name: "Explosion Proof Lighting",
    category: "electrical",
    categoryLabel: "Electrical & Industrial",
    description: "Lampu penerangan khusus untuk lingkungan berbahaya (hazardous area) berisiko gas dan debu mudah terbakar dengan sertifikasi ATEX dan IECEx.",
    highlights: ["Sertifikasi Internasional ATEX & IECEx", "Zone 1, Zone 2 (Gas) & Zone 21, Zone 22 (Dust)", "Rating Proteksi Ex d IIC T6 Gb / Ex tb IIIC T80°C", "Kaca Tempered Tahan Benturan & IP66"],
    brands: ["Warom", "Appleton", "Industrial Certified"],
    standards: ["ATEX Directive 2014/34/EU", "IECEx Certified", "Ex d IIC T6", "IP66"],
    images: representativeVisual("electrical", "explosion-proof.png", "Explosion Proof Lighting"),
    variants: [
      {
        code: "Warom HRD91 Series Ex-Proof LED (50W - 240W)",
        name: "Warom HRD91 Series Explosion-Proof LED Floodlight",
        categoryTag: "Zone 1 / 2 Hazardous Area",
        badge: "Warom ATEX / IECEx",
        description: "Lampu sorot tahan ledakan bersertifikasi ATEX/IECEx untuk area pengolahan kimia, tangki bahan bakar tambang (fuel station), dan silo debu batubara.",
        features: [
          "Pilihan daya: 50W, 100W, 150W, hingga 240W",
          "Klasifikasi Ex: Ex d IIC T6 Gb / Ex tb IIIC T80°C Db IP66",
          "Material bodi: Copper-free aluminium alloy dilapisi cat anti-korosi",
          "Kaca depan tempered glass tahan benturan termal dan mekanik ekstrem",
        ],
      },
      {
        code: "Explosion-Proof Emergency Linear LED Light",
        name: "Ex-Proof Linear Fluorescent Replacement with Battery Backup",
        categoryTag: "Hazardous Linear & Emergency",
        badge: "Ex Emergency Linear",
        description: "Lampu linier tahan ledakan pengganti neon konvensional dengan baterai darurat internal otomatis menyala saat listrik padam.",
        features: [
          "Daya: 2x 18W / 2x 36W LED equivalent (panjang 600mm & 1200mm)",
          "Baterai cadangan Ni-Cd berdurasi >90 menit saat darurat listrik mati",
          "Sertifikasi Zone 1 & 2 (Gas), Zone 21 & 22 (Dust), IP66",
          "Pilihan mounting: Gantung (chain), pipa (pendant), atau dinding/plafon",
        ],
      },
    ],
  },
  {
    name: "Panel & Aksesoris Electrical",
    category: "electrical",
    categoryLabel: "Electrical & Industrial",
    description: "Panel distribusi daya listrik industri (MDB, LDB, MCC) dan aksesoris kelistrikan berstandar tinggi untuk kontrol proteksi mesin dan fasilitas site.",
    highlights: ["Main Distribution Panel (MDB) & Sub Distribution Panel (SDP)", "Komponen Breaker Schneider / ABB / Chint", "Enclosure Plat 2.0mm Powder Coated IP55/IP65", "Gland Kabel Ex-Proof & Aksesoris Terminasi"],
    brands: ["Schneider Electric", "ABB", "Chint"],
    standards: ["IEC 61439 Low-Voltage Switchgear", "IP55 / IP65 Enclosure", "PUIL 2020"],
    images: representativeVisual("electrical", "panel-electrical.png", "Panel & Aksesoris Electrical"),
    variants: [
      {
        code: "Main Distribution Panel (MDB) 100A - 1600A",
        name: "Custom Industrial Main Distribution Panel (MDB / LDB)",
        categoryTag: "Power Distribution System",
        badge: "MDB / LDB Panel",
        description: "Panel distribusi utama tegangan rendah (LVMDP) yang dirakit sesuai diagram kelistrikan (Single Line Diagram) proyek tambang/pabrik.",
        features: [
          "Rating arus busbar: 100A hingga 1600A+ dengan tembaga murni bersertifikat",
          "Komponen utama: MCCB, ACB, MCB merek Schneider Electric / ABB",
          "Enclosure bodi plat besi tebal 2.0mm powder coated IP55 / IP65 indoor/outdoor",
          "Dilengkapi Digital Power Meter, surge arrester, dan relay proteksi lengkap",
        ],
      },
      {
        code: "Industrial Armored Cable Gland Ex-Proof (Brass Nickel-Plated)",
        name: "Explosion-Proof Armored Cable Glands (Ex d / Ex e)",
        categoryTag: "Cable Entry & Accessories",
        badge: "Ex-Proof Cable Gland",
        description: "Gland kabel kuningan berlapis nikel (nickel-plated brass) dan stainless steel untuk instalasi kabel berpelindung baja (SWA/STA) di area berbahaya.",
        features: [
          "Ukuran ulir: Metrik M20 s/d M75 dan NPT 1/2 inch s/d 3 inch",
          "Standar proteksi: Ex d IIC Gb / Ex e IIC Gb / Ex tb IIIC Db IP66/IP68",
          "Desain double seal untuk jaket dalam dan luar kabel baja lapis",
          "Paket lengkap termasuk locknut, earth tag, dan neoprene shroud seal",
        ],
      },
    ],
  },
  {
    name: "Networking Equipment",
    category: "electrical",
    categoryLabel: "Electrical & Industrial",
    description: "Perangkat jaringan komunikasi data industri tahan temperatur ekstrem untuk menghubungkan sistem CCTV, telemetri SCADA, dan radio di site.",
    highlights: ["Moxa Industrial DIN-Rail Ethernet Switches", "Fiber Optic Industrial Transceivers", "Outdoor Long-Range Wireless Bridge 5GHz", "Suhu Operasi Ekstrem -40°C hingga +75°C"],
    brands: ["Moxa", "MikroTik", "Ubiquiti", "Cisco Industrial"],
    standards: ["IEEE 802.3 Ethernet Standards", "IEC 61850-3 Substation", "IP30 / IP67"],
    images: representativeVisual("electrical", "networking-equipment.png", "Networking Equipment"),
    variants: [
      {
        code: "Moxa EDS-208A-M-SC (8-Port Industrial Switch)",
        name: "Moxa EDS-208A Series 8-Port Unmanaged Industrial Switch",
        categoryTag: "Industrial DIN-Rail Switch",
        badge: "Moxa Industrial",
        description: "Switch Ethernet industri 8-port pemasangan DIN-Rail dengan housing aluminium kokoh untuk operasi handal di lingkungan tambang berdebu.",
        features: [
          "7 Port 10/100BaseT(X) RJ45 + 1 Port 100BaseFX Multi-Mode Fiber (konektor SC)",
          "Rentang suhu operasional lebar: -40°C hingga +75°C (T model)",
          "Input daya redundan 12/24/48 VDC dengan proteksi arus balik",
          "Housing aluminium berperingkat IP30 tahan getaran dan interferensi elektromagnetik",
        ],
      },
      {
        code: "Moxa EDS-408A Series (8-Port Managed Switch)",
        name: "Moxa EDS-408A 8-Port Managed Industrial Ethernet Switch",
        categoryTag: "Managed Industrial Switch",
        badge: "Moxa Managed",
        description: "Switch terkelola industri dengan dukungan protokol redundansi cincin cepat Turbo Ring dan Turbo Chain (recovery time <20ms).",
        features: [
          "8 Port 10/100BaseT(X) dengan dukungan IGMP Snooping, QoS, IEEE 802.1Q VLAN",
          "Protokol Turbo Ring & Turbo Chain untuk jaringan zero-downtime",
          "Manajemen keamanan jaringan berbasis HTTPS, SSH, SNMPv3",
          "Notifikasi alarm otomatis via relay output dan email saat terjadi gangguan link",
        ],
      },
      {
        code: "Industrial Outdoor Wireless Bridge 5GHz (PTP / PTMP)",
        name: "Long-Range Outdoor Wireless Bridge / AP 5GHz AC",
        categoryTag: "Wireless Pit Telemetry",
        badge: "Wireless Bridge 5GHz",
        description: "Perangkat jembatan jaringan radio nirkabel jarak jauh hingga 15+ km untuk transmisi feed CCTV pit tambang dan data dispatch fleet.",
        features: [
          "Frekuensi 5GHz 802.11ac dengan throughput riil hingga 450+ Mbps",
          "Antena directional gain tinggi terintegrasi dengan proteksi surge petir",
          "Housing tahan cuaca ekstrem berperingkat IP67 tahan hujan badai tropis",
          "Mendukung konfigurasi Point-to-Point (PTP) dan Point-to-Multipoint (PTMP)",
        ],
      },
    ],
  },

  // ==================== 4. FASTENERS & HARDWARE ====================
  {
    name: "Hex Bolt",
    category: "fasteners",
    categoryLabel: "Fasteners & Hardware",
    description: "Baut kepala segi enam berkekuatan tarik tinggi untuk konstruksi baja, perakitan mesin tambang, alat berat, dan pemeliharaan industri.",
    highlights: ["Standar DIN 931 (Setengah Ulir) & DIN 933 (Ulir Penuh)", "Grade Kekuatan 8.8, 10.9, dan 12.9", "Diameter Metrik M6 hingga M64+", "Finishing Black Oxide, Zinc Plated, Hot-Dip Galvanized"],
    standards: ["DIN 931 / DIN 933", "ISO 4014 / ISO 4017", "Grade 8.8 / 10.9 / 12.9"],
    images: representativeVisual("fasteners", "hex-bolt.png", "Hex Bolt"),
    variants: [
      {
        code: "DIN 931 / DIN 933 Grade 8.8 (High Tensile)",
        name: "High Tensile Hex Head Bolt Grade 8.8 (M8 - M48)",
        categoryTag: "General Industrial & Structural",
        badge: "Grade 8.8 (DIN 931/933)",
        description: "Baut kepala segi enam baja karbon sedang dengan proses quenching & tempering, berkekuatan tarik minimum 800 MPa untuk aplikasi umum mesin dan struktur.",
        features: [
          "Standar dimensi: DIN 933 (Full Thread) dan DIN 931 (Half Thread / Shank)",
          "Kekuatan tarik: Tensile Strength 800 N/mm², Yield Strength 640 N/mm²",
          "Pilihan finishing: Black Oxide (Oiled), White Zinc Plating, Hot-Dip Galvanized (HDG)",
          "Rentang ukuran: M8 hingga M48 dengan panjang mulai 20mm s/d 400mm+",
        ],
      },
      {
        code: "DIN 931 / DIN 933 Grade 10.9 & 12.9 (Heavy Duty)",
        name: "Ultra-High Strength Hex Bolt Grade 10.9 & 12.9",
        categoryTag: "Heavy Machinery & High Load",
        badge: "Grade 10.9 / 12.9",
        description: "Baut berkekuatan tarik sangat tinggi untuk sambungan kritis mesin alat berat, sasis haul truck, crusher, dan sambungan berbeban dinamis tinggi.",
        features: [
          "Kekuatan tarik: Grade 10.9 (1040 MPa) & Grade 12.9 (1220 MPa)",
          "Material baja paduan (alloy steel) perlakuan panas khusus anti-fatik",
          "Toleransi ulir kelas presisi 6g / 6H",
          "Dilengkapi Mill Test Certificate (MTR) pada setiap batch pengadaan",
        ],
      },
    ],
  },
  {
    name: "Anchor Bolt",
    category: "fasteners",
    categoryLabel: "Fasteners & Hardware",
    description: "Baut angkur fondasi berkekuatan tinggi untuk mengikat struktur kolom baja gedung, rangka conveyor tambang, dan fondasi mesin bergetar ke beton bertulang.",
    highlights: ["Standar ASTM F1554 (Grade 36, Grade 55, Grade 105)", "Bentuk L-Type, J-Type, dan Straight Anchor with Plate", 'Diameter M12 hingga M64 (1/2" s/d 2-1/2")', "Finishing Hot-Dip Galvanized (ASTM A153) & Plain"],
    standards: ["ASTM F1554 Grade 36/55/105", "ASTM A153 Galvanizing"],
    images: representativeVisual("fasteners", "anchor-bolt.png", "Anchor Bolt"),
    variants: [
      {
        code: "ASTM F1554 Grade 36 / 55 L-Type Anchor Bolt",
        name: "L-Bend Foundation Anchor Bolt with Heavy Hex Nut & Washer",
        categoryTag: "Structural Column Foundation",
        badge: "ASTM F1554 Gr. 36/55",
        description: "Baut angkur bentuk L untuk pengikatan pelat dasar kolom baja struktur pabrik, workshop, dan menara telekomunikasi pada fondasi cor beton.",
        features: [
          "Material standar ASTM F1554 Grade 36 (Mild Steel) & Grade 55 (High Strength Low Alloy)",
          "Bentuk L-Hook 90 derajat untuk daya cengkeram mekanik dalam beton",
          "Ukuran diameter: M16 s/d M56 (panjang total 250mm s/d 1500mm+)",
          "Finishing Hot-Dip Galvanized tahan korosi tanah dan kelembapan beton",
        ],
      },
      {
        code: "ASTM F1554 Grade 105 Straight Anchor with Anchor Plate",
        name: "High-Strength Straight Threaded Anchor Rod with Embedded Plate",
        categoryTag: "Heavy Equipment Foundation",
        badge: "ASTM F1554 Gr. 105",
        description: "Baut angkur lurus berkekuatan tarik tinggi (105 ksi) dengan pelat jangkar penahan bawah untuk fondasi mesin crusher, genset, dan ball mill.",
        features: [
          "Material ASTM F1554 Grade 105 (Tensile 860 - 1030 MPa, Quenched & Tempered)",
          "Ujung bawah dilengkapi heavy hex nut ganda dan pelat jangkar baja tebal",
          "Daya tahan beban tarik dan geser dinamis maksimum",
          "Dibuat custom sesuai gambar teknik dan spesifikasi konsultan perencana",
        ],
      },
    ],
  },
  {
    name: "Stud Bolt",
    category: "fasteners",
    categoryLabel: "Fasteners & Hardware",
    description: "Batang berulir penuh (all-thread stud) berstandar ASTM A193 B7 dipadukan dengan 2 mur ASTM A194 2H untuk sambungan flange pipa bertekanan tinggi.",
    highlights: ["Standar ASTM A193 Grade B7 & ASTM A194 Grade 2H", "Aplikasi Flange Tekanan Tinggi ASME B16.5", 'Ukuran 1/2" hingga 3-1/2" (UNC / 8-UN Thread)', "Pilihan Coating PTFE / Xylan 1424, Hot-Dip Galvanized, Cadmium"],
    standards: ["ASTM A193 Grade B7", "ASTM A194 Grade 2H", "ASME B16.5 / B18.2.2"],
    images: representativeVisual("fasteners", "stud-bolt.png", "Stud Bolt"),
    variants: [
      {
        code: "ASTM A193 B7 + 2x A194 2H (Plain / Black Oxide)",
        name: "Standard High-Temperature Alloy Steel Stud Bolt Assembly",
        categoryTag: "Piping Flange & High Pressure",
        badge: "ASTM A193 B7 / A194 2H",
        description: "Rangkaian baut stud ulir penuh dengan 2 buah mur heavy hex untuk sambungan flange perpipaan minyak, gas, steam, dan hidrolik tambang.",
        features: [
          "Stud Material: ASTM A193 Grade B7 (Chromium-Molybdenum Steel Quenched & Tempered)",
          "Nut Material: 2x ASTM A194 Grade 2H Heavy Hex Nuts",
          'Rentang ukuran: Diameter 1/2 inch s/d 3-1/2 inch dengan ulir UNC (<=1") dan 8-UN (>1")',
          "Suhu kerja operasional hingga 450°C (840°F) dengan batas luluh 725 MPa",
        ],
      },
      {
        code: "PTFE / Xylan 1424 Coated B7 Stud Bolt (Blue / Green)",
        name: "Fluoropolymer PTFE Coated B7 Stud Bolt Assembly",
        categoryTag: "Offshore & Corrosive Environment",
        badge: "Xylan / PTFE Coated",
        description: "Stud bolt B7 dengan lapisan fluoropolymer PTFE (Xylan 1424) untuk ketahanan superior terhadap air laut, asam tambang, dan kemudahan bongkar pasang.",
        features: [
          "Lapisan ganda: Basecoat fosfat/zinc + Topcoat Fluoropolymer PTFE Xylan 1424",
          "Tahan uji semprot garam (Salt Spray Test) ASTM B117 hingga 1500 - 3000 jam tanpa karat",
          "Koefisien gesek rendah (low friction) memastikan torsi pengencangan akurat",
          "Mencegah mur macet (anti-galling) saat maintenance berkala di area lembap/pesisir",
        ],
      },
    ],
  },
  {
    name: "Stainless Fastener",
    category: "fasteners",
    categoryLabel: "Fasteners & Hardware",
    description: "Baut, mur, dan sekrup berbahan baja tahan karat (Stainless Steel 304 & 316) untuk lingkungan korosif tinggi, area pengolahan kimia, dan pesisir.",
    highlights: ["Material AISI 304 (A2-70) & AISI 316 (A4-80)", "Tahan Korosi Asam Tambang & Air Laut", "Baut Hexagon, Baut L (Socket Cap), dan Threaded Rod", "Standar DIN 933, DIN 912, DIN 934, DIN 125"],
    standards: ["ISO 3506-1 (A2-70 / A4-80)", "AISI 304 / 316", "DIN 933 / DIN 912"],
    images: representativeVisual("fasteners", "stainless-fastener.png", "Stainless Fastener"),
    variants: [
      {
        code: "Stainless Steel AISI 304 / A2-70 (Hex & Socket Cap)",
        name: "Commercial Stainless Steel Fasteners SUS 304 / A2-70",
        categoryTag: "Corrosion Resistant • General Outdoor",
        badge: "SUS 304 (A2-70)",
        description: "Baut stainless steel grade 304 untuk aplikasi outdoor, instalasi panel surya, struktur tangki air, dan peralatan pengolahan umum.",
        features: [
          "Material Austenitic Stainless Steel AISI 304 (Class A2-70, Tensile 700 MPa)",
          "Tahan terhadap oksidasi atmosferik dan air tawar",
          "Pilihan tipe: Hex Bolt (DIN 933), Socket Cap Screw (DIN 912), Flat Head (DIN 7991)",
          "Rentang ukuran: M4 hingga M36 dengan opsi mur dan washer pelengkap",
        ],
      },
      {
        code: "Stainless Steel AISI 316 / A4-80 (Marine & Acid Grade)",
        name: "Marine & Chemical Grade Stainless Fasteners SUS 316 / A4-80",
        categoryTag: "Marine & Chemical Environment",
        badge: "SUS 316 (A4-80)",
        description: "Baut stainless steel grade 316 mengandung molybdenum (Mo 2-3%) untuk ketahanan maksimal terhadap air laut, klorida, dan air asam tambang.",
        features: [
          "Material AISI 316 / A4-80 (High Tensile 800 MPa, kandungan Molybdenum tinggi)",
          "Ketahanan superior terhadap korosi sumuran (pitting) dan korosi celah (crevice)",
          "Sangat direkomendasikan untuk instalasi jetty pelabuhan, pompa dewatering, dan lab kimia",
          "Tersedia dalam ukuran metrik M6 s/d M36 serta ukuran inch",
        ],
      },
    ],
  },
  {
    name: "Nut & Washer",
    category: "fasteners",
    categoryLabel: "Fasteners & Hardware",
    description: "Mur segi enam standar dan tebal (Heavy Hex), ring plat baja keras (Hardened Washer), serta ring pengunci anti-getar untuk sambungan struktural.",
    highlights: ["Heavy Hex Nut ASTM A194 Grade 2H & DIN 934 Grade 8/10", "Structural Hardened Flat Washer ASTM F436 & DIN 6916", "Nord-Lock Wedge Locking Washers (Anti-Vibration)", "Spring Washer DIN 127B & Disc Springs DIN 2093"],
    standards: ["ASTM A194 / DIN 934", "ASTM F436 / DIN 6916", "Nord-Lock Wedge System"],
    images: representativeVisual("fasteners", "nut-washer.png", "Nut & Washer"),
    variants: [
      {
        code: "Heavy Hex Nut ASTM A194 Grade 2H & DIN 934 Gr. 8/10",
        name: "High-Strength Hexagon Nuts (Standard & Heavy Hex)",
        categoryTag: "High Tensile Nut Assemblies",
        badge: "ASTM A194 2H / DIN 934",
        description: "Mur segi enam berdinding tebal berkekuatan tinggi untuk menahan beban tarik stud bolt dan high tensile bolt tanpa risiko ulir terkelupas.",
        features: [
          "Standar material: ASTM A194 Grade 2H (Inch) dan DIN 934 Grade 8, 10, 12 (Metrik)",
          "Proof Load Stress hingga 175.000 PSI untuk pasangan baut B7 dan Grade 8.8/10.9",
          "Pilihan finishing: Black Oiled, Hot-Dip Galvanized, Zinc, Fluoropolymer PTFE",
          'Ukuran lengkap: Metrik M8 s/d M64 dan Inch 1/2 inch s/d 3-1/2 inch',
        ],
      },
      {
        code: "Structural Hardened Washer ASTM F436 & DIN 6916",
        name: "High-Strength Hardened Steel Flat Washers",
        categoryTag: "Structural Load Distribution",
        badge: "ASTM F436 / DIN 6916",
        description: "Ring plat baja keras perlakuan panas untuk meratakan distribusi beban sambungan baut struktural dan mencegah deformasi permukaan baja.",
        features: [
          "Standar ASTM F436 Type 1 (Hardness HRC 38 - 45) dan DIN 6916 (HV 300)",
          "Mencegah pelat baja terjepit atau tergores saat mur dikencangkan dengan torsi tinggi",
          "Pilihan tipe: Circular Flat, Clipped, dan Beveled Washer untuk profil baja I-Beam/UNP",
          "Finishing Hot-Dip Galvanized dan Black Oxide",
        ],
      },
      {
        code: "Nord-Lock Wedge-Locking Washers (Anti-Vibration)",
        name: "Nord-Lock Original Wedge-Locking Washers Pair",
        categoryTag: "Vibration Safety Locking",
        badge: "Nord-Lock System",
        description: "Ring pengunci ganda berbasis sistem baji (cams) yang mengunci baut berdasarkan tegangan tarik, mencegah baut kendor akibat getaran alat berat.",
        features: [
          "Sistem pengunci baji (wedge-locking system) teruji DIN 25201 Junker Vibration Test",
          "Baut tidak akan kendor meskipun terpapar getaran ekstrem mesin crusher & genset",
          "Dapat digunakan kembali (reusable) tanpa mengurangi daya cengkeram kunci",
          "Tersedia material Carbon Steel (Delta Protekt coating) dan Stainless Steel 316L",
        ],
      },
    ],
  },
  {
    name: "High Tensile Bolt",
    category: "fasteners",
    categoryLabel: "Fasteners & Hardware",
    description: "Baut struktural berkekuatan tarik tinggi untuk sambungan rangka jembatan, tower transmisi, struktur pabrik baja, dan konstruksi alat tambang.",
    highlights: ["Standar ASTM A325 & ASTM A490 Heavy Hex Structural Bolts", "Standar DIN 6914 / EN 14399 High-Strength Structural Bolting (HV)", "Kekuatan Tarik hingga 150 ksi (1035 MPa)", "Sertifikasi Pengujian Lengkap (Mill Test Certificate)"],
    standards: ["ASTM A325 / ASTM A490", "DIN 6914 / EN 14399-4", "AISC Structural Bolting"],
    images: representativeVisual("fasteners", "high-tensile-bolt.png", "High Tensile Bolt"),
    variants: [
      {
        code: "ASTM A325 Type 1 Heavy Hex Structural Bolt",
        name: "ASTM A325 Heavy Hex Structural Bolt Assembly",
        categoryTag: "Structural Steel Connections",
        badge: "ASTM A325 Type 1",
        description: "Baut struktural heavy hex standar AISC untuk penyambungan rangka baja gedung, jembatan timbang tambang, dan struktur pelabuhan.",
        features: [
          "Material: Heat-treated medium carbon steel (Tensile Strength 120 ksi / 830 MPa)",
          "Kepala heavy hex memberikan bidang kontak cengkeraman lebih luas",
          "Panjang ulir pendek dirancang agar ulir tidak berada pada bidang geser sambungan",
          "Finishing Hot-Dip Galvanized (ASTM A153) untuk perlindungan anti-karat jangka panjang",
        ],
      },
      {
        code: "ASTM A490 Type 1 Ultra-High Strength Bolt",
        name: "ASTM A490 Ultra-High Strength Structural Bolt Assembly",
        categoryTag: "Heavy Structural Load (150 ksi)",
        badge: "ASTM A490 Type 1",
        description: "Baut struktural paduan baja berkekuatan ultra-tinggi untuk struktur berbeban berat ekstrem di mana jumlah titik baut perlu diminimalkan.",
        features: [
          "Tensile strength: 150 ksi (1035 MPa) dengan batas luluh 130 ksi (895 MPa)",
          "Bahan alloy steel tempered untuk kapasitas geser dan tarik maksimum",
          "Finishing Black Oxide dengan pelumasan anti-seize",
          "Setiap lot disertai sertifikat pengujian tarik dan impak Charpy V-Notch",
        ],
      },
    ],
  },
];

export function productSlug(name: string) {
  return name
    .toLocaleLowerCase("id")
    .replace(/&/g, " dan ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const products: Product[] = productEntries.map((product) => ({
  ...product,
  slug: productSlug(product.name),
}));

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
