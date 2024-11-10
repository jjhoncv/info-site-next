import { BannerFields } from "@/app/components/admin/components/Banners/bannerFields";
import { FormCreate } from "@/app/components/admin/components/FormCreate/FormCreate";
import { mergeFieldsWithData } from "@/app/components/admin/components/FormCreate/mergeFieldsWithData";
import { PageUI } from "@/app/components/admin/components/Page/Page";
import { PageTitle } from "@/app/components/admin/components/Page/PageTitle";
import { ServiceFields } from "@/app/components/admin/components/Services/serviceFields";

import { Banner, Service } from "@/interfaces";
import { toClient } from "@/lib/utils";
import { getBannerById } from "@/models/banner";
import { getServiceById } from "@/services/serviceService";

export const revalidate = 0; // Deshabilitar cache estático

export default async function ServiceEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [service] = (await Promise.all([
    getServiceById(id).then(toClient),
  ])) as Service[];

  const fieldsWithValues = mergeFieldsWithData(ServiceFields, service);

  return (
    <PageUI
      title={<PageTitle title="Editar Service" />}
      breadcrumb={[
        { label: "Service", url: "/dashboard/services" },
        { label: "Editar Service" },
      ]}
      subtitle="Editar Service"
    >
      <FormCreate
        api={{ url: "/api/admin/services", method: "PATCH", withFiles: true }}
        form={{ redirect: "/dashboard/services", fields: fieldsWithValues, id }}
      />
    </PageUI>
  );
}
