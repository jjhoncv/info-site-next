import { X } from "lucide-react";
import { FC, useState } from "react";
import { BrowserFiles } from "./BrowserFiles";
import { Field } from "./FormCreate";
import { FileServer, ServerFiles } from "./ServerFiles";

interface DialogAssetsProps {
  open: boolean;
  addFilesToForm: (field: Field, files: FileServer[]) => void;
  setOpenDialog: (value: boolean) => void;
  field?: Field;
}

export const DialogAssets: FC<DialogAssetsProps> = ({
  open,
  setOpenDialog,
  addFilesToForm,
  field,
}) => {
  const [showBrowserFiles, setShowBrowserFiles] = useState(false);

  if (!field) return null;

  return (
    <>
      {field && (
        <>
          <div
            onClick={() => {
              setOpenDialog(false);
              setShowBrowserFiles(false);
            }}
            className={`${
              open
                ? `absolute bg-black opacity-50 top-0 right-0 left-0 bottom-0 z-30`
                : `absolute h-0 w-0 `
            } transition-all`}
          ></div>
          {open && (
            <div className="flex absolute top-0 left-0 right-0 bottom-0 justify-center h-full items-center w-full">
              <div className="w-[calc(100%-20px)] md:w-[800px] z-40 bg-white flex flex-col border border-slate-200 rounded">
                <div className="w-full flex justify-between items-center p-4  bg-slate-200">
                  <div className="font-semibold">Añadir nuevo archivo</div>
                  <X
                    size={20}
                    onClick={() => setOpenDialog(false)}
                    className="cursor-pointer"
                  />
                </div>

                {showBrowserFiles ? (
                  <BrowserFiles
                    field={field}
                    setOpenDialog={(v) => {
                      setOpenDialog(v);
                      setShowBrowserFiles(false);
                    }}
                    setOpenBrowserFiles={setShowBrowserFiles}
                  />
                ) : (
                  <>
                    <ServerFiles
                      field={field}
                      setOpenDialog={setOpenDialog}
                      onAddFiles={() => setShowBrowserFiles(true)}
                      addFilesToForm={(f) => addFilesToForm(field, f)}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
