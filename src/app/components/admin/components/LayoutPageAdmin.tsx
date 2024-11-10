import { User } from "@/interfaces";
import { FC, ReactNode } from "react";
import { LayoutPanelAdmin } from "./LayoutPanelAdmin";

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
      <LayoutPanelAdmin user={user}>{children}</LayoutPanelAdmin>
    </div>
  );
};
