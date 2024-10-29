import { PageUI } from "@/app/components/Page/Page";
import { PageTitle } from "@/app/components/Page/PageTitle";
import { RoleEditView } from "@/app/components/Roles/RoleEditView";
import { toClient } from "@/lib/utils";
import { getRole } from "@/models/role";
import { getSections } from "@/models/sections";

export const revalidate = 0; // Deshabilitar cache estático

export default async function UserEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [role, sections] = await Promise.all([
    getRole(id).then(toClient),
    getSections().then(toClient),
  ]);

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
