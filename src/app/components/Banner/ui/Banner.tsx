"use client";

import { Banner } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BannerList({ banners }: { banners: Banner[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {banners.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {slide.image_url ? (
            <Image
              src={slide.image_url}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-slate-100" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent opacity-70" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl">
                <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                  {slide.title}
                </h2>
                <div className="flex space-x-4">
                  <Link
                    href={slide.link}
                    className="bg-blue-turquoise text-white px-8 py-3 rounded hover:bg-blue-600 transition-colors text-lg font-semibold"
                  >
                    Learn More
                  </Link>
                  <Link
                    href={slide.link}
                    className="bg-white text-gray-800 px-8 py-3 rounded hover:bg-gray-100 transition-colors text-lg font-semibold"
                  >
                    {slide.subtitle}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
