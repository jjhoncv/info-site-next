import { apiHandler, createResponse, handleError } from "@/lib/handlerApi";
import {
  createBanner,
  deleteBanner,
  updateBanner,
} from "@/services/bannerService";
import { NextRequest } from "next/server";

// Función helper para procesar el formData
const processFormData = async (formData: FormData) => {
  const stringFileURL = formData.get("image_url") as string;
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const description = formData.get("description") as string;
  const link = formData.get("link") as string;
  const id = formData.get("id") as string;

  const itemFile = stringFileURL ? { image_url: stringFileURL } : {};

  return {
    id,
    title,
    subtitle,
    description,
    link,
    itemFile,
    display_order: 9, // Considera hacer esto configurable
  };
};

export async function POST(req: NextRequest) {
  return apiHandler(async () => {
    const formData = await req.formData();
    const { title, link, description, subtitle, itemFile } =
      await processFormData(formData);

    if (!title || !link) {
      return createResponse(
        { error: "Missing required fields", success: false },
        400
      );
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

      return createResponse(
        {
          message: "Banner creado",
          success: true,
          banner,
        },
        200
      );
    } catch (error: any) {
      return handleError(error, 400);
    }
  });
}

export async function PATCH(req: NextRequest) {
  return apiHandler(async () => {
    const formData = await req.formData();
    const { id, title, link, description, subtitle, itemFile } =
      await processFormData(formData);

    if (!title || !link || !id) {
      return createResponse(
        { error: "Missing required fields", success: false },
        400
      );
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

      return createResponse(
        {
          message: "Banner actualizado",
          success: true,
          banner,
        },
        200
      );
    } catch (error: any) {
      return handleError(error, 400);
    }
  });
}

export async function DELETE(req: NextRequest) {
  return apiHandler(async () => {
    const { id } = await req.json();

    if (!id) {
      return createResponse(
        { error: "Missing required fields", success: false },
        400
      );
    }

    try {
      await deleteBanner(id);
      return createResponse(
        {
          message: "Banner eliminado",
          success: true,
        },
        200
      );
    } catch (error: any) {
      return handleError(error, 400);
    }
  });
}
