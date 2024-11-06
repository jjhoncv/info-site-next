import { BannerFields } from "@/app/components/Banners/bannerFields";
import { FormCreate } from "@/app/components/FormCreate/FormCreate";
import { mergeFieldsWithData } from "@/app/components/FormCreate/mergeFieldsWithData";
import { PageUI } from "@/app/components/Page/Page";
import { PageTitle } from "@/app/components/Page/PageTitle";
import { Banner } from "@/interfaces";
import { toClient } from "@/lib/utils";
import { getBannerById } from "@/models/banner";

export const revalidate = 0; // Deshabilitar cache estático

export default async function UserEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [banner] = (await Promise.all([
    getBannerById(id).then(toClient),
  ])) as Banner[];

  const fieldsWithValues = mergeFieldsWithData(BannerFields, banner);

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
        api={{ url: "/api/admin/banners", method: "PATCH", withFiles: true }}
        form={{ redirect: "/dashboard/banners", fields: fieldsWithValues, id }}
      />
    </PageUI>
  );
}
