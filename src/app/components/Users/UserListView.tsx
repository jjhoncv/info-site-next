"use client";
import { User } from "@/interfaces";
import { FC } from "react";
import { DynamicTable, TableColumn } from "../Table/DynamicTable";
import { useRouter } from "next/navigation";
import { FetchCustomBody } from "@/lib/FetchCustomBody";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import { Alert } from "../Alert/Alert";
import { CardContent } from "../CardContent/CardContent";

interface UserListViewProps {
  users: User[];
}

export const UserListView: FC<UserListViewProps> = ({ users }) => {
  const router = useRouter();

  const columns: TableColumn[] = [
    {
      key: "username",
      label: "Nombres",
      width: "w-1/5",
    },
    {
      key: "lastname",
      label: "Apellidos",
      width: "w-1/5",
    },
    {
      key: "email",
      label: "Email",
      width: "w-1/5",
    },
    {
      key: "role",
      label: "Rol",
      width: "w-1/5",
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

  return (
    <CardContent>
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
        actions={{
          edit: true,
          delete: true,
        }}
        onDelete={(id: string) => {
          router.replace("/dashboard/users?action=alert&id=" + id);
        }}
      />
    </CardContent>
  );
};
