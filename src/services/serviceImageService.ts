import { ServiceImage } from "@/interfaces";
import { parseJSON } from "@/lib/utils";
import { ServiceImageModel } from "@/models/ServiceImageModel";

export async function getServiceImages(): Promise<ServiceImage[]> {
  const serviceImage = new ServiceImageModel();
  return parseJSON(await serviceImage.getServiceImages());
}

export async function getServiceImagesByServiceId(
  serviceId: string
): Promise<ServiceImage[] | null> {
  const serviceImage = new ServiceImageModel();
  return parseJSON(await serviceImage.getServiceImagesByServiceId(serviceId));
}

export async function getServiceImage(
  id: string
): Promise<ServiceImage | null> {
  const serviceImage = new ServiceImageModel();
  return parseJSON(await serviceImage.getServiceImage(id));
}

export async function createServiceImage(
  serviceImage: Omit<
    ServiceImage,
    "id" | "created_at" | "updated_at" | "image_url"
  >
): Promise<ServiceImage> {
  const oserviceImage = new ServiceImageModel();
  return parseJSON(await oserviceImage.createServiceImage(serviceImage));
}

export async function updateServiceImage(
  id: string,
  serviceImage: Partial<ServiceImage>
): Promise<boolean> {
  const oserviceImage = new ServiceImageModel();
  return parseJSON(await oserviceImage.updateServiceImage(id, serviceImage));
}

export async function deleteServiceImage(id: string): Promise<boolean> {
  const oserviceImage = new ServiceImageModel();
  return parseJSON(await oserviceImage.deleteServiceImage(id));
}
