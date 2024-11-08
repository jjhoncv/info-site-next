import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { UPLOADS_DIR } from "../route";

export async function POST(request: NextRequest) {
  try {
    const { items, destination } = await request.json();
    const destinationPath = path.join(UPLOADS_DIR, destination);

    // Verificar que el destino existe y es una carpeta
    const destStats = await fs.stat(destinationPath);
    if (!destStats.isDirectory()) {
      throw new Error("Destination is not a directory");
    }

    // Mover cada archivo
    for (const itemPath of items) {
      const sourcePath = path.join(UPLOADS_DIR, itemPath);
      const fileName = path.basename(itemPath);
      const newPath = path.join(destinationPath, fileName);

      await fs.rename(sourcePath, newPath);
    }

    return NextResponse.json({ message: "Items moved successfully" });
  } catch (error) {
    console.error("Error moving items:", error);
    return NextResponse.json({ error: "Error moving items" }, { status: 500 });
  }
}
