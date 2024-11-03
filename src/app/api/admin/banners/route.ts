import { writeFileServer } from "@/lib/writeFileServer";
import { createBanner, updateBanner } from "@/models/banner";
import { removeBanner } from "@/services/bannerService";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("image_url") as File;
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;

    if (!title || !subtitle || !description || !link) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }
    let itemFile = {};
    if (file) {
      const uploadDir = join(process.cwd(), "public", "uploads");
      const fileUrl = await writeFileServer(uploadDir, file);
      itemFile = { image_url: fileUrl };
    }

    try {
      const banner = await createBanner({
        description,
        link,
        subtitle,
        title,
        display_order: 9,
        ...itemFile,
      });
      const response = NextResponse.json(
        {
          message: "Banner creado",
          success: true,
          banner,
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
    const formData = await req.formData();

    const file = formData.get("image_url") as File;
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const id = formData.get("id") as string;

    if (!title || !subtitle || !description || !link || !id) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    let itemFile = {};
    if (file) {
      const uploadDir = join(process.cwd(), "public", "uploads");
      const fileUrl = await writeFileServer(uploadDir, file);
      itemFile = { image_url: fileUrl };
    }

    try {
      const banner = await updateBanner(id, {
        description,
        link,
        subtitle,
        title,
        display_order: 9,
        ...itemFile,
      });
      const response = NextResponse.json(
        {
          message: "Banner actualizado",
          success: true,
          banner,
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

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id }: any = body;

    // Validar los datos de entrada
    if (!id) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    try {
      await removeBanner(id);

      const response = NextResponse.json(
        {
          message: "Banner eliminado",
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
    console.error("Error eliminando banner en:", error);
  }
}
