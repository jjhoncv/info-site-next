import { parseJSON } from "@/lib/utils";
import {
  getBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../models/banner";
import { Banner } from "@/interfaces";

export async function findAllBanners(): Promise<Banner[]> {
  return parseJSON(await getBanners());
}

export async function findBannerById(id: number): Promise<Banner | null> {
  return parseJSON(await getBannerById(id));
}

export async function newBanner(
  banner: Omit<Banner, "id" | "created_at" | "updated_at">
): Promise<Banner> {
  return parseJSON(await createBanner(banner));
}

export async function editBanner(
  id: number,
  banner: Partial<Banner>
): Promise<boolean> {
  return parseJSON(await updateBanner(id, banner));
}

export async function removeBanner(id: number): Promise<boolean> {
  return parseJSON(await deleteBanner(id));
}
