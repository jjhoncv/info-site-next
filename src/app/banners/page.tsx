// app/banners/page.tsx
import { getAllBanners } from "@/services/bannerService";
import BannerList from "@/app/components/BannerList";

export default async function BannersPage() {
  const banners = await getAllBanners();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Banners</h1>
      <BannerList banners={banners} />
    </div>
  );
}
