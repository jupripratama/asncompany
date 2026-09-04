"use client";

import { useEffect, useState } from "react";
import { company as initialCompany } from "@/lib/company";
import { products as initialProducts, type Product } from "@/lib/products";

export type AdminHeroSettings = {
  homeHeroImage: string;
  productHeroImage: string;
  homeTitle: string;
  homeSubtitle: string;
};

export type AdminServiceItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  items: { name: string; detail: string }[];
  cta: string;
};

export type AdminAboutSettings = {
  tagline: string;
  profileP1: string;
  profileP2: string;
  visionTitle: string;
  visionText: string;
  missions: { number: string; title: string; description: string }[];
  pillars: { title: string; description: string }[];
  promises: { label: string; description: string }[];
};

export type AdminRfq = {
  id: string;
  requesterName: string;
  companyName: string;
  email: string;
  phone: string;
  category: string;
  items: string;
  createdAt: string;
  status: "new" | "reviewing" | "quoted" | "closed";
  notes?: string;
};

export type CompanySettings = {
  legalName: string;
  shortName: string;
  tagline: string;
  description: string;
  email: string;
  phoneDisplay: string;
  phoneInternational: string;
  location: string;
  address: string;
  addressStreet: string;
  addressSubdistrict: string;
  addressCity: string;
  businessHours: string;
};

export type AdminDataStore = {
  hero: AdminHeroSettings;
  products: Product[];
  services: AdminServiceItem[];
  company: CompanySettings;
  about: AdminAboutSettings;
  rfqs: AdminRfq[];
};

const defaultServices: AdminServiceItem[] = [
  {
    id: "mining",
    title: "Mining Tools & Drilling",
    subtitle: "Peralatan pemboran batuan keras",
    image: "/images/services/mining-tools.png",
    description: "Pengadaan perlengkapan pengeboran untuk tambang, quarry, tunneling, eksplorasi, dan konstruksi berat dengan spesifikasi yang disesuaikan terhadap rig serta kondisi lapangan.",
    items: [
      { name: "Drill Bit", detail: "Button bit, retrac bit, dan cross bit untuk penetrasi batuan." },
      { name: "Drill Rod", detail: "MF rod, speed rod, serta extension rod dalam berbagai ukuran." },
      { name: "Shank & Coupling", detail: "Shank adapter dan coupling sleeve untuk transmisi energi optimal." },
      { name: "DTH & Reaming", detail: "DTH hammer, reaming tools, dan aksesori drilling equipment." },
    ],
    cta: "Minta penawaran Mining Tools",
  },
  {
    id: "cctv",
    title: "CCTV & Security Systems",
    subtitle: "Sistem keamanan industri multi-brand",
    image: "/images/services/cctv-security.png",
    description: "Penyediaan perangkat keamanan untuk kantor, gudang, workshop, fasilitas produksi, dan area operasional dengan pilihan sistem yang dapat diintegrasikan.",
    items: [
      { name: "CCTV Multi-Brand", detail: "Hikvision, Dahua, Uniview, Axis, dan Honeywell." },
      { name: "NVR & DVR", detail: "Perekaman terpusat dengan pilihan channel dan kapasitas penyimpanan." },
      { name: "Access Control", detail: "Reader, controller, credential, dan pengelolaan akses fasilitas." },
      { name: "Monitoring System", detail: "Pemantauan lokal maupun jarak jauh untuk area operasional." },
    ],
    cta: "Minta penawaran CCTV & Security",
  },
  {
    id: "electrical",
    title: "Electrical & Industrial",
    subtitle: "Power backup, lighting, dan networking",
    image: "/images/services/electrical-industrial.png",
    description: "Perangkat daya, pencahayaan, panel, dan konektivitas untuk membantu menjaga keselamatan serta kontinuitas operasional fasilitas industri.",
    items: [
      { name: "UPS & Battery Backup", detail: "Pilihan kapasitas dan runtime untuk perangkat kritis." },
      { name: "Industrial Lighting", detail: "Lampu tambang LED, flood light, dan explosion-proof lighting." },
      { name: "Panel Electrical", detail: "Panel distribusi, enclosure, proteksi, dan aksesori pendukung." },
      { name: "Networking Equipment", detail: "Switch, router, wireless, dan pilihan jaringan industri." },
    ],
    cta: "Minta penawaran Electrical",
  },
  {
    id: "fasteners",
    title: "Fasteners & Hardware",
    subtitle: "Baut mutu tinggi dan angkur fondasi",
    image: "/images/services/fasteners-hardware.png",
    description: "Pengadaan sambungan mekanis untuk mesin, struktur baja, perpipaan, fondasi, serta pekerjaan konstruksi dengan pilihan material dan grade yang fleksibel.",
    items: [
      { name: "Hex & High Tensile Bolt", detail: "Pilihan grade 8.8, 10.9, 12.9, ukuran, dan finishing." },
      { name: "Anchor Bolt", detail: "Tipe L dan J untuk fondasi struktur maupun mesin." },
      { name: "Stud Bolt", detail: "Pilihan spesifikasi ASTM untuk flange dan perpipaan." },
      { name: "Stainless, Nut & Washer", detail: "SUS 304/316 serta berbagai tipe mur dan washer." },
    ],
    cta: "Minta penawaran Fasteners",
  },
];

