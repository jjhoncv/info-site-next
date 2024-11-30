import { Service } from "@/interfaces";
import { parseJSON } from "@/lib/utils";
import { ServiceModel } from "../models/ServiceModel";

export async function getServices(): Promise<Service[]> {
  const service = new ServiceModel();
  return parseJSON(await service.getServices());
}

export async function getService(id: string): Promise<Service | null> {
  const service = new ServiceModel();
  return parseJSON(await service.getService(id));
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const service = new ServiceModel();
  return parseJSON(await service.getServiceBySlug(slug));
}

export async function createService(
  service: Omit<Service, "id" | "created_at" | "updated_at">
): Promise<Service> {
  const oservice = new ServiceModel();
  return parseJSON(await oservice.createService(service));
}

export async function updateService(
  id: string,
  service: Partial<Service>
): Promise<boolean> {
  const oservice = new ServiceModel();
  return parseJSON(await oservice.updateService(id, service));
}

export async function deleteService(id: string): Promise<boolean> {
  const oservice = new ServiceModel();
  return parseJSON(await oservice.deleteService(id));
}
