import { BannerEditView } from "@/app/components/Banners/BannerEditView";
import { PageUI } from "@/app/components/Page/Page";
import { PageTitle } from "@/app/components/Page/PageTitle";
import { toClient } from "@/lib/utils";
import { getBannerById } from "@/models/banner";

export const revalidate = 0; // Deshabilitar cache estático

export default async function UserEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [banner] = await Promise.all([getBannerById(id).then(toClient)]);

  return (
    <PageUI
      title={<PageTitle title="Editar Banner" />}
      breadcrumb={[
        { label: "Banners", url: "/dashboard/users" },
        { label: "Editar Banner" },
      ]}
      subtitle="Editar Banner"
      // options={<PageButton href="/dashboard/users">Listar usuarios</PageButton>}
    >
      <BannerEditView banner={banner} />
    </PageUI>
  );
}
