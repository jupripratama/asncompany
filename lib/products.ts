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
  brand?: string;
  categoryTag?: string;
  badge?: string;
  image?: string;
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
  // ==================== 1. MINING TOOLS (Non-Branded / Engineering Standards) ====================
  {
    name: "Drill Bit",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Mata bor batuan keras dengan tungsten carbide inserts untuk penetrasi cepat dan usia pakai optimal pada operasi tambang terbuka dan quarry.",
    highlights: ["Button, Retrac, dan Cross Bit", "Diameter T38 (64mm) hingga GT60 (127mm+)", "Tungsten Carbide Inserts Padat", "Tersedia TCI & Steel Tooth Rotary Bit"],
    standards: ["Ulir T38, T45, T51, GT60", "ISO 10208 Metallurgy", "IADC Code Roller Bit"],
    images: [
      { src: "/images/products/mining/drill-bit-01.jpeg", alt: "Roller cone drill bit untuk pengeboran batuan" },
      { src: "/images/products/mining/drill-bit-02.jpeg", alt: "Tampilan depan roller cone drill bit" },
      { src: "/images/products/mining/drill-bit-03.jpeg", alt: "Tampilan samping roller cone drill bit" },
      { src: "/images/products/mining/drill-bit-04.jpeg", alt: "Pilihan ukuran roller cone drill bit" },
      { src: "/images/products/mining/drill-bit-05.jpeg", alt: "Drag bit dengan carbide picks" },
      { src: "/images/products/mining/drill-bit-06.jpeg", alt: "Carbide mining pick untuk drilling tool" },
    ],
  },
  {
    name: "Drill Rod",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Batang bor berkekuatan fatik tinggi untuk aplikasi drifting, tunneling, dan bench drilling pada batuan keras.",
    highlights: ["Pilihan profil Round dan Hexagonal", "Sistem ulir T38, T45, T51, GT60", "Tipe Male-Female (MF) & Extension Rod", "Perlakuan panas karburisasi anti-fatik"],
    standards: ["Round 39 / 46 / 52 / 60", "Carburized Alloy Steel", "ISO 10208"],
    images: [{ src: "/images/products/mining/drill-rod-01.jpeg", alt: "Pilihan drill rod berulir untuk aplikasi pertambangan" }],
  },
  {
    name: "Shank Adapter",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Penghubung drifter hydraulic rock drill dan drill string yang dirancang untuk transfer energi impak dan torsi optimal.",
    highlights: ["Kompatibel Epiroc, Sandvik, Furukawa, Montabert", "Pilihan ulir T38, T45, T51, GT60", "Forged alloy steel dengan hardening presisi", "Toleransi splines presisi tinggi"],
    standards: ["Epiroc COP1838", "Sandvik HLX5", "Furukawa HD709"],
    images: [{ src: "/images/products/mining/coupling-adapter-01.jpeg", alt: "Pilihan coupling dan adapter untuk rangkaian drill string" }],
  },
  {
    name: "Coupling Sleeve",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Sambungan batang bor dengan toleransi ulir presisi untuk menjaga kelurusan serta kestabilan rangkaian drill string.",
    highlights: ["Tipe Semi-Bridge dan Full-Bridge", "Ukuran T38, T45, T51, GT60", "Tersedia Crossover Adapter", "Tahan beban puntir dan benturan berat"],
    standards: ["T38 / T45 / T51 Couplings", "ISO 10208"],
    images: [{ src: "/images/products/mining/coupling-adapter-01.jpeg", alt: "Pilihan coupling sleeve dan adapter berulir" }],
  },
  {
    name: "DTH Hammer",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Down-The-Hole hammer untuk pengeboran lubang ledak dan konstruksi dengan efisiensi konsumsi udara pada batuan andesit dan granit.",
    highlights: ["Pilihan seri DHD 3.5, QL 40/50/60, Mission 50/60", "Tekanan kerja 10 hingga 30 Bar", "Desain valveless & with foot valve", "Dinding luar tebal tahan abrasi"],
    standards: ["DHD 3.5", "QL 50 / QL 60", "Mission 50 / 60"],
    images: representativeVisual("mining", "dth-hammer.png", "DTH Hammer"),
  },
  {
    name: "Reaming Tools",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Peralatan reaming dan pilot adapter untuk memperbesar diameter lubang bor secara presisi pada pekerjaan tunneling.",
    highlights: ["Reaming bit diameter 102mm s/d 152mm+", "Pilot adapter ulir R32, T38, T45", "Tombol tungsten carbide padat", "Flushing efisien pembuangan serbuk batu"],
    standards: ["Reaming Bit 102mm - 152mm", "R32 / T38 / T45 Pilot"],
    images: representativeVisual("mining", "reaming-tools.png", "Reaming Tools"),
  },
  {
    name: "Aksesoris Drilling Equipment",
    category: "mining",
    categoryLabel: "Mining Tools",
    description: "Komponen pendukung untuk kelancaran operasional pengeboran, pelumasan ulir ekstrem, dan pengangkatan alat di dalam lubang.",
    highlights: ["High-Temp Copper Thread Grease (1100°C)", "Fishing Tools (Spears & Taps)", "Bit Retainer Ring & Basket", "Sub & Thread Adapters"],
    standards: ["Anti-Seize 1100°C", "Alloy Steel Retrieval"],
    images: representativeVisual("mining", "drilling-accessories.png", "Aksesoris Drilling Equipment"),
  },

  // ==================== 2. CCTV & SECURITY (Single-Brand & Multi-Brand Products) ====================
  {
    name: "Hikvision CCTV System",
    category: "cctv",
    categoryLabel: "CCTV & Security",
    description: "Pilihan kamera dan sistem pengawasan resmi Hikvision untuk kantor, gudang, workshop, perimeter, dan area operasional industri.",
    highlights: ["Smart Hybrid Light & ColorVu 24/7", "Resolusi 4 MP hingga 4K Ultra HD", "AcuSense AI Klasifikasi Manusia & Kendaraan", "Proteksi IP67 Tahan Cuaca Ekstrem"],
    brands: ["Hikvision"],
    images: representativeVisual("cctv", "hikvision-system.png", "Hikvision CCTV System"),
    variants: [
      {
        code: "DS-2CD1043G2-LIU(F)",
        name: "4 MP Smart Hybrid Light Fixed Bullet Network Camera",
        brand: "Hikvision",
        categoryTag: "IP Camera • Bullet",
        badge: "Hikvision Value",
        image: "/images/brands/hikvision-products/ds-2cd1043g2-liu.png",
        description: "Kamera bullet 4 MP untuk pengawasan area luar dan dalam dengan pencahayaan adaptif.",
        features: [
          "Resolusi 4 MP (2560 × 1440)",
          "Smart Hybrid Light hingga 30 meter",
          "Deteksi manusia dan kendaraan",
          "H.265+ dan perlindungan IP67",
        ],
        officialUrl: "https://pro-av.hikvision.com/mena-en/products/IP-Products/Network-Cameras/value-series/ds-2cd1043g2-liu-f-/?subName=DS-2CD1043G2-LIU",
      },
      {
        code: "DS-2CD2387G2P-LSU/SL",
        name: "8 MP Panoramic ColorVu Fixed Turret Network Camera",
        brand: "Hikvision",
        categoryTag: "IP Camera • Panoramic Turret",
        badge: "Hikvision Pro",
        image: "/images/brands/hikvision-products/ds-2cd2387g2p-lsu-sl.png",
        description: "Kamera turret panoramik 8 MP dengan tampilan berwarna untuk cakupan area yang lebih luas.",
        features: [
          "Resolusi panoramik 8 MP",
          "ColorVu untuk gambar berwarna 24/7",
          "130 dB WDR dan klasifikasi target",
          "IP67, lampu strobo, dan alarm audio",
        ],
        officialUrl: "https://www.hikvision.com/en/products/IP-Products/Network-Cameras/Pro-Series-EasyIP-/ds-2cd2387g2p-lsu-sl/",
      },
      {
        code: "DS-2CD2087G2H-LIU",
        name: "8 MP Smart Hybrid Light with ColorVu Fixed Mini Bullet",
        brand: "Hikvision",
        categoryTag: "IP Camera • Mini Bullet",
        badge: "Hikvision 4K",
        image: "/images/brands/hikvision-products/ds-2cd2087g2h-liu.png",
        description: "Kamera mini bullet 8 MP dengan ColorVu dan Smart Hybrid Light untuk detail tinggi siang maupun malam.",
        features: [
          "Resolusi 8 MP (3840 × 2160)",
          "Smart Hybrid Light hingga 40 meter",
          "130 dB WDR dan klasifikasi target",
          "H.265+ dan perlindungan IP67",
        ],
        officialUrl: "https://pro-av.hikvision.com/mena-en/products/IP-Products/Network-Cameras/Pro-Series-EasyIP-/ds-2cd2087g2h-li-u-/",
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
        brand: "Dahua",
        categoryTag: "IP Camera • Bullet",
        badge: "Dahua WizSense",
        image: "/images/brands/dahua-products/dh-ipc-hfw2431t-zs-s2.png",
        description: "Kamera bullet 4 MP dengan lensa motorized zoom 2.7mm - 13.5mm dan Starlight technology untuk gambar jernih di kondisi minim cahaya.",
        features: [
          "Resolusi 4 MP (2688 × 1520 @ 25/30 fps)",
          "Lensa Motorized Vari-focal 2.7mm - 13.5mm optical zoom",
          "Teknologi Starlight & Smart IR hingga jarak 60 meter",
          "WDR 120 dB, Micro SD card slot hingga 256GB, IP67",
        ],
        officialUrl: "https://www.dahuasecurity.com/products/All-Products/Network-Cameras/WizSense-Series/2-Series/4MP/IPC-HFW2431T-ZS-S2",
      },
      {
        code: "DH-IPC-HDW3849H-AS-PV",
        name: "8 MP Full-Color Active Deterrence Fixed Turret (TiOC)",
        brand: "Dahua",
        categoryTag: "IP Camera • Turret 4K",
        badge: "Dahua TiOC",
        image: "/images/brands/dahua-products/dh-ipc-hdw3849h-as-pv.png",
        description: "Kamera turret 8 MP TiOC dengan Full-Color 24/7, sirene alarm aktif, lampu merah-biru peringatan, dan analitik AI cerdas.",
        features: [
          "Resolusi 8 MP 4K (3840 × 2160 @ 20 fps)",
          "Active Deterrence: Sirene suara & lampu flash merah-biru",
          "Full-Color gambar berwarna 24/7 dengan warm LED 30m",
          "SMD Plus (Smart Motion Detection) menyaring alarm palsu",
        ],
        officialUrl: "https://www.dahuasecurity.com/products/All-Products/Network-Cameras/WizSense-Series/3-Series/8MP/IPC-HDW3849H-AS-PV",
      },
      {
        code: "DH-SD49425XB-HNR",
        name: "4 MP 25x Starlight IR PTZ Network Camera",
        brand: "Dahua",
        categoryTag: "Speed Dome PTZ Camera",
        badge: "Dahua PTZ",
        image: "/images/brands/dahua-products/dh-sd49425xb-hnr.png",
        description: "Kamera PTZ 4 MP dengan 25x optical zoom untuk pemantauan area luas tambang, jalan haulage, stockpile, dan yard.",
        features: [
          "Resolusi 4 MP dengan 25x Optical Zoom (4.8mm - 120mm)",
          "Teknologi Starlight & IR jarak jauh hingga 100 meter",
          "Auto-tracking dan proteksi perimeter berbasis AI WizSense",
          "Kecepatan putar pan 240°/s, tilt 200°/s, sertifikasi IP66",
        ],
        officialUrl: "https://www.dahuasecurity.com/products/All-Products/Network-Cameras/WizSense-Series/PTZ-Cameras/SD49425XB-HNR",
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
        brand: "Uniview",
        categoryTag: "IP Camera • Prime Bullet",
        badge: "UNV LightHunter",
        image: "/images/brands/uniview-products/ipc2324sb-dzk-i0.png",
        description: "Kamera bullet 4 MP dengan sensor LightHunter F1.2 dan lensa motorized 2.8mm - 12mm untuk hasil gambar tajam di malam hari.",
        features: [
          "Resolusi 4 MP (2688 × 1520 @ 30fps)",
          "Lensa Motorized Zoom 2.8mm - 12mm dengan autofokus cepat",
          "Smart IR jangkauan hingga 50 meter & 120dB WDR",
          "Ultra 265, Micro SD hingga 256GB, sertifikasi IP67 & IK10",
        ],
        officialUrl: "https://global.uniview.com/Products/Prime/LightHunter/IPC2324SB-DZK-I0/",
      },
      {
        code: "IPC3618SB-ADF28KM-I0",
        name: "8 MP Tri-Guard Active Deterrence Fixed Turret Camera",
        brand: "Uniview",
        categoryTag: "IP Camera • Tri-Guard 4K",
        badge: "UNV Tri-Guard",
        image: "/images/brands/uniview-products/ipc3618sb-adf28km-i0.png",
        description: "Kamera turret 4K dengan integrasi Tri-Guard: Smart Intrusion Prevention, ColorHunter 24/7, dan Active Deterrence audio-visual.",
        features: [
          "Resolusi 8 MP 4K (3840 × 2160 @ 20fps)",
          "ColorHunter gambar penuh warna 24/7 dengan aperture F1.0",
          "Sirene terintegrasi & lampu strobo peringatan penyusup",
          "Mikrofon & speaker terpasang (Two-way audio) dan IP67",
        ],
        officialUrl: "https://global.uniview.com/Products/Prime/Tri-guard/IPC3618SB-ADF28KM-I0/",
      },
      {
        code: "NVR302-16S-P16",
        name: "16-Channel 2-SATA 16-PoE 4K Network Video Recorder",
        brand: "Uniview",
        categoryTag: "NVR • Built-in 16 PoE",
        badge: "UNV NVR",
        image: "/images/brands/uniview-products/nvr302-16s-p16.png",
        description: "Perekam video 16 channel dengan 16 port PoE built-in independen untuk kemudahan instalasi plug & play di lokasi site.",
        features: [
          "16 port PoE terintegrasi (Long Range PoE up to 250m)",
          "Mendukung input kamera hingga resolusi 4K / 8 MP",
          "2 Slot HDD SATA kapasitas total hingga 16TB",
          "Output independen 4K HDMI dan VGA 1080p",
        ],
        officialUrl: "https://global.uniview.com/Products/NVR/Prime/NVR302-16S-P16/",
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
        brand: "Axis",
        categoryTag: "Enterprise IP Camera • Bullet",
        badge: "Axis P-Series",
        image: "/images/brands/axis-products/axis-p1468-le.png",
        description: "Kamera bullet 4K tugas berat dengan deep learning processing unit (DLPU) dan analitik AXIS Object Analytics terpasang.",
        features: [
          "Resolusi 4K Ultra HD @ 60 fps",
          "Lightfinder 2.0, Forensic WDR, dan OptimizedIR hingga 40m",
          "AXIS Object Analytics untuk klasifikasi presisi manusia & kendaraan",
          "Proteksi IP66/67, NEMA 4X, dan IK10 tahan benturan",
        ],
        officialUrl: "https://www.axis.com/products/axis-p1468-le",
      },
      {
        code: "AXIS M3088-V",
        name: "8 MP Compact Fixed Mini Dome Network Camera",
        brand: "Axis",
        categoryTag: "Indoor Mini Dome • 4K",
        badge: "Axis M-Series",
        image: "/images/brands/axis-products/axis-m3088-v.png",
        description: "Kamera dome kompak 8 MP untuk pengawasan ruangan kantor, pos kontrol, dan koridor fasilitas dengan sudut pandang luas.",
        features: [
          "Resolusi 8 MP 4K @ 30 fps dalam bodi sangat kompak",
          "Forensic WDR dan Axis Zipstream H.264/H.265",
          "Desain tahan benturan IK08 dan housing ramah lingkungan",
          "Dukungan edge storage dan enkripsi hardware Edge Vault",
        ],
        officialUrl: "https://www.axis.com/products/axis-m3088-v",
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
        brand: "Honeywell",
        categoryTag: "Industrial Rugged Bullet",
        badge: "Honeywell 30 Series",
        image: "/images/brands/honeywell-products/hc30wb4r2.png",
        description: "Kamera bullet tangguh 4 MP dengan lensa motorized zoom dan enkripsi data aman untuk fasilitas tambang dan komersial.",
        features: [
          "Resolusi 4 MP (2560 × 1440 @ 30fps)",
          "Lensa Motorized Focus/Zoom 2.8mm - 12mm",
          "Smart IR LED jarak 50m dan True WDR 120 dB",
          "NDAA Section 889 Compliant dengan proteksi IP66/IK10",
        ],
        officialUrl: "https://buildings.honeywell.com/us/en/products/security/video-surveillance/cameras/ip-cameras/30-series-ip-cameras/hc30wb4r2",
      },
    ],
  },
  {
    name: "NVR System",
    category: "cctv",
    categoryLabel: "CCTV & Security",
    description: "Network Video Recorder untuk perekaman kamera IP secara terpusat dengan kapasitas penyimpanan fleksibel dan dukungan multi-brand.",
    highlights: ["Pilihan 16, 32, hingga 64 Channel 4K", "Dukungan RAID 0/1/5/10 untuk keamanan data", "Dual Gigabit LAN Redundancy", "Kompresi H.265+ & Ultra 265"],
    brands: [...cctvBrands],
    images: representativeVisual("cctv", "nvr-system.png", "NVR System"),
    variants: [
      {
        code: "DS-7616NXI-K2",
        name: "Hikvision 16-Channel 1U AcuSense 4K NVR",
        brand: "Hikvision",
        categoryTag: "NVR • Hikvision",
        badge: "Hikvision Pro",
        image: "/images/brands/hikvision-products/ds-7616nxi-k2.png",
        description: "Perekam video 16 channel 4K dengan AcuSense AI pengenalan target manusia & kendaraan, mendukung 2 HDD SATA hingga 20TB.",
        features: [
          "16-ch input IP kamera hingga resolusi 12 MP / 4K",
          "Dekoding hingga 2-ch@12 MP atau 8-ch@1080p",
          "2 Slot SATA HDD (kapasitas hingga 10TB per disk)",
          "AcuSense analitik cerdas dan smart search rekaman",
        ],
        officialUrl: "https://www.hikvision.com/en/products/IP-Products/Network-Video-Recorders/Pro-Series/ds-7616nxi-k2/",
      },
      {
        code: "DHI-NVR4216-4KS2/I",
        name: "Dahua 16-Channel 1U WizSense 4K Network Video Recorder",
        brand: "Dahua",
        categoryTag: "NVR • Dahua",
        badge: "Dahua WizSense",
        image: "/images/brands/dahua-products/dhi-nvr4216-4ks2-i.png",
        description: "Perekam video 16 channel dengan WizSense AI, perlindungan perimeter, dan pengenalan wajah real-time.",
        features: [
          "16 Channel IP video access dengan bandwidth 256 Mbps",
          "Mendukung kamera AI WizSense dan pengenalan wajah",
          "2 Slot HDD SATA hingga 10TB per harddisk",
          "Output independen HDMI 4K dan VGA",
        ],
        officialUrl: "https://www.dahuasecurity.com/products/All-Products/Network-Recorders/WizSense-Series/NVR4-I-Series/2-HDDs/NVR4216-4KS2/I",
      },
      {
        code: "NVR302-16S-P16",
        name: "Uniview 16-Channel 16-PoE Plug & Play 4K NVR",
        brand: "Uniview",
        categoryTag: "NVR • Uniview",
        badge: "UNV Prime",
        image: "/images/brands/uniview-products/nvr302-16s-p16.png",
        description: "NVR 16 channel dengan 16 port PoE bawaan untuk instalasi cepat kamera IP tanpa switch tambahan.",
        features: [
          "16 Port PoE independen dengan fitur Long Range 250m",
          "Mendukung kamera 4K Ultra HD & format Ultra 265",
          "2 Slot HDD SATA kapasitas total 16TB",
          "Dukungan cloud upgrade dan monitoring EZView",
        ],
        officialUrl: "https://global.uniview.com/Products/NVR/Prime/NVR302-16S-P16/",
      },
    ],
  },
  {
    name: "DVR System",
    category: "cctv",
    categoryLabel: "CCTV & Security",
    description: "Digital Video Recorder untuk sistem kamera analog HD dan kebutuhan upgrade instalasi eksisting tanpa penggantian kabel coaxial.",
    highlights: ["8, 16, dan 32 Channel Hybrid HD", "Mendukung resolusi kamera analog hingga 4K/5MP", "Kompresi H.265 Pro+", "Analitik AcuSense pada saluran analog"],
    brands: ["Hikvision", "Dahua", "Honeywell"],
    images: representativeVisual("cctv", "dvr-system.png", "DVR System"),
    variants: [
      {
        code: "iDS-7216HQHI-M2/S",
        name: "Hikvision 16-Channel 1080p 1U AcuSense Turbo HD DVR",
        brand: "Hikvision",
        categoryTag: "DVR • Hikvision",
        badge: "Hikvision Turbo HD",
        image: "/images/brands/hikvision-products/ids-7216hqhi-m2-s.png",
        description: "DVR hybrid 16 channel dengan teknologi AcuSense AI motion detection, mendukung kamera HDTVI/AHD/CVI/CVBS dan IP camera.",
        features: [
          "16 Channel BNC video input + 2 Channel IP kamera",
          "AcuSense Deep Learning Motion Detection 2.0 di semua channel",
          "Kompresi efisien H.265 Pro+ hemat storage hingga 75%",
          "2 Slot HDD SATA kapasitas hingga 10TB per disk",
        ],
        officialUrl: "https://www.hikvision.com/en/products/Turbo-HD-Products/DVR/AcuSense-Series/ids-7216hqhi-m2-s/",
      },
      {
        code: "DH-XVR5216AN-4KL-I3",
        name: "Dahua 16-Channel 4K-N WizSense Penta-brid XVR",
        brand: "Dahua",
        categoryTag: "DVR • Dahua",
        badge: "Dahua WizSense",
        image: "/images/products/cctv/dvr-system.png",
        description: "Perekam video penta-brid 16 channel dengan resolusi hingga 4K, SMD Plus, dan proteksi perimeter cerdas.",
        features: [
          "16 Channel HDCVI/AHD/TVI/CVBS input + 16 IP kamera",
          "SMD Plus untuk deteksi akurat manusia dan kendaraan",
          "Mendukung audio over coaxial pada semua channel",
          "2 Slot HDD SATA kapasitas total hingga 32TB",
        ],
        officialUrl: "https://www.dahuasecurity.com/products/All-Products/Digital-Video-Recorders/WizSense-Series/XVR5-I3-Series/2-HDDs/XVR5216AN-4KL-I3",
      },
    ],
  },
  {
    name: "Access Control System",
    category: "cctv",
    categoryLabel: "CCTV & Security",
    description: "Sistem kontrol akses untuk mengelola pintu, otorisasi pengguna, jadwal, dan jejak aktivitas fasilitas dengan biometrik AI.",
    highlights: ["Biometric Face Recognition AI (Anti-Spoofing)", "Fingerprint & RFID Smart Card Reader", "Heavy-Duty Magnetic Lock 600/1200 lbs", "Integrasi Time Attendance & CCTV"],
    brands: [...cctvBrands],
    images: representativeVisual("cctv", "access-control.png", "Access Control System"),
    variants: [
      {
        code: "DS-K1T341AMF",
        name: "Hikvision Value Series Face & Fingerprint Terminal",
        brand: "Hikvision",
        categoryTag: "Access Control • Hikvision",
        badge: "Hikvision Biometric",
        image: "/images/products/cctv/access-control.png",
        description: "Terminal akses kontrol biometrik dengan layar sentuh 4.3 inci, kamera ganda 2 MP, pembaca sidik jari, dan kartu Mifare.",
        features: [
          "Kapasitas 1.500 wajah, 1.500 sidik jari, dan 1.500 kartu",
          "Waktu pengenalan wajah kilat < 0.2 detik per orang",
          "Anti-spoofing wajah mencegah kecurangan foto/video",
          "Mendukung koneksi TCP/IP, Wi-Fi, dan ISAPI",
        ],
        officialUrl: "https://www.hikvision.com/en/products/Access-Control-Products/Face-Recognition-Terminals/Value-Series/ds-k1t341amf/",
      },
      {
        code: "ASI7213X-T1",
        name: "Dahua Thermal & Face Recognition Access Terminal",
        brand: "Dahua",
        categoryTag: "Access Control • Dahua",
        badge: "Dahua Biometric",
        image: "/images/products/cctv/access-control.png",
        description: "Terminal akses mandiri dengan layar 7 inci IPS, pengenalan wajah AI jarak jauh 0.3 - 2.0 meter, dan akurasi 99.5%.",
        features: [
          "Kapasitas 100.000 wajah, 100.000 kartu, dan 100.000 password",
          "Kamera ganda 2 MP WDR dengan sensor inframerah",
          "Mendukung interkom audio dua arah dan protokol ONVIF",
          "Enclosure tahan air IP65 untuk pos gerbang luar",
        ],
        officialUrl: "https://www.dahuasecurity.com/products/All-Products/Access-Control/Stand-alone-Terminals/Face-Recognition-Terminals/ASI7213X-T1",
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
        code: "DS-D5032FC-A",
        name: 'Hikvision 32" FHD Industrial Surveillance Monitor',
        brand: "Hikvision",
        categoryTag: "Display • Hikvision",
        badge: "Hikvision 24/7",
        image: "/images/products/cctv/monitoring-system.png",
        description: 'Monitor profesional 32 inci dirancang khusus untuk operasi 24 jam nonstop tanpa degradasi warna di ruang kontrol.',
        features: [
          'Panel LED Backlight 31.5" Full HD (1920 × 1080)',
          "Sudut pandang lebar 178°/178° dengan pemrosesan 3D comb filter",
          "Input lengkap: HDMI, VGA, BNC In, BNC Out, Audio",
          "Komponen industrial grade dengan MTBF > 50.000 jam",
        ],
        officialUrl: "https://www.hikvision.com/en/products/Display-and-Control/Monitors/Commercial-Displays/ds-d5032fc-a/",
      },
      {
        code: "DHL32-F600",
        name: 'Dahua 32" FHD Commercial Surveillance Monitor',
        brand: "Dahua",
        categoryTag: "Display • Dahua",
        badge: "Dahua 24/7",
        image: "/images/products/cctv/monitoring-system.png",
        description: 'Monitor pengawasan komersial 32 inci dengan bezel tipis, reduksi noise digital, dan konsumsi daya hemat untuk ruang sekuriti.',
        features: [
          'Resolusi Full HD 1920 × 1080 dengan kontras tinggi 1200:1',
          "Desain termal profesional untuk pemakaian terus-menerus 24/7",
          "Speaker internal terpasang dan input HDMI/VGA",
          "Bodi logam kokoh dengan mounting standar VESA",
        ],
        officialUrl: "https://www.dahuasecurity.com/products/All-Products/Display--Control/Monitors/Surveillance-Monitors/DHL32-F600",
      },
    ],
  },

  // ==================== 3. ELECTRICAL & INDUSTRIAL (Non-Branded / Engineering Standards) ====================
  {
    name: "UPS & Battery Backup",
    category: "electrical",
    categoryLabel: "Electrical & Industrial",
    description: "Sistem proteksi daya darurat (Uninterruptible Power Supply) untuk server, sistem SCADA, radio komunikasi, dan instrumen tambang kritis.",
    highlights: ["Online Double Conversion (Zero Transfer Time)", "Pure Sine Wave Output (Daya Bersih)", "Pilihan 1 kVA hingga 40 kVA 3-Phase", "Dukungan Hot-Swappable Battery & SNMP Card"],
    standards: ["IEC 62040 UPS Standards", "CE / RoHS Compliant"],
    images: representativeVisual("electrical", "ups-battery-backup.png", "UPS & Battery Backup"),
  },
  {
    name: "Lampu Tambang LED",
    category: "electrical",
    categoryLabel: "Electrical & Industrial",
    description: "Pencahayaan LED hemat energi dan tahan getaran untuk area kerja, jalan tambang, workshop alat berat, dan fasilitas site.",
    highlights: ["High Lumen Output 130 - 150 lm/W", "Proteksi IP66 & IK08 Tahan Getaran", "Die-Cast Aluminium Housing", "Surge Protection 10kV / 15kV"],
    standards: ["IEC 60598 Luminaire Standards", "IP66 / IK08", "CE / SNI"],
    images: representativeVisual("electrical", "mining-led.png", "Lampu Tambang LED"),
  },
  {
    name: "Flood Light",
    category: "electrical",
    categoryLabel: "Electrical & Industrial",
    description: "Lampu sorot berkekuatan tinggi untuk pencahayaan area luas seperti stockpile batubara, pelabuhan jetty, lapangan penumpukan, dan perimeter site.",
    highlights: ["Pilihan 400W hingga 1000W / 1200W", "Lensa Optik Asimetris & Simetris", "Daya Sorot Jarak Jauh >200 Meter", "IP66 Housing Aluminium Anti-Karat"],
    standards: ["High Mast Area Lighting", "IP66 / IK09 Heavy Duty"],
    images: representativeVisual("electrical", "flood-light.png", "Flood Light"),
  },
  {
    name: "Explosion Proof Lighting",
    category: "electrical",
    categoryLabel: "Electrical & Industrial",
    description: "Pencahayaan khusus untuk area berbahaya (hazardous area) berisiko gas dan debu mudah terbakar dengan sertifikasi ATEX dan IECEx.",
    highlights: ["Sertifikasi Internasional ATEX & IECEx", "Zone 1, Zone 2 (Gas) & Zone 21, Zone 22 (Dust)", "Rating Proteksi Ex d IIC T6 Gb / Ex tb IIIC T80°C", "Kaca Tempered Tahan Benturan & IP66"],
    standards: ["ATEX Directive 2014/34/EU", "IECEx Certified", "Ex d IIC T6", "IP66"],
    images: representativeVisual("electrical", "explosion-proof.png", "Explosion Proof Lighting"),
  },
  {
    name: "Panel & Aksesoris Electrical",
    category: "electrical",
    categoryLabel: "Electrical & Industrial",
    description: "Panel distribusi daya listrik industri (MDB, LDB, MCC) dan aksesoris kelistrikan berstandar tinggi untuk kontrol proteksi mesin dan fasilitas site.",
    highlights: ["Main Distribution Panel (MDB) & Sub Distribution Panel (SDP)", "Komponen Breaker Standard Industri", "Enclosure Plat 2.0mm Powder Coated IP55/IP65", "Gland Kabel Ex-Proof & Aksesoris Terminasi"],
    standards: ["IEC 61439 Low-Voltage Switchgear", "IP55 / IP65 Enclosure", "PUIL 2020"],
    images: representativeVisual("electrical", "panel-electrical.png", "Panel & Aksesoris Electrical"),
  },
  {
    name: "Networking Equipment",
    category: "electrical",
    categoryLabel: "Electrical & Industrial",
    description: "Perangkat jaringan komunikasi data industri tahan temperatur ekstrem untuk menghubungkan sistem CCTV, telemetri SCADA, dan radio di site.",
    highlights: ["Industrial DIN-Rail Ethernet Switches", "Fiber Optic Industrial Transceivers", "Outdoor Long-Range Wireless Bridge 5GHz", "Suhu Operasi Ekstrem -40°C hingga +75°C"],
    standards: ["IEEE 802.3 Ethernet Standards", "IEC 61850-3 Substation", "IP30 / IP67"],
    images: representativeVisual("electrical", "networking-equipment.png", "Networking Equipment"),
  },

  // ==================== 4. FASTENERS & HARDWARE (Non-Branded / Engineering Standards) ====================
  {
    name: "Hex Bolt",
    category: "fasteners",
    categoryLabel: "Fasteners & Hardware",
    description: "Baut kepala segi enam berkekuatan tarik tinggi untuk konstruksi baja, perakitan mesin tambang, alat berat, dan pemeliharaan industri.",
    highlights: ["Standar DIN 931 (Setengah Ulir) & DIN 933 (Ulir Penuh)", "Grade Kekuatan 8.8, 10.9, dan 12.9", "Diameter Metrik M6 hingga M64+", "Finishing Black Oxide, Zinc Plated, Hot-Dip Galvanized"],
    standards: ["DIN 931 / DIN 933", "ISO 4014 / ISO 4017", "Grade 8.8 / 10.9 / 12.9"],
    images: representativeVisual("fasteners", "hex-bolt.png", "Hex Bolt"),
  },
  {
    name: "Anchor Bolt",
    category: "fasteners",
    categoryLabel: "Fasteners & Hardware",
    description: "Baut angkur fondasi berkekuatan tinggi untuk mengikat struktur kolom baja gedung, rangka conveyor tambang, dan fondasi mesin bergetar ke beton bertulang.",
    highlights: ["Standar ASTM F1554 (Grade 36, Grade 55, Grade 105)", "Bentuk L-Type, J-Type, dan Straight Anchor with Plate", 'Diameter M12 hingga M64 (1/2" s/d 2-1/2")', "Finishing Hot-Dip Galvanized (ASTM A153) & Plain"],
    standards: ["ASTM F1554 Grade 36/55/105", "ASTM A153 Galvanizing"],
    images: representativeVisual("fasteners", "anchor-bolt.png", "Anchor Bolt"),
  },
  {
    name: "Stud Bolt",
    category: "fasteners",
    categoryLabel: "Fasteners & Hardware",
    description: "Batang berulir penuh (all-thread stud) berstandar ASTM A193 B7 dipadukan dengan 2 mur ASTM A194 2H untuk sambungan flange pipa bertekanan tinggi.",
    highlights: ["Standar ASTM A193 Grade B7 & ASTM A194 Grade 2H", "Aplikasi Flange Tekanan Tinggi ASME B16.5", 'Ukuran 1/2" hingga 3-1/2" (UNC / 8-UN Thread)', "Pilihan Coating PTFE / Xylan 1424, Hot-Dip Galvanized, Cadmium"],
    standards: ["ASTM A193 Grade B7", "ASTM A194 Grade 2H", "ASME B16.5 / B18.2.2"],
    images: representativeVisual("fasteners", "stud-bolt.png", "Stud Bolt"),
  },
  {
    name: "Stainless Fastener",
    category: "fasteners",
    categoryLabel: "Fasteners & Hardware",
    description: "Baut, mur, dan sekrup berbahan baja tahan karat (Stainless Steel 304 & 316) untuk lingkungan korosif tinggi, area pengolahan kimia, dan pesisir.",
    highlights: ["Material AISI 304 (A2-70) & AISI 316 (A4-80)", "Tahan Korosi Asam Tambang & Air Laut", "Baut Hexagon, Baut L (Socket Cap), dan Threaded Rod", "Standar DIN 933, DIN 912, DIN 934, DIN 125"],
    standards: ["ISO 3506-1 (A2-70 / A4-80)", "AISI 304 / 316", "DIN 933 / DIN 912"],
    images: representativeVisual("fasteners", "stainless-fastener.png", "Stainless Fastener"),
  },
  {
    name: "Nut & Washer",
    category: "fasteners",
    categoryLabel: "Fasteners & Hardware",
    description: "Mur segi enam standar dan tebal (Heavy Hex), ring plat baja keras (Hardened Washer), serta ring pengunci anti-getar untuk sambungan struktural.",
    highlights: ["Heavy Hex Nut ASTM A194 Grade 2H & DIN 934 Grade 8/10", "Structural Hardened Flat Washer ASTM F436 & DIN 6916", "Nord-Lock Wedge Locking Washers (Anti-Vibration)", "Spring Washer DIN 127B & Disc Springs DIN 2093"],
    standards: ["ASTM A194 / DIN 934", "ASTM F436 / DIN 6916", "Nord-Lock Wedge System"],
    images: representativeVisual("fasteners", "nut-washer.png", "Nut & Washer"),
  },
  {
    name: "High Tensile Bolt",
    category: "fasteners",
    categoryLabel: "Fasteners & Hardware",
    description: "Baut struktural berkekuatan tarik tinggi untuk sambungan rangka jembatan, tower transmisi, struktur pabrik baja, dan konstruksi alat tambang.",
    highlights: ["Standar ASTM A325 & ASTM A490 Heavy Hex Structural Bolts", "Standar DIN 6914 / EN 14399 High-Strength Structural Bolting (HV)", "Kekuatan Tarik hingga 150 ksi (1035 MPa)", "Sertifikasi Pengujian Lengkap (Mill Test Certificate)"],
    standards: ["ASTM A325 / ASTM A490", "DIN 6914 / EN 14399-4", "AISC Structural Bolting"],
    images: representativeVisual("fasteners", "high-tensile-bolt.png", "High Tensile Bolt"),
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
