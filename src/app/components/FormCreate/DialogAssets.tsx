import { FilesIcon, Plus, X } from "lucide-react";
import React, { FC, useState } from "react";
import { Button } from "../Form/Input/Button";
import { ServerFiles } from "./ServerFiles";
import { BrowserFiles } from "./BrowserFiles";
import { FieldFile, FileOptions } from "./FormCreate";

interface DialogAssetsProps {
  open: boolean;
  onClose: (files: FileList) => void;
  setOpenDialog: (value: boolean) => void;
  field?: FieldFile;
}

export const DialogAssets: FC<DialogAssetsProps> = ({
  open,
  setOpenDialog,
  onClose,
  field,
}) => {
  const onAddFiles = () => {};
  const [showBrowserFiles, setShowBrowserFiles] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpenDialog(false)}
        className={`${
          open
            ? `absolute bg-black opacity-50 top-0 right-0 left-0 bottom-0 z-30`
            : `absolute h-0 w-0 `
        } transition-all`}
      ></div>
      {open && (
        <div className="flex absolute top-0 left-0 right-0 bottom-0 justify-center h-full items-center w-full">
          <div className="w-[calc(100%-20px)] z-40 bg-white flex flex-col border border-slate-200 rounded">
            <div className="w-full flex justify-between items-center p-4  bg-slate-200">
              <div className="font-semibold">Añadir nuevo archivo</div>
              <X
                size={20}
                onClick={() => setOpenDialog(false)}
                className="cursor-pointer"
              />
            </div>

            {showBrowserFiles && field ? (
              <BrowserFiles
                field={field}
                setOpenDialog={(v) => {
                  setOpenDialog(v);
                  setShowBrowserFiles(false);
                }}
              />
            ) : (
              <ServerFiles
                setOpenDialog={setOpenDialog}
                onAddFiles={() => setShowBrowserFiles(true)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
