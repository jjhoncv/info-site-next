// pages/api/login.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { createUser } from "@/services/userService";

// Crear la cookie
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
    const { username, email, password } = body;

    // Validar los datos de entrada
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el usuario en la base de datos
    const user = await createUser({
      email,
      is_active: true,
      password: hashedPassword,
      role_id: 2,
      username,
    });

    // Crear el token JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Crear la respuesta
    const response = NextResponse.json(
      {
        message: "User registered successfully",
        user: { id: user.id, username: user.username, email: user.email },
        success: true,
      },
      { status: 201 }
    );

    // Agregar la cookie a la respuesta
    response.headers.set(
      "Set-Cookie",
      serialize("token", token, cookieOptions)
    );

    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
