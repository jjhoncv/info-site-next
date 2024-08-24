"use client";

import { PermissionName, User } from "@/interfaces";
import { signOut } from "next-auth/react";
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

const base = `/dashboard`;

const menuItems: MenuItem[] = [
  { label: "Dashboard", href: `${base}`, permission: "dashboard.view" },
  { label: "Banners", href: `${base}/banners`, permission: "banners.view" },
  {
    label: "Servicios",
    href: `${base}/services`,
    permission: "services.view",
  },
  {
    label: "Proyectos",
    href: `${base}/projects`,
    permission: "projects.view",
  },
  { label: "Páginas", href: `${base}/pages`, permission: "pages.view" },
  { label: "Galería", href: `${base}/gallery`, permission: "gallery.view" },
  { label: "Usuarios", href: `${base}/users`, permission: "users.view" },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ user }) => {
  const pathname = usePathname();

  const hasPermission = (permission: PermissionName): boolean => {
    if (!user) return false;

    return user?.role?.permissions?.includes(permission) ?? false;
  };

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
        <p className="text-sm text-gray-400">Bienvenido, {user?.username} </p>
      </div>
      <nav>
        <ul>
          {menuItems.map(
            (item) =>
              hasPermission(item.permission) && (
                <li key={item.href} className="mb-2">
                  <Link
                    href={item.href}
                    className={`block p-2 rounded hover:bg-gray-700 ${
                      pathname === item.href ? "bg-gray-700" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
          )}
        </ul>
        <button onClick={() => signOut({ callbackUrl: "/login" })}>
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
