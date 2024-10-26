"use client";
import { Role, User } from "@/interfaces";
import { FetchCustomBody } from "@/lib/FetchCustomBody";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import { userEditSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  const [error, setError] = useState<string | null>(null);
  const [disabledPassword, setDisabledPassword] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset,
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {error && <div className="text-red-600">{error}</div>}

        <div className="flex justify-between w-full gap-5">
          <div className="w-1/2 flex flex-col">
            <div className="flex flex-col gap-1 mb-4">
              <Input
                {...register("username")}
                error={errors.username}
                label="Nombres"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 mb-4">
              <Input
                {...register("email")}
                label="Email"
                type="email"
                error={errors.email}
              />
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <Input
                {...register("password")}
                error={errors.password}
                label="Password"
                type="password"
                disabled={disabledPassword}
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
          <div className="w-1/2 flex flex-col">
            <div className="flex flex-col gap-1 mb-4">
              <Input
                {...register("lastname")}
                error={errors.lastname}
                label="Apellidos"
                type="text"
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
        </div>

        <div className="flex gap-3 mb-4 justify-end mt-8">
          <Link href="/dashboard/users">
            <button className="border rounded px-6 py-2">Cancel</button>
          </Link>
          <button
            className="bg-[#374151] text-white  rounded px-6 py-2"
            type="submit"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};
