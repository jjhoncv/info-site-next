import {
  findAllServices,
  findServiceById,
  findServiceImages,
} from "../models/service";
import { Service, ServiceImage } from "@/interfaces";

export async function getAllServices(): Promise<Service[]> {
  return JSON.parse(JSON.stringify(await findAllServices()));
}

export async function getServiceById(id: number): Promise<Service | null> {
  return await findServiceById(id);
}

export async function getServiceImages(
  serviceId: number
): Promise<ServiceImage[]> {
  return await findServiceImages(serviceId);
}
