import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/lib/company";
import { LanguageProvider } from "@/lib/language-context";
import "./globals.css";

function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl && envUrl.length > 0) {
    return envUrl.startsWith("http") ? envUrl : `https://${envUrl}`;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.trim()}`;
  }
  if (process.env.VERCEL_URL?.trim()) {
    return `https://${process.env.VERCEL_URL.trim()}`;
  }
  return "https://asncompany.vercel.app";
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
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
    const dark = saved === 'dark';
    document.documentElement.classList.toggle('dark', dark);
  } catch (_) {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <LanguageProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
