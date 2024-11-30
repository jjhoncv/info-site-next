import { RoleName } from "@/interfaces";
import { RoleModel } from "@/models/RoleModel";
import { SectionModel } from "@/models/SectionModel";

import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, sections: sections_ids }: any = body;

    // Validar los datos de entrada
    if (!name) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    const osection = new SectionModel();
    const orole = new RoleModel();

    const sections = await Promise.all(
      sections_ids.map(
        async (section_id: any) => await osection.getSection(section_id)
      )
    );

    const role = await orole.createRole(
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
    const { name, id, sections }: any = body;

    // Validar los datos de entrada
    if (!name || !id) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    try {
      const orole = new RoleModel();
      const user = await orole.updateRole({ name }, sections, id);

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
      const orole = new RoleModel();
      const osection = new SectionModel();

      await orole.deleteRole(role_id);
      await osection.removeAllSectionByRole(role_id);

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
