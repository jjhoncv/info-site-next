// src/lib/auth.ts
import { getUserById } from "@/services/userService";
import { User, UserWithRole, PermissionName } from "@/interfaces";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function getCurrentUser(): Promise<UserWithRole | null> {
  // const token = getTokenFromServerCookie("token");

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value ?? "";

  // console.log("token", token);

  const userSession = jwt.verify(token, JWT_SECRET) as { userId: number };

  const user = await getUserById(userSession?.userId);

  return user;

  // console.log("decoded", decoded);

  //   if (!token && typeof window !== "undefined") {
  //     // Estamos en el cliente
  //     token = localStorage.getItem("token") || undefined;
  //   }

  //   if (!token) return null;

  //   try {
  //     const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
  //     const user = await getUserById(decoded.userId);
  //     return user;
  //   } catch (error) {
  //     return null;
  //   }
}

export function hasPermission(
  user: UserWithRole,
  permission: PermissionName
): boolean {
  return user.role.permissions.includes(permission);
}

export function createToken(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
}

export function setToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
}

export function removeToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}

export function getTokenFromServerCookie(
  cookieString: string | undefined
): string | undefined {
  if (!cookieString) return undefined;

  const cookies = cookieString.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {} as { [key: string]: string });

  return cookies["token"];
}

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}
