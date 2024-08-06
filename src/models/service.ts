import { executeQuery } from "@/lib/db";
import { Service, ServiceImage } from "@/interfaces";

export async function findAllServices(): Promise<Service[]> {
  try {
    const result = await executeQuery<Service[]>({
      query: "SELECT * FROM services ORDER BY display_order ASC",
    });
    return result;
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    throw error;
  }
}

export async function findServiceById(id: number): Promise<Service | null> {
  try {
    const result = await executeQuery<Service[]>({
      query: "SELECT * FROM services WHERE id = ?",
      values: [id],
    });
    return result[0] || null;
  } catch (error) {
    console.error(`Error al obtener el servicio con id ${id}:`, error);
    throw error;
  }
}

export async function findServiceImages(
  serviceId: number
): Promise<ServiceImage[]> {
  try {
    const result = await executeQuery<ServiceImage[]>({
      query:
        "SELECT * FROM services_images WHERE id_service = ? ORDER BY display_order ASC",
      values: [serviceId],
    });
    return result;
  } catch (error) {
    console.error(
      `Error al obtener las imágenes del servicio con id ${serviceId}:`,
      error
    );
    throw error;
  }
}
