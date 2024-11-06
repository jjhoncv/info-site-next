"use client";
import { FetchCustomBody } from "@/lib/FetchCustomBody";
import { handleKeyDown } from "@/lib/form";
import { RenderPreviewImage } from "@/lib/renderPreviewImage";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CardContent } from "../CardContent/CardContent";
import { Button } from "../Form/Input/Button";
import { Input } from "../Form/Input/Input";
import { createDynamicSchema } from "./createDynamicSchema";
import { formatBytes } from "@/lib/formatBytes";
import { Image } from "lucide-react";
import { DialogAssets } from "./DialogAssets";

interface FieldRequired {
  min?: string;
  url?: string;
}

interface FieldBasic {
  key: string;
  label?: string;
  value?: any;
  required?: FieldRequired | boolean;
}

interface FieldPrimary extends FieldBasic {
  type: "primary";
}

interface FieldText extends FieldBasic {
  type: "text";
}

interface FieldTextarea extends FieldBasic {
  type: "textarea";
}

export interface FileOptions {
  acceptImageTypes: string[];
  maxFileSize: number;
  dimensions: {
    min: { width: number; height: number };
    max: { width: number; height: number };
  };
}

export interface FieldFile extends FieldBasic {
  type: "file";
  value?: string | string[]; // URL o array de URLs para imágenes existentes
  imageURL?: string;
  multiple?: boolean;
  options: FileOptions;
}

// interface FieldOptions {}

export type Field = FieldText | FieldFile | FieldTextarea | FieldPrimary;

interface FormCreateProps {
  api: {
    url: string;
    method: "PUT" | "PATCH" | "POST" | "DELETE";
    withFiles: boolean;
  };
  form: {
    redirect: string;
    fields: Field[];
    id?: string;
  };
}

// Función para extraer valores por defecto
const extractDefaultValues = (fields: Field[]) => {
  return fields.reduce((acc, field) => {
    if ("value" in field && field.value !== undefined) {
      acc[field.key] = field.value;
    }
    return acc;
  }, {} as Record<string, any>);
};

export const FormCreate: FC<FormCreateProps> = ({
  api,
  form: { redirect, fields, id },
}) => {
  const router = useRouter();

  const schema = createDynamicSchema(fields);

  const defaultValues = extractDefaultValues(fields);

  const [fieldFile, setFieldFile] = useState<FieldFile>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const [existingImages, setExistingImages] = useState<
    Record<string, string[]>
  >({});

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Inicializar las imágenes existentes
    const imageFields = fields.filter(
      (field): field is FieldFile =>
        field.type === "file" && field.value !== undefined
    );

    const initialImages = imageFields.reduce((acc, field) => {
      acc[field.key] = Array.isArray(field.value)
        ? field.value
        : field.value
        ? [field.value]
        : [];
      return acc;
    }, {} as Record<string, string[]>);

    setExistingImages(initialImages);
  }, [fields]);

  const handleRemoveImage = (fieldKey: string, index: number) => {
    setExistingImages((prev) => ({
      ...prev,
      [fieldKey]: prev[fieldKey]?.filter((_, i) => i !== index),
    }));
  };

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();

      for (const key in data) {
        const field = fields.find((f) => f.key === key);
        if (!field) continue;

        if (field.type === "file") {
          const files = data[key];
          if (files instanceof FileList) {
            if (field.multiple) {
              Array.from(files).forEach((file, index) => {
                formData.append(`${key}[]`, file);
              });
            } else {
              // Para un solo archivo
              if (files.length > 0) {
                formData.append(key, files[0]);
              }
            }
          }

          // Agregar URLs de imágenes existentes que no fueron eliminadas
          if (existingImages[key]?.length) {
            existingImages[key].forEach((url) => {
              formData.append(`${key}_existing[]`, url);
            });
          }
        } else {
          formData.append(key, data[key]);
        }
      }

      const message = await FetchCustomBody({
        data: formData,
        ...api,
      });

      ToastSuccess(message);
      router.push(redirect);
      router.refresh();
    } catch (error: any) {
      ToastFail(error.message);
    }
  };

  const handleClick = () => {};
  return (
    <CardContent>
      <DialogAssets
        open={openDialog}
        setOpenDialog={setOpenDialog}
        onClose={(files: FileList) => {}}
        field={fieldFile}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, key) => (
          <div key={key} className="flex flex-col gap-1 mb-4">
            {field.type === "text" && (
              <Input
                {...register(field.key)}
                error={errors[field.key] as any}
                label={field.label}
                type={field.type}
                onKeyDown={handleKeyDown}
              />
            )}

            {field.type === "textarea" && (
              <Input
                {...register(field.key)}
                error={errors[field.key] as any}
                label={field.label}
                type={field.type}
                rows={2}
                onKeyDown={handleKeyDown}
              />
            )}

            {field.type === "file" && (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold pl-1">
                    {field.label}
                  </label>
                  <div
                    onClick={() => {
                      setOpenDialog(true);
                      setFieldFile(field);
                    }}
                    className="bg-slate-100 w-full flex border items-center rounded px-3 py-2 min-h-[180px]"
                  >
                    <div className="gap-2 items-center w-full justify-center flex-col flex">
                      <Image size={30} />
                      <p>
                        Click para añadir un archivo o arrasta y suelta un
                        archivo en esta area
                      </p>
                    </div>
                  </div>
                </div>
                {/* <Input
                  {...register(field.key)}
                  error={errors[field.key] as any}
                  label={field.label}
                  type="file"
                  multiple={field.multiple}
                  options={field.options}
                  accept={field.options.acceptImageTypes.join(",")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    if (files?.length) {
                      register(field.key).onChange(e);
                    }
                  }}
                />

                <div
                  className={`bg-slate-100 w-full border rounded px-3 py-2 min-h-[180px] relative`}
                >
                  <RenderPreviewImage
                    field={watch(field.key)}
                    imageURL={existingImages[field.key]?.[0]}
                    multiple={field.multiple}
                    className="h-[100px]"
                    onRemove={
                      field.multiple
                        ? (index) => handleRemoveImage(field.key, index)
                        : undefined
                    }
                  />
                </div> */}
              </>
            )}
          </div>
        ))}

        <div className="flex gap-3 justify-end mt-8">
          <Button type="cancel" href={redirect}>
            Cancelar
          </Button>
          <Button type="submit">Añadir</Button>
        </div>
      </form>
    </CardContent>
  );
};
