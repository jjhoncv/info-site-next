// src/app/admin/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginAdmin } from "@/app/components/LoginAdmin";

export default function LoginPage() {
  // const [error, setError] = useState("");
  // const router = useRouter();

  // useEffect(() => {
  //   // Verificar si ya hay un token
  //   const token = document.cookie.includes("token=");
  //   if (token) {
  //     router.push("/admin");
  //   }
  // }, [router]);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;

  //   try {
  //     const response = await fetch("/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (response.ok) {
  //       router.push("/admin");
  //     } else {
  //       setError("Login failed");
  //     }
  //   } catch (err) {
  //     setError("Error durante el login");
  //   }
  // };

  return <LoginAdmin />;
}
