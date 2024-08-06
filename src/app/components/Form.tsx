// src/components/Form.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { Textarea } from "@/app/components/ui/Textarea";

interface FormProps<T extends z.ZodType<any, any>> {
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
  defaultValues?: Partial<z.infer<T>>;
}

export function Form<T extends z.ZodType<any, any>>({
  schema,
  onSubmit,
  defaultValues,
}: FormProps<T>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(schema.shape).map((key) => {
        const fieldSchema = schema.shape[key as keyof z.infer<T>];
        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {key}
            </label>
            <Controller
              name={key as any}
              control={control}
              render={({ field }) => {
                if (
                  fieldSchema instanceof z.ZodString &&
                  fieldSchema._def.checks.some(
                    (check) => check.kind === "min" && check.value > 100
                  )
                ) {
                  return <Textarea {...field} />;
                }
                return <Input {...field} />;
              }}
            />
            {errors[key as keyof z.infer<T>] && (
              <p className="mt-1 text-sm text-red-600">
                {errors[key as keyof z.infer<T>]?.message as string}
              </p>
            )}
          </div>
        );
      })}
      <Button type="submit">Enviar</Button>
    </form>
  );
}
