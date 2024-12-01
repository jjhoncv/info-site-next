"use client";
import { User } from "@/interfaces";
import { FetchCustomBody } from "@/lib/FetchCustomBody";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Alert } from "../Alert/Alert";
import { DynamicTable, TableColumn } from "../Table/DynamicTable";
import { EditAction, RemoveAction } from "../Table/Actions";

interface UserListViewProps {
  users: User[];
}

export const UserListView: FC<UserListViewProps> = ({ users }) => {
  const router = useRouter();

  const columns: TableColumn[] = [
    {
      key: "username",
      label: "Nombres",
      priority: "high",
      sortable: true,
      searchable: true,
    },
    {
      key: "lastname",
      label: "Apellidos",
      priority: "high",
      sortable: true,
      searchable: true,
    },
    {
      key: "email",
      label: "Email",
      priority: "high",
      sortable: true,
      searchable: true,
    },
    {
      key: "role",
      label: "Rol",
      priority: "high",
      sortable: true,
      searchable: true,
      render: (value) => value.name, // Para acceder a role.name
    },
  ];

  const handleRemoveRole = async (id: string | null) => {
    if (!id) return;
    try {
      const message = await FetchCustomBody({
        data: { user_id: id },
        method: "DELETE",
        url: "/api/admin/users",
      });

      ToastSuccess(message);
      router.push("/dashboard/users");
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
        message="¿Estás seguro de eliminar este usuario?"
        onSuccess={() => {
          const urlParams = new URLSearchParams(window.location.search);
          const id = urlParams.get("id");
          handleRemoveRole(id);
        }}
        onCancel={() => {
          router.replace("/dashboard/users");
        }}
      />
      <DynamicTable
        columns={columns}
        data={users}
        baseUrl="/dashboard/users"
        renderActions={(id: string) => {
          return (
            <>
              <EditAction id={id} baseURL="/dashboard/users" />
              <RemoveAction id={id} baseURL="/dashboard/users" />
            </>
          );
        }}
        enableSearch
        enablePagination
        enableSort
        enableReorder
        pageSize={5}
        pageSizeOptions={[5, 10, 20, 50]}
        onReorder={handleReorder}
      />
    </>
  );
};
