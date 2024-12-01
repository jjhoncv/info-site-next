"use client";
import { ServiceImage } from "@/interfaces";
import { FetchCustomBody } from "@/lib/FetchCustomBody";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Alert } from "../Alert/Alert";
import { PreviewImageList } from "../PreviewImageList";
import { EditAction, RemoveAction } from "../Table/Actions";
import { DynamicTable, TableColumn } from "../Table/DynamicTable";

interface ServiceImagesListViewProps {
  serviceImages: ServiceImage[];
  idService: string;
}

export const ServiceImagesListView: FC<ServiceImagesListViewProps> = ({
  idService,
  serviceImages,
}) => {
  const router = useRouter();

  const columns: TableColumn[] = [
    {
      key: "title",
      label: "Titulo",
      priority: "high",
      sortable: true,
      searchable: true,
    },
    {
      key: "subtitle",
      label: "Subtitulo",
      priority: "high",
      sortable: true,
      searchable: true,
    },
    {
      key: "description",
      label: "Description",
      priority: "high",
      sortable: true,
      searchable: true,
    },
    {
      key: "image_url",
      label: "Imagen",
      priority: "high",
      sortable: true,
      searchable: true,
      imageField: true,
      render: (imageURL: string) => <PreviewImageList imageURL={imageURL} />,
    },
  ];

  const handleRemoveRole = async (id: string | null) => {
    if (!id) return;
    try {
      const message = await FetchCustomBody({
        data: { id },
        method: "DELETE",
        url: "/api/admin/services/images",
      });

      ToastSuccess(message);
      router.push(`/dashboard/services/${idService}/images`);
      router.refresh();
    } catch (error: any) {
      ToastFail(error.message);
    }
  };

  const handleReorder = (reorderedItems: any[]) => {
    // Actualizar el orden en la base de datos
    console.log("Nuevo orden:", reorderedItems);
  };

  return (
    <>
      <Alert
        message="¿Estás seguro de eliminar este servicio?"
        onSuccess={() => {
          const urlParams = new URLSearchParams(window.location.search);
          const id = urlParams.get("id");
          handleRemoveRole(id);
        }}
        onCancel={() => {
          router.replace(`/dashboard/services/${idService}/images`);
        }}
      />
      <DynamicTable
        columns={columns}
        data={serviceImages}
        baseUrl="/dashboard/services"
        renderActions={(id: string) => {
          return (
            <>
              <EditAction
                id={id}
                baseURL={`/dashboard/services/${idService}/images`}
              />
              <RemoveAction
                id={id}
                baseURL={`/dashboard/services/${idService}/images`}
              />
            </>
          );
        }}
        enableSearch
        enablePagination
        enableSort
        enableReorder
        pageSize={10}
        pageSizeOptions={[5, 10, 20, 50]}
        onReorder={handleReorder}
      />
    </>
  );
};
