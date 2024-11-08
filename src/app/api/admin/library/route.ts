import { getFileTree } from "@/lib/fileExplorer";
import { writeFileServer } from "@/lib/writeFileServer";
import { existsSync } from "fs";
import { unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path, { join } from "path";

export async function GET(req: NextRequest) {
  const files = getFileTree("/public/uploads");

  const filesFixPath = files.map((file) => ({
    ...file,
    path: file.path.replace("/public", ""),
  }));

  const response = NextResponse.json(
    {
      message: "archivos de la libreria",
      success: true,
      files: filesFixPath,
    },
    {
      status: 200,
    }
  );
  return response;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const nameField = formData.get("name");
    const files = formData.getAll(`${nameField}[]`) as File[];

    const filesURL = await Promise.all(
      files.map(async (file) => {
        const uploadDir = join(process.cwd(), "public", "uploads");
        const fileUrl = await writeFileServer(uploadDir, file);
        return fileUrl;
      })
    );

    const response = NextResponse.json(
      {
        message: "archivos subidos a la libreria",
        success: true,
        filesURL,
      },
      {
        status: 200,
      }
    );
    return response;
  } catch (error: any) {
    const response = NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 500 }
    );
    return response;
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    // Obtener la ruta del archivo desde el body
    const data = await request.json();
    const filePath = data.filePath; // Por ejemplo: "/uploads/image123.jpg"

    // Validar que el path sea seguro (evitar path traversal)
    const safePath = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, "");
    const fullPath = path.join(process.cwd(), "public", safePath);

    // Verificar que el archivo existe
    if (!existsSync(fullPath)) {
      return NextResponse.json(
        { error: "El archivo no existe" },
        { status: 404 }
      );
    }

    // Verificar que el archivo está dentro del directorio permitido
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fullPath.startsWith(uploadsDir)) {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    // Eliminar el archivo
    await unlink(fullPath);

    return NextResponse.json({
      message: "Archivo eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar archivo:", error);
    return NextResponse.json(
      { error: "Error al eliminar el archivo" },
      { status: 500 }
    );
  }
}
