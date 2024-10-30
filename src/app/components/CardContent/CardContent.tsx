import React, { FC } from "react";

interface CardContentProps {
  children: React.ReactNode;
  className?: any;
}

export const CardContent: FC<CardContentProps> = ({ children, className }) => {
  return (
    <div
      className={`border rounded-lg bg-white p-4 md:p-8 md:my-7 ${className}`}
    >
      {children}
    </div>
  );
};
