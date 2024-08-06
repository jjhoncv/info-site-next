"use client";
// components/Header.tsx
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Service } from "@/interfaces";
import HeaderNavigation from "./HeaderNavigation";

export default function Header({ services }: { services: Service[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      {/* Top bar */}
      <div className="bg-[#F2F2F6] py-2 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="hidden md:block">
              Welcome to FinExpert, your expert in managing your finances!
            </div>
            <div className="space-x-4 flex">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 rounded-full bg-zinc-300 w-7 h-7 flex justify-center items-center"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 rounded-full bg-zinc-300 w-7 h-7 flex justify-center items-center"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 rounded-full bg-zinc-300 w-7 h-7 flex justify-center items-center"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="FinExpert Logo"
              width={150}
              height={50}
            />
          </Link>

          <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt text-blue-turquoise mr-2 fa-lg"></i>
              <div>
                <p className="font-semibold">267 Park Avenue</p>
                <p>New York, NY 90210</p>
              </div>
            </div>
            <div className="flex items-center">
              <i className="fas fa-phone-alt text-blue-turquoise mr-2 fa-lg"></i>
              <div>
                <p className="font-semibold">(123) 45678910</p>
                <p>info@demolink.org</p>
              </div>
            </div>
            <div className="flex items-center">
              <i className="far fa-clock text-blue-turquoise mr-2 fa-lg"></i>
              <div>
                <p className="font-semibold">Mon – Sat: 9:00–18:00</p>
                <p>Sunday CLOSED</p>
              </div>
            </div>
          </div>

          {/* Hamburger menu for mobile */}
          <button
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <HeaderNavigation
        services={services}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
    </header>
  );
}
