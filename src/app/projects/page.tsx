// app/projects/page.tsx
import { getAllProjects } from "@/services/projectService";
import ProjectList from "@/app/components/ProjectList";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nuestros Proyectos</h1>
      <ProjectList projects={projects} />
    </div>
  );
}
