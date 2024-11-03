import { writeFile } from "fs/promises";
import { join } from "path";

export const writeFileServer = async (
  uploadDir: string,
  file: File
): Promise<string> => {
  // Obtener metadata adicional
  const fileName = file.name;

  // Convertir el archivo a Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Crear un nombre de archivo único
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const fileExtension = fileName.split(".").pop();
  const uniqueFileName = `${uniqueSuffix}.${fileExtension}`;

  // Definir la ruta donde se guardará el archivo
  //   const uploadDir = join(process.cwd(), "public", "uploads");
  const filePath = join(uploadDir, uniqueFileName);

  // Guardar el archivo
  await writeFile(filePath, buffer);

  const fileUrl = `/uploads/${uniqueFileName}`;
  return fileUrl;
};
