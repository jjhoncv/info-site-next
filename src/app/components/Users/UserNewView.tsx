"use client";
import { Role } from "@/interfaces";
import { FetchCustomBody } from "@/lib/FetchCustomBody";
import { handleKeyDown } from "@/lib/form";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import { userCreateSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardContent } from "../CardContent/CardContent";
import { Input } from "../Form/Input/Input";
import { Select } from "../Form/Input/Select";
import { Button } from "../Form/Input/Button";

interface UserNewViewProps {
  roles: Role[];
}

// Infiere el tipo del esquema
export type userCreateFormData = z.infer<typeof userCreateSchema>;

export const UserNewView: FC<UserNewViewProps> = ({ roles }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userCreateFormData>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      username: "",
      lastname: "",
      email: "",
      password: "",
      roles: "", // Inicializar el campo roles
    },
    mode: "onChange",
  });

  const onSubmit = async (data: userCreateFormData) => {
    try {
      const message = await FetchCustomBody({
        data: { ...data, role_id: data.roles },
        method: "PUT",
        url: "/api/admin/users",
      });

      ToastSuccess(message);
      router.push("/dashboard/users");
      router.refresh();
    } catch (error: any) {
      ToastFail(error.message);
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:grid-cols-2 grid w-full md:gap-6 ">
          <div className="flex w-full flex-col">
            <div className="flex flex-col gap-1 mb-4">
              <Input
                {...register("username")}
                error={errors.username}
                label="Nombres"
                type="text"
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="flex flex-col gap-1 mb-4">
              <Input
                {...register("lastname")}
                error={errors.lastname}
                label="Apellidos"
                type="text"
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div className="flex w-full flex-col">
            <div className="flex flex-col gap-1 mb-4">
              <Input
                {...register("email")}
                label="Email"
                type="email"
                error={errors.email}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <Select error={errors.roles} label="Roles" {...register("roles")}>
                <option value="">Seleccione rol</option>
                {roles.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <div className="flex flex-col gap-1 mb-4">
              <Input
                {...register("password")}
                error={errors.password}
                label="Password"
                type="password"
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-8">
          <Button type="cancel" href="/dashboard/users">
            Cancelar
          </Button>
          <Button type="submit">Añadir</Button>
        </div>
      </form>
    </CardContent>
  );
};
