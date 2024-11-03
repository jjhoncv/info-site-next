import { schemaImageValidation } from "@/lib/schemaImage";
import { object, string } from "zod";

export const MAX_FILE_SIZE = 0.5 * 1024 * 1024; // 500KB
export const MIN_DIMENSIONS = { width: 600, height: 240 };
export const MAX_DIMENSIONS = { width: 1500, height: 600 };
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const bannerSchema = object({
  title: string().min(1, "Título es requerido"),
  subtitle: string().min(1, "Subtítulo es requerido"),
  description: string().min(1, "Descripción es requerido"),
  link: string().min(1, "Link es requerido").url("Ingrese un enlace válido"),
  image_url: schemaImageValidation(
    MAX_FILE_SIZE,
    ACCEPTED_IMAGE_TYPES,
    MIN_DIMENSIONS,
    MAX_DIMENSIONS
  ),
});
