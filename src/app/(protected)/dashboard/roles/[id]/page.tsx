import { PageUI } from "@/app/components/admin/components/Page/Page";
import { PageTitle } from "@/app/components/admin/components/Page/PageTitle";
import { RoleEditView } from "@/app/components/admin/components/Roles/RoleEditView";
import { toClient } from "@/lib/utils";
import { getRole } from "@/services/roleService";
import { getSections } from "@/services/sectionService";

export const revalidate = 0; // Deshabilitar cache estático

export default async function UserEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [role, sections] = await Promise.all([getRole(id), getSections()]);

  return (
    <PageUI
      title={<PageTitle title="Editar Rol" />}
      breadcrumb={[
        { label: "Roles", url: "/dashboard/roles" },
        { label: "Editar Rol" },
      ]}
      subtitle="Editar Rol"
    >
      <RoleEditView role={role} sections={sections} />
    </PageUI>
  );
}
