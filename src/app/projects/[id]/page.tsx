// app/projects/[id]/page.tsx
import Image from "next/image";
import { getProjectById, getProjectImages } from "@/services/projectService";
import { notFound } from "next/navigation";

export default async function ProjectDetail({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProjectById(parseInt(params.id));

  if (!project) {
    notFound();
  }

  const images = await getProjectImages(project.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <div className="mb-6">
        <div className="relative w-full h-64">
          <Image
            src={project.image_url}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <p className="text-xl mb-4">{project.subtitle}</p>
      <div
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: project.description }}
      />

      <h2 className="text-2xl font-semibold mb-4">Galería del proyecto</h2>
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
