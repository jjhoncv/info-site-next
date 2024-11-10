"use client";
import { Role, Section } from "@/interfaces";
import { FetchCustomBody } from "@/lib/FetchCustomBody";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Alert } from "../Alert/Alert";
import { DynamicTable, TableColumn } from "../Table/DynamicTable";

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

  const columns: TableColumn[] = [
    {
      key: "role",
      label: "Roles",
      render: (value: string) => value,
    },
    ...sections.map((section) => ({
      key: section.name,
      label: <span className="">{section.name}</span>,
      render: (hasPermission: boolean) => (
        <span className="">
          <span
            className={`px-2 flex w-10 justify-center py-1 rounded text-xs font-medium ${
              hasPermission
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {hasPermission ? (
              <Check className="flex" color="green" size={20} />
            ) : (
              <X className="flex" color="red" size={20} />
            )}
          </span>
        </span>
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
        rowMobileClassName="grid grid-cols-3 pt-1"
        onDelete={(id: string) => {
          router.replace("/dashboard/roles?action=alert&id=" + id);
        }}
        enableSearch={false}
        enablePagination={false}
        enableSort={false}
        enableReorder={false}
        pageSize={5}
        pageSizeOptions={[5, 10, 20, 50]}
        onEdit={(id) => {
          router.replace("/dashboard/roles/" + id);
        }}
      />
    </>
  );
};
