import { forwardRef, InputHTMLAttributes } from "react";
import { Controller } from "react-hook-form";

interface CheckboxGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: any;
  control: any;
  items: { id: string; name: string }[];
}

export const CheckboxGroup = forwardRef<HTMLInputElement, CheckboxGroupProps>(
  (
    { label, error, control, items, className = "", children, ...props },
    ref
  ) => {
    const inputClassName = `flex cursor-pointer items-center space-x-3 p-3 bg-slate-100 w-full border rounded-lg px-2 py-2 ${
      error ? "border-red-500" : "border-gray-200 hover:border-gray-300"
    } focus:outline-none focus:ring-2 focus:ring-gray-200 ${className}`;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-bold" htmlFor={props.id || props.name}>
            {label}
          </label>
        )}

        {props.name && (
          <>
            <Controller
              name={props.name}
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {items.map((item) => (
                    <label
                      htmlFor={item.id}
                      key={item.id}
                      className={inputClassName}
                    >
                      <input
                        ref={ref}
                        type="checkbox"
                        id={item.id}
                        value={item.id}
                        checked={field.value.includes(item.id.toString())}
                        onChange={(e) => {
                          const value = e.target.value;
                          const updatedSections = e.target.checked
                            ? [...field.value, value]
                            : field.value.filter((v: any) => v !== value);
                          field.onChange(updatedSections);
                        }}
                        className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <span className="block text-sm font-medium text-gray-900">
                          {item.name}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            />

            {error && <p className="text-sm text-red-600">{error.message}</p>}
          </>
        )}
      </div>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";
