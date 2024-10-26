import { PageUI } from "@/app/components/Page/Page";
import { PageButton } from "@/app/components/Page/PageButton";
import { PageTitle } from "@/app/components/Page/PageTitle";
import { UserNewView } from "@/app/components/Users/UserNewView";
import { toClient } from "@/lib/utils";
import { getRoles } from "@/models/role";

export default async function UserNewPage() {
  // const users = toClient(await getUsers());
  const roles = toClient(await getRoles());

  // if (!users) return null;

  return (
    <PageUI
      title={<PageTitle title="Nuevo Usuario" />}
      breadcrumb={[
        { label: "Usuarios", url: "/dashboard/users" },
        { label: "Nuevo Usuario" },
      ]}
      subtitle="Crear nuevo usuario"
      // options={<PageButton href="/dashboard/users">Listar usuarios</PageButton>}
    >
      <UserNewView roles={roles} />
    </PageUI>
  );
}
