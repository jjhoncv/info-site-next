import { ImageOffIcon, X, Loader2, Trash2 } from "lucide-react";
import ImageNext from "next/image";
import { useEffect, useState } from "react";

interface ImagePreview {
  url: string;
  loading: boolean;
  error: boolean;
  isExisting?: boolean;
}

interface RenderPreviewImageProps {
  field: FileList | null;
  imageURL?: string | string[];
  multiple?: boolean;
  onRemove?: (index: number) => void;
  className?: string;
}

export const RenderPreviewImage = ({
  field,
  imageURL,
  multiple = false,
  onRemove,
  className = "",
}: RenderPreviewImageProps) => {
  const [previews, setPreviews] = useState<ImagePreview[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadPreviews = async () => {
      // Limpiar URLs anteriores que no sean de imágenes existentes
      previews
        ?.filter((preview) => !preview.isExisting)
        .forEach((preview) => URL.revokeObjectURL(preview.url));

      const newPreviews: ImagePreview[] = [];

      // Cargar imágenes existentes
      if (imageURL) {
        const existingUrls = Array.isArray(imageURL) ? imageURL : [imageURL];
        existingUrls.forEach((url) => {
          if (url) {
            newPreviews.push({
              url,
              loading: false,
              error: false,
              isExisting: true,
            });
          }
        });
      }

      // Cargar nuevas imágenes seleccionadas
      if (field && field.length > 0) {
        setIsLoading(true);

        try {
          const filesPreviews = await Promise.all(
            Array.from(field)
              .filter((file) => typeof file !== "string")
              .map(async (file) => {
                const preview: ImagePreview = {
                  url: URL.createObjectURL(file),
                  loading: true,
                  error: false,
                  isExisting: false,
                };

                // Verificar que la imagen carga correctamente
                await new Promise((resolve, reject) => {
                  const img = new Image();
                  img.onload = resolve;
                  img.onerror = reject;
                  img.src = preview.url;
                });

                return {
                  ...preview,
                  loading: false,
                };
              })
          );

          if (filesPreviews) {
            newPreviews.push(...filesPreviews);
          }
        } catch (error) {
          console.error("Error loading previews:", error);
        } finally {
          setIsLoading(false);
        }
      }

      setPreviews(newPreviews);
    };

    loadPreviews();

    return () => {
      // Limpiar solo las URLs de objetos creados localmente
      previews
        ?.filter((preview) => !preview.isExisting)
        .forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [field, imageURL]);

  const handleRemove = (index: number) => {
    onRemove?.(index);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (previews?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full gap-2">
        <ImageOffIcon size={40} className="stroke-slate-400" strokeWidth={1} />
        <span className="text-sm text-slate-500">
          {multiple
            ? "No hay imágenes seleccionadas"
            : "No hay imagen seleccionada"}
        </span>
      </div>
    );
  }

  if (multiple) {
    return (
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full ${className}`}
      >
        {previews?.map((preview, index) => (
          <div
            key={index}
            className={`group relative aspect-square rounded-lg overflow-hidden border border-gray-200 
              ${preview.error ? "border-red-300 bg-red-50" : ""}`}
          >
            {preview.loading ? (
              <div className="flex items-center justify-center w-full h-full">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              </div>
            ) : preview.error ? (
              <div className="flex flex-col items-center justify-center w-full h-full p-4">
                <ImageOffIcon className="h-6 w-6 text-red-400 mb-2" />
                <span className="text-xs text-red-500 text-center">
                  Error al cargar la imagen
                </span>
              </div>
            ) : (
              <>
                <div className="relative w-full h-full">
                  <ImageNext
                    src={preview.url}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {onRemove && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all">
                      <button
                        onClick={() => handleRemove(index)}
                        className="transform scale-0 group-hover:scale-100 transition-transform bg-white/90 p-2 rounded-full hover:bg-red-500 hover:text-white"
                        title="Eliminar imagen"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
                {preview.isExisting && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Existente
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Single image preview
  const preview = previews?.[0];
  return (
    <div
      className={`relative aspect-video w-full rounded-lg overflow-hidden border border-gray-200 ${className}`}
    >
      <div className="relative w-full h-full group">
        <ImageNext
          src={preview?.url}
          alt="Preview"
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
        {onRemove && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all">
            <button
              onClick={() => handleRemove(0)}
              className="transform scale-0 group-hover:scale-100 transition-transform bg-white/90 p-2 rounded-full hover:bg-red-500 hover:text-white"
              title="Eliminar imagen"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        )}
        {preview?.isExisting && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            Existente
          </div>
        )}
      </div>
    </div>
  );
};
