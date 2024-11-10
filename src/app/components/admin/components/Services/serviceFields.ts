import { Field } from "../FormCreate/types/fileManagement";

export const ServiceFields: Field[] = [
  {
    key: "title",
    label: "Título",
    type: "text",
    required: {
      min: "Título es requerido",
    },
  },
  {
    key: "subtitle",
    label: "Subtitulo",
    type: "text",
    required: {
      min: "Subtitulo es requerido",
    },
  },
  {
    key: "slug",
    label: "Slug",
    type: "text",
    required: {
      min: "Slug es requerido",
    },
  },
  {
    key: "description",
    label: "Descripción",
    type: "textarea",
  },
  {
    key: "image_url",
    label: "Imagen",
    type: "file",
    multiple: false,
    options: {
      maxFileSize: 0.5 * 1024 * 1024, // 500KB
      dimensions: {
        min: { width: 600, height: 240 },
        max: { width: 1500, height: 600 },
      },
      acceptImageTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    },
  },
  {
    key: "gallery",
    label: "Galeria",
    type: "file",
    multiple: true,
    options: {
      maxFileSize: 0.5 * 1024 * 1024, // 500KB
      dimensions: {
        min: { width: 400, height: 100 },
        max: { width: 1200, height: 300 },
      },
      acceptImageTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    },
  },
];
