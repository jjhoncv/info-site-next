// // src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const path = request.nextUrl.pathname;

  if (token) {
    if (path === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  } else {
    if (path === "/admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    } else {
      return NextResponse.next();
    }
  }

  //   const path = request.nextUrl.pathname;
  //   console.log("Middleware called for path:", path);

  //   // No hacer nada para /admin/login
  //   if (path === "/admin/login") {
  //     return NextResponse.next();
  //   }

  //   // Para otras rutas /admin/*, verificar el token
  //   if (path.startsWith("/admin")) {
  //     const token = request.cookies.get("token")?.value;
  //     if (!token) {
  //       return NextResponse.redirect(new URL("/admin/login", request.url));
  //     }
  //   }

  //   return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
