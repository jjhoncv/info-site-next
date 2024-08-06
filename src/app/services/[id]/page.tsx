// app/services/[id]/page.tsx
import Image from "next/image";
import { getServiceById, getServiceImages } from "@/services/serviceService";
import { notFound } from "next/navigation";

export default async function ServiceDetail({
  params,
}: {
  params: { id: string };
}) {
  const service = await getServiceById(parseInt(params.id));

  if (!service) {
    notFound();
  }

  const images = await getServiceImages(service.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
      <div className="mb-6">
        <div className="relative w-full h-64">
          <Image
            src={service.image_url}
            alt={service.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <p className="text-xl mb-4">{service.subtitle}</p>
      <div
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: service.description }}
      />

      <h2 className="text-2xl font-semibold mb-4">Imágenes relacionadas</h2>
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
