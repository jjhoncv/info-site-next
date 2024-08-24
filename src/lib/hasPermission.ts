import { auth } from "@/auth";
import { PERMISSIONS } from "@/interfaces";

export const hasPermission = async (permissionPage: PERMISSIONS[]) => {
  const session = await auth();

  // check if user has permission
  const hasPermission = permissionPage.every((permission) =>
    session?.user?.data?.role?.permissions?.includes(permission)
  );

  return hasPermission;
};
