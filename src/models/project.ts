import { executeQuery } from "@/lib/db";
import { Project, ProjectImage } from "@/interfaces";

export async function findAllProjects(): Promise<Project[]> {
  try {
    const result = await executeQuery<Project[]>({
      query: "SELECT * FROM projects ORDER BY display_order ASC",
    });
    return result;
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    throw error;
  }
}

export async function findProjectById(id: number): Promise<Project | null> {
  try {
    const result = await executeQuery<Project[]>({
      query: "SELECT * FROM projects WHERE id = ?",
      values: [id],
    });
    return result[0] || null;
  } catch (error) {
    console.error(`Error al obtener el proyecto con id ${id}:`, error);
    throw error;
  }
}

export async function findProjectImages(
  projectId: number
): Promise<ProjectImage[]> {
  try {
    const result = await executeQuery<ProjectImage[]>({
      query:
        "SELECT * FROM projects_images WHERE id_project = ? ORDER BY display_order ASC",
      values: [projectId],
    });
    return result;
  } catch (error) {
    console.error(
      `Error al obtener las imágenes del proyecto con id ${projectId}:`,
      error
    );
    throw error;
  }
}
