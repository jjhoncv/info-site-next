import { Trash2Icon, UploadCloudIcon } from "lucide-react";
import ImageNext from "next/image";
import React, { forwardRef, useState } from "react";
import { FieldError, UseFormSetError } from "react-hook-form";

// Tipos base para props comunes
type BaseProps = {
  label?: string;
  error?: FieldError;
  className?: string;
  formatFilesSupport?: string[];
  maxSizeFile?: number;
  sizePixels?: { width: number; height: number };
  placeholder?: string;
  setError?: UseFormSetError<{
    title: string;
    subtitle: string;
    description: string;
    link: string;
    image_url: File;
  }>;
};

// Tipos específicos para cada variante
type TextInputProps = BaseProps & {
  type: "text" | "email" | "password" | "number" | "search";
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

type TextareaProps = BaseProps & {
  type: "textarea";
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "type">;

type FileInputProps = BaseProps & {
  type: "file";
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

type CheckboxInputProps = BaseProps & {
  type: "checkbox";
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

// Unión de todos los tipos posibles
type InputProps =
  | TextInputProps
  | TextareaProps
  | FileInputProps
  | CheckboxInputProps;

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      label,
      type,
      error,
      className = "",
      formatFilesSupport,
      maxSizeFile,
      sizePixels,
      setError,
      ...props
    },
    ref
  ) => {
    const baseClassName = "bg-slate-100 w-full border rounded px-3 py-2";
    const errorClassName = error
      ? "border-red-500"
      : "border-gray-200 hover:border-gray-300";
    const focusClassName = "focus:outline-none";
    const checkboxClassName = type === "checkbox" ? "w-4 h-4" : "";

    const inputClassName = `${baseClassName} ${errorClassName} ${focusClassName} ${checkboxClassName} ${className}`;

    if (type === "textarea") {
      const { onChange, ...textareaProps } =
        props as React.TextareaHTMLAttributes<HTMLTextAreaElement>;
      return (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold pl-1">{label}</label>
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={inputClassName}
            onChange={onChange}
            {...textareaProps}
          />
          {error && (
            <p className="text-sm text-red-600 mt-1">{error.message}</p>
          )}
        </div>
      );
    }

    if (type === "checkbox") {
      const { onChange, ...checkboxProps } =
        props as React.InputHTMLAttributes<HTMLInputElement>;
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              ref={ref as React.Ref<HTMLInputElement>}
              className={inputClassName}
              onChange={onChange}
              {...checkboxProps}
            />
            <label className="text-sm">{label}</label>
          </div>
          {error && (
            <p className="text-sm text-red-600 mt-1">{error.message}</p>
          )}
        </div>
      );
    }

    if (type === "search") {
      const { onChange, ...checkboxProps } =
        props as React.InputHTMLAttributes<HTMLInputElement>;
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <input
              type="text"
              ref={ref as React.Ref<HTMLInputElement>}
              className={inputClassName}
              onChange={onChange}
              {...checkboxProps}
            />
            <label className="text-sm">{label}</label>
          </div>
          {error && (
            <p className="text-sm text-red-600 mt-1">{error.message}</p>
          )}
        </div>
      );
    }

    // if (type === "file") {
    //   const { onChange, ...fileProps } =
    //     props as React.InputHTMLAttributes<HTMLInputElement>;

    //   const [previewImage, setPreviewImage] = useState<string>();

    //   const validateImage = (
    //     file: File,
    //     image: HTMLImageElement
    //   ): Promise<string[]> => {
    //     return new Promise((resolve) => {
    //       const errors: string[] = [];

    //       // Validar tamaño del archivo
    //       if (maxSizeFile && file.size > maxSizeFile) {
    //         errors.push(
    //           `El archivo excede el tamaño máximo de ${
    //             maxSizeFile / 1024 / 1024
    //           }MB`
    //         );
    //       }

    //       // Validar formato
    //       if (formatFilesSupport && !formatFilesSupport.includes(file.type)) {
    //         errors.push(
    //           `Formato no soportado. Formatos permitidos: ${formatFilesSupport.join(
    //             ", "
    //           )}`
    //         );
    //       }

    //       // Validar dimensiones de la imagen
    //       image.onload = () => {
    //         if (
    //           sizePixels?.width &&
    //           sizePixels?.height &&
    //           (sizePixels.width !== image.width ||
    //             sizePixels.height !== image.height)
    //         ) {
    //           errors.push(
    //             `Dimensiones incorrectas. Debe ser ${sizePixels.width}x${sizePixels.height}px`
    //           );
    //         }
    //         resolve(errors);
    //       };

    //       image.onerror = () => {
    //         errors.push("Error al cargar la imagen");
    //         resolve(errors);
    //       };
    //     });
    //   };

    //   const handleChangeInputFile = (
    //     e: React.ChangeEvent<HTMLInputElement>
    //   ) => {
    //     if (!e.target.files?.length) return;
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.onload = async () => {
    //       if (/^image\//i.test(file.type)) {
    //         const image = new Image();
    //         image.src = reader.result as string;
    //         const errors = await validateImage(file, image);
    //         if (errors.length > 0) {
    //           setError?.("image_url", {
    //             type: "custom",
    //             message: errors.join(". "),
    //           });
    //           setPreviewImage(undefined);
    //         } else {
    //           setPreviewImage(reader.result as string);
    //           setError?.("image_url", {});
    //         }
    //       } else {
    //         setError?.("image_url", {
    //           type: "custom",
    //           message: "El archivo debe ser una imagen",
    //         });
    //         setPreviewImage(undefined);
    //       }
    //     };
    //     reader.onerror = () => {
    //       setError?.("image_url", {
    //         type: "custom",
    //         message: "Error al leer el archivo",
    //       });
    //     };
    //     reader.readAsDataURL(file);
    //     onChange?.(e);
    //   };

    //   const handleClickBrowserFile = () => {
    //     document.getElementById("inputFile")?.click();
    //   };

    //   return (
    //     <div className="flex flex-col gap-1">
    //       <label className="text-sm font-bold pl-1">{label}</label>
    //       <input
    //         id="inputFile"
    //         type="file"
    //         ref={ref as React.Ref<HTMLInputElement>}
    //         className={`${inputClassName} `}
    //         onChange={onChange}
    //         {...fileProps}
    //       />

    //       {error && (
    //         <p className="text-sm text-red-600 mt-1">{error.message}</p>
    //       )}
    //     </div>
    //   );
    // }

    // Para inputs de texto, email, password, etc.

    const { onChange, ...inputProps } =
      props as React.InputHTMLAttributes<HTMLInputElement>;
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold pl-1">{label}</label>
        <input
          type={type}
          ref={ref as React.Ref<HTMLInputElement>}
          className={inputClassName}
          onChange={onChange}
          {...inputProps}
        />
        {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
