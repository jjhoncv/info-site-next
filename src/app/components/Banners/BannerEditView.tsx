"use client";
import { Banner } from "@/interfaces";
import { ApiResponse, FetchCustomBody } from "@/lib/FetchCustomBody";
import { handleKeyDown } from "@/lib/form";
import { formatBytes } from "@/lib/formatBytes";
import { renderPreviewImage } from "@/lib/renderPreviewImage";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { FieldError, useForm } from "react-hook-form";
import { z } from "zod";
import { CardContent } from "../CardContent/CardContent";
import { Button } from "../Form/Input/Button";
import { Input } from "../Form/Input/Input";
import {
  ACCEPTED_IMAGE_TYPES,
  bannerSchema,
  MAX_DIMENSIONS,
  MAX_FILE_SIZE,
} from "./bannerSchema";

// Infiere el tipo del esquema
export type bannerCreateFormData = z.infer<typeof bannerSchema>;

interface BannerEditViewProps {
  banner: Banner;
}

export const BannerEditView: FC<BannerEditViewProps> = ({ banner }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<bannerCreateFormData>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      description: banner.description,
      link: banner.link,
      subtitle: banner.subtitle,
      title: banner.title,
    },
    mode: "onChange",
  });

  const onSubmit = async (datap: bannerCreateFormData) => {
    const formData = new FormData();
    if (datap.image_url[0]) {
      formData.append("image_url", datap.image_url[0]);
    }
    formData.append("title", datap.title);
    formData.append("subtitle", datap.subtitle);
    formData.append("description", datap.description);
    formData.append("link", datap.link);
    formData.append("id", banner.id.toString());

    try {
      const message = await FetchCustomBody({
        data: formData,
        method: "PATCH",
        url: "/api/admin/banners",
        withFiles: true,
      });

      ToastSuccess(message);
      router.push("/dashboard/banners");
      router.refresh();
    } catch (error: any) {
      ToastFail(error.message);
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1 mb-4">
          <Input
            {...register("link")}
            error={errors.link}
            label="Enlace"
            type="text"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <Input
            {...register("title")}
            error={errors.title}
            label="Título"
            type="text"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <Input
            {...register("subtitle")}
            error={errors.subtitle}
            label="Subtítulo"
            type="text"
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <Input
            {...register("description")}
            error={errors.description}
            label="Descripción"
            type="textarea"
            rows={2}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <Input
            {...register("image_url")}
            error={errors.image_url as FieldError}
            label="Imagen"
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(",")}
            onKeyDown={handleKeyDown}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const files = e.target.files;
              if (files?.length) {
                register("image_url").onChange(e);
              }
            }}
          />
          <div className="text-sm text-gray-500 font-light">
            <p>* Formatos válidos: {ACCEPTED_IMAGE_TYPES.join(", ")}</p>
            <p>* Maximo tamaño soportado: {formatBytes(MAX_FILE_SIZE)}</p>
            <p>
              * Dimesiones válidas: {MAX_DIMENSIONS.width}x
              {MAX_DIMENSIONS.height} píxeles
            </p>
          </div>

          <div
            className={`bg-slate-100 w-full border rounded px-3 py-2 h-[180px] relative`}
          >
            {renderPreviewImage(watch("image_url"), banner.image_url)}
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-8">
          <Button type="cancel" href="/dashboard/banners">
            Cancelar
          </Button>
          <Button type="submit">Actualizar</Button>
        </div>
      </form>
    </CardContent>
  );
};
