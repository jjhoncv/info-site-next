import { Role, Section } from "@/interfaces";
import { executeQuery } from "@/lib/db";
import { SectionModel } from "./SectionModel";

export class RoleModel {
  public async getRole(id: string): Promise<Role> {
    const [role] = await executeQuery<Role[]>({
      query: "SELECT * FROM roles WHERE id = ?",
      values: [id],
    });
    const osection = new SectionModel();

    return {
      ...role,
      sections: await osection.getSectionsByRol(role.id),
    };
  }

  public async getRoles(): Promise<Role[]> {
    const roles = await executeQuery<Role[]>({
      query: "SELECT * FROM roles",
    });
    const osection = new SectionModel();

    return await Promise.all(
      roles.map(async (role) => ({
        ...role,
        sections: await osection.getSectionsByRol(role.id),
      }))
    );
  }

  public async createRole(
    role: Omit<Role, "id" | "created_at" | "updated_at" | "sections">,
    sections: Section[]
  ): Promise<Role> {
    const result = await executeQuery<{ insertId: string }>({
      query: "INSERT INTO roles SET ?",
      values: [role],
    });

    const osection = new SectionModel();

    if (sections.length > 0) {
      await Promise.all(
        sections.map(
          async (section) =>
            await osection.addRoleSection(result.insertId, section.id)
        )
      );
    }

    return (await this.getRole(result.insertId)) as Role;
  }

  public async updateRole(
    role: Omit<Role, "id" | "created_at" | "updated_at" | "sections">,
    sections: string[],
    role_id: string
  ): Promise<Role> {
    await executeQuery({
      query: "UPDATE roles SET name=? WHERE id=?",
      values: [role.name, role_id],
    });
    const osection = new SectionModel();

    await osection.removeAllSectionByRole(role_id);

    if (sections.length > 0) {
      await Promise.all(
        sections.map(
          async (sectionId) => await osection.addRoleSection(role_id, sectionId)
        )
      );
    }

    return (await this.getRole(role_id)) as Role;
  }

  public async deleteRole(id: string): Promise<void> {
    await executeQuery({
      query: "DELETE FROM roles WHERE id=?",
      values: [id],
    });
  }
}
