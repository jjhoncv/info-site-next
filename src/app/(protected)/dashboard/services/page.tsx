import { PageUI } from "@/app/components/admin/components/Page/Page";
import { PageButton } from "@/app/components/admin/components/Page/PageButton";
import { PageTitle } from "@/app/components/admin/components/Page/PageTitle";
import { ServiceListView } from "@/app/components/admin/components/Services/ServiceListView";
import { RoleName } from "@/interfaces";
import { hasPermission } from "@/lib/hasPermission";
import { toClient } from "@/lib/utils";
import { getAllServices } from "@/services/serviceService";
import { Suspense } from "react";

function LoadingTable() {
  return <div>Cargando servicios...</div>;
}

export default async function ServiceListPage() {
  const permission = await hasPermission(RoleName.SUPERADMIN);

  const [services] = await Promise.all([getAllServices().then(toClient)]);
  if (!services) return <div>No se encontraron services</div>;

  if (!permission) {
    return <div>Unauthorized</div>;
  }

  return (
    <PageUI
      title={<PageTitle title="Services" />}
      subtitle="Todos los services"
      breadcrumb={[{ label: "Services" }]}
      options={
        <PageButton href="/dashboard/services/new">Nuevo service</PageButton>
      }
    >
      <Suspense fallback={<LoadingTable />}>
        <ServiceListView services={services} />
      </Suspense>
    </PageUI>
  );
}
