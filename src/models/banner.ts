import { executeQuery } from "@/lib/db";
import { Banner } from "@/interfaces";

export async function findAllBanners(): Promise<Banner[]> {
  try {
    const result = await executeQuery<Banner[]>({
      query: "SELECT * FROM banner ORDER BY display_order ASC",
    });
    return result;
  } catch (error) {
    console.error("Error al obtener los banners:", error);
    throw error;
  }
}

export async function findBannerById(id: number): Promise<Banner | null> {
  try {
    const result = await executeQuery<Banner[]>({
      query: "SELECT * FROM banner WHERE id = ?",
      values: [id],
    });
    return result[0] || null;
  } catch (error) {
    console.error(`Error al obtener el banner con id ${id}:`, error);
    throw error;
  }
}
