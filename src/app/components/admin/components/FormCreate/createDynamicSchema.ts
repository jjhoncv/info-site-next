import { z } from "zod";
import { Field } from "./types/fileManagement";
import { schemaImageValidation } from "@/lib/schemaImage";

export const createDynamicSchema = (fields: Field[]) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny | any;

    // Esquema base según el tipo de campo
    switch (field.type) {
      case "file":
        fieldSchema = schemaImageValidation({
          ...field.options,
          multiple: field.multiple,
        });
        break;

      case "text":
      case "textarea":
        fieldSchema = z.string();

        // Aplicar validaciones específicas según required
        if (typeof field.required === "object") {
          if (field.required.min) {
            fieldSchema = fieldSchema.min(1, field.required.min);
          }
          if (field.required.url) {
            fieldSchema = fieldSchema.url(field.required.url);
          }
        } else if (field.required === true) {
          fieldSchema = fieldSchema.min(1, `${field.label} es requerido`);
        }
        break;

      case "primary":
        fieldSchema = z.any().optional();
        break;

      default:
        fieldSchema = z.string();
    }

    // Agregar el campo al schema
    schemaFields[field.key] = fieldSchema;
  });

  return z.object(schemaFields);
};
