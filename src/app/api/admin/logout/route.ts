// pages/api/login.ts
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0, // Esto hace que la cookie expire inmediatamente
    path: "/",
  });

  // Crear la respuesta
  const response = NextResponse.json(
    { message: "Logged out successfully", success: true },
    { status: 200 }
  );

  // Establecer la cookie en la respuesta
  response.headers.set("Set-Cookie", cookie);

  return response;
}
