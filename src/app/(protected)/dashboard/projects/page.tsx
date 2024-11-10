import { DataTable } from "@/app/components/admin/components/DataTable";
import { findAllProjects } from "@/models/project";

export default async function BannersPage() {
  const projects = await findAllProjects();

  return (
    <div className="container">
      <h1>Projects</h1>
      <DataTable
        data={projects}
        columns={[
          { key: "title", header: "Title" },
          { key: "subtitle", header: "Subtitle" },
          { key: "slug", header: "Slug" },
          { key: "display_order", header: "Display Order" },
        ]}
      />
    </div>
  );
}
