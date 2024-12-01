import { PageUI } from "@/app/components/admin/components/Page/Page";
import { PageButton } from "@/app/components/admin/components/Page/PageButton";
import { PageTitle } from "@/app/components/admin/components/Page/PageTitle";
import { ServiceListView } from "@/app/components/admin/components/Services/ServiceListView";
import { getServices, searchServices } from "@/services/serviceService";
import { Suspense } from "react";

function LoadingTable() {
  return <div>Cargando servicios...</div>;
}

export default async function ServiceListPage({
  searchParams: { q },
}: {
  searchParams: { q: string };
}) {
  const services = q ? await searchServices(q) : await getServices();

  if (!services) return <div>No se encontraron services</div>;

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
