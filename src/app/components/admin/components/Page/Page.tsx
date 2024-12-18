import Link from "next/link";
import React, { FC } from "react";

interface PageUIProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  options?: React.ReactNode;
  breadcrumb?: { label: string; url?: string }[];
  children: React.ReactNode;
}

export const PageUI: FC<PageUIProps> = ({
  title,
  subtitle,
  options,
  breadcrumb,
  children,
}) => {
  return (
    <>
      {breadcrumb && (
        <div className="flex gap-2 text-sm my-5">
          <Link className="text-gray-500" href="/dashboard">
            Dashboard
          </Link>
          {breadcrumb.length > 0 && (
            <>
              <div className="text-gray-500">{"/"}</div>
              {breadcrumb.map((item) => (
                <>
                  {item.url ? (
                    <>
                      <Link className="text-gray-500" href={item.url}>
                        {item.label}
                      </Link>
                      <div>{"/"}</div>
                    </>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </>
              ))}
            </>
          )}
        </div>
      )}
      <div className="flex justify-between">
        <div>
          {title && <h1 className="font-semibold text-2xl">{title}</h1>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>

        {options && <div>{options}</div>}
      </div>
      <div className="mt-5 md:mt-0">{children}</div>
    </>
  );
};
