import { GalleryItem } from "@/interfaces";
import Image from "next/image";

export default function GalleryList({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.id} className="border p-4 rounded shadow bg-white">
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p className="text-gray-600">{item.subtitle}</p>
          <div className="relative w-full h-40 mt-2">
            <Image
              src={item.image_url}
              alt={item.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
