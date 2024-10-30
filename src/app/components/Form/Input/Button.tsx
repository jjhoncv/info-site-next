import Link from "next/link";
import React, { FC } from "react";

interface ButtonProps {
  type: "button" | "cancel" | "link" | "submit";
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  outline?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  type,
  href,
  outline,
  onClick,
}) => {
  const className = "rounded-lg px-6 py-2 flex";
  const classOutline = "border hover:border-slate-300 hover:bg-slate-100";
  const classBg = "bg-gray-800 text-white hover:bg-sky-600";

  return (
    <>
      {(type === "button" || type === "submit") && (
        <button
          className={`${outline ? classOutline : classBg} ${className}`}
          type={type}
          onClick={onClick}
        >
          {children}
        </button>
      )}
      {type === "cancel" && href && (
        <Link href={href} className={`${classOutline} ${className}`}>
          {children}
        </Link>
      )}
      {type === "link" && href && (
        <Link href={href} className={`border ${classBg} ${className}`}>
          {children}
        </Link>
      )}
    </>
  );
};
