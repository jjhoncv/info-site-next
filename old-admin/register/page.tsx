// src/app/admin/register/page.tsx
"use client";

import RegisterAdmin from "@/app/components/RegisterAdmin/ui/RegisterAdmin";

// const registerSchema = z
//   .object({
//     username: z
//       .string()
//       .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
//     email: z.string().email("Email inválido"),
//     password: z
//       .string()
//       .min(6, "La contraseña debe tener al menos 6 caracteres"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Las contraseñas no coinciden",
//     path: ["confirmPassword"],
//   });

export default function RegisterPage() {
  // const [error, setError] = useState("");
  // const router = useRouter();

  // const handleSubmit = async (data: z.infer<typeof registerSchema>) => {
  //   try {
  //     const token = await registerUser(data);
  //     if (token) {
  //       setToken(token); // Guarda el token en localStorage y cookies
  //       router.push("/admin"); // Redirige directamente al dashboard de admin
  //     } else {
  //       setError("Error al registrar el usuario");
  //     }
  //   } catch (err) {
  //     setError("Error al registrar el usuario");
  //   }
  // };

  return <RegisterAdmin />;
}
