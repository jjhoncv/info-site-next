import { updateUser } from "@/models/user";
import { removeBanner } from "@/services/bannerService";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const id = formData.get("id") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No se ha enviado ningún archivo" },
        { status: 400 }
      );
    }

    // Obtener metadata adicional
    const fileName = formData.get("fileName") as string;

    // Convertir el archivo a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Crear un nombre de archivo único
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = fileName.split(".").pop();
    const uniqueFileName = `${uniqueSuffix}.${fileExtension}`;

    // Definir la ruta donde se guardará el archivo
    const uploadDir = join(process.cwd(), "public", "uploads");
    const filePath = join(uploadDir, uniqueFileName);

    // Guardar el archivo
    await writeFile(filePath, buffer);

    // Devolver la URL del archivo
    const fileUrl = `/uploads/${uniqueFileName}`;

    try {
      const user = await updateUser({ photo: fileUrl }, id);
      const response = NextResponse.json(
        {
          message: "Foto de perfil actualizada",
          success: true,
          url: fileUrl,
        },
        {
          status: 200,
        }
      );
      return response;
    } catch (error: any) {
      const response = NextResponse.json(
        {
          message: error.sqlMessage,
          success: false,
        },
        { status: 400 }
      );
      return response;
    }
  } catch (error: any) {
    const response = NextResponse.json(
      {
        message: error.sqlMessage,
        success: false,
      },
      { status: 500 }
    );
    return response;
  }
}
