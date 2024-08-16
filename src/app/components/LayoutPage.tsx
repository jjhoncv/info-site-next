import { FC, ReactNode } from "react";
import Footer from "./Footer";

interface LayoutPageProps {
  children: ReactNode;
}

export const LayoutPage: FC<LayoutPageProps> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
};
