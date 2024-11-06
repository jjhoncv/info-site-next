import { schemaImageValidation } from "@/lib/schemaImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlusIcon } from "lucide-react";
import React, { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../Form/Input/Button";
import { FieldFile, FileOptions } from "./FormCreate";
import { z } from "zod";
import { createDynamicSchema } from "./createDynamicSchema";

interface BrowserFilesProps {
  setOpenDialog: (value: boolean) => void;
  field: FieldFile;
}

export const BrowserFiles: FC<BrowserFilesProps> = ({
  setOpenDialog,
  field,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList>();

  //   const;

  //   const schemaFields: Record<string, z.ZodTypeAny> = {};

  const fieldSchema = createDynamicSchema([
    {
      options: field.options,
      key: field.key,
      type: "file",
      multiple: field.multiple ?? false,

      //   ...field.options,
      //   multiple: field.multiple ?? false,
    },
  ]);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(fieldSchema),

    mode: "onChange",
  });

  const onClickFile = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (isValid) {
    }
  }, [isValid]);

  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {};

  const onSubmit = async (data: any) => {
    if (isValid) {
      console.log({ data });
    }
  };

  console.log("errors", errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-8">
        <div className="min-h-[200px] bg-slate-200 h-full flex items-center">
          <div className="flex w-full h-full justify-center flex-col items-center gap-2">
            <ImagePlusIcon size={40} />
            <p>Arrastra y suelta aquí ó</p>
            {errors && (
              <p className="text-red-600">
                {(errors[field.key] as any)?.message}
              </p>
            )}
            <input
              accept={field.options.acceptImageTypes.join(",")}
              {...register(field.key)}
              onChange={(e) => onChangeInput(e)}
              //   className="hidden"
              //   ref={inputRef}
              type="file"
              multiple={field.multiple}
            />
            {/* <Button onClick={onClickFile} type="button">
              Examinar archivos
            </Button> */}
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
          <button
            type="submit"
            className="bg-gray-800 text-white border rounded px-4 py-2 "
          >
            Aceptar
          </button>
        </div>
      </div>
    </form>
  );
};
