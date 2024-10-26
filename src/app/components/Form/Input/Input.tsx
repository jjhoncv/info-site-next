// Input.tsx
import React, { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: "text" | "email" | "password";
  error?: FieldError | undefined;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, error, className = "", ...props }, ref) => {
    const inputClassName = `w-full border rounded px-2 py-2 ${
      error ? "border-red-500" : "border-gray-300"
    } focus:outline-none focus:ring-2 focus:ring-gray-200 ${className}`;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-bold" htmlFor={props.id || props.name}>
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
