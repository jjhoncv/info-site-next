import { Permission, PermissionName } from "@/interfaces";
import { executeQuery } from "@/lib/db";

export async function getPermissions(
  idRole: string
): Promise<PermissionName[] | null> {
  const permissions = await executeQuery<Permission[]>({
    query: `SELECT * FROM role_permissions rp 
                JOIN permissions p ON rp.permission_id = p.id
                WHERE rp.role_id = ?`,
    values: [idRole],
  });
  if (permissions.length === 0) return null;

  return permissions.map((permission) => permission.name);
}
