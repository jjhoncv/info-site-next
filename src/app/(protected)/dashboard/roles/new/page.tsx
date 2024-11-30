import { PageUI } from "@/app/components/admin/components/Page/Page";
import { PageTitle } from "@/app/components/admin/components/Page/PageTitle";
import { RoleNewView } from "@/app/components/admin/components/Roles/RoleNewView";
import { toClient } from "@/lib/utils";
import { getSections } from "@/services/sectionService";

export default async function UserNewPage() {
  const sections = await getSections();

  return (
    <PageUI
      title={<PageTitle title="Nuevo Rol" />}
      breadcrumb={[{ label: "Nuevo Rol" }]}
      subtitle="Crear nuevo rol"
    >
      <RoleNewView sections={sections} />
    </PageUI>
  );
}
