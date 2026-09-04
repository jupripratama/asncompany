import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { AdminDataStore, AdminRfq, AdminServiceItem, CompanySettings } from "./admin-store";
import type { Product } from "./products";

function cleanUrl(url?: string): string {
  if (!url) return "";
  let cleaned = url.trim();
  cleaned = cleaned.replace(/\/rest\/v1\/?$/, "");
  cleaned = cleaned.replace(/\/+$/, "");
  return cleaned;
}

// Check environment variables first, then check localStorage if set via admin settings
export function getSupabaseCredentials() {
  const envUrl = cleanUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (envUrl && envKey && !envUrl.includes("your-project") && envUrl.startsWith("http")) {
    return { url: envUrl, key: envKey, source: "env" as const };
  }

  if (typeof window !== "undefined") {
    try {
      const storedUrl = cleanUrl(localStorage.getItem("asn-supabase-url") || "");
      const storedKey = localStorage.getItem("asn-supabase-anon-key")?.trim();
      if (storedUrl && storedKey && storedUrl.startsWith("http")) {
        return { url: storedUrl, key: storedKey, source: "storage" as const };
      }
    } catch (_) {}
  }

  return { url: "", key: "", source: "none" as const };
}


let cachedClient: SupabaseClient | null = null;
let cachedKey = "";

export function getSupabaseClient(): SupabaseClient | null {
  const { url, key } = getSupabaseCredentials();
  if (url && key) {
    const combined = `${url}::${key}`;
    if (cachedClient && cachedKey === combined) {
      return cachedClient;
    }
    try {
      cachedClient = createClient(url, key, {
        auth: { persistSession: false },
      });
      cachedKey = combined;
      return cachedClient;
    } catch (err) {
      console.error("Failed to initialize Supabase client:", err);
      return null;
    }
  }
  return null;
}

export function isSupabaseConnected(): boolean {
  const { url, key } = getSupabaseCredentials();
  return Boolean(url && key && url.startsWith("http"));
}

export function getSupabaseSource(): "env" | "storage" | "none" {
  return getSupabaseCredentials().source;
}

export function saveSupabaseConfig(url: string, anonKey: string) {
  if (typeof window === "undefined") return;
  const cleaned = cleanUrl(url);
  localStorage.setItem("asn-supabase-url", cleaned);
  localStorage.setItem("asn-supabase-anon-key", anonKey.trim());
  cachedClient = null;
  cachedKey = "";
  window.dispatchEvent(new Event("asn-supabase-config-updated"));
}

export function clearSupabaseConfig() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("asn-supabase-url");
  localStorage.removeItem("asn-supabase-anon-key");
  cachedClient = null;
  cachedKey = "";
  window.dispatchEvent(new Event("asn-supabase-config-updated"));
}

