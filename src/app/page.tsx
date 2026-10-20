// app/page.tsx

import { getBanners } from "@/services/bannerService";
import Banner from "./components/Banner/ui/Banner";
// import Header from "./components/Header";

import { LayoutPage } from "./components/LayoutPage";
import ServicesGrid from "./components/ServicesGrid";
import { getServices } from "@/services/serviceService";
// import { Header } from "@ajk-ui/header";
import { ThemeProvider, themes } from "@ajk-ui/theme-utils";
import Header from "./components/Header";

export default async function Home() {
  const banners = await getBanners();
  const services = await getServices();

  return (
    <LayoutPage>
      {/* <Header services={services} /> */}
      {/* <Banner banners={banners} />
      <ServicesGrid services={services} /> */}
      {/* <ThemeProvider initialTheme={themes.barbershop.vintage}>
        <Header
          backgroundImage="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop"
          cta={{
            href: "#",
            label: "Make a Reservation",
            variant: "primary",
          }}
          height="lg"
          logo={
            <span className="text-xl font-bold text-white">Restaurant</span>
          }
          navItems={[
            {
              href: "#",
              label: "Home",
            },
            {
              href: "#",
              label: "Menu",
            },
            {
              href: "#",
              label: "About",
            },
            {
              href: "#",
              label: "Contact",
            },
          ]}
          subtitle="Discover our carefully crafted menu featuring the finest ingredients and expert preparation"
          title="Exceptional Dining Experience"
          variant="hero"
        />
      </ThemeProvider> */}
    </LayoutPage>
  );
}
