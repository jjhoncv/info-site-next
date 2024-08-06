import { Banner } from "@/interfaces";
import Image from "next/image";

export default function BannerList({ banners }: { banners: Banner[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {banners.map((banner) => (
        <div key={banner.id} className="border p-4 rounded shadow bg-white">
          <h2 className="text-xl font-semibold">{banner.title}</h2>
          <p className="text-gray-600">{banner.subtitle}</p>
          <div className="relative w-full h-40 mt-2">
            <Image
              src={banner.image_url}
              alt={banner.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
