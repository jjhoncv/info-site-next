// app/page.tsx
import { findAllBanners } from "@/services/bannerService";
import { getAllServices } from "@/services/serviceService";
import Banner from "./components/Banner/ui/Banner";
import Header from "./components/Header";
import { LayoutPage } from "./components/LayoutPage";
import ServicesGrid from "./components/ServicesGrid";

export default async function Home() {
  const banners = await findAllBanners();
  const services = await getAllServices();

  return (
    <LayoutPage>
      <Header services={services} />
      <Banner banners={banners} />
      <ServicesGrid services={services} />
    </LayoutPage>
  );
}
