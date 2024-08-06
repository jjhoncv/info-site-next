// components/HeaderNavigation.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Service } from "@/interfaces";

type HeaderNavigationProps = {
  services: Service[];
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
};

export default function HeaderNavigation({
  services,
  isMenuOpen,
  setIsMenuOpen,
}: HeaderNavigationProps) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <ul className="flex">
            <li>
              <Link
                href="/"
                className={`block font-semibold px-4 py-4 hover:bg-gray-700 ${
                  isActive("/") ? "text-blue-turquoise" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block font-semibold px-4 py-4 hover:bg-gray-700 ${
                  isActive("/about") ? "bg-gray-700" : ""
                }`}
              >
                About
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`block font-semibold px-4 py-4 hover:bg-gray-700 ${
                  isActive("/services") ? "bg-gray-700" : ""
                }`}
              >
                Services <i className="fas fa-chevron-down ml-1"></i>
              </button>
              {isServicesOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg z-10">
                  {services.map((service) => (
                    <li key={service.id}>
                      <Link
                        href={`/services/${service.slug}`}
                        className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                          isActive(`/services/${service.slug}`)
                            ? "bg-gray-200"
                            : ""
                        }`}
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link
                href="/contacts"
                className={`block font-semibold px-4 py-4 hover:bg-gray-700 ${
                  isActive("/contacts") ? "bg-gray-700" : ""
                }`}
              >
                Contacts
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          className="absolute top-4 right-4 text-white"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <ul className="pt-16">
          <li>
            <Link
              href="/"
              className={`block px-4 py-4 hover:bg-gray-700 ${
                isActive("/") ? "bg-gray-700" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`block px-4 py-4 hover:bg-gray-700 ${
                isActive("/about") ? "bg-gray-700" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${
                isActive("/services") ? "bg-gray-700" : ""
              }`}
            >
              Services{" "}
              <i
                className={`fas fa-chevron-${
                  isServicesOpen ? "up" : "down"
                } ml-1`}
              ></i>
            </button>
            {isServicesOpen && (
              <ul className="bg-gray-700">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services/${service.slug}`}
                      className={`block px-8 py-2 hover:bg-gray-600 ${
                        isActive(`/services/${service.slug}`)
                          ? "bg-gray-600"
                          : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <Link
              href="/contacts"
              className={`block px-4 py-4 hover:bg-gray-700 ${
                isActive("/contacts") ? "bg-gray-700" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contacts
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
