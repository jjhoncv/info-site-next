import { findAllGalleryItems, findGalleryItemById } from "../models/gallery";
import { GalleryItem } from "@/interfaces";

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  return await findAllGalleryItems();
}

export async function getGalleryItemById(
  id: number
): Promise<GalleryItem | null> {
  return await findGalleryItemById(id);
}
