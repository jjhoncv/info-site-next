import { AlertTriangle, CheckCircleIcon, File, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";

export interface FilePreview {
  id: string;
  file: File;
  preview: string;
  isValid: boolean;
  errors?: string[];
}

interface FilePreviewCardProps {
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickRemove?: () => void;
  checked?: boolean;
  isValid?: boolean;
  errors?: string[];
  isImage: boolean;
  url: string;
  name: string;
  id: string;
  value: string;
  format: string;
  withValidation?: boolean;
  multiple?: boolean;
}

export const FilePreviewCard: FC<FilePreviewCardProps> = ({
  onChangeInput,
  onClickRemove,
  name,
  id,
  value,
  isValid,
  checked,
  errors,
  isImage,
  url,
  format,
  withValidation,
  multiple,
}) => {
  return (
    <div className={`w-full border relative rounded border-slate-300 `}>
      <input
        type={multiple ? "checkbox" : "radio"}
        className="absolute w-4 h-4 m-2 flex cursor-pointer z-40"
        onChange={onChangeInput}
        value={value}
        checked={checked}
      />
      <Trash2
        size={28}
        strokeWidth={1}
        className="absolute right-0 m-1 cursor-pointer z-40 hover:bg-slate-200 rounded-full p-1 flex"
        onClick={onClickRemove}
      />

      <div className="flex justify-center relative">
        <>
          {withValidation && (
            <>
              {isValid ? (
                <div className="absolute right-2.5 bottom-2">
                  <CheckCircleIcon size={18} className="stroke-green-500" />
                </div>
              ) : (
                <div className="group absolute right-2.5 bottom-2 hover:last:block">
                  <AlertTriangle size={18} className="stroke-red-500" />

                  <div className="invisible bg-white text-sm px-3 py-1 w-[300px] z-50 border rounded border-red-600 absolute group-hover:visible transition-all">
                    {(errors &&
                      errors?.length > 0 &&
                      errors.map((error) => error).join("")) ||
                      ""}
                  </div>
                </div>
              )}
            </>
          )}
        </>
        <div className={`relative h-[100px] aspect-square overflow-hidden  `}>
          {isImage ? (
            <Image
              src={url}
              alt={`Preview ${id + 1}`}
              sizes="200px"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex justify-center h-full items-center">
              <File size={50} strokeWidth={1} />
            </div>
          )}
        </div>
      </div>
      <div className=" text-sm p-2 border border-t-slate-300 border-b-0 border-l-0 border-r-0 ">
        <div className="flex flex-col">
          <div className="overflow-ellipsis overflow-hidden text-nowrap">
            {name}
          </div>
          <div className="uppercase text-xs">{format}</div>
        </div>
      </div>
    </div>
  );
};
