import { User } from "@/interfaces";
import { FC, ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";

interface LayoutPageProps {
  children: ReactNode;
  user: User;
}

export const LayoutPageAdmin: FC<LayoutPageProps> = async ({
  user,
  children,
}) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar user={user} />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
};
