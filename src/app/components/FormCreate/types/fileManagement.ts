export interface FileServer {
  createdAt: string;
  extension: string;
  modifiedAt: string;
  name: string;
  path: string;
  size: number;
  type: "file";
}

export interface Folder {
  name: string;
  path: string;
  itemCount: number;
  createdAt: string;
  modifiedAt: string;
  type: "folder";
}

export interface FileOptions {
  acceptImageTypes: string[];
  maxFileSize: number;
  dimensions?: {
    min: { width: number; height: number };
    max: { width: number; height: number };
  };
}

export interface Field {
  key: string;
  label?: string;
  type: "file";
  multiple?: boolean;
  options: FileOptions;
}

export interface ServerFilesProps {
  onAddFiles: () => void;
  setOpenDialog: (value: boolean) => void;
  addFilesToForm: (files: FileServer[]) => void;
  field: Field;
}

export interface FileManagerState {
  files: FileServer[];
  folders: Folder[];
  selectedItems: string[];
  currentPath: string[];
  loading: boolean;
  error: string | null;
}

export interface DialogState {
  isOpen: boolean;
  type: "createFolder" | "delete" | "move" | null;
  targetItem?: FileServer | Folder | null;
}
