"use client";
import { Banner } from "@/interfaces";
import { FetchCustomBody } from "@/lib/FetchCustomBody";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Alert } from "../Alert/Alert";
import { PreviewImageList } from "../PreviewImageList";
import { DynamicTable, TableColumn } from "../Table/DynamicTable";

interface BannerListViewProps {
  banners: Banner[];
}

export const BannerListView: FC<BannerListViewProps> = ({ banners }) => {
  const router = useRouter();

  const columns: TableColumn[] = [
    {
      key: "title",
      label: "Titulo",
      priority: "high",
      sortable: true,
      searchable: true,
      width: "100px",
    },
    {
      key: "image_url",
      label: "Imagen",
      priority: "high",
      sortable: true,
      searchable: true,
      render: (imageURL: string) => <PreviewImageList imageURL={imageURL} />,
      width: "100px",
    },
    {
      key: "link",
      label: "Link",
      priority: "medium",
      sortable: true,
      render: (linkURL: string) => {
        return (
          <Link
            className="hover:underline w-[250px] inline-block text-nowrap overflow-hidden text-ellipsis"
            href={linkURL}
            target="_blank"
          >
            {linkURL}
          </Link>
        );
      },
    },
  ];

  const handleRemoveRole = async (id: string | null) => {
    if (!id) return;
    try {
      const message = await FetchCustomBody({
        data: { id },
        method: "DELETE",
        url: "/api/admin/banners",
      });

      ToastSuccess(message);
      router.push("/dashboard/banners");
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
        message="¿Estás seguro de eliminar este banner?"
        onSuccess={() => {
          const urlParams = new URLSearchParams(window.location.search);
          const id = urlParams.get("id");
          handleRemoveRole(id);
        }}
        onCancel={() => {
          router.replace("/dashboard/banners");
        }}
      />
      <DynamicTable
        columns={columns}
        data={banners}
        baseUrl="/dashboard/banners"
        actions={{
          edit: true,
          delete: true,
        }}
        onDelete={(id: string) => {
          router.replace("/dashboard/banners?action=alert&id=" + id);
        }}
        enableSearch
        enablePagination
        enableSort
        enableReorder
        pageSize={10}
        pageSizeOptions={[5, 10, 20, 50]}
        onReorder={handleReorder}
        onEdit={(id) => {
          router.replace("/dashboard/banners/" + id);
        }}
      />
    </>
  );
};
