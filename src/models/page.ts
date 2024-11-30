import { executeQuery } from "@/lib/db";
import { Page, PageImage } from "@/interfaces";

export async function findAllPages(): Promise<Page[]> {
  try {
    const result = await executeQuery<Page[]>({
      query: "SELECT * FROM pages ORDER BY display_order ASC",
    });
    return result;
  } catch (error) {
    console.error("Error al obtener las páginas:", error);
    throw error;
  }
}

export async function findPageById(id: number): Promise<Page | null> {
  try {
    const [result] = await executeQuery<Page[]>({
      query: "SELECT * FROM pages WHERE id = ?",
      values: [id],
    });
    return result || null;
  } catch (error) {
    console.error(`Error al obtener la página con id ${id}:`, error);
    throw error;
  }
}

export async function findPageImages(pageId: number): Promise<PageImage[]> {
  try {
    const result = await executeQuery<PageImage[]>({
      query:
        "SELECT * FROM pages_images WHERE id_page = ? ORDER BY display_order ASC",
      values: [pageId],
    });
    return result;
  } catch (error) {
    console.error(
      `Error al obtener las imágenes de la página con id ${pageId}:`,
      error
    );
    throw error;
  }
}
