import { FormCreate } from "@/app/components/admin/components/FormCreate/FormCreate";
import { PageUI } from "@/app/components/admin/components/Page/Page";
import { PageTitle } from "@/app/components/admin/components/Page/PageTitle";
import { ServiceFields } from "@/app/components/admin/components/Services/serviceFields";

export default async function ServiceNewPage() {
  return (
    <PageUI
      title={<PageTitle title="Nuevo Service" />}
      breadcrumb={[
        { label: "Services", url: "/dashboard/services" },
        { label: "Nuevo Service" },
      ]}
      subtitle="Crear nuevo service"
    >
      <FormCreate
        api={{ url: "/api/admin/services", method: "POST", withFiles: true }}
        form={{ redirect: "/dashboard/services", fields: ServiceFields }}
      />
    </PageUI>
  );
}
