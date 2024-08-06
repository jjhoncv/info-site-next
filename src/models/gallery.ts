import { executeQuery } from "@/lib/db";
import { GalleryItem } from "@/interfaces";

export async function findAllGalleryItems(): Promise<GalleryItem[]> {
  try {
    const result = await executeQuery<GalleryItem[]>({
      query: "SELECT * FROM gallery ORDER BY display_order ASC",
    });
    return result;
  } catch (error) {
    console.error("Error al obtener los elementos de la galería:", error);
    throw error;
  }
}

export async function findGalleryItemById(
  id: number
): Promise<GalleryItem | null> {
  try {
    const result = await executeQuery<GalleryItem[]>({
      query: "SELECT * FROM gallery WHERE id = ?",
      values: [id],
    });
    return result[0] || null;
  } catch (error) {
    console.error(
      `Error al obtener el elemento de la galería con id ${id}:`,
      error
    );
    throw error;
  }
}
