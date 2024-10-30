"use client";
import { User } from "@/interfaces";
import { FetchCustomBody } from "@/lib/FetchCustomBody";
import { handleKeyDown } from "@/lib/form";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import { profileEditSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon, UserCircle2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardContent } from "../CardContent/CardContent";
import { Button } from "../Form/Input/Button";
import { Input } from "../Form/Input/Input";

interface ProfileEditViewProps {
  user: User;
}

// Infiere el tipo del esquema
export type profileEditFormData = z.infer<typeof profileEditSchema>;

export const ProfileEditView: FC<ProfileEditViewProps> = ({ user }) => {
  const router = useRouter();
  const [disabledPassword, setDisabledPassword] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset,
  } = useForm<profileEditFormData>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      username: user.username,
      lastname: user.lastname,
      email: user.email,
      password: "------",
      passwordChange: false,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: profileEditFormData) => {
    try {
      const message = await FetchCustomBody({
        data: {
          ...data,
          roles: user.role.id,
          id: user.id,
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
    <div className="flex flex-col mt-5 md:mt-0 md:gap-8 gap-5 md:flex-row">
      <CardContent className={"w-full md:w-1/3 h-fit"}>
        <div className="flex justify-center flex-col items-center">
          <div className="border-transparent border hover:bg-slate-100 hover:border-slate-200 relative  rounded-lg w-[150px] h-[120px] flex justify-center items-center mb-2">
            <UserCircle2Icon size={100} strokeWidth={0.6} color="#374151" />
            <PencilIcon
              size={20}
              className="absolute right-2 bottom-2 cursor-pointer"
              color="#374151"
            />
          </div>
          <p>{user.email}</p>
          <p>
            {user.username} {user.lastname}
          </p>
        </div>
      </CardContent>
      <CardContent className={"w-full"}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex justify-between w-full gap-5">
            <div className="flex flex-col w-full">
              <div className="flex flex-col gap-1 mb-4">
                <Input
                  {...register("lastname")}
                  error={errors.lastname}
                  label="Apellidos"
                  type="text"
                  onKeyDown={handleKeyDown}
                />
              </div>
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
                  {...register("email")}
                  label="Email"
                  type="email"
                  error={errors.email}
                  onKeyDown={handleKeyDown}
                />
              </div>

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
    </div>
  );
};
