import { PageUI } from "@/app/components/Page/Page";
import { PageButton } from "@/app/components/Page/PageButton";
import { PageTitle } from "@/app/components/Page/PageTitle";
import { UserListView } from "@/app/components/Users/UserListView";
import { toClient } from "@/lib/utils";
import { getUsers } from "@/models/user";
import { Suspense } from "react";

function LoadingTable() {
  return <div>Cargando usuarios...</div>;
}

export default async function UserListPage() {
  const [users] = await Promise.all([getUsers().then(toClient)]);
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
