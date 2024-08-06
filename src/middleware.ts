// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwtUtils"; // Asegúrate de que esta función esté implementada

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isAuthenticated = token && verifyToken(token);

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!isAuthenticated && request.nextUrl.pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (isAuthenticated && request.nextUrl.pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
