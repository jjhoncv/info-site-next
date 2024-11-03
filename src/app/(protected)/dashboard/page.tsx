import { CardContent } from "@/app/components/CardContent/CardContent";
import { auth } from "@/auth";
import { RoleName } from "@/interfaces";
import { hasPermission } from "@/lib/hasPermission";
import { Archive, LayoutGrid, Lock, Settings, Users2Icon } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) return null;

  const sections = session.user.data.role.sections;
  const permission = await hasPermission(RoleName.SUPERADMIN);

  if (!permission) {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <h1 className="font-semibold text-2xl">Dashboard</h1>
      <div className="mt-10 flex gap-2 items-center">
        <LayoutGrid size={30} strokeWidth={0.9} />
        <div className="text-lg">Secciones</div>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5 grid-cols-2 mt-5 md:mt-0">
        {sections.map((section, index) => {
          return (
            <Link href={section.url} className="h-[140px] lg:h-full">
              <CardContent
                className={`h-full md:h-fit gap-2 flex flex-col items-center border-transparent hover:bg-slate-200 capitalize justify-center transition-colors`}
              >
                <Archive size={40} strokeWidth={0.9} />
                {section.name}
              </CardContent>
            </Link>
          );
        })}
      </div>

      {permission && (
        <>
          <div className="mt-10 flex gap-2 items-center">
            <Settings size={30} strokeWidth={0.9} />
            <div className="text-lg">Roles y Usuarios</div>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5 grid-cols-2 mt-5 md:mt-0">
            <Link href="/dashboard/roles" className="h-[140px] lg:h-full">
              <CardContent
                className={`h-full md:h-fit gap-2 flex flex-col items-center border-transparent hover:bg-slate-200 capitalize justify-center transition-colors`}
              >
                <Lock size={40} strokeWidth={0.9} />
                Roles
              </CardContent>
            </Link>
            <Link href="/dashboard/users" className="h-[140px] lg:h-full">
              <CardContent
                className={`h-full md:h-fit gap-2 flex flex-col items-center border-transparent hover:bg-slate-200 capitalize justify-center transition-colors`}
              >
                <Users2Icon size={40} strokeWidth={0.9} />
                Usuarios
              </CardContent>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
