import { updateUser } from "@/models/user";
import bcrypt from "bcryptjs";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const id = formData.get("id") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No se ha enviado ningún archivo" },
        { status: 400 }
      );
    }

    // Obtener metadata adicional
    const fileName = formData.get("fileName") as string;

    // Convertir el archivo a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Crear un nombre de archivo único
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = fileName.split(".").pop();
    const uniqueFileName = `${uniqueSuffix}.${fileExtension}`;

    // Definir la ruta donde se guardará el archivo
    const uploadDir = join(process.cwd(), "public", "uploads");
    const filePath = join(uploadDir, uniqueFileName);

    // Guardar el archivo
    await writeFile(filePath, buffer);

    // Devolver la URL del archivo
    const fileUrl = `/uploads/${uniqueFileName}`;

    try {
      const user = await updateUser({ photo: fileUrl }, id);
      const response = NextResponse.json(
        {
          message: "Foto de perfil actualizada",
          success: true,
          url: fileUrl,
        },
        {
          status: 200,
        }
      );
      return response;
    } catch (error: any) {
      const response = NextResponse.json(
        {
          message: error.sqlMessage,
          success: false,
        },
        { status: 400 }
      );
      return response;
    }
  } catch (error: any) {
    const response = NextResponse.json(
      {
        message: error.sqlMessage,
        success: false,
      },
      { status: 500 }
    );
    return response;
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      username,
      email,
      lastname,
      password,
      roles: role_id,
      passwordChange,
    }: any = body;

    // Validar los datos de entrada
    if (!username || !email || !password || !lastname) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    let objUser: any = {
      email,
      is_active: true,
      role_id,
      username,
      lastname,
    };

    if (passwordChange) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      objUser = {
        ...objUser,
        password: hashedPassword,
      };
    }

    try {
      const user = await updateUser(objUser, id);

      const response = NextResponse.json(
        {
          message: "Perfil actualizado",
          success: true,
          user,
        },
        {
          status: 200,
        }
      );
      return response;
    } catch (error: any) {
      const response = NextResponse.json(
        {
          message: error.sqlMessage,
          success: false,
        },
        { status: 400 }
      );
      return response;
    }
  } catch (error) {
    console.error("Error actualizando el perfil en:", error);
  }
}
