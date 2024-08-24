"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutAdminPage() {
  const router = useRouter();

  const logout = async () => {
    const res = await fetch("/api/admin/logout");
    if (res.ok) {
      window.location.href = "/admin";
    }
  };

  useEffect(() => {
    logout();
  }, [router]);

  return null;
}
