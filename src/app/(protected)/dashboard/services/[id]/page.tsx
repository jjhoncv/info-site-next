import { FormCreate } from "@/app/components/admin/components/FormCreate/FormCreate";
import { mergeFieldsWithData } from "@/app/components/admin/components/FormCreate/mergeFieldsWithData";
import { PageUI } from "@/app/components/admin/components/Page/Page";
import { PageTitle } from "@/app/components/admin/components/Page/PageTitle";
import { ServiceFields } from "@/app/components/admin/components/Services/serviceFields";

import { getService } from "@/services/serviceService";

export const revalidate = 0; // Deshabilitar cache estático

export default async function ServiceEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const service = await getService(id);
  if (!service) return <div>No se encontraro service</div>;

  const fieldsWithValues = mergeFieldsWithData(ServiceFields, service);

  return (
    <PageUI
      title={<PageTitle title="Editar Servicie" />}
      breadcrumb={[
        { label: "Servicie", url: "/dashboard/services" },
        { label: "Editar Servicie" },
      ]}
      subtitle="Editar Servicie"
    >
      <FormCreate
        api={{ url: "/api/admin/services", method: "PATCH", withFiles: true }}
        form={{
          redirect: "/dashboard/services",
          fields: fieldsWithValues,
          customFields: { id },
        }}
      />
    </PageUI>
  );
}
