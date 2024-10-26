import { Divide } from "lucide-react";
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
    <div className="container ">
      <div className="flex justify-between">
        <div>
          {title && <h1 className="font-semibold text-2xl">{title}</h1>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          {breadcrumb && (
            <div className="flex gap-2 text-sm mt-5">
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
        </div>

        {options && <div>{options}</div>}
      </div>
      <div className="p-5 border rounded-lg bg-white my-7">{children}</div>
    </div>
  );
};
