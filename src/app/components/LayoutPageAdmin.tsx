import { FC, ReactNode } from "react";
import Footer from "./Footer";
import AdminSidebar from "./AdminSidebar";
import { getCurrentUser } from "@/lib/auth";

interface LayoutPageProps {
  children: ReactNode;
}

export const LayoutPageAdmin: FC<LayoutPageProps> = async ({ children }) => {
  const user = await getCurrentUser();

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar user={user} />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
    // <>
    //   <main>{children}</main>
    //   <Footer />
    // </>
  );
};
