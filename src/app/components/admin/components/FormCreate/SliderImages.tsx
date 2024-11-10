import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import Image from "next/image";

interface SliderImagesProps {
  images: string[];
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onClickEdit: () => void;
}

export const SliderImages: React.FC<SliderImagesProps> = ({
  images,
  className = "",
  showArrows = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  onClickEdit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto play
  React.useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => {
      clearInterval(interval);
      setCurrentIndex(0);
    };
  }, [autoPlay, autoPlayInterval]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  if (!images.length) return null;

  return (
    <div className={`relative w-full h-full  ${className}`}>
      <div className="relative h-full transition-all group overflow-hidden">
        <button
          type="button"
          onClick={() => onClickEdit()}
          className="absolute opacity-0 transition-all  z-10 group-hover:opacity-100 flex left-0 right-0 mx-auto w-[110px] top-[90px] gap-3 bg-sky-600 px-4 py-2 border rounded border-transparent text-white"
        >
          <Edit size={20} />
          Editar
        </button>

        {/* Imagen actual */}
        <div className="relative w-full h-full">
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className="object-scale-down transition-opacity duration-500"
            priority
          />
        </div>

        {/* Flechas de navegación */}
        {showArrows && images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Indicadores de posición */}
        {showDots && images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-4"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