const defaultAbout: AdminAboutSettings = {
  tagline: initialCompany.tagline,
  profileP1: "CV Agape Sinar Nirwana (ASN) adalah perusahaan yang bergerak di bidang General Supplier dengan fokus pada penyediaan kebutuhan industri, pertambangan, konstruksi, dan infrastruktur. Kami menyediakan produk berkualitas dengan harga kompetitif untuk mendukung kelancaran operasional pelanggan.",
  profileP2: "Berdomisili di Balikpapan, Kalimantan Timur—sebagai pusat logistik dan gerbang pertambangan energi terkemuka Indonesia—ASN memiliki posisi strategis untuk memenuhi kebutuhan operasional tambang dan industri di Kalimantan, Sulawesi, hingga seluruh pelosok Indonesia secara cepat dan tanggap.",
  visionTitle: "Menjadi mitra pengadaan terpercaya bagi industri Indonesia.",
  visionText: "Membangun rantai pasok material dan perlengkapan teknik yang terpercaya, berintegritas, dan mendukung kemajuan sektor industri nasional.",
  missions: [
    { number: "1", title: "Menyediakan Produk Berkualitas", description: "Memastikan setiap produk dan suku cadang yang disuplai memenuhi standar teknik tinggi dan bergaransi resmi." },
    { number: "2", title: "Layanan Cepat & Profesional", description: "Merespons setiap permintaan penawaran dan kebutuhan mendesak operasional site secara cepat dan akurat." },
    { number: "3", title: "Solusi Efisien & Ekonomis", description: "Menawarkan struktur harga kompetitif yang menekan total cost of ownership tanpa kompromi kualitas." },
    { number: "4", title: "Hubungan Jangka Panjang", description: "Membangun kemitraan strategis berlandaskan transparansi, integritas, dan konsistensi pelayanan." },
  ],
  pillars: [
    { title: "Harga Kompetitif", description: "Harga langsung dari principal dan distributor resmi untuk efisiensi anggaran pengadaan belanja operasional Anda." },
    { title: "Produk Berkualitas", description: "Standar uji mutu bersertifikasi, mill sheet material, dan garansi resmi pabrikan." },
    { title: "Multi Brand Solution", description: "Keluasan memilih merek terkemuka dunia sesuai preferensi teknis dan anggaran proyek Anda." },
    { title: "Pengiriman Tepat Waktu", description: "Koordinasi logistik darat, laut, dan udara untuk memastikan material tiba tepat waktu di remote site tambang." },
    { title: "Dukungan Teknis Responsif", description: "Bantuan pencocokan part number, kalkulasi teknis, dan pemilihan alat oleh tim teknis berdedikasi." },
    { title: "Fleksibel Sesuai Kebutuhan", description: "Menyesuaikan terms pengadaan dan jadwal pengiriman bertahap (staggered delivery) sesuai kondisi lapangan." },
  ],
  promises: [
    { label: "CEPAT", description: "Respons penawaran dalam 24 jam & logistik sigap." },
    { label: "TEPAT", description: "Kesesuaian part number dan spesifikasi teknis." },
    { label: "BERNILAI TAMBAH", description: "Efisiensi total biaya dan masa pakai alat maksimal." },
  ],
};

