import { findAllBanners, findBannerById } from "../models/banner";
import { Banner } from "@/interfaces";

export async function getAllBanners(): Promise<Banner[]> {
  return JSON.parse(JSON.stringify(await findAllBanners()));
}

export async function getBannerById(id: number): Promise<Banner | null> {
  return await findBannerById(id);
}
