import { Section } from "@/interfaces";
import { executeQuery } from "@/lib/db";

interface RoleSection {
  id: string;
  id_rol: string;
  id_section: string;
}

export async function getSectionsByRol(id: string): Promise<Section[]> {
  const roleSections = await executeQuery<RoleSection[]>({
    query: `SELECT * FROM roles_sections WHERE id_rol = ?`,
    values: [id],
  });

  const sections = await Promise.all(
    roleSections.map((roleSection) => getSection(roleSection.id_section))
  );

  return sections;
}

export async function getSection(id: string): Promise<Section> {
  const [section] = await executeQuery<Section[]>({
    query: `SELECT * FROM sections WHERE id = ?`,
    values: [id],
  });

  return section;
}

export async function getSections(): Promise<Section[]> {
  const sections = await executeQuery<Section[]>({
    query: `SELECT * FROM sections`,
  });
  if (sections.length === 0) return [];

  return sections.map((section) => section);
}

export async function addRoleSection({
  roleId,
  sectionId,
}: {
  roleId: string;
  sectionId: string;
}) {
  const result = await executeQuery<{ insertId: string }>({
    query: "INSERT INTO roles_sections SET ?",
    values: [{ id_section: sectionId, id_rol: roleId }],
  });

  return result.insertId;
}

export async function removeRoleSection({
  roleId,
  sectionId,
}: {
  roleId: string;
  sectionId: string;
}) {
  const result = await executeQuery<{ insertId: string }>({
    query: "DELETE FROM roles_sections WHERE id_section= ? AND id_rol = ?",
    values: [sectionId, roleId],
  });

  return result.insertId;
}
