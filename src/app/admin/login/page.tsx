// src/app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Form } from "@/app/components/Form";
import { loginUser } from "@/services/userService";
import { setToken } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const token = await loginUser(data.email, data.password);
      if (token) {
        setToken(token); // Esta función ahora maneja tanto localStorage como cookies
        router.push("/admin");
      } else {
        setError("Credenciales inválidas");
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Iniciar sesión
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <Form schema={loginSchema} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
