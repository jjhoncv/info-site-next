import { PermissionTextName } from "@/interfaces";
import { deletePermission } from "@/models/permission";
import { addRoleSection, removeRoleSection } from "@/models/sections";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      roleId,
      sectionId,
      action,
    }: { roleId: string; sectionId: string; action: "add" | "remove" } = body;

    console.log({ roleId, sectionId, action });

    if (action === "add") {
      await addRoleSection({ roleId, sectionId });
    }

    if (action === "remove") {
      await removeRoleSection({ roleId, sectionId });
    }

    // deletePermission(page);
    // const deletePermissionResult = permissions.map((permission) => {
    //   console.log("permissionxxx", permission);
    // });

    // console.log("deletePermissionResult", deletePermissionResult);

    const response = NextResponse.json(
      {
        message: "Login successful",
        success: true,
        user: {
          roleId,
          sectionId,
          action,
        },
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
    console.error("Error logging in:", error);
  }
}
