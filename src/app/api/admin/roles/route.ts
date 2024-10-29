import { roleCreateFormData } from "@/app/components/Roles/RoleNewView";
import { Role, RoleName } from "@/interfaces";
import { createRole, removeRole, updateRole } from "@/models/role";
import { getSection, removeAllSectionByRole } from "@/models/sections";
import { updateUser } from "@/models/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, sections: sections_ids }: roleCreateFormData = body;

    // Validar los datos de entrada
    if (!name) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    const sections = await Promise.all(
      sections_ids.map(async (section_id) => await getSection(section_id))
    );

    const role = await createRole(
      {
        name: name as RoleName,
      },
      sections
    );

    const response = NextResponse.json(
      {
        message: "Rol creado",
        success: true,
        role,
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
    console.error("Error Creating role in:", error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role_id, sections }: any = body;

    // Validar los datos de entrada
    if (!name || !role_id) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    try {
      const user = await updateRole({ name }, sections, role_id);

      const response = NextResponse.json(
        {
          message: "Rol actualizado",
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
          message: error.message,
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
    const { role_id }: any = body;

    // Validar los datos de entrada
    if (!role_id) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    try {
      await removeRole(role_id);
      await removeAllSectionByRole({ roleId: role_id });

      const response = NextResponse.json(
        {
          message: "Rol eliminado",
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
    console.error("Error actualizando usuario en:", error);
  }
}
