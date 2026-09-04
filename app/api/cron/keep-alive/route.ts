import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/rest\/v1\/?$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !key) {
    return NextResponse.json(
      {
        status: "unconfigured",
        message: "Supabase credentials are not set in environment variables.",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  }

  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    // Execute a lightweight query to generate database activity and keep Supabase project active
    const { data, error } = await supabase.from("products").select("slug").limit(1);

    return NextResponse.json({
      status: "active",
      keepAliveSuccess: !error,
      target: url,
      dataFound: Boolean(data && data.length > 0),
      timestamp: new Date().toISOString(),
      message: error
        ? "Ping reached Supabase (resetting inactivity timer): " + error.message
        : "Supabase keep-alive ping successful. Server activity refreshed.",
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "error",
        message: err?.message || "Keep-alive ping encountered an error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
