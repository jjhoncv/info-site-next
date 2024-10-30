"use client";

import { PermissionName, User } from "@/interfaces";
import {
  ChevronDown,
  HomeIcon,
  LayoutGrid,
  TableOfContents,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  user: User;
}

interface MenuItem {
  label: string;
  href: string;
  permission: PermissionName;
  icon?: string; // Opcional: para iconos si decides añadirlos
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ user }) => {
  const pathname = usePathname();
  const menuItems = user.role?.sections.flat();

  return (
    <aside className="bg-gray-800 text-white w-16 flex flex-col md:w-64 min-h-screen p-4">
      <div className="mb-6 hidden md:block">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
      </div>
      <nav className="gap-1 flex flex-col items-center md:items-stretch">
        <Link
          className="flex gap-3 p-3  rounded items-center hover:bg-gray-700"
          href="/dashboard"
        >
          <HomeIcon style={{ strokeWidth: 0.9 }} color="white" size={20} />
          <span className="hidden md:block">Dashboard</span>
        </Link>
        {menuItems.length > 0 && (
          <>
            <div className="flex relative gap-3 p-3 rounded items-center hover:bg-gray-700">
              <LayoutGrid
                style={{ strokeWidth: 0.9 }}
                color="white"
                size={22}
              />
              <span className="hidden md:block">Secciones</span>
              <ChevronDown
                size={15}
                className="absolute right-4 hidden md:block"
              />
            </div>
            <ul className="ml-11 hidden md:block">
              {menuItems.map((item) => (
                <li key={item.id} className="mb-1">
                  <Link
                    href={item.url}
                    className={`block py-1 ${
                      pathname === item.url ? "font-semibold" : ""
                    }`}
                  >
                    <div className="flex items-center capitalize">
                      {item.name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
