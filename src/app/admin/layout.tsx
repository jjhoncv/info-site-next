// src/app/admin/layout.tsx
import { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth";
import AdminSidebar from "@/app/components/AdminSidebar";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  // const user = await getCurrentUser();

  // if (!user) {
  //   redirect("/admin/login");
  // }

  return children;
}
