import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/lib/company";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${company.legalName} — ${company.tagline}`,
    template: `%s | ${company.shortName}`,
  },
  description: company.description,
  keywords: ["general supplier", "mining support", "Balikpapan", "Kalimantan Timur", "mining tools", "industrial supplier"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: company.legalName,
    title: `${company.legalName} — ${company.tagline}`,
    description: company.description,
  },
};

const themeScript = `
  try {
    const saved = localStorage.getItem('asn-theme');
    const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (_) {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="min-h-screen font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