const defaultRfqs: AdminRfq[] = [
  {
    id: "rfq-001",
    requesterName: "Budi Santoso",
    companyName: "PT Kaltim Prima Coal Project",
    email: "budi.santoso@kpc-supplier.co.id",
    phone: "081234567890",
    category: "Mining Tools",
    items: "Drill Bit T45 76mm Button Bit (24 pcs) dan MF Speed Rod T45 3.66m (10 pcs). Kebutuhan pengiriman ke site Sangatta.",
    createdAt: "2026-09-02T10:30:00Z",
    status: "new",
    notes: "Menunggu konfirmasi ketersediaan stok T45 di gudang Balikpapan.",
  },
  {
    id: "rfq-002",
    requesterName: "Irfan Kurniawan",
    companyName: "PT Berau Coal Energy",
    email: "procurement@beraucoal.com",
    phone: "081398765432",
    category: "Fasteners",
    items: "Stud Bolt ASTM A193 B7 size 3/4\" x 120mm + 2 Heavy Hex Nut A194 2H (150 sets), Hot-Dip Galvanized.",
    createdAt: "2026-09-01T14:15:00Z",
    status: "quoted",
    notes: "Penawaran harga resmi sudah dikirim via email dan WhatsApp.",
  },
  {
    id: "rfq-003",
    requesterName: "Rendra Pratama",
    companyName: "PT Petrosea Tbk Site Tabang",
    email: "rendra.p@petrosea.com",
    phone: "081122334455",
    category: "CCTV & Security",
    items: "8 unit Kamera Hikvision DS-2CD2087G2H-LIU 8MP ColorVu + 1 unit NVR 16 Channel DS-7616NXI-K2 + 2x HDD 8TB.",
    createdAt: "2026-08-30T09:00:00Z",
    status: "reviewing",
    notes: "Tim teknis sedang mencocokkan jangkauan PoE dan power supply di gardu workshop.",
  },
];

const defaultStore: AdminDataStore = {
  hero: {
    homeHeroImage: "/images/hero.jpg",
    productHeroImage: "/images/hero.jpg",
    homeTitle: "Mitra Pengadaan Terpercaya untuk Industri Indonesia",
    homeSubtitle: "Solusi pengadaan kebutuhan pertambangan dan industri dari Balikpapan, dengan pilihan produk fleksibel serta dukungan yang responsif.",
  },
  products: initialProducts,
  services: defaultServices,
  company: initialCompany,
  about: defaultAbout,
  rfqs: defaultRfqs,
};

const STORAGE_KEY = "asn-admin-cms-store-v1";

export function getAdminStore(): AdminDataStore {
  if (typeof window === "undefined") return defaultStore;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStore));
      return defaultStore;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading admin store:", err);
    return defaultStore;
  }
}

export function saveAdminStore(data: AdminDataStore) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event("asn-store-updated"));
  } catch (err) {
    console.error("Error saving admin store:", err);
  }
}

export function resetAdminStore() {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStore));
  window.dispatchEvent(new Event("asn-store-updated"));
}

export function useAdminStore() {
  const [store, setStore] = useState<AdminDataStore>(defaultStore);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setStore(getAdminStore());
    setMounted(true);

    function handleUpdate() {
      setStore(getAdminStore());
    }

    window.addEventListener("asn-store-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("asn-store-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  function updateProduct(updated: Product) {
    const nextProducts = store.products.map((p) => (p.slug === updated.slug ? updated : p));
    const nextStore = { ...store, products: nextProducts };
    saveAdminStore(nextStore);
  }

  function addProduct(newProduct: Product) {
    const nextProducts = [newProduct, ...store.products];
    const nextStore = { ...store, products: nextProducts };
    saveAdminStore(nextStore);
  }

  function deleteProduct(slug: string) {
    const nextProducts = store.products.filter((p) => p.slug !== slug);
    const nextStore = { ...store, products: nextProducts };
    saveAdminStore(nextStore);
  }

  function updateHero(hero: Partial<AdminHeroSettings>) {
    const nextStore = { ...store, hero: { ...store.hero, ...hero } };
    saveAdminStore(nextStore);
  }

  function updateService(updated: AdminServiceItem) {
    const nextServices = store.services.map((s) => (s.id === updated.id ? updated : s));
    const nextStore = { ...store, services: nextServices };
    saveAdminStore(nextStore);
  }

  function updateAbout(about: Partial<AdminAboutSettings>) {
    const nextStore = { ...store, about: { ...store.about, ...about } };
    saveAdminStore(nextStore);
  }

  function updateCompany(companyData: Partial<CompanySettings>) {
    const nextStore = { ...store, company: { ...store.company, ...companyData } };
    saveAdminStore(nextStore);
  }

  function updateRfqStatus(id: string, status: AdminRfq["status"], notes?: string) {
    const nextRfqs = store.rfqs.map((rfq) => (rfq.id === id ? { ...rfq, status, ...(notes !== undefined ? { notes } : {}) } : rfq));
    const nextStore = { ...store, rfqs: nextRfqs };
    saveAdminStore(nextStore);
  }

  function addRfq(newRfq: Omit<AdminRfq, "id" | "createdAt">) {
    const rfq: AdminRfq = {
      ...newRfq,
      id: `rfq-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const nextStore = { ...store, rfqs: [rfq, ...store.rfqs] };
    saveAdminStore(nextStore);
  }

  return {
    store,
    mounted,
    updateProduct,
    addProduct,
    deleteProduct,
    updateHero,
    updateService,
    updateAbout,
    updateCompany,
    updateRfqStatus,
    addRfq,
    resetToDefault: resetAdminStore,
  };
}
