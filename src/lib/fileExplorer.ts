// utils/fileExplorer.ts
import fs from "fs";
import path from "path";

interface FileNode {
  name: string;
  path: string;
  type: "file" | "directory";
  size: number;
  extension?: string;
  children?: FileNode[];
  createdAt: Date;
  modifiedAt: Date;
}

export function getFileTree(directoryPath: string): FileNode[] {
  const uploadsPath = path.join(process.cwd(), directoryPath);

  function exploreDirectory(currentPath: string): FileNode[] {
    const items = fs.readdirSync(currentPath);
    const result: FileNode[] = [];

    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stats = fs.statSync(fullPath);
      const relativePath = fullPath.replace(process.cwd(), "");

      const fileNode: FileNode = {
        name: item,
        path: relativePath,
        type: stats.isDirectory() ? "directory" : "file",
        size: stats.size,
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
      };

      if (stats.isFile()) {
        fileNode.extension = path.extname(item).toLowerCase();
      }

      if (stats.isDirectory()) {
        fileNode.children = exploreDirectory(fullPath);
      }

      result.push(fileNode);
    }

    return result;
  }

  try {
    return exploreDirectory(uploadsPath);
  } catch (error) {
    console.error("Error al leer el directorio:", error);
    return [];
  }
}

// Ejemplo de uso:
// const fileTree = getFileTree('/public/uploads');
