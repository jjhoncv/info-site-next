import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { getDirectoryContents, UPLOADS_DIR } from "../route";
import { promises as fs } from "fs";

export async function POST(request: NextRequest) {
  try {
    const { name, path: folderPath } = await request.json();
    const fullPath = path.join(UPLOADS_DIR, folderPath, name);

    await fs.mkdir(fullPath, { recursive: true });
    return NextResponse.json({ message: "Folder created successfully" });
  } catch (error) {
    console.error("Error creating folder:", error);
    return NextResponse.json(
      { error: "Error creating folder" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = new URLSearchParams(request.url.split("?")[1]);
    const folderPath = searchParams.get("path") || "";
    const fullPath = path.join(UPLOADS_DIR, folderPath);

    // Verificar si la carpeta contiene archivos
    const items = await getDirectoryContents(fullPath, folderPath);
    if (items.length > 0) {
      return NextResponse.json({ containsFiles: true, items });
    }

    await fs.rm(fullPath, { recursive: true });
    return NextResponse.json({ message: "Folder deleted successfully" });
  } catch (error) {
    console.error("Error deleting folder:", error);
    return NextResponse.json(
      { error: "Error deleting folder" },
      { status: 500 }
    );
  }
}
