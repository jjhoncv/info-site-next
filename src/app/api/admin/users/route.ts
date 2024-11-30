import { UserModel } from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, lastname, password, roles: role_id } = body;

    // Validar los datos de entrada
    if (!username || !email || !password || !lastname) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const ouser = new UserModel();
      const user = await ouser.createUser({
        email,
        is_active: true,
        password: hashedPassword,
        role_id,
        username,
        lastname,
      });

      const response = NextResponse.json(
        {
          message: "Usuario creado",
          success: true,
          user,
        },
        { status: 200 }
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
    console.error("Error Creating user in:", error);
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
      const ouser = new UserModel();
      const user = await ouser.updateUser(objUser, id);

      const response = NextResponse.json(
        {
          message: "Usuario actualizado",
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
    console.error("Error actualizando usuario en:", error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id }: any = body;

    // Validar los datos de entrada
    if (!user_id) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    try {
      const ouser = new UserModel();
      await ouser.deleteUser(user_id);

      const response = NextResponse.json(
        {
          message: "Usuario eliminado",
          success: true,
        },
        {
          status: 200,
        }
      );
      return response;
    } catch (error: any) {
      const response = NextResponse.json(
        {
          message: error.message,
          success: false,
        },
        { status: 400 }
      );
      return response;
    }
  } catch (error) {
    console.error("Error eliminando usuario en:", error);
  }
}
