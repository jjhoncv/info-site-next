import { BannerNewView } from "@/app/components/Banners/BannerNewView";
import { PageUI } from "@/app/components/Page/Page";
import { PageTitle } from "@/app/components/Page/PageTitle";

export default async function BannerNewPage() {
  // const users = toClient(await getUsers());
  // const roles = toClient(await getRoles());

  // if (!users) return null;

  return (
    <PageUI
      title={<PageTitle title="Nuevo Banner" />}
      breadcrumb={[
        { label: "Banners", url: "/dashboard/banners" },
        { label: "Nuevo Banner" },
      ]}
      subtitle="Crear nuevo banner"
    >
      <BannerNewView />
    </PageUI>
  );
}
