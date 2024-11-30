import { executeQuery } from "@/lib/db";
import { Service } from "@/interfaces";

export class ServiceModel {
  // Método para obtener todos los services
  public async getServices(): Promise<Service[]> {
    try {
      const result = await executeQuery<Service[]>({
        query: "SELECT * FROM services ORDER BY display_order ASC",
      });
      return result;
    } catch (error) {
      console.error("Error al obtener los services:", error);
      throw error;
    }
  }

  // Método para obtener un service por ID
  public async getService(id: string): Promise<Service | null> {
    try {
      const [result] = await executeQuery<Service[]>({
        query: "SELECT * FROM services WHERE id = ?",
        values: [id],
      });
      return result || null;
    } catch (error) {
      console.error(`Error al obtener el service con id ${id}:`, error);
      throw error;
    }
  }

  // Método para obtener un service por slug
  public async getServiceBySlug(slug: string): Promise<Service | null> {
    try {
      const [result] = await executeQuery<Service[]>({
        query: "SELECT * FROM services WHERE slug = ?",
        values: [slug],
      });
      return result || null;
    } catch (error) {
      console.error(`Error al obtener el service con slug ${slug}:`, error);
      throw error;
    }
  }

  // Método para crear un nuevo service
  public async createService(
    service: Omit<Service, "id" | "created_at" | "updated_at" | "image_url">
  ): Promise<Service> {
    try {
      const result = await executeQuery<{ insertId: number }>({
        query: "INSERT INTO services SET ?",
        values: [service],
      });
      return { ...service, id: result.insertId } as Service;
    } catch (error) {
      console.error("Error al crear el service:", error);
      throw error;
    }
  }

  // Método para actualizar un service existente
  public async updateService(
    id: string,
    service: Partial<Service>
  ): Promise<boolean> {
    try {
      const result = await executeQuery<{ affectedRows: number }>({
        query: "UPDATE services SET ? WHERE id = ?",
        values: [service, id],
      });
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al actualizar el service con id ${id}:`, error);
      throw error;
    }
  }

  // Método para eliminar un service
  public async deleteService(id: string): Promise<boolean> {
    try {
      const result = await executeQuery<{ affectedRows: number }>({
        query: "DELETE FROM services WHERE id = ?",
        values: [id],
      });
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al eliminar el service con id ${id}:`, error);
      throw error;
    }
  }
}
