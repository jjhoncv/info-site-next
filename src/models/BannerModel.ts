import { executeQuery } from "@/lib/db";
import { Banner } from "@/interfaces";

export class BannerModel {
  // Método para obtener todos los banners
  public async getBanners(): Promise<Banner[]> {
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

  // Método para obtener un banner por ID
  public async getBanner(id: string): Promise<Banner | null> {
    try {
      const [result] = await executeQuery<Banner[]>({
        query: "SELECT * FROM banner WHERE id = ?",
        values: [id],
      });
      return result || null;
    } catch (error) {
      console.error(`Error al obtener el banner con id ${id}:`, error);
      throw error;
    }
  }

  // Método para crear un nuevo banner
  public async createBanner(
    banner: Omit<Banner, "id" | "created_at" | "updated_at" | "image_url">
  ): Promise<Banner> {
    try {
      const result = await executeQuery<{ insertId: number }>({
        query: "INSERT INTO banner SET ?",
        values: [banner],
      });
      return { ...banner, id: result.insertId } as Banner;
    } catch (error) {
      console.error("Error al crear el banner:", error);
      throw error;
    }
  }

  // Método para actualizar un banner existente
  public async updateBanner(
    id: string,
    banner: Partial<Banner>
  ): Promise<boolean> {
    try {
      const result = await executeQuery<{ affectedRows: number }>({
        query: "UPDATE banner SET ? WHERE id = ?",
        values: [banner, id],
      });
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al actualizar el banner con id ${id}:`, error);
      throw error;
    }
  }

  // Método para eliminar un banner
  public async deleteBanner(id: number): Promise<boolean> {
    try {
      const result = await executeQuery<{ affectedRows: number }>({
        query: "DELETE FROM banner WHERE id = ?",
        values: [id],
      });
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al eliminar el banner con id ${id}:`, error);
      throw error;
    }
  }
}
