// src/components/PermissionGate.tsx
import { ReactNode } from "react";
import { UserWithRole, PermissionName } from "@/interfaces";

interface PermissionGateProps {
  user: UserWithRole;
  permission: PermissionName;
  children: ReactNode;
}

export default function PermissionGate({
  user,
  permission,
  children,
}: PermissionGateProps) {
  const hasPermission = user.role.permissions.includes(permission);

  if (hasPermission) {
    return <>{children}</>;
  }

  return null;
}
