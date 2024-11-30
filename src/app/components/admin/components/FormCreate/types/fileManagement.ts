export interface FileServer {
  createdAt: string;
  extension: string;
  modifiedAt: string;
  name: string;
  path: string;
  size: number;
  type: "file";
}

export interface FieldRequired {
  min?: string;
  url?: string;
}

export interface FieldBasic {
  key: string;
  label?: string;
  value?: any;
  required?: FieldRequired | boolean;
}

export interface FileOptions {
  acceptImageTypes: string[] | undefined;
  maxFileSize: number | undefined;
  dimensions?:
    | {
        min: { width: number; height: number };
        max: { width: number; height: number };
      }
    | undefined;
}

export type FieldType = "primary" | "text" | "textarea" | "file";

export interface Field extends FieldBasic {
  type: FieldType;
  multiple?: boolean;
  options?: FileOptions;
}

export interface ServerFilesProps {
  onAddFiles: () => void;
  setOpenDialog: (value: boolean) => void;
  addFilesToForm: (files: FileServer[]) => void;
  field: Field;
}
