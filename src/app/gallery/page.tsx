import { getAllGalleryItems } from "@/services/galleryService";
import GalleryList from "@/app/components/GalleryList";

export default async function GalleryPage() {
  const galleryItems = await getAllGalleryItems();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Galería</h1>
      <GalleryList items={galleryItems} />
    </div>
  );
}
