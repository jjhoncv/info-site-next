"use client";

import { RoleName, User } from "@/interfaces";
import { ChevronDown, ChevronUp } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { FC, useState, useEffect, useRef } from "react";

interface DropdownProfileProps {
  user: User;
}

interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  requireRole?: RoleName[];
}

export const DropdownProfile: FC<DropdownProfileProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[][] = [
    [
      {
        label: "Profile",
        href: "/dashboard/profile",
      },
    ],
    [
      {
        label: "Roles",
        href: "/dashboard/roles",
        requireRole: [RoleName.SUPERADMIN],
      },
      {
        label: "Usuarios",
        href: "/dashboard/users",
        requireRole: [RoleName.SUPERADMIN],
      },
    ],
    [
      {
        label: "Logout",
        onClick: () => signOut({ callbackUrl: "/login" }),
      },
    ],
  ];

  const getInitials = (username: string, lastname: string) => {
    return `${username[0]}${lastname[0]}`.toUpperCase();
  };

  const hasRequiredRole = (requiredRoles?: RoleName[]) => {
    if (!requiredRoles) return true;
    return requiredRoles.includes(user.role.name);
  };

  // Cierra el dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Maneja el cierre con la tecla Escape
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscKey);
      return () => document.removeEventListener("keydown", handleEscKey);
    }
  }, [open]);

  const renderMenuItem = (item: MenuItem) => {
    if (!hasRequiredRole(item.requireRole)) return null;

    if (item.href) {
      return (
        <Link
          className="hover:bg-gray-200 py-2 px-3 w-full block rounded-lg transition-colors"
          href={item.href}
          onClick={() => setOpen(false)}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <button
        className="hover:bg-gray-200 py-2 px-3 w-full rounded-lg flex items-center transition-colors text-left"
        onClick={() => {
          item.onClick?.();
          setOpen(false);
        }}
      >
        {item.label}
      </button>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer gap-2 px-4 py-2 bg-white border rounded-lg items-center hover:bg-gray-50 transition-colors"
        role="button"
        aria-haspopup="true"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(!open);
          }
        }}
      >
        <div
          className="uppercase rounded-full text-white bg-gray-800 w-[30px] h-[30px] flex justify-center items-center"
          aria-label={`${user.username} ${user.lastname} avatar`}
        >
          {getInitials(user.username, user.lastname)}
        </div>
        <div className="mr-4 font-medium">{`${user.username} ${user.lastname}`}</div>
        {open ? (
          <ChevronUp size={20} className="text-gray-500" />
        ) : (
          <ChevronDown size={20} className="text-gray-500" />
        )}
      </div>

      {open && (
        <div
          className="p-4 gap-2 flex shadow-lg flex-col absolute top-[calc(100%+4px)] right-0 w-[250px] bg-white border rounded-lg z-50"
          role="menu"
        >
          {menuItems.map((group, groupIndex) => {
            // Filtra los items del grupo basado en los roles
            const visibleItems = group.filter((item) =>
              hasRequiredRole(item.requireRole)
            );

            // Si no hay items visibles en el grupo, no renderiza nada
            if (visibleItems.length === 0) return null;

            return (
              <React.Fragment key={groupIndex}>
                <ul className="w-full">
                  {visibleItems.map((item, itemIndex) => (
                    <li key={itemIndex} role="menuitem">
                      {renderMenuItem(item)}
                    </li>
                  ))}
                </ul>
                {groupIndex < menuItems.length - 1 &&
                  visibleItems.length > 0 && <hr className="my-1" />}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownProfile;
