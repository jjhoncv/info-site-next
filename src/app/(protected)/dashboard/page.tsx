import { CardContent } from "@/app/components/CardContent/CardContent";
import { getSections } from "@/models/sections";
import { Archive } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const sections = await getSections();

  return (
    <div>
      <h1 className="font-semibold text-2xl">Dashboard</h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5 grid-cols-2">
        {sections.map((section, index) => {
          return (
            <Link href={section.url} className="h-[140px] lg:h-full">
              <CardContent
                className={`gap-2 flex flex-col items-center border-transparent hover:bg-slate-300 capitalize justify-center`}
              >
                <Archive size={40} strokeWidth={0.9} />
                {section.name}
              </CardContent>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
