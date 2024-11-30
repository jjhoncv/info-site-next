// app/page.tsx

import { getBanners } from "@/services/bannerService";
import Banner from "./components/Banner/ui/Banner";
import Header from "./components/Header";
import { LayoutPage } from "./components/LayoutPage";
import ServicesGrid from "./components/ServicesGrid";
import { getServices } from "@/services/serviceService";

export default async function Home() {
  const banners = await getBanners();
  const services = await getServices();

  return (
    <LayoutPage>
      {/* <Header services={services} /> */}
      <Banner banners={banners} />
      <ServicesGrid services={services} />
    </LayoutPage>
  );
}
