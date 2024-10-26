import { User } from "@/interfaces";
import { FC, ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { DropdownProfile } from "./DropdownProfile/DropdownProfile";

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
        <div>
          <div className="flex h-[70px] items-center justify-end mx-10 relative">
            <DropdownProfile user={user} />
          </div>
        </div>
        <div className="container mx-auto p-10 pt-5">{children}</div>
      </main>
    </div>
  );
};
