import { FolderIcon, Trash2 } from "lucide-react";
import React, { FC } from "react";
import { Folder } from "./types/fileManagement";

interface FolderCardProps {
  folder: Folder;
  onOpen: () => void;
  onDelete?: () => void;
  isDragOver?: boolean;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: () => void;
  onDrop?: (e: React.DragEvent) => void;
}

export const FolderCard: FC<FolderCardProps> = ({
  folder,
  onOpen,
  onDelete,
  isDragOver = false,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  return (
    <div
      className={`
        relative border rounded-lg overflow-hidden transition-all cursor-pointer
        ${
          isDragOver
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 hover:border-slate-400"
        }
      `}
      onClick={onOpen}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100 transition-colors z-10"
          title="Eliminar carpeta"
        >
          <Trash2 size={18} className="text-red-500" />
        </button>
      )}

      <div className="relative h-[120px] flex flex-col items-center justify-center">
        <FolderIcon
          size={50}
          className={`${isDragOver ? "text-blue-500" : "text-gray-400"}`}
          strokeWidth={1}
        />
        <span className="text-xs text-gray-500 mt-2">
          {folder.itemCount} {folder.itemCount === 1 ? "elemento" : "elementos"}
        </span>
      </div>

      <div className="p-2 border-t border-slate-200 bg-white">
        <div className="flex flex-col">
          <div className="overflow-ellipsis overflow-hidden whitespace-nowrap font-medium text-sm">
            {folder.name}
          </div>
          <div className="text-xs text-gray-400">
            {new Date(folder.modifiedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};
