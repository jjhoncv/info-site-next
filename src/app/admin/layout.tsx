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
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar user={user} />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
