import { Role } from "@/interfaces";
import { executeQuery } from "@/lib/db";
import { getPermissions } from "./permission";

export async function getRoles(id: string): Promise<Role | null> {
  const roles = await executeQuery<Role[]>({
    query: "SELECT * FROM roles WHERE id = ?",
    values: [id],
  });
  if (roles.length === 0) return null;
  const role = roles[0];
  return {
    ...role,
    permissions: await getPermissions(role.id),
  };
}
