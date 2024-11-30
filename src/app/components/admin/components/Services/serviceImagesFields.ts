import { Field } from "../FormCreate/types/fileManagement";

export const ServiceImagesFields: Field[] = [
  {
    key: "title",
    label: "título",
    type: "text",
    required: {
      min: "Título es requerido",
    },
  },
  {
    key: "subtitle",
    label: "subtitulo",
    type: "text",
    required: {
      min: "Subtitulo es requerido",
    },
  },
  {
    key: "description",
    label: "descripción",
    type: "textarea",
  },
  {
    key: "image_url",
    label: "imagen",
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
];
