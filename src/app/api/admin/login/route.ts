// pages/api/login.ts
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { getUserByEmail, getUserById } from "@/services/userService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 3600, // 1 hora
  path: "/",
};

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validar los datos de entrada
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    // Buscar el usuario
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password", success: false },
        { status: 401 }
      );
    }

    // Crear el token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role?.id,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Crear la respuesta
    const response = NextResponse.json(
      {
        message: "Login successful",
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role?.id,
        },
      },
      { status: 200 }
    );

    // Agregar la cookie a la respuesta
    response.headers.set(
      "Set-Cookie",
      serialize("token", token, cookieOptions)
    );

    return response;
  } catch (error) {
    console.error("Error logging in:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
