import { executeQuery } from "@/lib/db";
import { Banner } from "@/interfaces";

export async function getBanners(): Promise<Banner[]> {
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

export async function getBannerById(id: number): Promise<Banner | null> {
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

export async function createBanner(
  banner: Omit<Banner, "id" | "created_at" | "updated_at">
): Promise<Banner> {
  const result = await executeQuery<{ insertId: number }>({
    query: "INSERT INTO banner SET ?",
    values: [banner],
  });
  return { ...banner, id: result.insertId } as Banner;
}

export async function updateBanner(
  id: number,
  banner: Partial<Banner>
): Promise<boolean> {
  const result = await executeQuery<{ affectedRows: number }>({
    query: "UPDATE banner SET ? WHERE id = ?",
    values: [banner, id],
  });
  return result.affectedRows > 0;
}

export async function deleteBanner(id: number): Promise<boolean> {
  const result = await executeQuery<{ affectedRows: number }>({
    query: "DELETE FROM banner WHERE id = ?",
    values: [id],
  });
  return result.affectedRows > 0;
}
