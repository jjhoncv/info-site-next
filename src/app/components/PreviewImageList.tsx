import { ImageOffIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface PreviewImageList {
  imageURL?: string;
}

export const PreviewImageList = ({ imageURL }: PreviewImageList) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className="relative w-[100px] h-[25px] flex"
        onMouseEnter={() => {
          if (imageURL) {
            setShow(true);
          }
        }}
        onMouseLeave={() => {
          if (imageURL) {
            setShow(false);
          }
        }}
      >
        {show && imageURL && (
          <div className="absolute top-0 left-0  w-[200px] h-[200px] flex">
            <Image
              src={imageURL}
              fill
              sizes="200px"
              priority
              alt="image banner"
              className="object-top object-contain rounded"
            />
          </div>
        )}
        {imageURL ? (
          <Image
            src={imageURL}
            fill
            sizes="200px"
            priority
            alt="image banner"
            className="object-left object-contain rounded"
          />
        ) : (
          <ImageOffIcon size={20} strokeWidth={1.5} />
        )}
      </div>
    </>
  );
};
