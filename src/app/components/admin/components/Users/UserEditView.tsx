"use client";
import { Role, User } from "@/interfaces";
import { FetchCustomBody } from "@/lib/FetchCustomBody";
import { handleKeyDown } from "@/lib/form";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import { userEditSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardContent } from "../CardContent/CardContent";
import { Button } from "../Form/Input/Button";
import { Input } from "../Form/Input/Input";
import { Select } from "../Form/Input/Select";

interface UserEditViewProps {
  roles: Role[];
  user: User;
}

// Infiere el tipo del esquema
export type userEditFormData = z.infer<typeof userEditSchema>;

export const UserEditView: FC<UserEditViewProps> = ({ user, roles }) => {
  const router = useRouter();
  const [disabledPassword, setDisabledPassword] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<userEditFormData>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      username: user.username,
      lastname: user.lastname,
      email: user.email,
      password: "------",
      roles: user.role_id.toString(), // Inicializar el campo roles
      passwordChange: false,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: userEditFormData) => {
    try {
      const message = await FetchCustomBody({
        data: {
          ...data,
          id: user.id,
          role_id: data.roles,
        },
        method: "PATCH",
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                disabled={disabledPassword}
                onKeyDown={handleKeyDown}
              />
              <div className="flex gap-3 items-center mt-2">
                <input
                  {...register("passwordChange")}
                  onChange={() => {
                    setDisabledPassword(!disabledPassword);
                    if (disabledPassword) {
                      setValue("password", "");
                    } else {
                      setValue("password", "------");
                      trigger("password");
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-4 h-4"
                  type="checkbox"
                  id="password-change"
                />
                {errors.passwordChange && (
                  <p className="text-sm text-red-600">
                    {errors.passwordChange.message}
                  </p>
                )}
                <label htmlFor="password-change">Cambiar password</label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-8">
          <Button type="cancel" href="/dashboard/users">
            Cancelar
          </Button>
          <Button type="submit">Actualizar</Button>
        </div>
      </form>
    </CardContent>
  );
};
