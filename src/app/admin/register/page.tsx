// src/app/admin/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Form } from "@/app/components/Form";
import { registerUser } from "@/services/userService";
import { setToken } from "@/lib/auth";

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      const token = await registerUser(data);
      if (token) {
        setToken(token); // Guarda el token en localStorage y cookies
        router.push("/admin"); // Redirige directamente al dashboard de admin
      } else {
        setError("Error al registrar el usuario");
      }
    } catch (err) {
      setError("Error al registrar el usuario");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Registrar nuevo usuario
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <Form schema={registerSchema} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
