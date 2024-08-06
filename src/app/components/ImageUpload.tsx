// src/components/ImageUpload.tsx
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 30,
    aspect: 16 / 9,
  });
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onCropComplete = (crop: Crop) => {
    if (image) {
      const croppedImageUrl = getCroppedImg(image, crop);
      setCroppedImageUrl(croppedImageUrl);
    }
  };

  const getCroppedImg = (image: string, crop: Crop): string => {
    const canvas = document.createElement("canvas");
    const scaleX = (image as any).naturalWidth / (image as any).width;
    const scaleY = (image as any).naturalHeight / (image as any).height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(
        image as any,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    }

    return canvas.toDataURL("image/jpeg");
  };

  const handleUpload = () => {
    if (croppedImageUrl) {
      fetch(croppedImageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "cropped-image.jpg", {
            type: "image/jpeg",
          });
          onImageUpload(file);
        });
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>
          Arrastra y suelta una imagen aquí, o haz clic para seleccionar una
        </p>
      </div>
      {image && (
        <ReactCrop
          src={image}
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onComplete={onCropComplete}
        />
      )}
      {croppedImageUrl && (
        <button
          onClick={handleUpload}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Subir imagen recortada
        </button>
      )}
    </div>
  );
}
