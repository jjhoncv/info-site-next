"use client";
import { RoleName } from "@/interfaces";
import { _hasPermission } from "@/lib/hasPermission";
import { useEffect, useState } from "react";

export const usePermission = (roleName: RoleName) => {
  const [hasPermission, setHasPermission] = useState(false);
  const validPermission = async () => {
    const permission = await _hasPermission(roleName);
    setHasPermission(permission);
  };

  useEffect(() => {
    void validPermission();
  }, []);

  return <>{hasPermission ? <div>Unauthorized</div> : null}</>;
};
