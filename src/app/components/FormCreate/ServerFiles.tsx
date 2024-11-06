import { FilesIcon, Plus } from "lucide-react";
import React, { FC } from "react";
import { Button } from "../Form/Input/Button";

interface ServerFiles {
  onAddFiles: () => void;
  setOpenDialog: (value: boolean) => void;
}

export const ServerFiles: FC<ServerFiles> = ({ onAddFiles, setOpenDialog }) => {
  return (
    <div className="py-4 !pb-0">
      <div className="w-full flex justify-end  border-b pb-4 px-4">
        <button className="px-4 py-2 bg-sky-600 text-white border-transparent rounded border">
          Crear carpeta
        </button>
      </div>
      <div className="p-8">
        <div className="min-h-[200px] h-full flex items-center">
          <div className="flex w-full h-full justify-center flex-col items-center gap-2">
            <FilesIcon size={40} />
            <p>Librería de archivos vacio</p>
            <Button onClick={onAddFiles} type="button">
              <Plus size={20} />
              <div>Añadir nuevo archivo</div>
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full  bg-slate-200">
        <div className="flex justify-between items-center p-4">
          <button
            onClick={() => setOpenDialog(false)}
            className="bg-white border rounded px-4 py-2 "
          >
            Cancelar
          </button>
          <button className="bg-gray-800 text-white border rounded px-4 py-2 ">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
