import { parseJSON } from "@/lib/utils";
import { BannerModel } from "../models/BannerModel";
import { Banner } from "@/interfaces";

export async function getBanners(): Promise<Banner[]> {
  const banner = new BannerModel();
  return parseJSON(await banner.getBanners());
}

export async function getBanner(id: string): Promise<Banner | null> {
  const banner = new BannerModel();
  return parseJSON(await banner.getBanner(id));
}

export async function createBanner(
  banner: Omit<Banner, "id" | "created_at" | "updated_at" | "image_url">
): Promise<Banner> {
  const obanner = new BannerModel();
  return parseJSON(await obanner.createBanner(banner));
}

export async function updateBanner(
  id: string,
  banner: Partial<Banner>
): Promise<boolean> {
  const obanner = new BannerModel();
  return parseJSON(await obanner.updateBanner(id, banner));
}

export async function deleteBanner(id: number): Promise<boolean> {
  const obanner = new BannerModel();
  return parseJSON(await obanner.deleteBanner(id));
}
