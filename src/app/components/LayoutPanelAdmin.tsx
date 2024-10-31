"use client";
import { User } from "@/interfaces";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import React, { FC, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import DropdownProfile from "./DropdownProfile/DropdownProfile";

interface LayoutPanelAdminProps {
  user: User;
  children: React.ReactNode;
}

export const LayoutPanelAdmin: FC<LayoutPanelAdminProps> = ({
  user,
  children,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <AdminSidebar user={user} open={!open} />
      <main className="flex-1 overflow-x-hidden overflow-y-auto ">
        <div className="w-full md:p-10 p-5 pt-5">
          <div className="flex items-center justify-between relative mb-5">
            <div className="justify-start flex">
              <div className="flex md:hidden">
                {open ? (
                  <PanelLeftOpen
                    onClick={() => setOpen(false)}
                    size={35}
                    strokeWidth={1}
                    color="#374151"
                    className="ml-[-3px]"
                  />
                ) : (
                  <PanelLeftClose
                    onClick={() => setOpen(true)}
                    size={35}
                    strokeWidth={1}
                    color="#374151"
                    className="ml-[-3px]"
                  />
                )}
              </div>
            </div>
            <DropdownProfile user={user} />
          </div>
          {children}
        </div>
      </main>
    </>
  );
};
