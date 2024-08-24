import { auth } from "@/auth";
import { PERMISSIONS } from "@/interfaces";
import { hasPermission } from "@/lib/hasPermission";
import React from "react";

export default async function DashboardPage() {
  const permission = await hasPermission([PERMISSIONS.DASHBOARD_VIEW]);

  if (!permission) {
    return <div>Unauthorized</div>;
  }

  return <div>Dashboard</div>;
}
