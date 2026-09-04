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
    const { data, error } = await supabase
      .from("rfqs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, message: error.message, rfqs: [] }, { status: 200 });
    }

    const rfqs = (data || []).map((row: any) => ({
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

    return NextResponse.json({ success: true, rfqs });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message, rfqs: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = getServerSupabase();

    const insertPayload = {
      requester_name: body.requesterName || "Tamu",
      company_name: body.companyName || "-",
      email: body.email || "-",
      phone: body.phone || "-",
      category: body.category || "General",
      items: body.items || "Permintaan informasi",
      status: body.status || "new",
      source: "website",
    };

    const { data, error } = await supabase
      .from("rfqs")
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      console.error("API /api/rfq insert error:", error);
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, rfq: data });
  } catch (err: any) {
    console.error("API /api/rfq POST error:", err);
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, notes } = body;
    if (!id) {
      return NextResponse.json({ success: false, message: "ID diperlukan" }, { status: 400 });
    }

    const supabase = getServerSupabase();
    const updatePayload: Record<string, any> = { updated_at: new Date().toISOString() };
    if (status) updatePayload.status = status;
    if (notes !== undefined) updatePayload.internal_notes = notes;

    const { error } = await supabase.from("rfqs").update(updatePayload).eq("id", id);
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "ID diperlukan" }, { status: 400 });
    }

    const supabase = getServerSupabase();
    const { error } = await supabase.from("rfqs").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}