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
        className="relative"
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
          <div className="absolute z-50 h-[60px] w-[60px] rounded-full overflow-hidden top-[calc(100%-45px)] right-[calc(100%-45px)]">
            <Image
              src={imageURL}
              fill
              priority
              alt="image banner"
              className="object-cover"
            />
          </div>
        )}
        {imageURL ? (
          <div
            className={`relative w-[30px] h-[30px] rounded-full overflow-hidden ${
              show ? `opacity-0` : `opacity-100`
            }`}
          >
            <Image
              src={imageURL}
              fill
              sizes="200px"
              priority
              alt="image banner"
              className="object-cover"
            />
          </div>
        ) : (
          <ImageOffIcon size={20} strokeWidth={1.5} />
        )}
      </div>
    </>
  );
};
