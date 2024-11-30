import { FormCreate } from "@/app/components/admin/components/FormCreate/FormCreate";
import { PageUI } from "@/app/components/admin/components/Page/Page";
import { PageTitle } from "@/app/components/admin/components/Page/PageTitle";
import { ServiceImagesFields } from "@/app/components/admin/components/Services/serviceImagesFields";
import { getService } from "@/services/serviceService";

export const revalidate = 0; // Deshabilitar cache estático

export default async function ServiceNewPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const service = await getService(id);
  if (!service) return <div>No se encontraron service</div>;

  return (
    <PageUI
      title={<PageTitle title="Nuevo Imagen" />}
      breadcrumb={[
        { label: "Services", url: "/dashboard/services" },
        {
          label: `${service?.slug} - Imágenes`,
          url: `/dashboard/services/${id}/images`,
        },
        { label: "Nuevo" },
      ]}
      subtitle="Crear nuevo imagen"
    >
      <FormCreate
        type="new"
        api={{
          url: "/api/admin/services/images",
          method: "POST",
          withFiles: true,
        }}
        form={{
          redirect: `/dashboard/services/${id}/images`,
          fields: ServiceImagesFields,
          customFields: { idService: id },
        }}
      />
    </PageUI>
  );
}
