"use client";

import { PermissionName, User } from "@/interfaces";
import { HomeIcon, LayoutGrid, TableOfContents } from "lucide-react";
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
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
      </div>
      <nav>
        <Link
          className={`block p-2 rounded hover:bg-gray-700`}
          href="/dashboard"
        >
          <div className="flex gap-3 items-center capitalize">
            <HomeIcon style={{ strokeWidth: 0.9 }} color="white" size={20} />
            Dashboard
          </div>
        </Link>
        {menuItems.length > 0 && (
          <>
            <div className="flex gap-2 p-2 hover:bg-gray-700">
              <LayoutGrid
                style={{ strokeWidth: 0.9 }}
                color="white"
                size={22}
              />
              Secciones
            </div>
            <ul className="ml-8">
              {menuItems.map((item) => (
                <li key={item.id} className="mb-2">
                  <Link
                    href={item.url}
                    className={`block p-2 rounded hover:bg-gray-700 ${
                      pathname === item.url ? "bg-gray-700" : ""
                    }`}
                  >
                    <div className="flex gap-3 items-center capitalize">
                      <TableOfContents
                        style={{ strokeWidth: 0.9 }}
                        color="white"
                        size={20}
                      />
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
