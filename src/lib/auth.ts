// src/lib/auth.ts
import { getUserById } from "@/services/userService";
import { cookies } from "next/headers";
import { User, UserWithRole, PermissionName } from "@/interfaces";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function getCurrentUser(): Promise<UserWithRole | null> {
  let token: string | undefined;

  if (typeof window !== "undefined") {
    // Estamos en el cliente
    token = localStorage.getItem("token") || undefined;
  } else {
    // Estamos en el servidor
    token = cookies().get("token")?.value;
  }

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await getUserById(decoded.userId);
    return user;
  } catch (error) {
    return null;
  }
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
  // No hacemos nada si estamos en el servidor
}

export function removeToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
  // No hacemos nada si estamos en el servidor
}
