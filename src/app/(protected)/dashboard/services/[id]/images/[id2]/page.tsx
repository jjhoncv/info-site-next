import { FormCreate } from "@/app/components/admin/components/FormCreate/FormCreate";
import { mergeFieldsWithData } from "@/app/components/admin/components/FormCreate/mergeFieldsWithData";
import { PageUI } from "@/app/components/admin/components/Page/Page";
import { PageTitle } from "@/app/components/admin/components/Page/PageTitle";
import { ServiceImagesFields } from "@/app/components/admin/components/Services/serviceImagesFields";
import { getServiceImage } from "@/services/serviceImageService";
import { getService } from "@/services/serviceService";

export const revalidate = 0; // Deshabilitar cache estático

export default async function ServiceNewPage({
  params,
}: {
  params: { id: string; id2: string };
}) {
  const { id, id2 } = params;

  const service = await getService(id);
  if (!service) return <div>No se encontraron service</div>;

  const serviceImage = await getServiceImage(id2);
  if (!serviceImage) return <div>No se encontraron serviceImage</div>;

  const fieldsWithValues = mergeFieldsWithData(
    ServiceImagesFields,
    serviceImage
  );

  return (
    <PageUI
      title={<PageTitle title="Nuevo Imagen" />}
      breadcrumb={[
        { label: "Services", url: "/dashboard/services" },
        {
          label: `${service?.slug} - Imágenes`,
          url: `/dashboard/services/${id}/images`,
        },
        { label: "Editar" },
      ]}
      subtitle="Crear nuevo imagen"
    >
      <FormCreate
        type="edit"
        api={{
          url: "/api/admin/services/images",
          method: "PATCH",
          withFiles: true,
        }}
        form={{
          redirect: `/dashboard/services/${id}/images`,
          fields: fieldsWithValues,
          customFields: { idService: id, idServiceImage: id2 },
        }}
      />
    </PageUI>
  );
}
