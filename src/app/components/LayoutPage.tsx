import { FC, ReactNode } from "react";
import Footer from "./Footer";
import { getServices } from "@/services/serviceService";
import Header from "./Header";

interface LayoutPageProps {
  children: ReactNode;
}

export const LayoutPage: FC<LayoutPageProps> = async ({ children }) => {
  const services = await getServices();

  return (
    <>
      <Header services={services} />
      <main>{children}</main>
      <Footer />
    </>
  );
};
