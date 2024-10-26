import React, { FC } from "react";
import toast from "react-hot-toast";

interface SplashProps {
  children: React.ReactNode;
  type: "success" | "fail";
}

export const Splash: FC<SplashProps> = ({ children, type }) => {
  return toast.success(<>{children}</>, {
    duration: type === "success" ? 2000 : 3000,
    position: "top-right",
    style: {
      background: type === "success" ? "#10B981" : "#EF4444",
      color: "#fff",
    },
  });
};
