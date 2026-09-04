import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const DEFAULT_SUPABASE_URL = "https://iomqeielniuwzretbagt.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvbXFlaWVsbml1d3pyZXRiYWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MTY5NzYsImV4cCI6MjEwNDA5Mjk3Nn0.Qfktjv7UPfR7BXdw2ckLpv9Te5dDOAS3CAqLh7dY81I";

function getServerSupabase() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL).trim().replace(/\/rest\/v1\/?$/, "");
  const key = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    DEFAULT_SUPABASE_ANON_KEY
  ).trim();

  return createClient(url, key, { auth: { persistSession: false } });
}

export async function GET() {
  try {
    const supabase = getServerSupabase();
    const result: Record<string, any> = {};

    // 1. Products
    const { data: prodData, error: prodErr } = await supabase.from("products").select("*");
    if (!prodErr && prodData && prodData.length > 0) {
      result.products = prodData.map((row: any) => ({
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
    }

    // 2. Services
    const { data: srvData, error: srvErr } = await supabase.from("services").select("*");
    if (!srvErr && srvData && srvData.length > 0) {
      result.services = srvData.map((row: any) => ({
        id: row.id,
        title: row.title,
        subtitle: row.subtitle,
        description: row.description,
        image: row.image_url,
        items: Array.isArray(row.items) ? row.items : [],
        cta: row.cta,
      }));
    }

    // 3. Hero
    const { data: heroData, error: heroErr } = await supabase.from("hero_settings").select("*").eq("id", "main").maybeSingle();
    if (!heroErr && heroData) {
      result.hero = {
        homeHeroImage: heroData.home_hero_image,
        productHeroImage: heroData.product_hero_image,
        homeTitle: heroData.home_title,
        homeSubtitle: heroData.home_subtitle,
      };
    }

    // 4. Company Settings
    const { data: compData, error: compErr } = await supabase.from("company_settings").select("*").eq("id", "main").maybeSingle();
    if (!compErr && compData) {
      result.company = {
        legalName: compData.legal_name,
        shortName: compData.short_name,
        tagline: compData.tagline,
        description: compData.description,
        email: compData.email,
        phoneDisplay: compData.phone_display || compData.phone,
        phoneInternational: compData.phone_international || compData.phone,
        location: compData.location || "Balikpapan, Kalimantan Timur",
        address: compData.address || `${compData.address_street}, ${compData.address_subdistrict}, ${compData.address_city}`,
        addressStreet: compData.address_street,
        addressSubdistrict: compData.address_subdistrict,
        addressCity: compData.address_city,
        businessHours: compData.business_hours || "Senin–Jumat, 08.00–17.00 WITA",
      };
    }

    // 5. About Settings
    const { data: aboutData, error: aboutErr } = await supabase.from("about_settings").select("*").eq("id", "main").maybeSingle();
    if (!aboutErr && aboutData) {
      result.about = {
        tagline: aboutData.tagline,
        profileP1: aboutData.profile_p1,
        profileP2: aboutData.profile_p2,
        visionTitle: aboutData.vision_title,
        visionText: aboutData.vision_text,
        missions: Array.isArray(aboutData.missions) ? aboutData.missions : [],
        pillars: Array.isArray(aboutData.pillars) ? aboutData.pillars : [],
        promises: Array.isArray(aboutData.promises) ? aboutData.promises : [],
      };
    }

    // 6. RFQs
    const { data: rfqData, error: rfqErr } = await supabase.from("rfqs").select("*").order("created_at", { ascending: false });
    if (!rfqErr && rfqData) {
      result.rfqs = rfqData.map((row: any) => ({
        id: row.id,
        requesterName: row.requester_name,
        companyName: row.company_name,
        email: row.email,
        phone: row.phone,
        category: row.category,
        items: row.items,
        createdAt: row.created_at,
        status: row.status,
        notes: row.internal_notes || undefined,
      }));
    }

    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    console.error("GET /api/content error:", err);
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;
    const supabase = getServerSupabase();

    switch (action) {
      case "update_hero": {
        const { error } = await supabase.from("hero_settings").upsert({
          id: "main",
          home_hero_image: payload.homeHeroImage,
          product_hero_image: payload.productHeroImage,
          home_title: payload.homeTitle,
          home_subtitle: payload.homeSubtitle,
          updated_at: new Date().toISOString(),
        });
        if (error) throw error;
        return NextResponse.json({ success: true, message: "Hero settings saved to cloud" });
      }

      case "update_product": {
        const { error } = await supabase.from("products").upsert(
          {
            slug: payload.slug,
            name: payload.name,
            category: payload.category,
            category_label: payload.categoryLabel,
            description: payload.description,
            highlights: payload.highlights || [],
            standards: payload.standards || [],
            brands: payload.brands || [],
            images: payload.images || [],
            variants: payload.variants || [],
            updated_at: new Date().toISOString(),
          },
          { onConflict: "slug" }
        );
        if (error) throw error;
        return NextResponse.json({ success: true, message: "Product saved to cloud" });
      }

      case "delete_product": {
        const { error } = await supabase.from("products").delete().eq("slug", payload.slug);
        if (error) throw error;
        return NextResponse.json({ success: true, message: "Product deleted from cloud" });
      }

      case "update_service": {
        const { error } = await supabase.from("services").upsert(
          {
            id: payload.id,
            title: payload.title,
            subtitle: payload.subtitle,
            description: payload.description,
            image_url: payload.image,
            items: payload.items || [],
            cta: payload.cta,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );
        if (error) throw error;
        return NextResponse.json({ success: true, message: "Service saved to cloud" });
      }

      case "update_company": {
        const { error } = await supabase.from("company_settings").upsert({
          id: "main",
          legal_name: payload.legalName,
          short_name: payload.shortName,
          tagline: payload.tagline,
          description: payload.description,
          email: payload.email,
          phone_display: payload.phoneDisplay,
          phone_international: payload.phoneInternational,
          location: payload.location,
          address: payload.address,
          address_street: payload.addressStreet,
          address_subdistrict: payload.addressSubdistrict,
          address_city: payload.addressCity,
          business_hours: payload.businessHours,
          updated_at: new Date().toISOString(),
        });
        if (error) throw error;
        return NextResponse.json({ success: true, message: "Company settings saved to cloud" });
      }

      case "update_about": {
        const { error } = await supabase.from("about_settings").upsert({
          id: "main",
          tagline: payload.tagline,
          profile_p1: payload.profileP1,
          profile_p2: payload.profileP2,
          vision_title: payload.visionTitle,
          vision_text: payload.visionText,
          missions: payload.missions || [],
          pillars: payload.pillars || [],
          promises: payload.promises || [],
          updated_at: new Date().toISOString(),
        });
        if (error) throw error;
        return NextResponse.json({ success: true, message: "About settings saved to cloud" });
      }

      case "sync_all": {
        // Bulk sync products
        if (Array.isArray(payload.products) && payload.products.length > 0) {
          const productRows = payload.products.map((p: any) => ({
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
          await supabase.from("products").upsert(productRows, { onConflict: "slug" });
        }

        // Bulk sync services
        if (Array.isArray(payload.services) && payload.services.length > 0) {
          const serviceRows = payload.services.map((s: any) => ({
            id: s.id,
            title: s.title,
            subtitle: s.subtitle,
            description: s.description,
            image_url: s.image,
            items: s.items || [],
            cta: s.cta,
            updated_at: new Date().toISOString(),
          }));
          await supabase.from("services").upsert(serviceRows, { onConflict: "id" });
        }

        // Hero
        if (payload.hero) {
          await supabase.from("hero_settings").upsert({
            id: "main",
            home_hero_image: payload.hero.homeHeroImage,
            product_hero_image: payload.hero.productHeroImage,
            home_title: payload.hero.homeTitle,
            home_subtitle: payload.hero.homeSubtitle,
            updated_at: new Date().toISOString(),
          });
        }

        // Company
        if (payload.company) {
          await supabase.from("company_settings").upsert({
            id: "main",
            legal_name: payload.company.legalName,
            short_name: payload.company.shortName,
            tagline: payload.company.tagline,
            description: payload.company.description,
            email: payload.company.email,
            phone_display: payload.company.phoneDisplay,
            phone_international: payload.company.phoneInternational,
            address_street: payload.company.addressStreet,
            address_subdistrict: payload.company.addressSubdistrict,
            address_city: payload.company.addressCity,
            updated_at: new Date().toISOString(),
          });
        }

        // About
        if (payload.about) {
          await supabase.from("about_settings").upsert({
            id: "main",
            tagline: payload.about.tagline,
            profile_p1: payload.about.profileP1,
            profile_p2: payload.about.profileP2,
            vision_title: payload.about.visionTitle,
            vision_text: payload.about.visionText,
            missions: payload.about.missions || [],
            pillars: payload.about.pillars || [],
            promises: payload.about.promises || [],
            updated_at: new Date().toISOString(),
          });
        }

        return NextResponse.json({ success: true, message: "Semua data berhasil disinkronkan ke Supabase Cloud!" });
      }

      default:
        return NextResponse.json({ success: false, message: `Aksi ${action} tidak dikenal` }, { status: 400 });
    }
  } catch (err: any) {
    console.error("POST /api/content error:", err);
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}