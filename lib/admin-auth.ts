"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "./supabase";

export type AdminUser = {
  email: string;
  role: "admin" | "editor";
  loggedInAt: string;
};

const AUTH_STORAGE_KEY = "asn_admin_session_v1";
const COOKIE_NAME = "asn_admin_token";

export function getAdminSession(): AdminUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

export function setAdminSession(user: AdminUser) {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  // Set cookie for 7 days
  const maxAge = 60 * 60 * 24 * 7;
  document.cookie = COOKIE_NAME + "=true; path=/; max-age=" + maxAge + "; SameSite=Lax";
  window.dispatchEvent(new Event("asn-auth-changed"));
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
  document.cookie = COOKIE_NAME + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
  window.dispatchEvent(new Event("asn-auth-changed"));
}

export async function loginAdminCredentials(
  identifier: string,
  secret: string
): Promise<{ success: boolean; error?: string; user?: AdminUser }> {
  const cleanId = identifier.trim().toLowerCase();
  const cleanSecret = secret.trim();

  if (!cleanId || !cleanSecret) {
    return { success: false, error: "Harap isi username/email dan kata sandi." };
  }

  // 1. Try Supabase Auth if connected
  const supabase = getSupabaseClient();
  if (supabase && cleanId.includes("@")) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanId,
        password: cleanSecret,
      });

      if (!error && data?.user) {
        const user: AdminUser = {
          email: data.user.email || cleanId,
          role: "admin",
          loggedInAt: new Date().toISOString(),
        };
        setAdminSession(user);
        return { success: true, user };
      }
    } catch (_) {
      // Fallback to credential check below
    }
  }

  // 2. Direct Admin Password check (primary password: adminadmin)
  const envPass = process.env.ADMIN_PASSWORD?.trim();
  const allowedPasswords = [
    "adminadmin",
    "@ANIMEINDO0",
    "admin123",
    ...(envPass ? [envPass] : []),
  ];
  const allowedUsers = [
    "admin",
    "admin@asn.co.id",
    "agapesinarnirwana@gmail.com",
    "jupripratama",
  ];

  const isValidUser =
    allowedUsers.some((u) => u === cleanId) ||
    cleanId.includes("admin") ||
    cleanId.includes("asn");
  const isValidPass =
    allowedPasswords.includes(cleanSecret) ||
    cleanSecret === "adminadmin" ||
    cleanSecret === "@ANIMEINDO0";

  if (isValidUser && isValidPass) {
    const user: AdminUser = {
      email: cleanId.includes("@") ? cleanId : "admin@asn.co.id",
      role: "admin",
      loggedInAt: new Date().toISOString(),
    };
    setAdminSession(user);
    return { success: true, user };
  }

  return {
    success: false,
    error: "Username atau kata sandi tidak cocok. Gunakan kata sandi admin: adminadmin",
  };
}

export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(() => getAdminSession());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUser(getAdminSession());

    function handleAuthChange() {
      setUser(getAdminSession());
    }

    window.addEventListener("asn-auth-changed", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    return () => {
      window.removeEventListener("asn-auth-changed", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  function logout() {
    clearAdminSession();
    window.location.href = "/admin/login";
  }

  return {
    user,
    isAuthenticated: Boolean(user),
    isLoading: !mounted,
    logout,
  };
}
