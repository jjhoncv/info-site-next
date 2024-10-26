import { PageUI } from "@/app/components/Page/Page";
import { PageButton } from "@/app/components/Page/PageButton";
import { PageTitle } from "@/app/components/Page/PageTitle";
import RolesPageView from "@/app/components/Roles/RolesPageView";
import { toClient } from "@/lib/utils";
import { getRoles } from "@/models/role";
import { getSections } from "@/models/sections";
import { PlusIcon } from "lucide-react";

export default async function RolesPage() {
  const roles = toClient(await getRoles());
  const sections = toClient(await getSections());

  return (
    <PageUI
      title={<PageTitle title="Listado de roles" />}
      subtitle="Todos los roles"
      options={<PageButton href="/dashboard/roles/add">Nuevo rol</PageButton>}
    >
      <table className="w-full">
        <thead>
          <tr className="flex flex-row">
            <th className="text-left w-1/2 pb-3">Rol</th>
            <th className="text-left w-1/2 pb-3">Seccion</th>
          </tr>
        </thead>
        <RolesPageView roles={roles} sections={sections} />
      </table>
    </PageUI>
  );
}
