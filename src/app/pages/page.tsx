import { getAllPages } from "@/services/pageService";
import PageList from "@/app/components/PageList";

export default async function PagesPage() {
  const pages = await getAllPages();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Páginas</h1>
      <PageList pages={pages} />
    </div>
  );
}
