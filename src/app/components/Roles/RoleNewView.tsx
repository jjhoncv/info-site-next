"use client";
import { Section } from "@/interfaces";
import { FetchCustomBody } from "@/lib/FetchCustomBody";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import { roleCreateSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../Form/Input/Input";

interface RoleNewViewProps {
  sections: Section[];
}

// Infiere el tipo del esquema
export type roleCreateFormData = z.infer<typeof roleCreateSchema>;

export const RoleNewView: FC<RoleNewViewProps> = ({ sections }) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<roleCreateFormData>({
    resolver: zodResolver(roleCreateSchema),
    defaultValues: {
      name: "",
      sections: [],
    },
    mode: "onChange",
  });

  const onSubmit = async (data: roleCreateFormData) => {
    setError(null);

    try {
      const message = await FetchCustomBody({
        data,
        method: "PUT",
        url: "/api/admin/roles",
      });

      ToastSuccess(message);
      router.push("/dashboard/roles");
      router.refresh();
    } catch (error: any) {
      ToastFail(error.message);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.closest("form");
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && <div className="text-red-600">{error}</div>}

      <div className="flex justify-between w-full gap-5">
        <div className="w-1/2 flex flex-col">
          <div className="flex flex-col gap-1 mb-4">
            <Input
              {...register("name")}
              error={errors.name}
              label="Nombre del Rol"
              type="text"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-bold block">Secciones</label>
            {errors.sections && (
              <p className="text-sm text-red-600">{errors.sections.message}</p>
            )}
            <Controller
              name="sections"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sections.map((section) => (
                    <label
                      htmlFor={section.id.toString()}
                      key={section.id}
                      className="flex cursor-pointer items-start space-x-3 p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors"
                    >
                      <input
                        type="checkbox"
                        id={section.id.toString()}
                        value={section.id}
                        checked={field.value.includes(section.id.toString())}
                        onChange={(e) => {
                          const value = e.target.value;
                          const updatedSections = e.target.checked
                            ? [...field.value, value]
                            : field.value.filter((v) => v !== value);
                          field.onChange(updatedSections);
                        }}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <span className="block text-sm font-medium text-gray-900 cursor-pointer">
                          {section.name}
                        </span>
                        {section.url && (
                          <p className="text-xs text-gray-500">{section.url}</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-4 justify-end mt-8">
        <Link href="/dashboard/roles">
          <button className="border rounded px-6 py-2">Cancelar</button>
        </Link>
        <button
          className="bg-[#374151] text-white  rounded px-6 py-2"
          type="submit"
        >
          Añadir
        </button>
      </div>
    </form>
  );
};
