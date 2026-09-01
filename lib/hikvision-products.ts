export type HikvisionProduct = {
  model: string;
  name: string;
  category: string;
  image: string;
  description: string;
  features: string[];
  officialUrl: string;
};

export const hikvisionProducts: HikvisionProduct[] = [
  {
    model: "DS-2CD1043G2-LIU(F)",
    name: "4 MP Smart Hybrid Light Fixed Bullet Network Camera",
    category: "IP Camera • Bullet",
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
    model: "DS-2CD2387G2P-LSU/SL",
    name: "8 MP Panoramic ColorVu Fixed Turret Network Camera",
    category: "IP Camera • Panoramic Turret",
    image: "/images/brands/hikvision-products/ds-2cd2387g2p-lsu-sl.png",
    description: "Kamera turret panoramik 8 MP dengan tampilan berwarna untuk cakupan area yang lebih luas.",
    features: [
      "Resolusi panoramik 8 MP",
      "ColorVu untuk gambar berwarna 24/7",
      "130 dB WDR dan klasifikasi target",
      "IP67, lampu strobo, dan alarm audio",
    ],
    officialUrl: "https://www.hikvision.com/cis/products/IP-Products/Network-Cameras/Pro-Series-EasyIP-/ds-2cd2387g2p-lsu-sl/?subName=DS-2CD2387G2P-LSU%2FSL+%28C%29",
  },
  {
    model: "DS-2CD2087G2H-LIU",
    name: "8 MP Smart Hybrid Light with ColorVu Fixed Mini Bullet Network Camera",
    category: "IP Camera • Mini Bullet",
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
];

