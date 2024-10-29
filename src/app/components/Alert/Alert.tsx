import { useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";

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
            } fixed top-0 left-[256px] right-0 bottom-0 w-full h-full z-40 bg-[#00000036] mx-auto `}
          />
          <div className="flex  rounded-lg shadow-lg flex-col left-[256px] right-0 mx-auto z-50 absolute  bg-white w-[400px] min-h-[200px]">
            <div className="font-semibold px-6 py-3">
              {title ?? "Notificación"}
            </div>
            <hr />
            {message && <div className="p-6 min-h-[100px]">{message}</div>}
            <hr />
            <div className="gap-2 flex justify-end p-4">
              {onCancel && (
                <button
                  className="border border-gray-400 text-[#374151]  rounded px-6 py-2"
                  onClick={onCancel}
                >
                  Cancelar
                </button>
              )}
              {onSuccess && (
                <button
                  className="bg-[#374151] text-white  rounded px-6 py-2"
                  onClick={onSuccess}
                >
                  <div className="flex gap-2 items-center">Aceptar</div>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
