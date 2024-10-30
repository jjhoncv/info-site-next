import React, { forwardRef, SelectHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: FieldError;
  children?: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, children, className = "", ...props }, ref) => {
    const selectClassName = `bg-slate-100 w-full border rounded px-2 py-2 ${
      error ? "border-red-500" : "border-gray-200 hover:border-gray-300"
    } focus:outline-none focus:ring-2 focus:ring-gray-200 ${className}`;

    return (
      <div className="flex flex-col gap-1 ">
        {label && (
          <label className="text-sm font-bold" htmlFor={props.id || props.name}>
            {label}
          </label>
        )}
        <select className={selectClassName} ref={ref} {...props}>
          {children}
        </select>
        {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
