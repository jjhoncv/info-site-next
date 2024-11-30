import { PageUI } from "@/app/components/admin/components/Page/Page";
import { PageTitle } from "@/app/components/admin/components/Page/PageTitle";
import { UserEditView } from "@/app/components/admin/components/Users/UserEditView";
import { getRoles } from "@/services/roleService";
import { getUser } from "@/services/userService";

export const revalidate = 0; // Deshabilitar cache estático

export default async function UserEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [user, roles] = await Promise.all([getUser(id), getRoles()]);
  if (!user) return <div>No se encontraron user</div>;
  if (!roles) return <div>No se encontraron roles</div>;

  return (
    <PageUI
      title={<PageTitle title="Editar Usuario" />}
      breadcrumb={[
        { label: "Usuarios", url: "/dashboard/users" },
        { label: "Editar Usuario" },
      ]}
      subtitle="Editar usuario"
      // options={<PageButton href="/dashboard/users">Listar usuarios</PageButton>}
    >
      <UserEditView user={user} roles={roles} />
    </PageUI>
  );
}
