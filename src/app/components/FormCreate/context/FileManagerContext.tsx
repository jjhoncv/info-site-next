import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import {
  FileManagerState,
  FileServer,
  Folder,
  DialogState,
} from "../types/fileManagement";

interface FileManagerContextType {
  state: FileManagerState;
  dispatch: React.Dispatch<FileManagerAction>;
  actions: typeof fileManagerActions;
}

type FileManagerAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_FILES"; payload: FileServer[] }
  | { type: "SET_FOLDERS"; payload: Folder[] }
  | { type: "SET_SELECTED_ITEMS"; payload: string[] }
  | { type: "SET_CURRENT_PATH"; payload: string[] }
  | { type: "ADD_SELECTED_ITEM"; payload: string }
  | { type: "REMOVE_SELECTED_ITEM"; payload: string }
  | { type: "CLEAR_SELECTED_ITEMS" }
  | { type: "SET_DIALOG"; payload: DialogState }
  | { type: "RESET_STATE" };

const initialState: FileManagerState = {
  files: [],
  folders: [],
  selectedItems: [],
  currentPath: [],
  loading: false,
  error: null,
};

const FileManagerContext = createContext<FileManagerContextType | undefined>(
  undefined
);

// Reducer
const fileManagerReducer = (
  state: FileManagerState,
  action: FileManagerAction
): FileManagerState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_FILES":
      return { ...state, files: action.payload };
    case "SET_FOLDERS":
      return { ...state, folders: action.payload };
    case "SET_SELECTED_ITEMS":
      return { ...state, selectedItems: action.payload };
    case "SET_CURRENT_PATH":
      return { ...state, currentPath: action.payload };
    case "ADD_SELECTED_ITEM":
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.payload],
      };
    case "REMOVE_SELECTED_ITEM":
      return {
        ...state,
        selectedItems: state.selectedItems.filter(
          (item) => item !== action.payload
        ),
      };
    case "CLEAR_SELECTED_ITEMS":
      return { ...state, selectedItems: [] };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

// Actions
const fileManagerActions = {
  loadDirectory: async (
    dispatch: React.Dispatch<FileManagerAction>,
    path: string
  ) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await fetch(`/api/admin/library?path=${path}`);
      const data = await response.json();

      dispatch({ type: "SET_FILES", payload: data.files });
      dispatch({ type: "SET_FOLDERS", payload: data.folders });
      dispatch({ type: "SET_ERROR", payload: null });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error al cargar el directorio" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  },

  createFolder: async (
    dispatch: React.Dispatch<FileManagerAction>,
    currentPath: string[],
    folderName: string
  ) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const path = [...currentPath, folderName].join("/");
      await fetch("/api/admin/library/folder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      });

      await fileManagerActions.loadDirectory(dispatch, currentPath.join("/"));
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error al crear la carpeta" });
    }
  },

  deleteItem: async (
    dispatch: React.Dispatch<FileManagerAction>,
    path: string,
    currentPath: string[]
  ) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await fetch("/api/admin/library", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      });

      await fileManagerActions.loadDirectory(dispatch, currentPath.join("/"));
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error al eliminar el elemento" });
    }
  },

  moveItems: async (
    dispatch: React.Dispatch<FileManagerAction>,
    items: string[],
    destination: string,
    currentPath: string[]
  ) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await fetch("/api/admin/library/move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, destination }),
      });

      await fileManagerActions.loadDirectory(dispatch, currentPath.join("/"));
      dispatch({ type: "CLEAR_SELECTED_ITEMS" });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error al mover los elementos" });
    }
  },
};

// Provider Component
export const FileManagerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(fileManagerReducer, initialState);

  return (
    <FileManagerContext.Provider
      value={{ state, dispatch, actions: fileManagerActions }}
    >
      {children}
    </FileManagerContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useFileManagerContext = () => {
  const context = useContext(FileManagerContext);
  if (context === undefined) {
    throw new Error(
      "useFileManagerContext must be used within a FileManagerProvider"
    );
  }
  return context;
};

// Hook de utilidad para acciones comunes
export const useFileManagerActions = () => {
  const { state, dispatch, actions } = useFileManagerContext();

  return {
    state,
    loadCurrentDirectory: useCallback(() => {
      actions.loadDirectory(dispatch, state.currentPath.join("/"));
    }, [actions, dispatch, state.currentPath]),

    createFolder: useCallback(
      (folderName: string) => {
        actions.createFolder(dispatch, state.currentPath, folderName);
      },
      [actions, dispatch, state.currentPath]
    ),

    deleteItem: useCallback(
      (path: string) => {
        actions.deleteItem(dispatch, path, state.currentPath);
      },
      [actions, dispatch, state.currentPath]
    ),

    moveItems: useCallback(
      (items: string[], destination: string) => {
        actions.moveItems(dispatch, items, destination, state.currentPath);
      },
      [actions, dispatch, state.currentPath]
    ),

    selectItem: useCallback(
      (path: string, selected: boolean) => {
        if (selected) {
          dispatch({ type: "ADD_SELECTED_ITEM", payload: path });
        } else {
          dispatch({ type: "REMOVE_SELECTED_ITEM", payload: path });
        }
      },
      [dispatch]
    ),

    navigateToFolder: useCallback(
      (path: string) => {
        dispatch({
          type: "SET_CURRENT_PATH",
          payload: path.split("/").filter(Boolean),
        });
      },
      [dispatch]
    ),

    navigateUp: useCallback(() => {
      dispatch({
        type: "SET_CURRENT_PATH",
        payload: state.currentPath.slice(0, -1),
      });
    }, [dispatch, state.currentPath]),
  };
};
