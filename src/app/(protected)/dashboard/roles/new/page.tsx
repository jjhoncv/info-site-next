import { PageUI } from "@/app/components/Page/Page";
import { PageTitle } from "@/app/components/Page/PageTitle";
import { RoleNewView } from "@/app/components/Roles/RoleNewView";
import { toClient } from "@/lib/utils";
import { getSections } from "@/models/sections";

export default async function UserNewPage() {
  // const users = toClient(await getUsers());
  const sections = toClient(await getSections());

  // if (!users) return null;

  return (
    <PageUI
      title={<PageTitle title="Nuevo Rol" />}
      breadcrumb={[
        // { label: "Usuarios", url: "/dashboard/users" },
        { label: "Nuevo Rol" },
      ]}
      subtitle="Crear nuevo rol"
      // options={<PageButton href="/dashboard/users">Listar usuarios</PageButton>}
    >
      <RoleNewView sections={sections} />
    </PageUI>
  );
}
