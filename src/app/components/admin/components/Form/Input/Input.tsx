import { Search } from "lucide-react";
import React, { forwardRef } from "react";
import { FieldError, UseFormSetError } from "react-hook-form";
import { FileOptions } from "../../FormCreate/types/fileManagement";

// Tipos base para props comunes
type BaseProps = {
  label?: string;
  error?: FieldError;
  className?: string;
  formatFilesSupport?: string[];
  maxSizeFile?: number;
  sizePixels?: { width: number; height: number };
  placeholder?: string;
  multiple?: boolean;
  setError?: UseFormSetError<{
    title: string;
    subtitle: string;
    description: string;
    link: string;
    image_url: File;
  }>;
  options?: FileOptions;
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
      options,
      multiple,
      ...props
    },
    ref
  ) => {
    const baseClassName =
      "bg-white w-full border border-gray-300 rounded px-3 py-2";
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
          <label className="text-sm text-slate-250">{label}</label>
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
      const { onChange, ...inputProps } =
        props as React.InputHTMLAttributes<HTMLInputElement>;
      return (
        <div className="flex flex-col gap-1">
          {label && <label className="text-sm">{label}</label>}
          <div className="relative flex items-center">
            <input
              type={type}
              ref={ref as React.Ref<HTMLInputElement>}
              className={`${inputClassName} min-h-[42px] pr-5`}
              onChange={onChange}
              {...inputProps}
            />
            <Search size={18} className="absolute right-3 stroke-slate-300" />
          </div>

          {error && (
            <p className="text-sm text-red-600 mt-1">{error.message}</p>
          )}
        </div>
      );
    }

    // Para inputs de texto, email, password, etc.

    const { onChange, ...inputProps } =
      props as React.InputHTMLAttributes<HTMLInputElement>;
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-250">{label}</label>
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
