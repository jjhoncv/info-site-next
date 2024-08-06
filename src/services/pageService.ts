import { findAllPages, findPageById, findPageImages } from "../models/page";
import { Page, PageImage } from "@/interfaces";

export async function getAllPages(): Promise<Page[]> {
  return await findAllPages();
}

export async function getPageById(id: number): Promise<Page | null> {
  return await findPageById(id);
}

export async function getPageImages(pageId: number): Promise<PageImage[]> {
  return await findPageImages(pageId);
}
