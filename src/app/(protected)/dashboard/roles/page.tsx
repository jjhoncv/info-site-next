import { PageUI } from "@/app/components/Page/Page";
import { PageButton } from "@/app/components/Page/PageButton";
import { PageTitle } from "@/app/components/Page/PageTitle";
import { RolesListView } from "@/app/components/Roles/RolesListView";
import { toClient } from "@/lib/utils";
import { getRoles } from "@/models/role";
import { getSections } from "@/models/sections";
import { Suspense } from "react";

function LoadingTable() {
  return <div>Cargando roles...</div>;
}

export default async function RolesPage() {
  const roles = toClient(await getRoles());
  const sections = toClient(await getSections());

  return (
    <PageUI
      title={<PageTitle title="Listado de roles" />}
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
