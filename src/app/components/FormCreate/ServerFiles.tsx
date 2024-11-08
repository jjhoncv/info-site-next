import { FilesIcon, Plus } from "lucide-react";
import { FC, useCallback, useEffect, useState } from "react";
import { Button } from "../Form/Input/Button";
import { FilePreviewCard } from "./FilePreviewCard";
import { Field } from "./FormCreate";

export interface FileServer {
  createdAt: string;
  extension: string;
  modifiedAt: string;
  name: string;
  path: string;
  size: number;
  type: "file";
}

interface ServerFilesProps {
  onAddFiles: () => void;
  setOpenDialog: (value: boolean) => void;
  addFilesToForm: (files: FileServer[]) => void;
  field: Field;
}

export const ServerFiles: FC<ServerFilesProps> = ({
  onAddFiles,
  setOpenDialog,
  addFilesToForm,
  field,
}) => {
  const [state, setState] = useState<{
    files: FileServer[];
    loading: boolean;
    error: string | null;
  }>({
    files: [],
    loading: true,
    error: null,
  });
  const [selecteds, setSelecteds] = useState<string[]>([]);

  const loadFilesServer = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await fetch("/api/admin/library");
      const json = await response.json();
      const dataFiles = json.files as FileServer[];

      const extensionAlloweds = field.options?.acceptImageTypes?.map((accept) =>
        accept.split("/").pop()
      );

      const dataFilesFiltered = dataFiles.filter((file) =>
        extensionAlloweds?.includes(file.extension.split(".").pop())
      );

      setState({
        files: dataFilesFiltered,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error ? error.message : "Error al cargar archivos",
      }));
      console.error("Error loading files:", error);
    }
  }, [field.options?.acceptImageTypes]);

  useEffect(() => {
    loadFilesServer();
  }, [loadFilesServer]);

  const handleFileSelect = useCallback(
    (value: string, checked: boolean) => {
      setSelecteds((prev) => {
        if (field.multiple) {
          return checked ? [...prev, value] : prev.filter((v) => v !== value);
        }
        return checked ? [value] : [];
      });
    },
    [field.multiple]
  );

  const handleRemoveFile = async (file: FileServer) => {
    try {
      await fetch("/api/admin/library", {
        method: "DELETE",
        body: JSON.stringify({ filePath: file.path }),
      });
      await loadFilesServer(); // Recargar archivos después de eliminar
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };

  const handleFinish = () => {
    const filesSelecteds = state.files.filter((_, index) =>
      selecteds.includes(index.toString())
    );
    if (filesSelecteds.length) {
      addFilesToForm(filesSelecteds);
    }
  };

  const renderContent = () => {
    if (state.loading) {
      return (
        <div className="flex justify-center items-center h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      );
    }

    if (state.error) {
      return (
        <div className="flex flex-col items-center justify-center h-[200px] text-red-500">
          <p>Error al cargar los archivos</p>
          <button onClick={loadFilesServer} className="mt-2 text-sm underline">
            Intentar de nuevo
          </button>
        </div>
      );
    }

    if (!state.files.length) {
      return (
        <div className="flex w-full h-full justify-center flex-col items-center gap-2">
          <FilesIcon size={40} />
          <p>Librería de archivos vacía</p>
          <Button onClick={onAddFiles} type="button">
            <div className="flex items-center gap-1">
              <Plus size={20} />
              <div>Añadir nuevo archivo</div>
            </div>
          </Button>
        </div>
      );
    }

    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto max-h-[330px]">
        {state.files.map((file, index) => (
          <FilePreviewCard
            key={`${file.path}-${index}`}
            onChangeInput={(e) =>
              handleFileSelect(e.target.value, e.target.checked)
            }
            onClickRemove={() => handleRemoveFile(file)}
            multiple={field.multiple}
            value={index.toString()}
            checked={selecteds.includes(index.toString())}
            name={file.name}
            format={file.extension.split(".").pop() ?? ""}
            id={index.toString()}
            isImage={/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.name)}
            url={file.path}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="py-4 !pb-0">
      <div className="w-full flex justify-end border-b pb-4 px-4 gap-3">
        <button className="px-4 py-2 border-sky-600 bg-white text-sky-600 rounded border">
          Crear carpeta
        </button>

        <button
          onClick={onAddFiles}
          className="px-4 py-2 bg-sky-600 text-white border-transparent rounded border"
        >
          Añadir más archivos
        </button>
      </div>

      <div className="p-8">
        <div className="min-h-[200px] h-full flex items-center">
          {renderContent()}
        </div>
      </div>

      <div className="w-full bg-slate-200">
        <div className="flex justify-between items-center p-4">
          <button
            type="button"
            onClick={() => setOpenDialog(false)}
            className="bg-white border rounded px-4 py-2"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleFinish}
            disabled={!selecteds.length || state.loading}
            className="bg-gray-800 text-white border rounded px-4 py-2 disabled:bg-gray-400"
          >
            Aceptar ({selecteds.length} seleccionados)
          </button>
        </div>
      </div>
    </div>
  );
};
