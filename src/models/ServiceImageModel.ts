import { ServiceImage } from "@/interfaces";
import { executeQuery } from "@/lib/db";

export class ServiceImageModel {
  // Método para obtener todos los services_images
  public async getServiceImages(): Promise<ServiceImage[]> {
    try {
      const result = await executeQuery<ServiceImage[]>({
        query: "SELECT * FROM services_images ORDER BY display_order ASC",
      });
      return result;
    } catch (error) {
      console.error("Error al obtener los ServiceImages:", error);
      throw error;
    }
  }

  // Método para obtener un services_images por ID
  public async getServiceImage(id: string): Promise<ServiceImage | null> {
    try {
      const [result] = await executeQuery<ServiceImage[]>({
        query: "SELECT * FROM services_images WHERE id = ?",
        values: [id],
      });
      return result || null;
    } catch (error) {
      console.error(`Error al obtener el ServiceImages con id ${id}:`, error);
      throw error;
    }
  }

  // Método para crear un nuevo services_images
  public async createServiceImage(
    serviceImage: Omit<
      ServiceImage,
      "id" | "created_at" | "updated_at" | "image_url"
    >
  ): Promise<ServiceImage> {
    try {
      const result = await executeQuery<{ insertId: number }>({
        query: "INSERT INTO services_images SET ?",
        values: [serviceImage],
      });
      return { ...serviceImage, id: result.insertId } as ServiceImage;
    } catch (error) {
      console.error("Error al crear el ServiceImages:", error);
      throw error;
    }
  }

  // Método para actualizar un services_images existente
  public async updateServiceImage(
    id: string,
    serviceImage: Partial<ServiceImage>
  ): Promise<boolean> {
    try {
      const result = await executeQuery<{ affectedRows: number }>({
        query: "UPDATE services_images SET ? WHERE id = ?",
        values: [serviceImage, id],
      });
      return result.affectedRows > 0;
    } catch (error) {
      console.error(
        `Error al actualizar el ServiceImages con id ${id}:`,
        error
      );
      throw error;
    }
  }

  // Método para eliminar un services_images
  public async deleteServiceImage(id: string): Promise<boolean> {
    try {
      const result = await executeQuery<{ affectedRows: number }>({
        query: "DELETE FROM services_images WHERE id = ?",
        values: [id],
      });
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al eliminar el ServiceImages con id ${id}:`, error);
      throw error;
    }
  }

  // Método para obtener todos los services_images por serviceId
  public async getServiceImagesByServiceId(
    serviceId: string
  ): Promise<ServiceImage[] | null> {
    try {
      const result = await executeQuery<ServiceImage[]>({
        query: "SELECT * FROM services_images WHERE id_service = ?",
        values: [serviceId],
      });
      return result || null;
    } catch (error) {
      console.error(
        `Error al obtener el ServiceImages con serviceId ${serviceId}:`,
        error
      );
      throw error;
    }
  }
}
