import { PageUI } from "@/app/components/admin/components/Page/Page";
import { PageButton } from "@/app/components/admin/components/Page/PageButton";
import { PageTitle } from "@/app/components/admin/components/Page/PageTitle";
import { RolesListView } from "@/app/components/admin/components/Roles/RolesListView";
import { getRoles } from "@/services/roleService";
import { getSections } from "@/services/sectionService";
import { Suspense } from "react";

function LoadingTable() {
  return <div>Cargando roles...</div>;
}

export default async function RolesPage() {
  const [roles, sections] = await Promise.all([getRoles(), getSections()]);

  return (
    <PageUI
      title={<PageTitle title="Roles" />}
      subtitle="Todos los roles"
      breadcrumb={[{ label: "Roles" }]}
      options={<PageButton href="/dashboard/roles/new">Nuevo rol</PageButton>}
    >
      <Suspense fallback={<LoadingTable />}>
        <RolesListView roles={roles} sections={sections} />
      </Suspense>
    </PageUI>
  );
}
