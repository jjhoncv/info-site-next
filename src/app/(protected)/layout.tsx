import { auth } from "@/auth";
import React from "react";
import { LayoutPageAdmin } from "../components/LayoutPageAdmin";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) return null;

  return <LayoutPageAdmin user={session.user.data}>{children}</LayoutPageAdmin>;
}
