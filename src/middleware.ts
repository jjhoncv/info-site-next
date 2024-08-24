import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { auth } from "./auth";

const { auth: middleware } = NextAuth(authConfig);

const publicRoutes = ["/", "/prices"];
const authRoutes = ["/admin/login", "/admin/register"];
const apiAuthPrefix = "/api/auth";

export default middleware(async (req) => {
  const { nextUrl, auth: auth2 } = req;
  const isLoggedIn = !!auth2?.user;

  const session = await auth();

  console.log(session);

  // Permitir todas las rutas de API de autenticación
  if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  // Permitir acceso a rutas públicas sin importar el estado de autenticación
  if (publicRoutes.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Redirigir a /dashboard si el usuario está logueado y trata de acceder a rutas de autenticación
  if (isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // Redirigir a /admin/login si el usuario no está logueado y trata de acceder a una ruta protegida
  if (
    !isLoggedIn &&
    !authRoutes.includes(nextUrl.pathname) &&
    !publicRoutes.includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/admin/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
