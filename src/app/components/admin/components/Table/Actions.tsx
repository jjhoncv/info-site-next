import { Edit2, ImagesIcon, Trash2, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ActionProps {
  id: string;
  baseURL: string;
}

export const EditAction: FC<ActionProps> = ({ id, baseURL }) => {
  return (
    <Link
      href={`${baseURL}/${id}`}
      className="flex gap-3 items-center text-sm font-light cursor-pointer hover:bg-slate-100 px-4 py-2 rounded transition-colors"
    >
      <Edit2 size={18} strokeWidth={1} />
      Edit
    </Link>
  );
};

export const RemoveAction: FC<ActionProps> = ({ id, baseURL }) => {
  const router = useRouter();

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        router.replace(`${baseURL}?action=alert&id=${id}`);
      }}
      className="flex gap-3 items-center text-sm font-light cursor-pointer hover:bg-red-100 text-red-600 px-4 py-2 rounded transition-colors"
    >
      <Trash2 size={18} strokeWidth={1} />
      Delete Entry
    </div>
  );
};

export const GalleryAction: FC<ActionProps> = ({ id, baseURL }) => {
  const router = useRouter();

  return (
    <Link
      href={`${baseURL}/${id}/images`}
      className="flex gap-3 items-center text-sm font-light cursor-pointer hover:bg-slate-100 px-4 py-2 rounded transition-colors"
    >
      <ImagesIcon size={18} strokeWidth={1} /> Images
    </Link>
  );
};
