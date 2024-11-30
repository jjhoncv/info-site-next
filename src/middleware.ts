import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextResponse } from "next/server";
import { auth } from "./auth";

const { auth: middleware } = NextAuth(authConfig);

const apiAuthPrefix = "/api/auth";
const dashboardPrefix = "/dashboard";
const loginPath = "/admin/login";

export default middleware(async (req) => {
  const { nextUrl, auth: auth2 } = req;
  const isLoggedIn = !!auth2?.user;
  const pathname = nextUrl.pathname;

  // Permitir todas las rutas de API de autenticación
  if (pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  // Si no es una ruta del dashboard ni login, permitir acceso
  if (!pathname.startsWith(dashboardPrefix) && pathname !== loginPath) {
    return NextResponse.next();
  }

  // Si está logueado y está en login, redirigir a dashboard
  if (isLoggedIn && pathname === loginPath) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // Si no está logueado y trata de acceder al dashboard
  if (!isLoggedIn && pathname.startsWith(dashboardPrefix)) {
    return NextResponse.redirect(new URL(loginPath, nextUrl));
  }

  // Si está logueado y accede al dashboard, verificar permisos
  if (isLoggedIn && pathname.startsWith(dashboardPrefix)) {
    const session = await auth();
    const userSections = session?.user.data.role.sections || [];

    // Si es la ruta principal del dashboard o unauthorized, permitir acceso
    if (pathname === "/dashboard" || pathname === "/dashboard/unauthorized") {
      return NextResponse.next();
    }

    // Verificar permisos de sección
    const hasPermission = userSections.some((section) =>
      pathname.startsWith(section.url)
    );

    if (!hasPermission) {
      return NextResponse.redirect(new URL("/dashboard/unauthorized", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
