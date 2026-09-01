export const company = {
  legalName: "CV Agape Sinar Nirwana",
  shortName: "ASN",
  tagline: "General Supplier & Mining Support Solutions",
  description:
    "Mitra pengadaan kebutuhan industri, pertambangan, konstruksi, dan infrastruktur dari Balikpapan, Kalimantan Timur.",
  email: "agapesinarnirwana@gmail.com",
  phoneDisplay: "+62 851-9094-6049",
  phoneInternational: "6285190946049",
  location: "Balikpapan, Kalimantan Timur",
  address: "Jl. Taruna Sari RT 63 No 17, Gunung Sari Ilir 76121, Balikpapan, Kalimantan Timur",
  addressStreet: "Jl. Taruna Sari RT 63 No 17",
  addressSubdistrict: "Gunung Sari Ilir 76121",
  addressCity: "Balikpapan, Kalimantan Timur",
  businessHours: "Senin–Jumat, 08.00–17.00 WITA",
} as const;

export const navigation = [
  { href: "/", label: "Beranda" },
  { href: "/solutions", label: "Solusi" },
  { href: "/products", label: "Produk" },
  { href: "/about", label: "Tentang Kami" },
  { href: "/contact", label: "Kontak" },
] as const;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${company.phoneInternational}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function emailUrl(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${company.email}${query ? `?${query}` : ""}`;
}
