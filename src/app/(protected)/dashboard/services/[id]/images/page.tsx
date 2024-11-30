import { PageUI } from "@/app/components/admin/components/Page/Page";
import { PageButton } from "@/app/components/admin/components/Page/PageButton";
import { PageTitle } from "@/app/components/admin/components/Page/PageTitle";
import { ServiceImagesListView } from "@/app/components/admin/components/Services/ServiceImagesListView";
import { getServiceImagesByServiceId } from "@/services/serviceImageService";
import { getService } from "@/services/serviceService";
import { Suspense } from "react";

export const revalidate = 0; // Deshabilitar cache estático

function LoadingTable() {
  return <div>Cargando servicios...</div>;
}

export default async function ServiceNewPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const service = await getService(id);
  if (!service) return <div>No se encontraron service</div>;

  const serviceImages = await getServiceImagesByServiceId(id);
  if (!serviceImages) return <div>No se encontraron serviceImages</div>;

  return (
    <PageUI
      title={<PageTitle title="Listado de imágenes" />}
      breadcrumb={[
        { label: "Services", url: "/dashboard/services" },
        {
          label: `${service.slug} - Imágenes`,
        },
      ]}
      subtitle="Listado de imágenes "
      options={
        <PageButton href={`/dashboard/services/${id}/images/new`}>
          Nueva Imagen
        </PageButton>
      }
    >
      <Suspense fallback={<LoadingTable />}>
        <ServiceImagesListView serviceImages={serviceImages} idService={id} />
      </Suspense>
    </PageUI>
  );
}
