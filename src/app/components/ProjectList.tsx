import { Project } from "@/interfaces";
import Link from "next/link";
import Image from "next/image";

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <Link
          href={`/projects/${project.id}`}
          key={project.id}
          className="block"
        >
          <div className="border p-4 rounded shadow bg-white hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-gray-600">{project.subtitle}</p>
            <div className="relative w-full h-40 mt-2">
              <Image
                src={project.image_url}
                alt={project.title}
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
