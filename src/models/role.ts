import { Role } from "@/interfaces";
import { executeQuery } from "@/lib/db";
import { getSectionsByRol } from "./sections";

export async function getRolesById(id: string): Promise<Role> {
  const roles = await executeQuery<Role[]>({
    query: "SELECT * FROM roles WHERE id = ?",
    values: [id],
  });
  const role = roles[0];
  return {
    ...role,
    sections: await getSectionsByRol(role.id),
  };
}

export async function getRoles(): Promise<Role[]> {
  const roles = await executeQuery<Role[]>({
    query: "SELECT * FROM roles ",
  });
  return await Promise.all(
    roles.map(async (role) => ({
      ...role,
      sections: await getSectionsByRol(role.id),
    }))
  );
}
