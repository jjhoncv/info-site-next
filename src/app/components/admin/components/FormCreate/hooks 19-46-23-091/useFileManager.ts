import { useState, useCallback } from "react";
import {
  FileManagerState,
  FileServer,
  Folder,
  DialogState,
} from "../types/fileManagement";

export const useFileManager = () => {
  const [state, setState] = useState<FileManagerState>({
    files: [],
    folders: [],
    selectedItems: [],
    currentPath: [],
    loading: true,
    error: null,
  });

  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    type: null,
    targetItem: null,
  });

  const [dragState, setDragState] = useState<{
    draggingItems: string[];
    dragOverFolder: string | null;
  }>({
    draggingItems: [],
    dragOverFolder: null,
  });

  const loadCurrentDirectory = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const path = state.currentPath.join("/");
      const response = await fetch(`/api/admin/library?path=${path}`);
      const data = await response.json();

      setState((prev) => ({
        ...prev,
        files: data.files,
        folders: data.folders,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Error al cargar el directorio",
      }));
    }
  }, [state.currentPath]);

  const handleSelect = useCallback((path: string, selected: boolean) => {
    setState((prev) => ({
      ...prev,
      selectedItems: selected
        ? [...prev.selectedItems, path]
        : prev.selectedItems.filter((p) => p !== path),
    }));
  }, []);

  const handleDeleteItem = useCallback(
    async (item: FileServer | Folder) => {
      try {
        await fetch("/api/admin/library", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: item.path }),
        });

        loadCurrentDirectory();
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: "Error al eliminar el elemento",
        }));
      }
    },
    [loadCurrentDirectory]
  );

  const handleMoveItems = useCallback(
    async (items: string[], destination: string) => {
      try {
        await fetch("/api/admin/library/move", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items, destination }),
        });

        loadCurrentDirectory();
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: "Error al mover los elementos",
        }));
      }
    },
    [loadCurrentDirectory]
  );

  const handleCreateFolder = useCallback(
    async (name: string) => {
      try {
        const path = [...state.currentPath, name].join("/");
        await fetch("/api/admin/library/folder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path }),
        });

        loadCurrentDirectory();
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: "Error al crear la carpeta",
        }));
      }
    },
    [state.currentPath, loadCurrentDirectory]
  );

  return {
    state,
    dialogState,
    dragState,
    actions: {
      setDialogState,
      setDragState,
      loadCurrentDirectory,
      handleSelect,
      handleDeleteItem,
      handleMoveItems,
      handleCreateFolder,
      navigateToFolder: (path: string) =>
        setState((prev) => ({
          ...prev,
          currentPath: path.split("/").filter(Boolean),
        })),
      navigateUp: () =>
        setState((prev) => ({
          ...prev,
          currentPath: prev.currentPath.slice(0, -1),
        })),
    },
  };
};
