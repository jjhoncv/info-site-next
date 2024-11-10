import { BannerFields } from "@/app/components/admin/components/Banners/bannerFields";
import { FormCreate } from "@/app/components/admin/components/FormCreate/FormCreate";
import { PageUI } from "@/app/components/admin/components/Page/Page";
import { PageTitle } from "@/app/components/admin/components/Page/PageTitle";

export default async function BannerNewPage() {
  return (
    <PageUI
      title={<PageTitle title="Nuevo Banner" />}
      breadcrumb={[
        { label: "Banners", url: "/dashboard/banners" },
        { label: "Nuevo Banner" },
      ]}
      subtitle="Crear nuevo banner"
    >
      <FormCreate
        api={{ url: "/api/admin/banners", method: "POST", withFiles: true }}
        form={{ redirect: "/dashboard/banners", fields: BannerFields }}
      />
    </PageUI>
  );
}
