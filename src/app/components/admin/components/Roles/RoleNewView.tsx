"use client";
import { Section } from "@/interfaces";
import { FetchCustomBody } from "@/lib/FetchCustomBody";
import { handleKeyDown } from "@/lib/form";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import { roleSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardContent } from "../CardContent/CardContent";
import { FormItem } from "../Form/FormItem";
import { Button } from "../Form/Input/Button";
import { CheckboxGroup } from "../Form/Input/CheckboxGroup";
import { Input } from "../Form/Input/Input";

interface RoleNewViewProps {
  sections: Section[];
}

// Infiere el tipo del esquema
export type roleCreateFormData = z.infer<typeof roleSchema>;

export const RoleNewView: FC<RoleNewViewProps> = ({ sections }) => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<roleCreateFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      sections: [],
    },
    mode: "onChange",
  });

  const onSubmit = async (data: roleCreateFormData) => {
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
          <Button type="submit">Añadir</Button>
        </div>
      </form>
    </CardContent>
  );
};
