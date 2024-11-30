import {
  createServiceImage,
  deleteServiceImage,
  updateServiceImage,
} from "@/services/serviceImageService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const stringFileURL = formData.get("image_url") as any;
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;
    const idService = formData.get("idService") as string;

    if (!title) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    try {
      let itemFile = {};
      if (stringFileURL) {
        itemFile = { image_url: stringFileURL };
      }
      const serviceImage = await createServiceImage({
        description,
        subtitle,
        title,
        display_order: 9,
        id_service: idService,
        ...itemFile,
      });
      const response = NextResponse.json(
        {
          message: "serviceImage creado",
          success: true,
          serviceImage,
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

    const stringFileURL = formData.get("image_url") as any;
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;
    const idService = formData.get("idService") as string;
    const idServiceImage = formData.get("idServiceImage") as string;

    if (!title || !idService) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    try {
      let itemFile = {};
      if (stringFileURL) {
        itemFile = { image_url: stringFileURL };
      }

      const serviceImage = await updateServiceImage(idServiceImage, {
        description,
        subtitle,
        title,
        display_order: 9,
        id_service: idService,
        ...itemFile,
      });
      const response = NextResponse.json(
        {
          message: "serviceImage actualizado",
          success: true,
          serviceImage,
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
      await deleteServiceImage(id);

      const response = NextResponse.json(
        {
          message: "serviceImage eliminado",
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
    console.error("Error eliminando serviceImage en:", error);
  }
}
