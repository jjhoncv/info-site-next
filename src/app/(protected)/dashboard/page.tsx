import { CardContent } from "@/app/components/admin/components/CardContent/CardContent";
import { auth } from "@/auth";
import { LayoutGrid, icons, Archive } from "lucide-react";
import Link from "next/link";

const Icon = ({ name, ...nextProps }: any) => {
  const LucideIcon = icons[name];
  return LucideIcon ? (
    <LucideIcon {...nextProps} />
  ) : (
    <Archive {...nextProps} />
  );
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) return null;

  const sections = session.user.data.role.sections;

  return (
    <div>
      <h1 className="font-semibold text-2xl">Dashboard</h1>
      <div className="mt-10 flex gap-2 items-center">
        <LayoutGrid size={30} strokeWidth={0.9} />
        <div className="text-lg">Secciones</div>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5 grid-cols-2 mt-5 md:mt-0">
        {sections.map((section, key) => {
          return (
            <Link key={key} href={section.url} className="h-[140px] lg:h-full">
              <CardContent
                className={`h-full md:h-fit gap-2 flex flex-col items-center border-transparent hover:bg-slate-200 capitalize justify-center transition-colors`}
              >
                {/* <Archive size={40} strokeWidth={0.9} />
                 */}
                <Icon name={section.image} size={40} strokeWidth={0.9} />

                {section.name}
              </CardContent>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
