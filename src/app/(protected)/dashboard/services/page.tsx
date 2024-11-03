import { DataTable } from "@/app/components/DataTable";
import { PERMISSIONS } from "@/interfaces";
import { hasPermission } from "@/lib/hasPermission";
import { findAllServices } from "@/models/service";

export default async function BannersPage() {
  const services = await findAllServices();

  return (
    <div className="container">
      <h1>Services</h1>
      <DataTable
        data={services}
        columns={[
          { key: "title", header: "Title" },
          { key: "image_url", header: "Image" },
          { key: "slug", header: "Slug" },
          { key: "display_order", header: "Display Order" },
        ]}
      />
    </div>
  );
}
