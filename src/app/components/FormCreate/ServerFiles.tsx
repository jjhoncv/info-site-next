/* eslint-disable react-hooks/exhaustive-deps */
import { FilesIcon, Plus } from "lucide-react";
import { FC, useEffect, useState } from "react";
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
  const [files, setFiles] = useState<FileServer[]>();
  const [loading, setLoading] = useState(true);
  const [selecteds, setSelecteds] = useState<string[]>([]);
  const loadFilesServer = async () => {
    try {
      const response = await fetch("/api/admin/library");
      const json = await response.json();
      const dataFiles = json.files as FileServer[];

      const extensionAlloweds = field.options?.acceptImageTypes?.map((accept) =>
        accept.split("/").pop()
      );

      const dataFilesFiltered = dataFiles.filter((file) =>
        extensionAlloweds?.includes(file.extension.split(".").pop())
      );

      setFiles(dataFilesFiltered);
    } catch (e: any) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    void loadFilesServer();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [files]);

  const onClickFinish = () => {
    const filesSelecteds = files?.filter((file, index) =>
      selecteds.includes(index.toString())
    );
    if (filesSelecteds) {
      addFilesToForm?.(filesSelecteds);
    }
  };

  const handleRemoveFile = async (file: FileServer) => {
    try {
      const response = await fetch("/api/admin/library", {
        method: "DELETE",
        body: JSON.stringify({ filePath: file.path }),
      });
      const json = await response.json();
      const dataFiles = json.files;
      dataFiles;
      loadFilesServer();
    } catch (e: any) {
      console.error(e.message);
    }
  };

  return (
    <div className="py-4 !pb-0">
      <div className="w-full flex justify-end  border-b pb-4 px-4 gap-3">
        <button className="px-4 py-2 border-sky-600 bg-white text-sky-600 rounded border">
          Crear carpeta
        </button>

        <button
          onClick={() => onAddFiles()}
          className="px-4 py-2 bg-sky-600 text-white border-transparent rounded border"
        >
          Añadir mas archivos
        </button>
      </div>
      <div className="p-8">
        <div className="min-h-[200px] h-full flex items-center">
          <>
            {!loading && (
              <>
                {files && files?.length > 0 ? (
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto max-h-[330px]">
                    {files.map((file, index) => (
                      <FilePreviewCard
                        onChangeInput={(e) => {
                          if (field.multiple) {
                            if (e.target.checked) {
                              setSelecteds([...selecteds, e.target.value]);
                            } else {
                              setSelecteds(
                                selecteds.filter(
                                  (v: any) => v !== e.target.value
                                )
                              );
                            }
                          } else {
                            setSelecteds([e.target.value]);
                          }
                        }}
                        onClickRemove={() => handleRemoveFile(file)}
                        multiple={field.multiple}
                        value={index.toString()}
                        checked={selecteds.includes(index.toString())}
                        name={file.name}
                        format={file.extension.split(".").pop() ?? ""}
                        id={index.toString()}
                        isImage={/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(
                          file.name
                        )}
                        url={file.path}
                        key={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex w-full h-full justify-center flex-col items-center gap-2">
                    <FilesIcon size={40} />
                    <p>Librería de archivos vacio</p>
                    <Button onClick={() => onAddFiles()} type="button">
                      <div className="flex items-center gap-1">
                        <Plus size={20} />
                        <div>Añadir nuevo archivo</div>
                      </div>
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        </div>
        <div></div>
      </div>
      <div className="w-full  bg-slate-200">
        <div className="flex justify-between items-center p-4">
          <button
            type="button"
            onClick={() => setOpenDialog(false)}
            className="bg-white border rounded px-4 py-2 "
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onClickFinish()}
            className="bg-gray-800 text-white border rounded px-4 py-2 "
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
