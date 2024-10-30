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
      <main className="flex-1 overflow-x-hidden overflow-y-auto ">
        <div className="mx-auto md:p-10 p-5 pt-5 container">
          <div className="flex h-[40px] items-center justify-end relative mb-5">
            <DropdownProfile user={user} />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};
