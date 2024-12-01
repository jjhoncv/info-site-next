import { BannerListView } from "@/app/components/admin/components/Banners/BannerListView";
import { PageUI } from "@/app/components/admin/components/Page/Page";
import { PageButton } from "@/app/components/admin/components/Page/PageButton";
import { PageTitle } from "@/app/components/admin/components/Page/PageTitle";
import { RoleName } from "@/interfaces";
import { hasPermission } from "@/lib/hasPermission";
import { getBanners, searchBanners } from "@/services/bannerService";
import { Suspense } from "react";

function LoadingTable() {
  return <div>Cargando banners...</div>;
}

export default async function BannerListPage({
  searchParams: { q },
}: {
  searchParams: { q: string };
}) {
  const banners = q ? await searchBanners(q) : await getBanners();

  if (!banners) return <div>No se encontraron banners</div>;

  return (
    <PageUI
      title={<PageTitle title="Banners" />}
      subtitle="Todos los banners"
      breadcrumb={[{ label: "Banners" }]}
      options={
        <PageButton href="/dashboard/banners/new">Nuevo banner</PageButton>
      }
    >
      <Suspense fallback={<LoadingTable />}>
        <BannerListView banners={banners} />
      </Suspense>
    </PageUI>
  );
}
