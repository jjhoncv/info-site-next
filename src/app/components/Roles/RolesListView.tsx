"use client";
import { Role, Section } from "@/interfaces";
import { FC, useState } from "react";
import { DynamicTable } from "../Table/DynamicTable";
import { FetchCustomBody } from "@/lib/FetchCustomBody";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert } from "../Alert/Alert";

interface RolesListViewProps {
  roles: Role[];
  sections: Section[];
}

export const RolesListView: FC<RolesListViewProps> = ({ roles, sections }) => {
  const router = useRouter();

  // Formatear los datos para la tabla
  const formattedData = roles.map((role) => {
    // Crear un mapa para fácil acceso a las secciones del rol
    const roleSectionsMap = new Map(
      role.sections.map((section) => [section.id, section])
    );

    // Crear objeto con permisos dinámicos
    const permissions = sections.reduce(
      (acc, section) => ({
        ...acc,
        [section.name]: roleSectionsMap.has(section.id),
      }),
      {}
    );

    return {
      id: role.id,
      role: role.name.charAt(0).toUpperCase() + role.name.slice(1),
      ...permissions,
    };
  });

  const columns = [
    {
      key: "role",
      label: "Roles",
      width: "w-[200px]",
      render: (value: string) => value,
    },
    ...sections.map((section) => ({
      key: section.name,
      label: <div className="flex justify-center">{section.name}</div>,
      width: "w-[130px]",
      render: (hasPermission: boolean) => (
        <div className="flex justify-center">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              hasPermission
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {hasPermission ? "YES" : "NO"}
          </span>
        </div>
      ),
    })),
  ];

  const handleRemoveRole = async (id: string | null) => {
    if (!id) return;
    try {
      const message = await FetchCustomBody({
        data: { role_id: id },
        method: "DELETE",
        url: "/api/admin/roles",
      });

      ToastSuccess(message);
      router.push("/dashboard/roles");
      router.refresh();
    } catch (error: any) {
      ToastFail(error.message);
    }
  };

  return (
    <>
      <Alert
        message="¿Estás seguro de eliminar este rol?"
        onSuccess={() => {
          const urlParams = new URLSearchParams(window.location.search);
          const id = urlParams.get("id");
          handleRemoveRole(id);
        }}
        onCancel={() => {
          router.replace("/dashboard/roles");
        }}
      />
      <DynamicTable
        columns={columns}
        data={formattedData}
        baseUrl="/dashboard/roles"
        actions={{
          edit: true,
          delete: true,
        }}
        onDelete={(id: string) => {
          router.replace("/dashboard/roles?action=alert&id=" + id);
        }}
      />
    </>
  );
};
