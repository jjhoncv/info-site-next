// Input.tsx
import React, { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: "text" | "email" | "password" | "checkbox";
  error?: FieldError | undefined;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, error, className = "", ...props }, ref) => {
    const inputClassName = `bg-slate-100 w-full border rounded px-3 py-2 ${
      error ? "border-red-500" : "border-gray-200 hover:border-gray-300"
    } focus:outline-none ${className}`;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            className="text-sm font-bold pl-1"
            htmlFor={props.id || props.name}
          >
            {label}
          </label>
        )}
        <input type={type} className={inputClassName} ref={ref} {...props} />
        {error && <p className="text-sm text-red-600">{error.message}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
