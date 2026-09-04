import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { ProductDetailView } from "@/components/product-detail-view";
import { getProductBySlug, products, type Product } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

const DEFAULT_SUPABASE_URL = "https://iomqeielniuwzretbagt.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvbXFlaWVsbml1d3pyZXRiYWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MTY5NzYsImV4cCI6MjEwNDA5Mjk3Nn0.Qfktjv7UPfR7BXdw2ckLpv9Te5dDOAS3CAqLh7dY81I";

async function getProduct(slug: string): Promise<Product | null> {
  const local = getProductBySlug(slug);
  if (local) return local;

  try {
    const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL).trim().replace(/\/rest\/v1\/?$/, "");
    const key = (
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      DEFAULT_SUPABASE_ANON_KEY
    ).trim();
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
    if (!error && data) {
      return {
        slug: data.slug,
        name: data.name,
        category: data.category,
        categoryLabel: data.category_label || data.categoryLabel,
        description: data.description,
        highlights: Array.isArray(data.highlights) ? data.highlights : [],
        standards: Array.isArray(data.standards) ? data.standards : [],
        brands: Array.isArray(data.brands) ? data.brands : [],
        images: Array.isArray(data.images) ? data.images : [],
        variants: Array.isArray(data.variants) ? data.variants : [],
      };
    }
  } catch (err) {
    console.error("Error fetching product from cloud Supabase:", err);
  }
  return null;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Produk tidak ditemukan" };

  return {
    title: `${product.name} | Produk ASN`,
    description: `${product.description} Pilihan model dan spesifikasi yang dapat diadakan oleh ASN sesuai kebutuhan proyek.`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return <ProductDetailView product={product} />;
}
