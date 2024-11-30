import { parseJSON } from "@/lib/utils";
import { RoleModel } from "../models/RoleModel";
import { Role, Section } from "@/interfaces";

export async function getRoles(): Promise<Role[]> {
  const role = new RoleModel();
  return parseJSON(await role.getRoles());
}

export async function getRole(id: string): Promise<Role> {
  const role = new RoleModel();
  return parseJSON(await role.getRole(id));
}

export async function createRole(
  roleData: Omit<Role, "id" | "created_at" | "updated_at" | "sections">,
  sections: Section[]
): Promise<Role> {
  const role = new RoleModel();
  return parseJSON(await role.createRole(roleData, sections));
}

export async function updateRole(
  roleData: Omit<Role, "id" | "created_at" | "updated_at" | "sections">,
  sections: string[],
  role_id: string
): Promise<Role> {
  const role = new RoleModel();
  return parseJSON(await role.updateRole(roleData, sections, role_id));
}

export async function deleteRole(id: string): Promise<void> {
  const role = new RoleModel();
  await role.deleteRole(id);
}
