"use client";
import { User } from "@/interfaces";
import { FC } from "react";
import { DynamicTable, TableColumn } from "../Table/DynamicTable";

interface UserListViewProps {
  users: User[];
}

export const UserListView: FC<UserListViewProps> = ({ users }) => {
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

  const handleDelete = (id: string) => {
    if (window.confirm("¿Está seguro de eliminar este usuario?")) {
      console.log("Eliminar usuario:", id);
    }
  };

  return (
    <DynamicTable
      columns={columns}
      data={users}
      baseUrl="/dashboard/users"
      actions={{
        edit: true,
        delete: true,
      }}
      onDelete={handleDelete}
    />
  );
};
