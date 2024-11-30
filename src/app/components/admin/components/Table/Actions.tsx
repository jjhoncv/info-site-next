import { ImagesIcon, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ActionProps {
  id: string;
  baseURL: string;
}

export const EditAction: FC<ActionProps> = ({ id, baseURL }) => {
  const router = useRouter();

  return (
    <Link
      href={`${baseURL}/${id}`}
      className="hover:text-blue-600 transition-colors hover:bg-slate-300/50 p-2 rounded-full"
    >
      <PencilIcon size={16} />
    </Link>
  );
};

export const RemoveAction: FC<ActionProps> = ({ id, baseURL }) => {
  const router = useRouter();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        router.replace(`${baseURL}?action=alert&id=${id}`);
      }}
      className="hover:text-red-600 transition-colors hover:bg-slate-300/50 p-2 rounded-full"
    >
      <TrashIcon size={16} />
    </button>
  );
};

export const GalleryAction: FC<ActionProps> = ({ id, baseURL }) => {
  const router = useRouter();

  return (
    <Link
      href={`${baseURL}/${id}/images`}
      className="hover:text-blue-600 transition-colors hover:bg-slate-300/50 p-2 rounded-full"
    >
      <ImagesIcon size={16} />
    </Link>
  );
};
