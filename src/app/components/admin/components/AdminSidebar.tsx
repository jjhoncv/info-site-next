"use client";

import { PermissionName, Section, User } from "@/interfaces";
import { ChevronDown, ChevronUp, HomeIcon, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface AdminSidebarProps {
  user: User;
  open: boolean | string | undefined;
}

interface MenuItem {
  label: string;
  href: string;
  permission: PermissionName;
  icon?: string; // Opcional: para iconos si decides añadirlos
}

export const MenuItems = (items: Section[]) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(items.some((item) => item.url === pathname));

  return (
    <>
      {items.length > 0 && (
        <>
          <div
            onClick={() => {
              setOpen(!open);
            }}
            className={`${
              open ? "bg-gray-700" : ""
            } flex cursor-pointer relative gap-3 p-3 rounded items-center hover:bg-gray-600 transition-colors`}
          >
            <LayoutGrid style={{ strokeWidth: 0.9 }} color="white" size={22} />
            <span className="hidden md:block">Secciones</span>
            {open ? (
              <ChevronUp
                size={15}
                className="absolute right-4 hidden md:block"
              />
            ) : (
              <ChevronDown
                size={15}
                className="absolute right-4 hidden md:block"
              />
            )}
          </div>
          {open && (
            <ul className="ml-11 hidden md:block">
              {items.map((item) => (
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
          )}
        </>
      )}
    </>
  );
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({ user, open }) => {
  const menuItems = user.role?.sections.flat();

  return (
    <>
      <aside
        className={`bg-gray-800 text-white hidden flex-col md:flex md:w-64 min-h-screen p-4 ${
          open ? `w-16 !flex` : `hidden`
        }`}
      >
        <div className="mb-6 hidden md:block">
          <h2 className="text-2xl font-semibold">Admin Panel</h2>
        </div>
        <nav className="gap-1 flex flex-col items-center md:items-stretch">
          <Link
            className="flex transition-colors gap-3 p-3 rounded items-center hover:bg-gray-700"
            href="/dashboard"
          >
            <HomeIcon style={{ strokeWidth: 0.9 }} color="white" size={20} />
            <span className="hidden md:block">Dashboard</span>
          </Link>
          {MenuItems(menuItems)}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
