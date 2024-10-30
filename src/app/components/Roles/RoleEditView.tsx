"use client";
import { Role, Section } from "@/interfaces";
import { FetchCustomBody } from "@/lib/FetchCustomBody";
import { handleKeyDown } from "@/lib/form";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import { roleSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardContent } from "../CardContent/CardContent";
import { FormItem } from "../Form/FormItem";
import { CheckboxGroup } from "../Form/Input/CheckboxGroup";
import { Input } from "../Form/Input/Input";
import { Button } from "../Form/Input/Button";

interface RoleEditViewProps {
  sections: Section[];
  role: Role;
}

// Infiere el tipo del esquema
export type roleEditFormData = z.infer<typeof roleSchema>;

export const RoleEditView: FC<RoleEditViewProps> = ({ role, sections }) => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<roleEditFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: role.name,
      sections: role.sections.map((section) => section.id.toString()),
    },
    mode: "onChange",
  });

  const onSubmit = async (data: roleEditFormData) => {
    try {
      const message = await FetchCustomBody({
        data: { ...data, id: role.id },
        method: "PATCH",
        url: "/api/admin/roles",
      });

      ToastSuccess(message);
      router.push("/dashboard/roles");
      router.refresh();
    } catch (error: any) {
      ToastFail(error.message);
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex justify-between w-full gap-5">
          <div className="w-full flex flex-col">
            <FormItem>
              <Input
                {...register("name")}
                error={errors.name}
                label="Nombre del Rol"
                type="text"
                onKeyDown={handleKeyDown}
              />
            </FormItem>
            <FormItem>
              <CheckboxGroup
                control={control}
                items={sections}
                label="Secciones"
                name="sections"
                error={errors.sections}
              />
            </FormItem>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-8">
          <Button type="cancel" href="/dashboard/roles">
            Cancelar
          </Button>
          <Button type="submit">Actualizar</Button>
        </div>
      </form>
    </CardContent>
  );
};
