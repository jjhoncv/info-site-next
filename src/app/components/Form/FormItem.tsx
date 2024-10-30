import React, { FC } from "react";

interface FormItemProps {
  children: React.ReactNode;
}

export const FormItem: FC<FormItemProps> = ({ children }) => {
  return <div className="flex flex-col gap-1 mb-4">{children}</div>;
};
