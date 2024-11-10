import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import { Button } from "../Form/Input/Button";

interface PageButtonProps {
  children: React.ReactNode;
  href: string;
}

export const PageButton: FC<PageButtonProps> = ({ children, href }) => {
  return (
    <Button type="link" href={href}>
      <div className="flex gap-2 items-center">
        <PlusIcon size={20} />
        {children ? children : "Crear nuevo"}
      </div>
    </Button>
  );
};
