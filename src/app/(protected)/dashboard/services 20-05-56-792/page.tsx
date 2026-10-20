import { BannerListView } from "@/app/components/Banners/BannerListView";
import { PageUI } from "@/app/components/Page/Page";
import { PageButton } from "@/app/components/Page/PageButton";
import { PageTitle } from "@/app/components/Page/PageTitle";
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
  if (!services) return <div>No se encontraron servicios</div>;

  if (!permission) {
    return <div>Unauthorized</div>;
  }

  return (
    <PageUI
      title={<PageTitle title="Servicios" />}
      subtitle="Todos los servicios"
      breadcrumb={[{ label: "Servicios" }]}
      options={
        <PageButton href="/dashboard/services/new">Nuevo servicio</PageButton>
      }
    >
      <Suspense fallback={<LoadingTable />}>
        <BannerListView services={services} />
      </Suspense>
    </PageUI>
  );
}
