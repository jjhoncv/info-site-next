import { getAllServices } from "@/services/serviceService";
import ServiceList from "@/app/components/ServiceList";

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nuestros Servicios</h1>
      <ServiceList services={services} />
    </div>
  );
}
