// app/components/PageList.tsx
import Image from "next/image";
import Link from "next/link";
import { Page } from "@/interfaces";

export default function PageList({ pages }: { pages: Page[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pages.map((page) => (
        <Link href={`/pages/${page.id}`} key={page.id} className="block">
          <div className="border p-4 rounded shadow bg-white hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold">{page.title}</h2>
            <p className="text-gray-600">{page.subtitle}</p>
            <div className="relative w-full h-40 mt-2">
              <Image
                src={page.image_url}
                alt={page.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
