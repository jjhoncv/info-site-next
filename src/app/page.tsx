// app/page.tsx
import { getAllBanners } from "@/services/bannerService";
import Link from "next/link";
import Banner from "./components/Banner";
import { getAllServices } from "@/services/serviceService";
import ServicesGrid from "./components/ServicesGrid";

export default async function Home() {
  const banners = await getAllBanners();
  const services = await getAllServices();

  return (
    <>
      <Banner banners={banners} />
      <ServicesGrid services={services} />
    </>
  );
}
