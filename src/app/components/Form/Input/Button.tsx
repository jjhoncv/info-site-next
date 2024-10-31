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
  ...props
}) => {
  const className = "min-w-16 rounded-lg px-8 py-2.5 flex";
  const classOutline =
    "border hover:border-slate-300 hover:bg-slate-100 transition-colors";
  const classBg = "bg-gray-800 text-white hover:bg-sky-600 transition-colors";

  return (
    <>
      {(type === "button" || type === "submit") && (
        <button
          className={`${outline ? classOutline : classBg} ${className}`}
          type={type}
          onClick={onClick}
          {...props}
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
