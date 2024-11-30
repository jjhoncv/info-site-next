import { parseJSON } from "@/lib/utils";
import { SectionModel } from "../models/SectionModel";
import { Section } from "@/interfaces";

export async function getSectionsByRol(id: string): Promise<Section[]> {
  const section = new SectionModel();
  return parseJSON(await section.getSectionsByRol(id));
}

export async function getSection(id: string): Promise<Section> {
  const section = new SectionModel();
  return parseJSON(await section.getSection(id));
}

export async function getSections(): Promise<Section[]> {
  const section = new SectionModel();
  return parseJSON(await section.getSections());
}

export async function addRoleSection(
  roleId: string,
  sectionId: string
): Promise<string> {
  const section = new SectionModel();
  return parseJSON(await section.addRoleSection(roleId, sectionId));
}

export async function removeRoleSection(
  roleId: string,
  sectionId: string
): Promise<string> {
  const section = new SectionModel();
  return parseJSON(await section.removeRoleSection(roleId, sectionId));
}

export async function removeAllSectionByRole(roleId: string): Promise<string> {
  const section = new SectionModel();
  return parseJSON(await section.removeAllSectionByRole(roleId));
}