export async function testSupabaseConnection(): Promise<{
  success: boolean;
  message: string;
  tableExists?: boolean;
}> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      success: false,
      message: "Kredensial Supabase URL / Anon Key belum diisi atau format tidak valid.",
    };
  }

  try {
    const { data, error } = await supabase.from("products").select("slug").limit(1);
    if (error) {
      // Check if table missing
      if (error.code === "42P01" || error.message.includes("does not exist") || error.message.includes("relation")) {
        return {
          success: true,
          tableExists: false,
          message: "Koneksi ke Supabase berhasil! Namun tabel 'products' belum ada. Silakan jalankan skrip SQL di menu SQL Editor Supabase.",
        };
      }
      return {
        success: false,
        message: `Terhubung ke server Supabase, tetapi query gagal: ${error.message}`,
      };
    }

    return {
      success: true,
      tableExists: true,
      message: "Koneksi Supabase aktif dan tabel 'products' siap digunakan!",
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Gagal terhubung ke Supabase: ${err?.message || "Kesalahan jaringan"}`,
    };
  }
}

/**
 * Upload entire local store data to Supabase PostgreSQL database tables
 */
export async function syncStoreToSupabase(store: AdminDataStore): Promise<{
  success: boolean;
  message: string;
  count?: number;
}> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { success: false, message: "Koneksi Supabase belum disetel." };
  }

  try {
    // 1. Sync Products
    const productRows = store.products.map((p) => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      category_label: p.categoryLabel,
      description: p.description,
      highlights: p.highlights || [],
      standards: p.standards || [],
      brands: p.brands || [],
      images: p.images || [],
      variants: p.variants || [],
      updated_at: new Date().toISOString(),
    }));

    const { error: prodError } = await supabase
      .from("products")
      .upsert(productRows, { onConflict: "slug" });

    if (prodError) throw new Error(`Gagal menyimpan produk: ${prodError.message}`);

    // 2. Sync Services
    if (store.services && store.services.length > 0) {
      const serviceRows = store.services.map((s) => ({
        id: s.id,
        title: s.title,
        subtitle: s.subtitle,
        description: s.description,
        image_url: s.image,
        items: s.items || [],
        cta: s.cta,
        updated_at: new Date().toISOString(),
      }));

      const { error: srvError } = await supabase
        .from("services")
        .upsert(serviceRows, { onConflict: "id" });

      if (srvError) console.warn("Sync services warning:", srvError.message);
    }

    // 3. Sync Company Settings & Hero
    if (store.company) {
      const companyRow = {
        id: "main",
        legal_name: store.company.legalName,
        short_name: store.company.shortName,
        tagline: store.company.tagline,
        phone: store.company.phoneDisplay,
        email: store.company.email,
        address_street: store.company.addressStreet,
        address_subdistrict: store.company.addressSubdistrict,
        address_city: store.company.addressCity,
        hero_image: store.hero?.homeHeroImage || "/images/hero.jpg",
        updated_at: new Date().toISOString(),
      };

      const { error: compError } = await supabase
        .from("company_settings")
        .upsert(companyRow, { onConflict: "id" });

      if (compError) console.warn("Sync company warning:", compError.message);
    }

    return {
      success: true,
      message: `Berhasil menyinkronkan ${store.products.length} produk dan data layanan ke Supabase Cloud!`,
      count: store.products.length,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Gagal sinkronisasi data ke Supabase",
    };
  }
}

/**
 * Fetch latest products and data from Supabase
 */
export async function fetchStoreFromSupabase(): Promise<Partial<AdminDataStore> | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data: prodData, error: prodErr } = await supabase
      .from("products")
      .select("*");

    if (prodErr || !prodData || prodData.length === 0) {
      return null;
    }

    const fetchedProducts: Product[] = prodData.map((row: any) => ({
      slug: row.slug,
      name: row.name,
      category: row.category,
      categoryLabel: row.category_label || row.categoryLabel,
      description: row.description,
      highlights: Array.isArray(row.highlights) ? row.highlights : [],
      standards: Array.isArray(row.standards) ? row.standards : [],
      brands: Array.isArray(row.brands) ? row.brands : [],
      images: Array.isArray(row.images) ? row.images : [],
      variants: Array.isArray(row.variants) ? row.variants : [],
    }));

    return { products: fetchedProducts };
  } catch (err) {
    console.error("fetchStoreFromSupabase error:", err);
    return null;
  }
}

/**
 * Upsert a single product to Supabase
 */
export async function upsertProductToSupabase(product: Product) {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  try {
    await supabase.from("products").upsert(
      {
        slug: product.slug,
        name: product.name,
        category: product.category,
        category_label: product.categoryLabel,
        description: product.description,
        highlights: product.highlights || [],
        standards: product.standards || [],
        brands: product.brands || [],
        images: product.images || [],
        variants: product.variants || [],
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    );
  } catch (err) {
    console.error("upsertProductToSupabase error:", err);
  }
}

/**
 * Delete a product from Supabase
 */
export async function deleteProductFromSupabase(slug: string) {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  try {
    await supabase.from("products").delete().eq("slug", slug);
  } catch (err) {
    console.error("deleteProductFromSupabase error:", err);
  }
}

/**
 * Save an RFQ to Supabase table rfqs
 */
export async function insertRfqToSupabase(rfq: {
  requesterName: string;
  companyName: string;
  email: string;
  phone: string;
  category: string;
  items: string;
}) {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  try {
    await supabase.from("rfqs").insert({
      requester_name: rfq.requesterName,
      company_name: rfq.companyName,
      email: rfq.email,
      phone: rfq.phone,
      category: rfq.category,
      items: rfq.items,
      status: "new",
      source: "website",
    });
  } catch (err) {
    console.error("insertRfqToSupabase error:", err);
  }
}
