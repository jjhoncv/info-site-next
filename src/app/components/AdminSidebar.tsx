"use client";
// src/components/AdminSidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserWithRole, PermissionName } from "@/interfaces";

interface AdminSidebarProps {
  user: UserWithRole;
}

interface MenuItem {
  label: string;
  href: string;
  permission: PermissionName;
  icon?: string; // Opcional: para iconos si decides añadirlos
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", href: "/admin", permission: "dashboard.view" },
  { label: "Banners", href: "/admin/banners", permission: "banners.view" },
  { label: "Servicios", href: "/admin/services", permission: "services.view" },
  { label: "Proyectos", href: "/admin/projects", permission: "projects.view" },
  { label: "Páginas", href: "/admin/pages", permission: "pages.view" },
  { label: "Galería", href: "/admin/gallery", permission: "gallery.view" },
  { label: "Usuarios", href: "/admin/users", permission: "users.view" },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ user }) => {
  const pathname = usePathname();

  const hasPermission = (permission: PermissionName): boolean => {
    return user.role.permissions.includes(permission);
  };

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
        <p className="text-sm text-gray-400">Bienvenido, {user.username}</p>
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
      </nav>
    </aside>
  );
};

export default AdminSidebar;
