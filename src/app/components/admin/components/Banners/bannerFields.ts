import { Field, FileOptions } from "../FormCreate/types/fileManagement";

export const BannerFileOptions: FileOptions = {
  maxFileSize: 0.5 * 1024 * 1024, // 500KB
  dimensions: {
    min: { width: 600, height: 240 },
    max: { width: 1500, height: 600 },
  },
  acceptImageTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
};

export const BannerFields: Field[] = [
  {
    key: "link",
    label: "Enlace",
    type: "text",
    required: {
      min: "Link es requerido",
      url: "Ingrese un enlace válido",
    },
  },
  {
    key: "title",
    label: "Título",
    type: "text",
    required: {
      min: "Título es requerido",
    },
  },
  {
    key: "description",
    label: "Descripción",
    type: "textarea",
  },
  {
    key: "subtitle",
    label: "Subtítulo",
    type: "text",
  },
  {
    key: "image_url",
    label: "Imagen",
    type: "file",
    multiple: false,
    options: BannerFileOptions,
  },
];
