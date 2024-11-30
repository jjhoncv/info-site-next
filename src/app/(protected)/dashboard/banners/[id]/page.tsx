import { BannerFields } from "@/app/components/admin/components/Banners/bannerFields";
import { FormCreate } from "@/app/components/admin/components/FormCreate/FormCreate";
import { mergeFieldsWithData } from "@/app/components/admin/components/FormCreate/mergeFieldsWithData";
import { PageUI } from "@/app/components/admin/components/Page/Page";
import { PageTitle } from "@/app/components/admin/components/Page/PageTitle";

import { getBanner } from "@/services/bannerService";

export const revalidate = 0; // Deshabilitar cache estático

export default async function UserEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const banner = await getBanner(id);
  const fieldsWithValues = mergeFieldsWithData(BannerFields, banner);

  if (!banner) return <div>No se encontraron banner</div>;

  return (
    <PageUI
      title={<PageTitle title="Editar Banner" />}
      breadcrumb={[
        { label: "Banners", url: "/dashboard/users" },
        { label: "Editar Banner" },
      ]}
      subtitle="Editar Banner"
    >
      <FormCreate
        type="edit"
        api={{ url: "/api/admin/banners", method: "PATCH", withFiles: true }}
        form={{
          redirect: "/dashboard/banners",
          fields: fieldsWithValues,
          customFields: { id },
        }}
      />
    </PageUI>
  );
}
