import { ImageOffIcon } from "lucide-react";
import Image from "next/image";

export const renderPreviewImage = (field: any, imageURL?: string) => {
  if (field && typeof field[0] === "object") {
    return (
      <Image
        src={URL.createObjectURL(field[0])}
        alt=""
        sizes="100vw"
        priority
        fill
        style={{ objectFit: "contain" }}
      />
    );
  }
  if (imageURL) {
    return (
      <Image
        src={imageURL}
        alt=""
        sizes="100vw"
        priority
        fill
        style={{ objectFit: "contain" }}
      />
    );
  }
  return (
    <div className="flex justify-center items-center w-full h-full">
      <ImageOffIcon size={40} className="stroke-slate-600" strokeWidth={1} />
    </div>
  );
};
