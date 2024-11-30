import { z } from "zod";
import { formatBytes } from "./formatBytes";
import { FileOptions } from "@/app/components/admin/components/FormCreate/types/fileManagement";
import { isArray } from "lodash";
interface schemaImageValidationProps {
  multiple?: boolean;
  options?: FileOptions;
}

interface ImageValidationError {
  fileName: string;
  errors: string[];
}

export const schemaImageValidation = ({
  options,
  multiple,
}: schemaImageValidationProps) => {
  return z
    .any()
    .optional()
    .refine(
      (value) => {
        // console.log("value", value);
        if (value === undefined) return true;
        if (typeof value === "string") return true;
        if (!value) return false;
        const files = value as FileList;
        if (files.length === 0) return false;
        if (!multiple && files.length > 1) return false;
        return true;
      },
      {
        message: multiple
          ? "Seleccione al menos una imagen"
          : "Seleccione una imagen",
      }
    )
    .superRefine(async (value, ctx) => {
      if (!value) return true;
      if (isArray(value)) return true;

      // if ((value && typeof value === "string") || !value) return;

      const files = Array.from(value as FileList)
        .filter((file) => typeof file !== "string")
        .filter((file: any) => !file.createdAt);

      const imageErrors: ImageValidationError[] = [];

      // Validar cada imagen
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const errors: string[] = [];

        // Validar tamaño

        if (options && options.maxFileSize && file.size > options.maxFileSize) {
          errors.push(
            `El archivo excede el tamaño máximo de ${formatBytes(
              options.maxFileSize
            )}`
          );
        }

        // Validar tipo
        if (
          options &&
          options.acceptImageTypes &&
          !options.acceptImageTypes.includes(file.type)
        ) {
          errors.push(
            `Formato no válido. Formatos permitidos: ${options.acceptImageTypes.join(
              ", "
            )}`
          );
        }

        // Validar dimensiones
        try {
          if (options && !options.dimensions) return true;
          if (!options) return true;
          const dimensions = options.dimensions;
          if (
            dimensions &&
            dimensions.min &&
            dimensions.min.width &&
            dimensions.min.height &&
            dimensions.max &&
            dimensions.max.width &&
            dimensions.max.height
          ) {
            const dimensions_valid = await new Promise<boolean>((resolve) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                  const meetsDimensions =
                    img.width >= dimensions?.min.width &&
                    img.height >= dimensions.min.height &&
                    img.width <= dimensions.max.width &&
                    img.height <= dimensions.max.height;
                  resolve(meetsDimensions);
                };
                img.onerror = () => resolve(false);
                img.src = e.target?.result as string;
              };
              reader.onerror = () => resolve(false);
              reader.readAsDataURL(file);
            });
            if (!dimensions_valid) {
              errors.push(
                `Las dimensiones deben estar entre ${dimensions.min.width}x${dimensions.min.height} y ${dimensions.max.width}x${dimensions.max.height} píxeles`
              );
            }
          }
        } catch (error) {
          errors.push("Error al validar las dimensiones de la imagen");
        }

        // Si hay errores, agregarlos al array de errores
        if (errors.length > 0) {
          imageErrors.push({
            fileName: file.name,
            errors,
          });
        }
      }

      // Si hay errores, añadirlos al contexto
      if (imageErrors.length > 0) {
        const errorMessage = imageErrors
          .map((error) => `${error.fileName}: ${error.errors.join(", ")}`)
          .join("\n");

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessage,
        });
      }
    });
};
