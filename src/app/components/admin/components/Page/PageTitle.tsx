import React, { FC } from "react";

interface PageTitleProps {
  title: string;
  image?: string;
}

export const PageTitle: FC<PageTitleProps> = ({ title, image }) => {
  return (
    <div className="flex items-center gap-2">
      {image && <img src={`/imgs/dashboard/${image}`} className="h-4" />}
      <span>{title}</span>
    </div>
  );
};
