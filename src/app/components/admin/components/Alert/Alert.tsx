import { AlertTriangle, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";
import { Button } from "../Form/Input/Button";

interface AlertProps {
  message: React.ReactNode;
  title?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const Alert: FC<AlertProps> = ({
  title,
  message,
  onSuccess,
  onCancel,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const open = searchParams.get("action") === "alert";

  return (
    <>
      {open && (
        <div>
          <div
            onClick={() => {
              const urlParams = new URLSearchParams(window.location.search);
              urlParams.delete("action");
              urlParams.delete("id");
              router.push("/dashboard/roles");
            }}
            className={`${
              open ? `block` : `hidden`
            } fixed top-0 left-0 md:left-[256px] right-0 bottom-0 w-full h-full z-40 bg-[#00000036] mx-auto `}
          />
          <div className="flex rounded-lg shadow-lg flex-col left-0 md:left-[256px] right-0 mx-auto z-50 absolute  bg-white w-[calc(100%-40px)] md:w-[450px] md:min-h-[200px]">
            <div className="p-2">
              <div className="font-semibold px-3 py-3 relative">
                {title ?? "Notificación"}
                <XIcon
                  className="absolute right-2 cursor-pointer top-2.5"
                  size={28}
                  strokeWidth={0.8}
                  onClick={onCancel}
                />
              </div>
              <hr />
              {message && (
                <div className="p-6 min-h-[100px] flex">
                  <div className="flex gap-3 items-center">
                    <AlertTriangle size={30} strokeWidth={0.9} />
                    <p>{message}</p>
                  </div>
                </div>
              )}
              {/* <hr /> */}
              <div className="gap-3 flex justify-end p-3 py-4">
                {onCancel && (
                  <Button outline type="button" onClick={onCancel}>
                    Cancelar
                  </Button>
                )}
                {onSuccess && (
                  <Button type="button" onClick={onSuccess}>
                    Aceptar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
