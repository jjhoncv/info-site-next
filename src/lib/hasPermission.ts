import { auth } from "@/auth";
import { RoleName } from "@/interfaces";

export const hasPermission = async (rolName: RoleName) => {
  const session = await auth();
  return session?.user?.data?.role?.name === rolName;
};
