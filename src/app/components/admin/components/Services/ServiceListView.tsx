"use client";
import { Banner, Service } from "@/interfaces";
import { FetchCustomBody } from "@/lib/FetchCustomBody";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Alert } from "../Alert/Alert";
import { PreviewImageList } from "../PreviewImageList";
import { DynamicTable, TableColumn } from "../Table/DynamicTable";
import Link from "next/link";
import { Edit2, PencilIcon, Trash2, TrashIcon } from "lucide-react";
import { EditAction, GalleryAction, RemoveAction } from "../Table/Actions";

interface ServiceListViewProps {
  services: Service[];
}

export const ServiceListView: FC<ServiceListViewProps> = ({ services }) => {
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
      key: "image_url",
      label: "Imagen",
      priority: "high",
      sortable: true,
      searchable: true,
      render: (imageURL: string) => <PreviewImageList imageURL={imageURL} />,
    },
    {
      key: "subtitle",
      label: "Subtitulo",
      priority: "high",
      sortable: true,
      searchable: true,
    },
    {
      key: "slug",
      label: "Slug",
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
  ];

  const handleRemoveRole = async (id: string | null) => {
    if (!id) return;
    try {
      const message = await FetchCustomBody({
        data: { id },
        method: "DELETE",
        url: "/api/admin/services",
      });

      ToastSuccess(message);
      router.push("/dashboard/services");
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
        message="¿Estás seguro de eliminar este documento?"
        onSuccess={() => {
          const urlParams = new URLSearchParams(window.location.search);
          const id = urlParams.get("id");
          handleRemoveRole(id);
        }}
        onCancel={() => {
          router.replace("/dashboard/services");
        }}
      />
      <DynamicTable
        columns={columns}
        data={services}
        baseUrl="/dashboard/services"
        renderActions={(id: string) => {
          return (
            <>
              <EditAction id={id} baseURL="/dashboard/services" />
              <GalleryAction id={id} baseURL="/dashboard/services" />
              <RemoveAction id={id} baseURL="/dashboard/services" />
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
