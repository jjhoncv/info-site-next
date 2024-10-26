import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

interface PageButtonProps {
  children: React.ReactNode;
  href: string;
}

export const PageButton: FC<PageButtonProps> = ({ children, href }) => {
  return (
    <Link href={href}>
      <button
        className="bg-[#374151] text-white  rounded px-6 py-2"
        type="submit"
      >
        <div className="flex gap-2 items-center">
          <PlusIcon size={20} /> {children}
        </div>
      </button>
    </Link>
  );
};
