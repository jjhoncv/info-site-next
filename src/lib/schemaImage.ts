import { z } from "zod";
import { formatBytes } from "./formatBytes";

const validExistsFiles = (files: FileList): boolean => {
  if (typeof files[0] === "string") {
    // que sea false, para que lo deje pasar
    return false;
  }
  if (files.length > 0) {
    return true;
  }
  return false;
};

export const schemaImageValidation = (
  MAX_FILE_SIZE: number,
  ACCEPTED_IMAGE_TYPES: string[],
  MIN_DIMENSIONS: {
    width: number;
    height: number;
  },
  MAX_DIMENSIONS: {
    width: number;
    height: number;
  }
) => {
  return z
    .any()
    .optional()
    .refine(
      (files: FileList) => {
        return validExistsFiles(files) ? files?.[0] instanceof File : true;
      },
      { message: "Por favor seleccione una imagen." }
    )

    .refine(
      (files) =>
        validExistsFiles(files) ? files?.[0]?.size <= MAX_FILE_SIZE : true,
      {
        message: `La imagen es demasiado grande. El tamaño máximo es ${formatBytes(
          MAX_FILE_SIZE
        )}.`,
      }
    )
    .refine(
      (files) =>
        validExistsFiles(files)
          ? ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type)
          : true,
      {
        message: "Por favor suba una imagen válida (JPEG, PNG o WebP).",
      }
    )
    .refine(
      (files) =>
        new Promise((resolve) => {
          const file = files?.[0];
          if (!(file instanceof File)) {
            validExistsFiles(files) ? resolve(false) : resolve(true);
            return;
          }
          if (!file) {
            resolve(false);
            return;
          }

          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const meetsDimensions = validExistsFiles(files)
                ? img.width >= MIN_DIMENSIONS.width &&
                  img.height >= MIN_DIMENSIONS.height &&
                  img.width <= MAX_DIMENSIONS.width &&
                  img.height <= MAX_DIMENSIONS.height
                : true;
              resolve(meetsDimensions);
            };
            img.onerror = () => {
              resolve(false);
            };
            img.src = e.target?.result as string;
          };
          reader.onerror = () => {
            resolve(false);
          };
          reader.readAsDataURL(file);
        }),
      {
        message: `Las dimensiones de la imagen no son válidas. Debe estar entre ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} y ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} píxeles.`,
      }
    );
};
