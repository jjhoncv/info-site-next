import { Section } from "@/interfaces";
import { executeQuery } from "@/lib/db";

interface RoleSection {
  id: string;
  id_rol: string;
  id_section: string;
}

export class SectionModel {
  public async getSectionsByRol(id: string): Promise<Section[]> {
    const roleSections = await executeQuery<RoleSection[]>({
      query: `SELECT * FROM roles_sections WHERE id_rol = ?`,
      values: [id],
    });

    const sections = await Promise.all(
      roleSections.map((roleSection) => this.getSection(roleSection.id_section))
    );

    return sections;
  }

  public async getSection(id: string): Promise<Section> {
    const [section] = await executeQuery<Section[]>({
      query: `SELECT * FROM sections WHERE id = ?`,
      values: [id],
    });

    return section;
  }

  public async getSections(): Promise<Section[]> {
    const sections = await executeQuery<Section[]>({
      query: `SELECT * FROM sections`,
    });
    if (sections.length === 0) return [];

    return sections;
  }

  public async addRoleSection(
    roleId: string,
    sectionId: string
  ): Promise<string> {
    const result = await executeQuery<{ insertId: string }>({
      query: "INSERT INTO roles_sections SET ?",
      values: [{ id_section: sectionId, id_rol: roleId }],
    });

    return result.insertId;
  }

  public async removeRoleSection(
    roleId: string,
    sectionId: string
  ): Promise<string> {
    const result = await executeQuery<{ insertId: string }>({
      query: "DELETE FROM roles_sections WHERE id_section= ? AND id_rol = ?",
      values: [sectionId, roleId],
    });

    return result.insertId;
  }

  public async removeAllSectionByRole(roleId: string): Promise<string> {
    const result = await executeQuery<{ insertId: string }>({
      query: "DELETE FROM roles_sections WHERE id_rol= ?",
      values: [roleId],
    });

    return result.insertId;
  }
}
