"use client";

import { loginAction } from "@/actions/auth-action";
import { handleKeyDown } from "@/lib/form";
import { ToastFail } from "@/lib/splash";
import { loginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../Form/Input/Button";
import { Input } from "../../Form/Input/Input";

// Infiere el tipo del esquema
type LoginFormData = z.infer<typeof loginSchema>;

export const LoginAdmin = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const response = await loginAction(data);
    if (response?.error) {
      ToastFail(response?.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full h-full flex md:flex-row flex-col">
      <div className="md:bg-slate-100 bg-transparent md:min-h-screen md:w-6/12 lg:w-7/12">
        <div className="w-full flex justify-center items-center h-full">
          <div className="w-full md:m-5 gap-3 flex flex-col ">
            <div className="w-full flex min-h-full items-center">
              <div className="relative w-full h-[80px] md:h-[400px] md:flex">
                <Image
                  src="/imgs/dashboard/bg-login-2.jpg"
                  fill
                  objectFit="cover"
                  alt="image login"
                  className="rounded"
                />
              </div>
            </div>
            <div className="p-8 md:p-0">
              <h2 className="text-2xl font-normal">Panel de administración</h2>
              <p className="font-light">
                Aquí podrás crear y modificar las diferentes secciones del sitio
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-6/12 lg:w-5/12">
        <div className="min-h-screen bg-white h-full flex flex-col pt-[120px] md:pt-0 md:justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto px-8 sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Iniciar la sesión
            </h2>
          </div>

          <div className="mt-8 px-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  {...register("email")}
                  label="Correo electrónico"
                  type="email"
                  error={errors.email}
                  onKeyDown={handleKeyDown}
                />

                <Input
                  {...register("password")}
                  error={errors.password}
                  label="Contraseña"
                  type="password"
                  onKeyDown={handleKeyDown}
                />

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <div className="flex gap-3 justify-end mt-8">
                  <Button type="submit">Iniciar sesión</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
