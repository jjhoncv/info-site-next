import {
  findAllProjects,
  findProjectById,
  findProjectImages,
} from "../models/project";
import { Project, ProjectImage } from "@/interfaces";

export async function getAllProjects(): Promise<Project[]> {
  return await findAllProjects();
}

export async function getProjectById(id: number): Promise<Project | null> {
  return await findProjectById(id);
}

export async function getProjectImages(
  projectId: number
): Promise<ProjectImage[]> {
  return await findProjectImages(projectId);
}
