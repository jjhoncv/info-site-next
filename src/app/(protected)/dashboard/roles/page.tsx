import { PageUI } from "@/app/components/admin/components/Page/Page";
import { PageButton } from "@/app/components/admin/components/Page/PageButton";
import { PageTitle } from "@/app/components/admin/components/Page/PageTitle";
import { RolesListView } from "@/app/components/admin/components/Roles/RolesListView";
import { RoleName } from "@/interfaces";
import { hasPermission } from "@/lib/hasPermission";
import { toClient } from "@/lib/utils";
import { getRoles } from "@/models/role";
import { getSections } from "@/models/sections";
import { Suspense } from "react";

function LoadingTable() {
  return <div>Cargando roles...</div>;
}

export default async function RolesPage() {
  const permission = await hasPermission(RoleName.SUPERADMIN);
  const roles = toClient(await getRoles());
  const sections = toClient(await getSections());
  if (!permission) {
    return <div>Unauthorized</div>;
  }

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
