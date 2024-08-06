// src/lib/validations.ts
import { z } from "zod";

export const bannerSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  display_order: z.number().int().positive(),
  link: z.string().url().optional(),
  image_url: z.string().url(),
});

export const serviceSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  subtitle: z.string().optional(),
  image_url: z.string().url(),
  slug: z.string().min(1, "El slug es requerido"),
  description: z.string().optional(),
  display_order: z.number().int().positive(),
});
