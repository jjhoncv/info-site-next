// app/pages/[id]/page.tsx
import Image from "next/image";
import { getPageById, getPageImages } from "@/services/pageService";
import { notFound } from "next/navigation";

export default async function PageDetail({
  params,
}: {
  params: { id: string };
}) {
  const page = await getPageById(parseInt(params.id));

  if (!page) {
    notFound();
  }

  const images = await getPageImages(page.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
      <div className="mb-6">
        <div className="relative w-full h-64">
          <Image
            src={page.image_url}
            alt={page.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <p className="text-xl mb-4">{page.subtitle}</p>
      <div
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: page.description }}
      />

      <h2 className="text-2xl font-semibold mb-4">Imágenes adicionales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative h-48">
            <Image
              src={image.image_url}
              alt={image.title}
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
