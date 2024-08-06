// src/app/admin/page.tsx
import { getCurrentUser } from "@/lib/auth";
import PermissionGate from "@/app/components/PermissionGate";
import Link from "next/link";

export default async function AdminDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Acceso denegado</div>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard de Administración</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PermissionGate user={user} permission="banners.view">
          <Link href="/admin/banners" className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">Banners</h2>
            <p>Gestionar banners del sitio</p>
          </Link>
        </PermissionGate>
        <PermissionGate user={user} permission="services.view">
          <Link href="/admin/services" className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">Servicios</h2>
            <p>Gestionar servicios ofrecidos</p>
          </Link>
        </PermissionGate>
        <PermissionGate user={user} permission="projects.view">
          <Link href="/admin/projects" className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">Proyectos</h2>
            <p>Gestionar proyectos realizados</p>
          </Link>
        </PermissionGate>
        <PermissionGate user={user} permission="pages.view">
          <Link href="/admin/pages" className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">Páginas</h2>
            <p>Gestionar páginas del sitio</p>
          </Link>
        </PermissionGate>
        <PermissionGate user={user} permission="gallery.view">
          <Link href="/admin/gallery" className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">Galería</h2>
            <p>Gestionar imágenes de la galería</p>
          </Link>
        </PermissionGate>
        <PermissionGate user={user} permission="users.view">
          <Link href="/admin/users" className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">Usuarios</h2>
            <p>Gestionar usuarios y permisos</p>
          </Link>
        </PermissionGate>
      </div>
    </div>
  );
}
