import { Role, Section } from "@/interfaces";
import { executeQuery } from "@/lib/db";
import {
  addRoleSection,
  getSectionsByRol,
  removeAllSectionByRole,
  removeRoleSection,
} from "./sections";

export async function getRole(id: string): Promise<Role> {
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

export async function createRole(
  role: Omit<Role, "id" | "created_at" | "updated_at" | "sections">,
  sections: Section[]
): Promise<Role> {
  const result = await executeQuery<{ insertId: string }>({
    query: "INSERT INTO roles SET ?",
    values: [role],
  });

  if (sections.length > 0) {
    await Promise.all(
      sections.map(
        async (section) =>
          await addRoleSection({
            roleId: result.insertId,
            sectionId: section.id,
          })
      )
    );
  }

  return (await getRole(result.insertId)) as Role;
}

export async function updateRole(
  role: Omit<Role, "id" | "created_at" | "updated_at" | "sections">,
  sections: string[],
  role_id: string
): Promise<Role> {
  await executeQuery<{ insertId: string }>({
    query: "UPDATE roles SET name=? WHERE id=?",
    values: [role.name, role_id],
  });

  await removeAllSectionByRole({ roleId: role_id });

  if (sections.length > 0) {
    await Promise.all(
      sections.map(
        async (section) =>
          await addRoleSection({ roleId: role_id, sectionId: section })
      )
    );
  }

  return (await getRole(role_id)) as Role;
}

export async function removeRole(id: string) {
  await executeQuery<{ insertId: string }>({
    query: "DELETE FROM roles WHERE id=?",
    values: [id],
  });
}
