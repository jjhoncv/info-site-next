"use client";
import { FetchCustomBody } from "@/lib/FetchCustomBody";
import { handleKeyDown } from "@/lib/form";
import { isImageFile } from "@/lib/isImageFile";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { CardContent } from "../CardContent/CardContent";
import { Button } from "../Form/Input/Button";
import { Input } from "../Form/Input/Input";
import { createDynamicSchema } from "./createDynamicSchema";
import { DialogAssets } from "./DialogAssets";
import { extractDefaultValues } from "./extractDefaultValues";
import { SliderImages } from "./SliderImages";
import { Field } from "./types/fileManagement";

// Types

interface FormCreateProps {
  type?: "new" | "edit";
  api: {
    url: string;
    method: "PUT" | "PATCH" | "POST" | "DELETE";
    withFiles: boolean;
  };
  form: {
    redirect: string;
    fields: Field[];
    customFields?: object;
  };
}

export const FormCreate: FC<FormCreateProps> = ({
  type = "new",
  api,
  form: { redirect, fields: initialFields, customFields },
}) => {
  const router = useRouter();
  const [fields, setFields] = useState<Field[]>(initialFields);
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    selectedField: Field | null;
  }>({
    isOpen: false,
    selectedField: null,
  });

  const schema = createDynamicSchema(fields);
  const defaultValues = extractDefaultValues(fields);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const handleFileSelect = useCallback((field: Field) => {
    setDialogState({
      isOpen: true,
      selectedField: field,
    });
  }, []);

  const handleFilesAdd = useCallback(
    (field: Field, files: any[]) => {
      setValue(field.key, files);
      setFields((prev) =>
        prev.map((prevField) =>
          prevField.key === field.key
            ? {
                ...prevField,
                value: files.map((f) => f.path),
              }
            : prevField
        )
      );
      setDialogState({ isOpen: false, selectedField: null });
    },
    [setValue]
  );

  const onSubmit = async (data: any, e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Procesar campos
      Object.entries(data).forEach(([key, value]: any) => {
        const field = fields.find((f) => f.key === key);
        if (!field) return;

        if (field.type === "file") {
          if (value && value.length > 0) {
            if (field.multiple) {
              value.forEach((file: any) => {
                formData.append(`${key}[]`, file.path);
              });
            } else if (value[0].path) {
              formData.append(key, value[0].path);
            }
          }
        } else {
          formData.append(key, value);
        }
      });

      // Agregar customFields si existe
      if (customFields) {
        Object.entries(customFields).forEach(([key, value]) => {
          formData.append(key, value.toString());
        });
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

  const renderField = (field: Field) => {
    switch (field.type) {
      case "text":
      case "textarea":
        return (
          <Input
            {...register(field.key)}
            error={errors[field.key] as any}
            label={field.label}
            type={field.type}
            rows={field.type === "textarea" ? 2 : undefined}
            onKeyDown={handleKeyDown}
          />
        );
      case "file":
        return (
          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-250">{field.label}</label>
            {field.value &&
            Array.isArray(field.value) &&
            field.value.length > 0 ? (
              <div className="bg-slate-100 w-full flex border border-gray-300 items-center rounded px-3 py-2 min-h-[240px]">
                <div className="w-full h-full max-h-[240px]">
                  {field.value.every(isImageFile) ? (
                    <SliderImages
                      images={field.value}
                      onClickEdit={() => handleFileSelect(field)}
                    />
                  ) : (
                    <ul>
                      {field.value.map((file, index) => (
                        <li key={index}>{file}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div
                onClick={() => handleFileSelect(field)}
                className="bg-slate-100 w-full flex border border-gray-300 items-center rounded px-3 py-2 min-h-[240px] cursor-pointer hover:bg-slate-200 transition-colors"
              >
                <div className="gap-2 items-center w-full justify-center flex-col flex">
                  <ImageIcon size={30} className="text-gray-400" />
                  <p className="text-center text-gray-500">
                    Click para añadir un archivo o arrasta y suelta un archivo
                    en esta área
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {dialogState.isOpen && dialogState.selectedField && (
        <DialogAssets
          open={dialogState.isOpen}
          setOpenDialog={(isOpen) =>
            setDialogState((prev) => ({ ...prev, isOpen }))
          }
          addFilesToForm={handleFilesAdd}
          field={dialogState.selectedField}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
        <div className="flex flex-col gap-4 2xl:gap-6 xl:flex-row w-full">
          <CardContent className="w-full xl:w-3/4 md:!mb-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {fields.map((field, index) => (
                <div
                  key={`${field.key}-${index}`}
                  className="flex flex-col gap-1 mb-4"
                >
                  {renderField(field)}
                </div>
              ))}
            </div>
          </CardContent>
          <CardContent className="w-full xl:w-1/4 md:!mb-0 md:!mt-0 xl:!mt-7">
            <div className="border-b">
              <p className="font-semibold text-xs pb-2 uppercase">
                Información
              </p>
            </div>

            <ul className="my-5  text-sm gap-2 flex flex-col">
              <ul>
                <li className="flex w-full justify-between">
                  <p className="font-semibold">Create</p>
                  <div>23/07/2042</div>
                </li>
                <li className="flex w-full justify-between">
                  <p className="font-semibold">By</p>
                  <div>Jhonnatan Castro</div>
                </li>
              </ul>
              <ul>
                <li className="flex w-full justify-between">
                  <p className="font-semibold">Last update</p>
                  <div>14/08/2025</div>
                </li>
                <li className="flex w-full justify-between">
                  <p className="font-semibold">By</p>
                  <div>Renzo Larrea</div>
                </li>
              </ul>
            </ul>
          </CardContent>
        </div>
        <div className="flex gap-3 justify-end mt-8">
          <Button type="cancel" href={redirect} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {type === "edit" ? "Guardar cambios" : "Añadir"}
          </Button>
        </div>
      </form>
    </>
  );
};
