// src/app/admin/banners/page.tsx
import {
  findAllBanners,
  newBanner,
  editBanner,
  removeBanner,
} from "@/services/bannerService";
import { DataTable } from "@/app/components/DataTable";
import { Form } from "@/app/components/Form";
import { bannerSchema } from "@/lib/validations";
import { Banner } from "@/interfaces";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/Common/ui/Button";

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      const fetchedBanners = await findAllBanners();
      setBanners(fetchedBanners);
    };
    fetchBanners();
  }, []);

  const handleCreate = async (
    data: Omit<Banner, "id" | "created_at" | "updated_at">
  ) => {
    const bannerNew = await newBanner(data);
    setBanners([...banners, bannerNew]);
  };

  const handleUpdate = async (data: Partial<Banner>) => {
    if (editingBanner) {
      await editBanner(editingBanner.id, data);
      setBanners(
        banners.map((b) => (b.id === editingBanner.id ? { ...b, ...data } : b))
      );
      setEditingBanner(null);
    }
  };

  const handleDelete = async (banner: Banner) => {
    await removeBanner(banner.id);
    setBanners(banners.filter((b) => b.id !== banner.id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Banners</h1>
      <DataTable
        data={banners}
        columns={[
          { key: "title", header: "Título" },
          { key: "subtitle", header: "Subtítulo" },
          { key: "display_order", header: "Orden" },
        ]}
        onEdit={setEditingBanner}
        onDelete={handleDelete}
      />
      <h2 className="text-xl font-bold mt-8 mb-4">
        {editingBanner ? "Editar Banner" : "Crear Nuevo Banner"}
      </h2>
      <Form
        schema={bannerSchema}
        onSubmit={editingBanner ? handleUpdate : handleCreate}
        defaultValues={editingBanner || undefined}
      />
      {editingBanner && (
        <Button onClick={() => setEditingBanner(null)} className="mt-4">
          Cancelar Edición
        </Button>
      )}
    </div>
  );
}
