import { PageUI } from "@/app/components/admin/components/Page/Page";
import { PageButton } from "@/app/components/admin/components/Page/PageButton";
import { PageTitle } from "@/app/components/admin/components/Page/PageTitle";
import { UserListView } from "@/app/components/admin/components/Users/UserListView";
import { RoleName } from "@/interfaces";
import { hasPermission } from "@/lib/hasPermission";
import { getUsers } from "@/services/userService";
import { Suspense } from "react";

function LoadingTable() {
  return <div>Cargando usuarios...</div>;
}

export default async function UserListPage() {
  const users = await getUsers();
  if (!users) return <div>No se encontraron usuarios</div>;

  return (
    <PageUI
      title={<PageTitle title="Usuarios" />}
      subtitle="Todos los usuarios"
      breadcrumb={[{ label: "Usuarios" }]}
      options={
        <PageButton href="/dashboard/users/new">Nuevo usuario</PageButton>
      }
    >
      <Suspense fallback={<LoadingTable />}>
        <UserListView users={users} />
      </Suspense>
    </PageUI>
  );
}
